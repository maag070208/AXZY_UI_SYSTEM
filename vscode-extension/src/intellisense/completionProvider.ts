import * as vscode from "vscode";
import { componentNames, getComponent, layerLabel } from "../catalog";
import type { CatalogComponent } from "../types";

/** Languages where the provider is active. */
export const AXZY_LANGUAGES = [
  { language: "typescriptreact" },
  { language: "javascriptreact" },
  { language: "typescript" },
  { language: "javascript" },
];

function propDocumentation(component: CatalogComponent): vscode.MarkdownString {
  const markdown = new vscode.MarkdownString();
  markdown.appendMarkdown(`**${component.name}** — ${layerLabel(component.layer)}\n\n`);
  if (component.description) {
    markdown.appendMarkdown(`${component.description}\n\n`);
  }
  markdown.appendMarkdown(`_${component.props.length} documented props._`);
  return markdown;
}

function propItem(prop: CatalogComponent["props"][number]): vscode.CompletionItem {
  const item = new vscode.CompletionItem(prop.name, vscode.CompletionItemKind.Property);
  item.detail = `${prop.type}${prop.required ? "  ·  required" : ""}`;
  const markdown = new vscode.MarkdownString();
  markdown.appendMarkdown(`\`${prop.name}\`: \`${prop.type}\`\n\n`);
  if (prop.description) markdown.appendMarkdown(`${prop.description}\n\n`);
  if (prop.default) markdown.appendMarkdown(`**Default:** \`${prop.default}\``);
  markdown.supportThemeIcons = true;
  item.documentation = markdown;
  item.sortText = `${prop.required ? "0" : "1"}_${prop.name}`;
  if (/boolean/.test(prop.type)) {
    item.insertText = prop.name;
  } else {
    const snippet = new vscode.SnippetString();
    snippet.appendText(`${prop.name}={`);
    snippet.appendPlaceholder("…");
    snippet.appendText("}");
    item.insertText = snippet;
  }
  return item;
}

const USED_PROP_PATTERN = /(?:^|\s)([A-Za-z_$][\w$]*)\s*(?==|\s|$)/g;

function usedPropNames(tagText: string): Set<string> {
  const used = new Set<string>();
  const attributes = tagText.replace(/^<[A-Za-z][\w.]*/, "");
  for (const match of attributes.matchAll(USED_PROP_PATTERN)) {
    if (match[1] && match[1] !== "true" && match[1] !== "false") {
      used.add(match[1]);
    }
  }
  return used;
}

/**
 * Completion provider:
 * - Suggests `IT*` component names after `<`.
 * - Suggests the documented props while inside an `IT*` opening tag.
 */
export class AxzyCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const before = document
      .lineAt(position.line)
      .text.slice(0, position.character);

    const lastLt = before.lastIndexOf("<");
    const lastGt = before.lastIndexOf(">");
    const insideTag = lastLt > lastGt;
    const tagMatch = insideTag ? /<([A-Za-z][\w.]*)/.exec(before) : null;

    if (insideTag && tagMatch) {
      const component = getComponent(tagMatch[1]);
      if (component) {
        const used = usedPropNames(before.slice(lastLt));
        return component.props
          .filter((prop) => !used.has(prop.name))
          .map((prop) => propItem(prop));
      }
    }

    // Component-name suggestions: after `<`, or while typing an `IT*` word.
    const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z][\w]*/);
    const word = wordRange ? document.getText(wordRange) : "";
    const typingTag = before.endsWith("<") || /<[A-Za-z]*$/.test(before);
    if (typingTag || word.startsWith("IT")) {
      return componentNames().map((name) => {
        const component = getComponent(name)!;
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Class);
        item.detail = layerLabel(component.layer);
        item.documentation = propDocumentation(component);
        item.filterText = name;
        item.sortText = name;
        return item;
      });
    }

    return [];
  }
}
