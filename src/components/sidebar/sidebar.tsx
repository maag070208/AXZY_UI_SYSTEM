import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { ITNavigationItem, ITSidebarProps } from "./sidebar.props";
import ITText from "@/components/text/text";

export default function ITSidebar({
  navigationItems = [],
  isCollapsed = false,
  onToggleCollapse,
  className = "",
  visibleOnMobile = false,
  onItemClick,
  onSubItemClick,
  subitemConnector = 'dot',
}: ITSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Auto-expand parent items when a subitem is active
  useEffect(() => {
    const activeParents = new Set<string>();
    navigationItems.forEach(item => {
      if (item.subitems && item.subitems.some(sub => sub.isActive)) {
        activeParents.add(item.id);
      }
    });

    if (activeParents.size > 0) {
      setExpandedItems(prev => {
        const next = new Set(prev);
        let changed = false;
        activeParents.forEach(id => {
          if (!next.has(id)) {
            next.add(id);
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }
  }, [navigationItems]);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: ITNavigationItem) => {
    if (item.subitems && item.subitems.length > 0) {
      toggleExpanded(item.id);
    } else {
      if (item.action) item.action();
      if (onItemClick) onItemClick(item);
    }
  };

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
        backgroundColor: "var(--sidebar-bg, rgba(255, 255, 255, 0.90))",
        borderRight: "1px solid var(--sidebar-border, #e2e8f0)",
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      }}
    >
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
                  backgroundColor: item.isActive ? "var(--sidebar-active-bg, #f8fafc)" : 'transparent',
                  boxShadow: item.isActive ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
                  border: item.isActive ? "1px solid var(--sidebar-border, #e2e8f0)" : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!item.isActive) e.currentTarget.style.backgroundColor = "var(--sidebar-hover-bg, #f1f5f9)";
                }}
                onMouseLeave={(e) => {
                  if (!item.isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.isActive && !isSidebarCollapsed && (
                  <div
                    className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all"
                    style={{ backgroundColor: "var(--sidebar-active-icon, #10b981)", boxShadow: "0 0 10px var(--sidebar-active-icon, #10b981)" }}
                  />
                )}

                <div className={`flex items-center ${!isSidebarCollapsed ? "gap-3.5" : "justify-center"} relative z-10 w-full`}>
                  {item.icon && (
                    <div
                      className={`transition-all duration-300 flex-shrink-0 flex items-center justify-center`}
                      style={{
                        color: item.isActive ? "var(--sidebar-active-icon, #10b981)" : "var(--sidebar-icon-color, #9ca3af)",
                        opacity: item.isActive ? 1 : 0.8,
                        fontSize: item.isActive ? '1.35rem' : '1.25rem',
                        filter: item.isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' : 'none'
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  {!isSidebarCollapsed && (
                    <ITText as="span"
                      className={`transition-all duration-300 truncate tracking-wide`}
                      style={{
                        color: item.isActive ? "var(--sidebar-active-color, #ffffff)" : "var(--sidebar-label-color, #d1d5db)",
                        fontSize: '0.9rem',
                        fontWeight: item.isActive ? '600' : '500'
                      }}
                    >
                      {item.label}
                    </ITText>
                  )}
                </div>

                {!isSidebarCollapsed && item.subitems && item.subitems.length > 0 && (
                  <div className={`flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "rotate-180" : ""}`}
                    style={{ color: item.isActive ? "var(--sidebar-active-color, #0f172a)" : "var(--sidebar-icon-color, #64748b)", opacity: 0.7 }}>
                    <FaChevronDown className="w-3 h-3" />
                  </div>
                )}

                {item.badge && (
                  <span
                    className={`
                      absolute flex items-center justify-center font-bold shadow-md
                      ${isSidebarCollapsed
                        ? "top-1 right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white"
                        : "right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-[10px] rounded-full backdrop-blur-sm"}
                    `}
                    style={{
                      backgroundColor: "var(--sidebar-badge-bg, #10b981)",
                      color: "var(--sidebar-badge-color, #ffffff)",
                      boxShadow: isSidebarCollapsed ? "0 0 0 2px var(--sidebar-bg, #111827)" : 'none'
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
                    backgroundColor: "var(--sidebar-bg, #ffffff)",
                    border: "1px solid var(--sidebar-border, #e2e8f0)",
                    WebkitBackdropFilter: 'blur(16px)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="px-5 py-4 flex items-center gap-3 font-semibold border-b" style={{ borderColor: "var(--sidebar-border, #e2e8f0)", color: "var(--sidebar-active-color, #0f172a)" }}>
                    {item.icon && <span style={{ color: "var(--sidebar-active-icon, #10b981)" }} className="text-xl drop-shadow-sm">{item.icon}</span>}
                    <ITText as="span" className="tracking-wide text-[15px]">{item.label}</ITText>
                  </div>

                  {item.subitems && item.subitems.length > 0 ? (
                    <div className="py-2">
                      {item.subitems.map((subitem) => (
                        <div
                          key={subitem.id}
                          className={`px-5 py-2.5 text-sm flex items-center gap-3 transition-colors relative`}
                        >
                          {subitem.isActive && subitemConnector === '|' && (
                            <div
                              className="absolute left-0 top-1/3 bottom-1/3 w-[2.5px] rounded-r-full"
                              style={{
                                backgroundColor: "var(--sidebar-active-icon, #10b981)",
                                boxShadow: "0 0 6px color-mix(in srgb, var(--sidebar-active-icon, #10b981) 25%, transparent)",
                              }}
                            />
                          )}
                          <span className={`w-1.5 h-1.5 rounded-full transition-all ${subitem.isActive ? "scale-125" : ""}`} style={{ backgroundColor: subitem.isActive ? "var(--sidebar-active-icon, #10b981)" : "var(--sidebar-icon-color, #94a3b8)" }} />
                          <ITText as="span" style={{ color: subitem.isActive ? "var(--sidebar-active-color, #0f172a)" : "var(--sidebar-label-color, #475569)", fontWeight: subitem.isActive ? 600 : 500 }}>{subitem.label}</ITText>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ITText as="div" className="px-5 py-3 text-sm italic" style={{ color: "var(--sidebar-label-color, #71717a)" }}>No hay submenú</ITText>
                  )}
                </div>
              )}

              {/* Submenu - smooth height/opacity when not collapsed */}
              {!isSidebarCollapsed && item.subitems && item.subitems.length > 0 && (
                <div className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                  <ul
                    className="ml-5 space-y-0.5 py-1"
                    style={{
                      borderLeft: subitemConnector === '|'
                        ? "1px solid var(--sidebar-border, #e2e8f0)"
                        : 'none'
                    }}
                  >
                    {item.subitems.map((subitem) => (
                      <li key={subitem.id} className="relative">
                        <button
                          onClick={() => {
                            if (subitem.action) subitem.action();
                            if (onSubItemClick) onSubItemClick(subitem);
                          }}
                          className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-xl transition-all duration-300`}
                          style={{
                            color: subitem.isActive ? "var(--sidebar-active-color, #0f172a)" : "var(--sidebar-label-color, #475569)",
                            backgroundColor: subitem.isActive ? "var(--sidebar-active-bg, #f8fafc)" : 'transparent',
                            fontSize: '0.85rem',
                            fontWeight: subitem.isActive ? 600 : 500,
                            letterSpacing: '0.01em',
                            marginLeft: subitemConnector === '|' ? '-1px' : '0',
                          }}
                          onMouseEnter={(e) => {
                            if (!subitem.isActive) {
                              e.currentTarget.style.backgroundColor = "var(--sidebar-hover-bg, #f1f5f9)";
                              e.currentTarget.style.transform = 'translateX(3px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!subitem.isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }
                          }}
                        >
                          {subitem.isActive && subitemConnector === '|' && (
                            <div
                              className="absolute left-0 top-1/3 bottom-1/3 w-[2.5px] rounded-r-full transition-all"
                              style={{
                                backgroundColor: "var(--sidebar-active-icon, #10b981)",
                                boxShadow: "0 0 6px color-mix(in srgb, var(--sidebar-active-icon, #10b981) 25%, transparent)",
                              }}
                            />
                          )}
                          {subitemConnector === 'dot' && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${subitem.isActive ? 'scale-125' : ''}`}
                              style={{
                                backgroundColor: subitem.isActive
                                  ? "var(--sidebar-active-icon, #10b981)"
                                  : "var(--sidebar-icon-color, #94a3b8)"
                              }}
                            />
                          )}
                          <ITText as="span" className="truncate">{subitem.label}</ITText>
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