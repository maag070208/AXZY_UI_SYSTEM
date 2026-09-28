import * as vscode from "vscode";
import { componentNames, getComponent, getHook } from "./catalog";
import { ComponentTreeProvider } from "./explorer/componentTree";
import { DocsPanel } from "./explorer/docsPanel";
import { PreviewPanel } from "./preview/previewPanel";
import { AXZY_LANGUAGES, AxzyCompletionProvider } from "./intellisense/completionProvider";
import { registerHoverProvider } from "./intellisense/hoverProvider";

/** Called when the extension is activated. */
export function activate(context: vscode.ExtensionContext): void {
  const tree = new ComponentTreeProvider();

  context.subscriptions.push(
    vscode.window.createTreeView("axzy.componentExplorer", {
      treeDataProvider: tree,
      showCollapseAll: true,
    })
  );

  const resolve = async (name: string | undefined, placeHolder: string): Promise<string | undefined> => {
    if (name) return name;
    const picked = await vscode.window.showQuickPick(
      componentNames().map((component) => ({
        label: component,
        description: getComponent(component)?.layer,
      })),
      { placeHolder }
    );
    return picked?.label;
  };

  context.subscriptions.push(
    vscode.commands.registerCommand("axzy.openDocs", async (name?: string) => {
      const target = await resolve(name, "Select a component to document");
      if (target) DocsPanel.show(target);
    }),

    vscode.commands.registerCommand("axzy.previewComponent", async (name?: string) => {
      const target = await resolve(name, "Select a component to preview");
      if (target) PreviewPanel.show(context.extensionUri, target);
    }),

    vscode.commands.registerCommand("axzy.copyExample", async (name?: string) => {
      const target = await resolve(name, "Select a component to copy its example");
      if (!target) return;
      const example = getComponent(target)?.example || getHook(target)?.example;
      if (!example) {
        void vscode.window.showInformationMessage(
          `AXZY UI System: ${target} has no usage example.`
        );
        return;
      }
      await vscode.env.clipboard.writeText(example);
      void vscode.window.showInformationMessage(`AXZY UI System: copied ${target} example.`);
    }),

    vscode.commands.registerCommand("axzy.openSource", async (name?: string) => {
      const target = await resolve(name, "Select a component to open its source");
      if (target) await openSource(target);
    }),

    vscode.commands.registerCommand("axzy.refreshCatalog", () => tree.refresh())
  );

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      AXZY_LANGUAGES,
      new AxzyCompletionProvider(),
      "<"
    )
  );

  registerHoverProvider(context);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("axzy.explorer.showHooks")) {
        tree.refresh();
      }
    })
  );
}

/** Called when the extension is deactivated. */
export function deactivate(): void {
  // no-op
}

async function openSource(name: string): Promise<void> {
  const entry = getComponent(name) ?? getHook(name);
  if (!entry) return;

  const relative = entry.source;
  const packageName = vscode.workspace
    .getConfiguration("axzy")
    .get<string>("packageName", "@axzydev/axzy_ui_system");

  const candidates: vscode.Uri[] = [];
  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    candidates.push(vscode.Uri.joinPath(folder.uri, "node_modules", packageName, relative));
    candidates.push(vscode.Uri.joinPath(folder.uri, packageName, relative));
    candidates.push(vscode.Uri.joinPath(folder.uri, relative));
  }

  for (const uri of candidates) {
    try {
      const document = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(document, { preview: true });
      return;
    } catch {
      // try the next candidate
    }
  }

  void vscode.window.showWarningMessage(
    `AXZY UI System: could not locate "${relative}". Is the library installed in this workspace?`
  );
}
