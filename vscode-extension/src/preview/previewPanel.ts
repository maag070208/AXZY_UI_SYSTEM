import * as vscode from "vscode";
import { getComponent } from "../catalog";

const makeNonce = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Webview panel that renders a live React preview of a component using the
 * bundled `media/preview.js` and the library CSS in `media/axzy.css`.
 */
export class PreviewPanel {
  private static current: PreviewPanel | undefined;

  private readonly disposables: vscode.Disposable[] = [];

  private constructor(private readonly panel: vscode.WebviewPanel) {
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
  }

  /** Opens (or focuses) the preview panel for the given component. */
  static show(extensionUri: vscode.Uri, name: string): void {
    if (!getComponent(name)) {
      void vscode.window.showWarningMessage(
        `AXZY UI System: "${name}" is not a previewable component.`
      );
      return;
    }

    if (PreviewPanel.current) {
      PreviewPanel.current.panel.reveal(vscode.ViewColumn.Active, false);
      PreviewPanel.current.update(name);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "axzy.preview",
      `Preview · ${name}`,
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );
    PreviewPanel.current = new PreviewPanel(panel);
    panel.webview.html = PreviewPanel.html(panel.webview, extensionUri, name);
  }

  private update(name: string): void {
    this.panel.title = `Preview · ${name}`;
    const theme = vscode.workspace.getConfiguration("axzy").get<string>("preview.theme", "light");
    void this.panel.webview.postMessage({ type: "render", component: name, theme });
  }

  private static html(
    webview: vscode.Webview,
    extensionUri: vscode.Uri,
    name: string
  ): string {
    const n = makeNonce();
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "media", "preview.js")
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "media", "axzy.css")
    );
    const theme = vscode.workspace.getConfiguration("axzy").get<string>("preview.theme", "light");
    const csp = [
      "default-src 'none'",
      `style-src ${webview.cspSource} 'unsafe-inline'`,
      `script-src 'nonce-${n}'`,
      `font-src ${webview.cspSource} data:`,
      `img-src ${webview.cspSource} data: https:`,
      "connect-src 'none'",
    ].join("; ");

    return `<!DOCTYPE html>
<html lang="en" class="${theme === "dark" ? "dark" : ""}">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="${csp}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AXZY preview · ${name}</title>
  <link rel="stylesheet" href="${styleUri}" />
  <style>
    html, body { height: 100%; }
    body { margin: 0; font-family: var(--vscode-font-family, system-ui, sans-serif); }
  </style>
</head>
<body>
  <div id="axzy-preview"></div>
  <script nonce="${n}">
    window.__AXZY_COMPONENT__ = ${JSON.stringify(name)};
    window.__AXZY_THEME__ = ${JSON.stringify(theme)};
  </script>
  <script nonce="${n}" src="${scriptUri}"></script>
</body>
</html>`;
  }

  private dispose(): void {
    PreviewPanel.current = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      this.disposables.pop()?.dispose();
    }
  }
}
