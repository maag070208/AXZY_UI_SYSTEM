import * as vscode from "vscode";
import { catalog, getComponent, getHook, layerLabel } from "../catalog";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const makeNonce = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Singleton webview panel that renders the documentation of one component (or
 * hook): description, props table and usage example.
 */
export class DocsPanel {
  private static current: DocsPanel | undefined;

  private readonly disposables: vscode.Disposable[] = [];

  private constructor(private readonly panel: vscode.WebviewPanel) {
    this.panel.webview.onDidReceiveMessage(
      (message: { command?: string; name?: string }) => {
        if (!message?.command) return;
        if (message.command === "preview" && message.name) {
          void vscode.commands.executeCommand("axzy.previewComponent", message.name);
        } else if (message.command === "openSource" && message.name) {
          void vscode.commands.executeCommand("axzy.openSource", message.name);
        } else if (message.command === "copyExample" && message.name) {
          void vscode.commands.executeCommand("axzy.copyExample", message.name);
        }
      },
      null,
      this.disposables
    );

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
  }

  /** Opens (or focuses) the docs panel for the given export name. */
  static show(name: string): void {
    if (!getComponent(name) && !getHook(name)) {
      void vscode.window.showWarningMessage(
        `AXZY UI System: "${name}" is not in the catalog.`
      );
      return;
    }

    if (DocsPanel.current) {
      DocsPanel.current.panel.reveal(vscode.ViewColumn.Beside, true);
      DocsPanel.current.update(name);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "axzy.docs",
      `AXZY · ${name}`,
      { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
      { enableScripts: true, retainContextWhenHidden: true }
    );
    DocsPanel.current = new DocsPanel(panel);
    DocsPanel.current.update(name);
  }

  private update(name: string): void {
    this.panel.title = `AXZY · ${name}`;
    this.panel.webview.html = this.renderHtml(name);
  }

  private renderHtml(name: string): string {
    const component = getComponent(name);
    const hook = getHook(name);
    const n = makeNonce();
    const cspSource = this.panel.webview.cspSource;
    const csp = [
      "default-src 'none'",
      `style-src ${cspSource} 'unsafe-inline'`,
      `script-src 'nonce-${n}'`,
      `img-src ${cspSource} data: https:`,
    ].join("; ");

    if (hook) {
      const body = `
        <header class="head">
          <div>
            <span class="badge">${escapeHtml(layerLabel(hook.layer))}</span>
            <h1>${escapeHtml(hook.name)}</h1>
          </div>
        </header>
        <p class="desc">${escapeHtml(hook.description || "No description.")}</p>
        <h2>Signature</h2>
        <pre class="code"><code>${escapeHtml(hook.signature)}</code></pre>
        ${hook.example ? `<h2>Example</h2><pre class="code"><code>${escapeHtml(hook.example)}</code></pre>` : ""}
        <p class="meta">Source: <code>${escapeHtml(hook.source)}</code></p>
      `;
      return wrapHtml({ title: hook.name, csp, body });
    }

    const comp = component!;
    const rows = comp.props
      .map(
        (prop) => `
          <tr>
            <td class="prop-name">${escapeHtml(prop.name)}${prop.required ? '<span class="req">*</span>' : ""}</td>
            <td class="prop-type"><code>${escapeHtml(prop.type)}</code></td>
            <td class="prop-default">${
              prop.default ? `<code>${escapeHtml(prop.default)}</code>` : "<span class='muted'>—</span>"
            }</td>
            <td class="prop-desc">${escapeHtml(prop.description || "—")}</td>
          </tr>`
      )
      .join("");

    const body = `
      <header class="head">
        <div>
          <span class="badge">${escapeHtml(layerLabel(comp.layer))}</span>
          <h1>${escapeHtml(comp.name)}</h1>
        </div>
        <div class="actions">
          <button data-command="preview" data-name="${escapeHtml(comp.name)}">Preview</button>
          <button data-command="copyExample" data-name="${escapeHtml(comp.name)}" class="ghost">Copy example</button>
          <button data-command="openSource" data-name="${escapeHtml(comp.name)}" class="ghost">Source</button>
        </div>
      </header>
      <p class="desc">${escapeHtml(comp.description || "No description.")}</p>
      ${comp.example ? `<h2>Example</h2><pre class="code"><code>${escapeHtml(comp.example)}</code></pre>` : ""}
      <h2>Props <span class="muted">(${comp.props.length})</span></h2>
      <table class="props">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="4" class="muted">No documented props.</td></tr>`}</tbody>
      </table>
      <p class="meta">Source: <code>${escapeHtml(comp.source)}</code></p>
      <p class="meta">Catalog v${escapeHtml(catalog.libraryVersion)} · ${escapeHtml(catalog.generatedAt.slice(0, 10))}</p>
      <script nonce="${n}">
        const vscode = acquireVsCodeApi();
        document.querySelectorAll('button[data-command]').forEach((button) => {
          button.addEventListener('click', () => {
            vscode.postMessage({
              command: button.getAttribute('data-command'),
              name: button.getAttribute('data-name'),
            });
          });
        });
      </script>
    `;

    return wrapHtml({ title: comp.name, csp, body });
  }

  private dispose(): void {
    DocsPanel.current = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      this.disposables.pop()?.dispose();
    }
  }
}

function wrapHtml(options: { title: string; csp: string; body: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="${options.csp}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(options.title)}</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      font-family: var(--vscode-font-family);
      color: var(--vscode-editor-foreground);
      padding: 20px 28px 48px;
      line-height: 1.5;
    }
    h1 { font-size: 22px; margin: 6px 0 0; }
    h2 { font-size: 13px; text-transform: uppercase; letter-spacing: .06em; color: var(--vscode-descriptionForeground); margin: 28px 0 10px; }
    .head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .badge { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; padding: 2px 8px; border-radius: 999px; background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
    .desc { margin: 12px 0 0; }
    .actions { display: flex; gap: 8px; }
    button {
      font-family: inherit; font-size: 12px; cursor: pointer;
      padding: 5px 12px; border-radius: 6px; border: 1px solid transparent;
      background: var(--vscode-button-background); color: var(--vscode-button-foreground);
    }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button.ghost { background: transparent; color: var(--vscode-foreground); border-color: var(--vscode-panel-border); }
    .props { width: 100%; border-collapse: collapse; font-size: 13px; }
    .props th, .props td { text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid var(--vscode-panel-border); }
    .props th { color: var(--vscode-descriptionForeground); font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; }
    .prop-name { font-weight: 600; white-space: nowrap; }
    .prop-name .req { color: var(--vscode-errorForeground); margin-left: 3px; }
    .prop-type code, .prop-default code { white-space: pre-wrap; word-break: break-word; }
    .props td code, .meta code { font-family: var(--vscode-editor-font-family); font-size: 12px; }
    .muted { color: var(--vscode-descriptionForeground); }
    pre.code { background: var(--vscode-textCodeBlock-background); border: 1px solid var(--vscode-panel-border); border-radius: 8px; padding: 14px 16px; overflow: auto; }
    pre.code code { font-family: var(--vscode-editor-font-family); font-size: 12.5px; }
    .meta { color: var(--vscode-descriptionForeground); font-size: 12px; margin-top: 8px; }
  </style>
</head>
<body>${options.body}</body>
</html>`;
}
