import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { ITNavigationItem, ITSidebarProps } from "./sidebar.props";
import { theme } from "@/theme/theme";

export default function ITSidebar({
  navigationItems = [],
  isCollapsed = false,
  onToggleCollapse,
  className = "",
  visibleOnMobile = false,
}: ITSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsHovering(false);
      }, 300);
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener("mouseenter", handleMouseEnter);
      sidebar.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (sidebar) {
        sidebar.removeEventListener("mouseenter", handleMouseEnter);
        sidebar.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, [isCollapsed]);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: ITNavigationItem) => {
    if (item.subitems && item.subitems.length > 0) {
      toggleExpanded(item.id);
    } else if (item.action) {
      item.action();
    }
  };

  // If visibleOnMobile is true, it's inside the mobile drawer and should ALWAYS be fully expanded
  // Otherwise, it expands if hovering, or uses the isCollapsed prop
  const isSidebarCollapsed = visibleOnMobile ? false : (!isHovering && isCollapsed);
  const sidebarWidth = isSidebarCollapsed ? "w-[88px]" : "w-[280px]";

  return (
    <aside
      ref={sidebarRef}
      className={`
        relative flex flex-col 
        transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)]
        ${sidebarWidth}
        ${className}
        ${!visibleOnMobile ? "hidden lg:flex" : "flex"}
        shadow-[4px_0_24px_rgba(0,0,0,0.02)]
      `}
      style={{
        zIndex: 50,
        backgroundColor: theme.sidebar?.backgroundColor || 'rgba(255, 255, 255, 0.90)',
        borderRight: `1px solid ${theme.sidebar?.borderColor || '#e2e8f0'}`,
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Menu Header with Modern Collapse Toggle */}
      <div className={`p-6 flex items-center ${isSidebarCollapsed ? "justify-center px-4" : "justify-end px-6"} relative h-[72px]`} style={{ borderBottom: `1px solid ${theme.sidebar?.borderColor || '#e2e8f0'}` }}>
          <button
            onClick={onToggleCollapse}
            className={`
              flex items-center justify-center
              w-8 h-8 rounded-full 
              border shadow-sm
              transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
              group relative z-10
            `}
            style={{ 
              color: theme.sidebar?.icon?.color || '#64748b',
              backgroundColor: '#ffffff',
              borderColor: theme.sidebar?.borderColor || '#e2e8f0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.sidebar?.hover?.backgroundColor || '#f1f5f9';
              e.currentTarget.style.color = theme.sidebar?.active?.color || '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = theme.sidebar?.icon?.color || '#64748b';
            }}
            title={isCollapsed ? "Fijar panel" : "Ocultar panel"}
          >
            {isCollapsed ? (
              <FaChevronRight className="w-3.5 h-3.5 translate-x-0.5" />
            ) : (
              <FaChevronLeft className="w-3.5 h-3.5 -translate-x-0.5" />
            )}
          </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id} className="relative group/navitem">
              <div
                className={`flex items-center cursor-pointer 
                  transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                  rounded-xl relative overflow-visible
                  ${isSidebarCollapsed ? "justify-center p-2.5 mb-2" : "justify-between px-3.5 py-3 mb-1"}
                `}
                style={{
                  backgroundColor: item.isActive ? (theme.sidebar?.active?.backgroundColor || '#f8fafc') : 'transparent',
                  boxShadow: item.isActive ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
                  border: item.isActive ? `1px solid ${theme.sidebar?.borderColor || '#e2e8f0'}` : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!item.isActive) e.currentTarget.style.backgroundColor = theme.sidebar?.hover?.backgroundColor || '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  if (!item.isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => handleItemClick(item)}
              >
                {/* Modern Active Indicator: Glow or strip */}
                {item.isActive && !isSidebarCollapsed && (
                    <div 
                      className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all"
                      style={{ backgroundColor: theme.sidebar?.active?.iconColor || '#10b981', boxShadow: `0 0 10px ${theme.sidebar?.active?.iconColor || '#10b981'}` }}
                    />
                )}
                
                <div className={`flex items-center ${!isSidebarCollapsed ? "gap-3.5" : ""} relative z-10 w-full`}>
                  {/* Icon */}
                  {item.icon && (
                    <div 
                      className={`transition-all duration-300 flex-shrink-0 flex items-center justify-center`}
                      style={{ 
                        color: item.isActive ? (theme.sidebar?.active?.iconColor || '#10b981') : (theme.sidebar?.icon?.color || '#9ca3af'),
                        opacity: item.isActive ? 1 : 0.8,
                        fontSize: item.isActive ? '1.35rem' : (theme.sidebar?.icon?.size || '1.25rem'),
                        filter: item.isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' : 'none'
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  {/* Label - hidden when collapsed */}
                  {!isSidebarCollapsed && (
                    <span 
                      className={`transition-all duration-300 truncate tracking-wide`}
                      style={{
                         color: item.isActive ? (theme.sidebar?.active?.color || '#ffffff') : (theme.sidebar?.label?.color || '#d1d5db'),
                         fontSize: theme.sidebar?.label?.size || '0.9rem',
                         fontWeight: item.isActive ? '600' : (theme.sidebar?.label?.weight || '500')
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Chevron for expandable items - hidden when collapsed */}
                {!isSidebarCollapsed && item.subitems && item.subitems.length > 0 && (
                  <div className={`flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "rotate-180" : ""}`}
                       style={{ color: item.isActive ? (theme.sidebar?.active?.color || '#0f172a') : (theme.sidebar?.icon?.color || '#64748b'), opacity: 0.7 }}>
                    <FaChevronDown className="w-3 h-3" />
                  </div>
                )}

                {/* Modern Badge */}
                {item.badge && (
                  <span 
                    className={`
                      absolute flex items-center justify-center font-bold shadow-md
                      ${isSidebarCollapsed 
                        ? "top-1 right-1 w-2.5 h-2.5 rounded-full ring-2" 
                        : "right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-[10px] rounded-full backdrop-blur-sm"}
                    `}
                    style={{
                      backgroundColor: theme.sidebar?.badge?.backgroundColor || theme.sidebar?.active?.iconColor || '#10b981',
                      color: theme.sidebar?.badge?.color || '#ffffff',
                      boxShadow: isSidebarCollapsed ? `0 0 0 2px ${theme.sidebar?.backgroundColor || '#111827'}` : 'none'
                    }}
                  >
                    {isSidebarCollapsed ? "" : item.badge}
                  </span>
                )}
              </div>

              {/* Glassmorphism Collapsed Tooltip / Submenu */}
              {isSidebarCollapsed && (
                <div 
                  className="absolute left-full top-0 ml-4 rounded-2xl opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-300 pointer-events-none z-50 min-w-[220px] overflow-hidden -translate-x-2 group-hover/navitem:translate-x-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]"
                  style={{ 
                    backgroundColor: theme.sidebar?.backgroundColor || '#ffffff',
                    border: `1px solid ${theme.sidebar?.borderColor || '#e2e8f0'}`,
                    WebkitBackdropFilter: 'blur(16px)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="px-5 py-4 flex items-center gap-3 font-semibold border-b" style={{ borderColor: theme.sidebar?.borderColor || '#e2e8f0', color: theme.sidebar?.active?.color || '#0f172a' }}>
                    {item.icon && <span style={{ color: theme.sidebar?.active?.iconColor || '#10b981' }} className="text-xl drop-shadow-sm">{item.icon}</span>}
                    <span className="tracking-wide text-[15px]">{item.label}</span>
                  </div>
                  
                  {item.subitems && item.subitems.length > 0 ? (
                    <div className="py-2">
                      {item.subitems.map((subitem) => (
                        <div 
                          key={subitem.id} 
                          className={`px-5 py-2.5 text-sm flex items-center gap-3 transition-colors`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full transition-all ${subitem.isActive ? "scale-125" : ""}`} style={{ backgroundColor: subitem.isActive ? (theme.sidebar?.active?.iconColor || '#10b981') : (theme.sidebar?.icon?.color || '#94a3b8') }}></span>
                          <span style={{ color: subitem.isActive ? (theme.sidebar?.active?.color || '#0f172a') : (theme.sidebar?.label?.color || '#475569'), fontWeight: subitem.isActive ? 600 : 500 }}>{subitem.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                      <div className="px-5 py-3 text-sm text-zinc-500 italic">No hay submenú</div>
                  )}
                </div>
              )}

              {/* Submenu - smooth height/opacity when not collapsed */}
              {!isSidebarCollapsed && item.subitems && item.subitems.length > 0 && (
                <div className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                  <ul className="ml-5 pl-4 space-y-1 py-1" style={{ borderLeft: `2px solid ${theme.sidebar?.borderColor || '#e2e8f0'}` }}>
                    {item.subitems.map((subitem) => (
                      <li key={subitem.id} className="relative">
                        {/* Connecting line for active subitem */}
                        {subitem.isActive && (
                           <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-4 h-[2px] rounded-r-full" style={{ backgroundColor: theme.sidebar?.active?.iconColor || '#10b981' }} />
                        )}
                        <button
                          onClick={subitem.action}
                          className={`block w-full text-left px-4 py-2 rounded-xl transition-all duration-300`}
                          style={{
                             color: subitem.isActive ? (theme.sidebar?.active?.color || '#0f172a') : (theme.sidebar?.label?.color || '#475569'),
                             backgroundColor: subitem.isActive ? (theme.sidebar?.active?.backgroundColor || '#f8fafc') : 'transparent',
                             fontSize: '0.85rem',
                             fontWeight: subitem.isActive ? 600 : 500,
                             letterSpacing: '0.01em'
                          }}
                          onMouseEnter={(e) => {
                             if (!subitem.isActive) {
                               e.currentTarget.style.backgroundColor = theme.sidebar?.hover?.backgroundColor || '#f1f5f9';
                               e.currentTarget.style.transform = 'translateX(4px)';
                             }
                          }}
                          onMouseLeave={(e) => {
                             if (!subitem.isActive) {
                               e.currentTarget.style.backgroundColor = 'transparent';
                               e.currentTarget.style.transform = 'translateX(0)';
                             }
                          }}
                        >
                          {subitem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}