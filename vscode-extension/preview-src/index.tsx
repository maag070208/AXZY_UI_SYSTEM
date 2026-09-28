import React from "react";
import { createRoot } from "react-dom/client";
import { registry } from "./registry";

declare global {
  interface Window {
    /** Component name the extension asked to render. */
    __AXZY_COMPONENT__?: string;
    /** `"light" | "dark"` theme requested by the extension. */
    __AXZY_THEME__?: string;
  }
}

/** Catches demo render errors so a broken preview does not blank the webview. */
class PreviewBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { error?: string }
> {
  state: { error?: string } = {};

  static getDerivedStateFromError(error: unknown): { error: string } {
    return { error: error instanceof Error ? error.message : String(error) };
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return (
        <div className="m-6 rounded-lg border border-danger-200 bg-danger-50 p-4 text-sm text-danger-700">
          <p className="font-semibold">Preview failed for {this.props.name}</p>
          <pre className="mt-2 whitespace-pre-wrap text-xs">{this.state.error}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById("axzy-preview");
const root = container ? createRoot(container) : undefined;

function render(name: string): void {
  if (!root) return;
  const Demo = registry[name];
  document.documentElement.classList.toggle("dark", window.__AXZY_THEME__ === "dark");

  root.render(
    <div className="min-h-screen bg-secondary-50 text-secondary-900 dark:bg-secondary-950 dark:text-secondary-100">
      <header className="flex items-center gap-2 border-b border-secondary-200 bg-white px-5 py-3 dark:border-secondary-800 dark:bg-secondary-900">
        <span className="text-sm font-bold">{name || "AXZY"}</span>
        <span className="text-xs text-secondary-400">AXZY UI System preview</span>
      </header>
      <main className="p-6">
        {Demo ? (
          <PreviewBoundary name={name}>
            <Demo />
          </PreviewBoundary>
        ) : (
          <div className="rounded-lg border border-secondary-200 bg-white p-4 text-sm text-secondary-500 dark:border-secondary-800 dark:bg-secondary-900">
            No preview registered for <strong>{name}</strong>. Open its docs panel for props and
            examples.
          </div>
        )}
      </main>
    </div>
  );
}

render(window.__AXZY_COMPONENT__ ?? "");

window.addEventListener("message", (event: MessageEvent) => {
  const message = event.data as { type?: string; component?: string; theme?: string };
  if (message?.type === "render" && message.component) {
    if (message.theme) window.__AXZY_THEME__ = message.theme;
    render(message.component);
  }
});
