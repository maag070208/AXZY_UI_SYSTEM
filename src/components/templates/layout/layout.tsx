import { useState } from "react";
import clsx from "clsx";
import ITTopBar from "@/components/organisms/topbar/topbar";
import ITSidebar from "@/components/organisms/sidebar/sidebar";
import { ITLayoutProps } from "./layout.props";
import { theme } from "@/theme/theme";
import { useITFlatAppearance } from "@/theme/theme-context";

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
 *
 * @example
 * // Full-height sidebar with the brand on top; the top bar covers only the content.
 * <ITLayout
 *   sidebarFullHeight
 *   topBar={{ logo: <Logo />, logoText: "Acme", centerContent: <SearchBox /> }}
 *   sidebar={{ navigationItems, isCollapsed: false }}
 * >
 *   <Dashboard />
 * </ITLayout>
 */
export default function ITLayout({
  topBar,
  sidebar,
  children,
  className = "",
  contentClassName = "",
  sidebarFullHeight = false,
}: ITLayoutProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const flat = useITFlatAppearance();

  const isControlled = sidebar.isCollapsed !== undefined;
  const desktopCollapsed = isControlled ? sidebar.isCollapsed : internalCollapsed;
  const handleToggleCollapse = isControlled ? (sidebar.onToggleCollapse ?? (() => {})) : () => setInternalCollapsed(v => !v);

  const layoutTokens = theme.layout;
  // Must match ITSidebar's own at-rest width (88px rail / 280px, 248px when flat).
  const reservedWidth = desktopCollapsed ? "w-[88px]" : flat ? "w-[248px]" : "w-[280px]";
  // With a full-height sidebar the brand moves from the top bar to the sidebar.
  const brand = sidebarFullHeight
    ? (sidebar.brand ?? { logo: topBar.logo, text: topBar.logoText })
    : sidebar.brand;

  const topBarNode = (
    <ITTopBar
      {...topBar}
      hideBrandOnDesktop={sidebarFullHeight || topBar.hideBrandOnDesktop}
      showMobileMenuButton
      onToggleMobileMenu={() => setMobileSidebarOpen(v => !v)}
    />
  );

  const desktopSidebar = (
    // Full-height: the sidebar sits beside the top bar, so it needs to win the
    // stacking order when the collapsed rail expands over the content on hover.
    <div className={`hidden lg:block relative h-full ${sidebarFullHeight ? "z-50" : "z-40"}`}>
      {/* Reserves the sidebar's at-rest width. When the sidebar is collapsed
          (default), this is the 88px rail and hover expands over the content.
          When controlled-expanded (`sidebar.isCollapsed === false`), it
          reserves the full width so the sidebar never overlays content. */}
      <div className={`${reservedWidth} h-full flex-shrink-0`} />
      <div className="absolute top-0 left-0 h-full">
        <ITSidebar
          {...sidebar}
          brand={brand}
          isCollapsed={desktopCollapsed}
          onToggleCollapse={handleToggleCollapse}
          visibleOnMobile={false}
          className={`h-full ${flat ? "" : "drop-shadow-2xl"} transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] flex-shrink-0`}
        />
      </div>
    </div>
  );

  const mobileSidebar = mobileSidebarOpen && (
    <div
      className="lg:hidden fixed inset-0 z-[40] transition-opacity duration-300 backdrop-blur-sm bg-black/40"
      onClick={() => setMobileSidebarOpen(false)}
    >
      <div
        className="h-full w-fit flex transform transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <ITSidebar
          {...sidebar}
          brand={brand}
          isCollapsed={false}
          visibleOnMobile={true}
          className="h-full shadow-2xl relative z-[60]"
          onToggleCollapse={() => setMobileSidebarOpen(false)}
          onItemClick={() => setMobileSidebarOpen(false)}
          onSubItemClick={() => setMobileSidebarOpen(false)}
        />
      </div>
    </div>
  );

  const main = (
    <main className="flex-1 overflow-y-auto w-full custom-scrollbar relative z-0">
      <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 h-full", contentClassName)}>
        {children}
      </div>
    </main>
  );

  if (sidebarFullHeight) {
    return (
      <div
        className={`flex h-screen overflow-hidden w-full relative ${className}`}
        style={{ backgroundColor: layoutTokens.backgroundColor }}
      >
        {desktopSidebar}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {topBarNode}
          {main}
        </div>
        {mobileSidebar}
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen overflow-hidden w-full ${className}`}>
      {topBarNode}

      <div
        className="flex flex-1 overflow-hidden relative"
        style={{ backgroundColor: layoutTokens.backgroundColor }}
      >
        {desktopSidebar}
        {mobileSidebar}
        {main}
      </div>
    </div>
  );
}
