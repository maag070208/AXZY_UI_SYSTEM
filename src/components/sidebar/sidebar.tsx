import { useEffect, useRef, useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa";
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
  const [autoCollapsed, setAutoCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto para manejar el auto-colapso al perder el hover
  useEffect(() => {
    const handleMouseEnter = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      
      setIsHovering(true);
      setAutoCollapsed(false);
    };

    const handleMouseLeave = () => {
      // Pequeña demora antes de colapsar para evitar parpadeos
      leaveTimeoutRef.current = setTimeout(() => {
        setIsHovering(false);
        // Solo auto-colapsar si el usuario no ha forzado el estado expandido
        if (!isCollapsed) {
          setAutoCollapsed(true);
        }
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
    if (autoCollapsed) return;

    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: ITNavigationItem) => {
    if (item.subitems && item.subitems.length > 0) {
      if (autoCollapsed || isCollapsed) {
        // Si está colapsado, primero expandir sidebar
        setIsHovering(true);
        setAutoCollapsed(false);
        onToggleCollapse?.();
        setExpandedItems(new Set([item.id]));
      } else {
        toggleExpanded(item.id);
      }
    } else if (item.action) {
      item.action();
    }
  };

  const isSidebarCollapsed = autoCollapsed || isCollapsed;
  const sidebarWidth = isSidebarCollapsed ? "w-20" : "w-72";

  return (
    <aside
      ref={sidebarRef}
      className={`
        relative 
        shadow-xl flex flex-col transition-all duration-300 ease-in-out
        ${sidebarWidth}
        ${className}
        ${!visibleOnMobile ? "hidden lg:flex" : "flex"}
        border-none
      `}
      style={{
        zIndex: 50,
        backgroundColor: theme.sidebar?.backgroundColor || '#1e261c', // Fallback to safe dark color
      }}
    >
      {/* Menu Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/10">
          <button
            onClick={onToggleCollapse}
            className={`p-2 rounded-lg transition-all duration-200 group relative ${isSidebarCollapsed ? "mx-auto" : ""}`}
            style={{ color: theme.sidebar?.icon?.color || '#54e073' }}
            title={isSidebarCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            <FaBars className="w-5 h-5" />
            
            {/* Tooltip for collapse button */}
            {isSidebarCollapsed && (
             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 bg-white text-zinc-900 text-xs font-semibold rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg border border-zinc-100 z-50">
               Expandir
             </div>
            )}
          </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar px-3">
        <ul className="space-y-1.5">
          {navigationItems.map((item) => (
            <li key={item.id} className="relative">
              <div
                className={`group relative flex items-center cursor-pointer 
                  transition-all duration-200 rounded-xl overflow-hidden
                  ${isSidebarCollapsed ? "justify-center p-3" : "justify-between px-4 py-3"}
                  ${
                    item.isActive
                      ? "bg-white/10 shadow-sm"
                      : "hover:bg-white/5"
                  }`}
                onClick={() => handleItemClick(item)}
              >
               {/* Active Indicator Strip */}
                {item.isActive && !isSidebarCollapsed && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-md"
                      style={{ backgroundColor: theme.sidebar?.icon?.color || '#54e073' }}
                    ></div>
                )}
                
                <div className={`flex items-center ${!isSidebarCollapsed ? "gap-3" : ""} relative z-10`}>
                  {/* Icon */}
                  {item.icon && (
                    <div 
                      className={`transition-colors duration-200 flex-shrink-0 flex items-center justify-center`}
                      style={{ 
                        color: item.isActive ? (theme.sidebar?.icon?.color || '#54e073') : (theme.sidebar?.icon?.color || '#54e073'), // Icon color is usually consistent or dimmed
                        opacity: item.isActive ? 1 : 0.7,
                        fontSize: theme.sidebar?.icon?.size || '1.25rem'
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  {/* Label - hidden when collapsed */}
                  {!isSidebarCollapsed && (
                    <span 
                      className={`transition-colors truncate`}
                      style={{
                         color: theme.sidebar?.label?.color || '#ffffff',
                         fontSize: theme.sidebar?.label?.size || '0.875rem',
                         fontWeight: item.isActive ? '600' : (theme.sidebar?.label?.weight || '500')
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Chevron for expandable items - hidden when collapsed */}
                {!isSidebarCollapsed && item.subitems && item.subitems.length > 0 && (
                  <div className={`flex-shrink-0 transition-transform duration-200 ${expandedItems.has(item.id) ? "rotate-180" : ""}`}
                       style={{ color: theme.sidebar?.label?.color || '#ffffff', opacity: 0.5 }}>
                    <FaChevronDown className="w-3 h-3" />
                  </div>
                )}

                {/* Badge para notificaciones */}
                {item.badge && (
                  <span className={`
                    absolute bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2
                    ${isSidebarCollapsed ? "top-2 right-2 min-w-[14px] h-[14px]" : "right-3 top-1/2 transform -translate-y-1/2 min-w-[18px] h-[18px] px-1"}
                  `} style={{ borderColor: theme.sidebar?.backgroundColor || '#1e261c' }}>
                    {isSidebarCollapsed ? "" : item.badge}
                  </span>
                )}
              </div>

              {/* Collapsed tooltip */}
              {isSidebarCollapsed && (
                <div className="absolute left-full top-0 ml-3 bg-white text-zinc-800 text-sm rounded-xl p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl border border-zinc-100 min-w-[200px] overflow-hidden">
                  <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-100 flex items-center gap-2 font-semibold text-zinc-900">
                    {item.icon && <span style={{ color: theme.sidebar?.icon?.color }} className="text-lg">{item.icon}</span>}
                    {item.label}
                  </div>
                  
                  {item.subitems && item.subitems.length > 0 ? (
                    <div className="py-1">
                      {item.subitems.map((subitem) => (
                        <div 
                          key={subitem.id} 
                          className={`px-4 py-2 text-xs flex items-center gap-2`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: subitem.isActive ? theme.sidebar?.icon?.color : '#cbd5e1' }}></span>
                          <span style={{ color: subitem.isActive ? '#000' : '#64748b', fontWeight: subitem.isActive ? 600 : 400 }}>{subitem.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                      <div className="px-4 py-2 text-xs text-zinc-500 italic">No hay submenú</div>
                  )}
                </div>
              )}

              {/* Submenu - only show when not collapsed */}
              {!isSidebarCollapsed &&
                item.subitems &&
                item.subitems.length > 0 &&
                expandedItems.has(item.id) && (
                  <ul className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1 animate-fade-in">
                    {item.subitems.map((subitem) => (
                      <li key={subitem.id}>
                        <button
                          onClick={subitem.action}
                          className={`block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200
                            ${
                              subitem.isActive
                                ? "bg-white/5"
                                : "hover:bg-white/5"
                            }`}
                          style={{
                             color: subitem.isActive ? (theme.sidebar?.icon?.color || '#54e073') : (theme.sidebar?.label?.color || '#ffffff'),
                             fontSize: '0.8125rem', // 13px
                             fontWeight: subitem.isActive ? 500 : 400
                          }}
                        >
                          {subitem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}