import * as vscode from "vscode";
import { catalog, getComponent, layerLabel, populatedLayers } from "../catalog";

/** A group node in the explorer (an atomic layer or the hooks group). */
export interface LayerNode {
  kind: "layer";
  layer: string;
}

/** A component leaf node. */
export interface ComponentNode {
  kind: "component";
  name: string;
}

/** A hook leaf node. */
export interface HookNode {
  kind: "hook";
  name: string;
}

export type TreeNode = LayerNode | ComponentNode | HookNode;

/**
 * Tree data provider listing the exported components grouped by atomic layer,
 * plus an optional hooks group. Leaves open the docs panel on click.
 */
export class ComponentTreeProvider implements vscode.TreeDataProvider<TreeNode> {
  private readonly onDidChangeEmitter = new vscode.EventEmitter<TreeNode | undefined | void>();

  readonly onDidChangeTreeData = this.onDidChangeEmitter.event;

  /** Re-renders the whole tree. */
  refresh(): void {
    this.onDidChangeEmitter.fire();
  }

  getTreeItem(node: TreeNode): vscode.TreeItem {
    if (node.kind === "layer") {
      const count =
        node.layer === "hooks"
          ? catalog.hooks.length
          : catalog.components.filter((component) => component.layer === node.layer).length;
      const item = new vscode.TreeItem(layerLabel(node.layer), vscode.TreeItemCollapsibleState.Expanded);
      item.description = String(count);
      item.contextValue = "axzy.layer";
      item.iconPath = new vscode.ThemeIcon(
        node.layer === "hooks" ? "symbol-method" : "symbol-structure"
      );
      return item;
    }

    if (node.kind === "hook") {
      const item = new vscode.TreeItem(node.name, vscode.TreeItemCollapsibleState.None);
      item.contextValue = "axzy.hook";
      item.iconPath = new vscode.ThemeIcon("symbol-function");
      item.tooltip = `Open ${node.name} documentation`;
      item.command = {
        command: "axzy.openDocs",
        title: "Open docs",
        arguments: [node.name],
      };
      return item;
    }

    const component = getComponent(node.name);
    const item = new vscode.TreeItem(node.name, vscode.TreeItemCollapsibleState.None);
    item.contextValue = "axzy.component";
    item.iconPath = new vscode.ThemeIcon("symbol-class");
    item.tooltip = component?.description || component?.source;
    item.command = {
      command: "axzy.openDocs",
      title: "Open docs",
      arguments: [node.name],
    };
    return item;
  }

  getChildren(node?: TreeNode): TreeNode[] {
    if (!node) {
      const layers = populatedLayers().map<TreeNode>((layer) => ({ kind: "layer", layer }));
      const showHooks = vscode.workspace
        .getConfiguration("axzy")
        .get<boolean>("explorer.showHooks", true);
      if (showHooks && catalog.hooks.length > 0) {
        layers.push({ kind: "layer", layer: "hooks" });
      }
      return layers;
    }

    if (node.kind === "layer") {
      if (node.layer === "hooks") {
        return catalog.hooks.map<TreeNode>((hook) => ({ kind: "hook", name: hook.name }));
      }
      return catalog.components
        .filter((component) => component.layer === node.layer)
        .map<TreeNode>((component) => ({ kind: "component", name: component.name }));
    }

    return [];
  }
}
