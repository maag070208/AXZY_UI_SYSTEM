import { useState } from "react";
import clsx from "clsx";
import ITTopBar from "../topbar/topbar";
import ITSidebar from "../sidebar/sidebar";
import { ITLayoutProps } from "./layout.props";
export default function ITLayout({
  topBar,
  sidebar,
  children,
  className = "",
  contentClassName = "",
}: ITLayoutProps) {

  // Desktop states
  const [desktopCollapsed, setDesktopCollapsed] = useState(true); // Default to collapsed

  // Mobile drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen overflow-hidden w-full ${className}`}>
      
      {/* TOPBAR - Full Width at Top */}
      <ITTopBar
        {...topBar}
        showMobileMenuButton
        onToggleMobileMenu={() => setMobileSidebarOpen(v => !v)}
      />

      <div className="flex flex-1 overflow-hidden relative" style={{ backgroundColor: "var(--layout-bg, #f8fafc)" }}>
        
        {/* DESKTOP SIDEBAR - Floating over content when expanded */}
        <div className="hidden lg:block relative z-40 h-full">
          {/* Spacer to keep main content from shifting. Width matches collapsed sidebar. */}
          <div className="w-[88px] h-full flex-shrink-0" />
          
          <div className="absolute top-0 left-0 h-full">
            <ITSidebar
              {...sidebar}
              isCollapsed={desktopCollapsed}
              onToggleCollapse={() => setDesktopCollapsed(v => !v)}
              visibleOnMobile={false}
              className={`h-full drop-shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] flex-shrink-0`}
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
