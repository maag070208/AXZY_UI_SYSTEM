import { useState } from "react";
import clsx from "clsx";
import ITTopBar from "../topbar/topbar";
import ITSidebar from "../sidebar/sidebar";
import { ITLayoutProps } from "./layout.props";
import { theme } from "@/theme/theme";

/**
 * Main application shell with sidebar, topbar, and content area.
 * Provides a responsive layout with a collapsible desktop sidebar,
 * a sliding mobile sidebar overlay, and a scrollable main content region.
 *
 * @example
 * <ITLayout
 *   topBar={{ title: "Dashboard", userMenu: [...] }}
 *   sidebar={{ items: [...], activeKey: "overview" }}
 * >
 *   <p>Page content goes here</p>
 * </ITLayout>
 *
 * @example
 * <ITLayout
 *   topBar={{ title: "Settings" }}
 *   sidebar={{ items: navItems }}
 *   className="min-h-screen"
 *   contentClassName="max-w-5xl"
 * >
 *   <SettingsPage />
 * </ITLayout>
 */
export default function ITLayout({
  topBar,
  sidebar,
  children,
  className = "",
  contentClassName = "",
}: ITLayoutProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isControlled = sidebar.isCollapsed !== undefined;
  const desktopCollapsed = isControlled ? sidebar.isCollapsed : internalCollapsed;
  const handleToggleCollapse = isControlled ? (sidebar.onToggleCollapse ?? (() => {})) : () => setInternalCollapsed(v => !v);

  const layoutTokens = theme.layout;

  return (
    <div className={`flex flex-col h-screen overflow-hidden w-full ${className}`}>
      <ITTopBar
        {...topBar}
        showMobileMenuButton
        onToggleMobileMenu={() => setMobileSidebarOpen(v => !v)}
      />

      <div
        className="flex flex-1 overflow-hidden relative"
        style={{ backgroundColor: layoutTokens.backgroundColor }}
      >
        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block relative z-40 h-full">
          <div className="w-[88px] h-full flex-shrink-0" />
          <div className="absolute top-0 left-0 h-full">
            <ITSidebar
              {...sidebar}
              isCollapsed={desktopCollapsed}
              onToggleCollapse={handleToggleCollapse}
              visibleOnMobile={false}
              className="h-full drop-shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] flex-shrink-0"
            />
          </div>
        </div>

        {/* MOBILE SIDEBAR PANE */}
        {mobileSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 transition-opacity duration-300 backdrop-blur-sm bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div
              className="h-full w-fit flex transform transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <ITSidebar
                {...sidebar}
                isCollapsed={false}
                visibleOnMobile={true}
                className="h-full shadow-2xl relative z-[60]"
                onToggleCollapse={() => setMobileSidebarOpen(false)}
                onItemClick={() => setMobileSidebarOpen(false)}
                onSubItemClick={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar relative z-0">
          <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 h-full", contentClassName)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
