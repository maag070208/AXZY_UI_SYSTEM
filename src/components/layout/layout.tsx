import { useState } from "react";
import ITTopBar from "../topbar/topbar";
import ITSidebar from "../sidebar/sidebar";
import { ITLayoutProps } from "./layout.props";

export default function ITLayout({
  topBar,
  sidebar,
  children,
  className = "",
}: ITLayoutProps) {

  // Desktop states
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  // Mobile drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen ${className}`}>
      <ITTopBar
        {...topBar}
        showMobileMenuButton
        onToggleMobileMenu={() => setMobileSidebarOpen(v => !v)}
      />

      <div className="flex flex-1 overflow-hidden">

        {/* DESKTOP SIDEBAR */}
        { (
          <ITSidebar
            {...sidebar}
            isCollapsed={desktopCollapsed}
            onToggleCollapse={() => setDesktopCollapsed(v => !v)}
            visibleOnMobile={false}
          />
        )}

        {/* MOBILE SIDEBAR */}
        {mobileSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <ITSidebar
              {...sidebar}
              isCollapsed={false}
              visibleOnMobile={true}
              className="absolute left-0 top-0 h-full z-50"
            />
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
