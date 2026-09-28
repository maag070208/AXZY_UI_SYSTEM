import * as vscode from "vscode";
import { getComponent, getHook, layerLabel } from "../catalog";
import { AXZY_LANGUAGES } from "./completionProvider";

/**
 * Hover provider: shows description, layer and source for `IT*` components and
 * `use*` hooks referenced in the editor.
 */
export class AxzyHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | undefined {
    const range =
      document.getWordRangeAtPosition(position, /IT[A-Z]\w*/) ??
      document.getWordRangeAtPosition(position, /use[A-Z]\w*/);
    if (!range) return undefined;

    const name = document.getText(range);
    const markdown = new vscode.MarkdownString();
    markdown.supportHtml = false;

    const component = getComponent(name);
    if (component) {
      markdown.appendMarkdown(`**${component.name}** · ${layerLabel(component.layer)}\n\n`);
      if (component.description) markdown.appendMarkdown(`${component.description}\n\n`);
      markdown.appendMarkdown(`\`${component.props.length} props\` · \`${component.source}\``);
      return new vscode.Hover(markdown, range);
    }

    const hook = getHook(name);
    if (hook) {
      markdown.appendMarkdown(`**${hook.name}** · hook\n\n`);
      if (hook.description) markdown.appendMarkdown(`${hook.description}\n\n`);
      markdown.appendCodeblock(hook.signature, "typescript");
      return new vscode.Hover(markdown, range);
    }

    return undefined;
  }
}

/** Registers the hover provider for the supported languages. */
export function registerHoverProvider(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(AXZY_LANGUAGES, new AxzyHoverProvider())
  );
}
