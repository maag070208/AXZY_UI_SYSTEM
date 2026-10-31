import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa";
import {
  ITNavigationItem,
  ITNavigationSubItem,
  ITNavigationSubItemEntry,
  ITNavigationSubItemGroup,
  ITSidebarProps,
} from "./sidebar.props";
import ITBadget from "@/components/atoms/badget/badget";
import ITText from "@/components/atoms/text/text";
import { useITAppearance } from "@/theme/theme-context";
import { useITTranslation } from "@/i18n";

/** Narrows a submenu entry to a titled group. */
function isSubItemGroup(
  entry: ITNavigationSubItemEntry,
): entry is ITNavigationSubItemGroup {
  return "items" in entry;
}

/** Flattens a parent's entries (plain items + groups) into a single list. */
function flattenSubItems(
  entries: ITNavigationSubItemEntry[],
): ITNavigationSubItem[] {
  return entries.flatMap((entry) =>
    isSubItemGroup(entry) ? entry.items : [entry],
  );
}

/** Caracteres que caben en el badge del riel (`max-w-[2.1rem]`). */
const RAIL_BADGE_MAX_CHARS = 3;

/**
 * Contenido del badge cuando el sidebar está colapsado.
 *
 * En el riel solo cabe un valor corto (contadores tipo `12` o `99+`). Un texto
 * largo deformaría el riel y taparía el icono, así que se degrada a un punto que
 * conserva el aviso de color; el nombre completo sigue disponible en el tooltip.
 */
function RailBadge({ value }: { value: number | string }) {
  const text = String(value);
  if (text.length <= RAIL_BADGE_MAX_CHARS) return <>{text}</>;
  return (
    <span
      aria-hidden="true"
      className="block w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: "currentColor" }}
    />
  );
}

/**
 * Vertical navigation sidebar with submenu expand/collapse, hover tooltips in collapsed mode,
 * and glassmorphism styling. The collapsed rail expands automatically on pointer hover — there
 * is no toggle button; the hover is the only way to expand and collapse it.
 *
 * @example
 * ```tsx
 * <ITSidebar
 *   navigationItems={[
 *     { id: "dashboard", label: "Dashboard", icon: <FaHome />, isActive: true },
 *     {
 *       id: "settings", label: "Settings", icon: <FaCog />,
 *       subitems: [
 *         { id: "profile", label: "Profile", action: () => navigate("/profile") },
 *         { id: "billing", label: "Billing", isActive: true },
 *       ],
 *     },
 *     { id: "inbox", label: "Inbox", icon: <FaEnvelope />, badge: 12 },
 *   ]}
 *   notification={{
 *     count: 5,
 *     icon: <FaBell />,
 *     label: "Notificaciones",
 *     onClick: () => navigate("/notifications"),
 *   }}
 *   isCollapsed
 * />
 * ```
 */
export default function ITSidebar({
  navigationItems = [],
  isCollapsed = false,
  className = "",
  visibleOnMobile = false,
  onItemClick,
  onSubItemClick,
  subitemConnector = 'dot',
  header,
  notification,
  brand,
  profile,
  variant = "default",
  onToggleCollapse,
  expandOnHover = true,
}: ITSidebarProps) {
  // Bento: el panel se dibuja como tarjeta flotante (mismo lenguaje que los mosaicos).
  const bentoPanel = variant === "bento";
  // Flat appearance: plain surface, no glow/accent bar, narrower panel.
  // Bento shares that structure; its tokens make the active item a neutral pill with bold ink text.
  const appearance = useITAppearance();
  const bento = appearance === "bento";
  const flat = appearance === "flat" || bento;
  const { t } = useITTranslation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hoverTimer = hoverTimeoutRef.current;
    const leaveTimer = leaveTimeoutRef.current;

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
      if (hoverTimer) clearTimeout(hoverTimer);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [isCollapsed]);

  // Auto-expand parent items when a subitem is active
  useEffect(() => {
    const activeParents = new Set<string>();
    navigationItems.forEach(item => {
      if (item.subitems && flattenSubItems(item.subitems).some(sub => sub.isActive)) {
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

  const isSidebarCollapsed = visibleOnMobile ? false : isCollapsed && !(expandOnHover && isHovering);
  const collapsedWidth = flat ? "w-[72px]" : "w-[88px]";
  const expandedWidth = flat ? "w-[248px]" : "w-[280px]";
  const sidebarWidth = isSidebarCollapsed ? collapsedWidth : expandedWidth;
  // Icon-only rail that never expands on hover: names show in a tooltip.
  const fixedRail = isSidebarCollapsed && !expandOnHover;

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: ITNavigationItem) => {
    if (item.subitems && item.subitems.length > 0) {
      if (isSidebarCollapsed && !expandOnHover) {
        // Icon-only rail: there is no room for the submenu, so open the
        // sidebar with this group expanded.
        setExpandedItems((prev) => new Set(prev).add(item.id));
        onToggleCollapse?.();
      } else {
        toggleExpanded(item.id);
      }
    } else {
      if (item.action) item.action();
      if (onItemClick) onItemClick(item);
    }
  };


  const renderSubItem = (subitem: ITNavigationSubItem) => (
    <li key={subitem.id} className="relative">
      <button
        aria-current={subitem.isActive ? "page" : undefined}
        onClick={() => {
          if (subitem.action) subitem.action();
          if (onSubItemClick) onSubItemClick(subitem);
        }}
        className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-xl transition-all duration-300`}
        style={{
          color: subitem.isActive ? "var(--it-sidebar-active-color, var(--color-secondary-900))" : "var(--it-sidebar-label-color, var(--color-secondary-600))",
          backgroundColor: subitem.isActive ? "var(--it-sidebar-active-bg, var(--color-secondary-50))" : 'transparent',
          fontSize: flat ? '0.84rem' : '0.78rem',
          fontWeight: subitem.isActive ? (bento ? 700 : 600) : 500,
          letterSpacing: '0.01em',
          marginLeft: subitemConnector === '|' ? '-1px' : '0',
        }}
        onMouseEnter={(e) => {
          if (!subitem.isActive) {
            e.currentTarget.style.backgroundColor = "var(--it-sidebar-hover-bg, var(--color-secondary-100))";
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
        {subitem.isActive && subitemConnector === '|' && !flat && (
          <div
            className="absolute left-0 top-1/3 bottom-1/3 w-[2.5px] rounded-r-full transition-all"
            style={{
              backgroundColor: "var(--it-sidebar-active-icon, var(--color-primary-500))",
              boxShadow: "0 0 6px color-mix(in srgb, var(--it-sidebar-active-icon, var(--color-primary-500)) 25%, transparent)",
            }}
          />
        )}
        {subitemConnector === 'dot' && (
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${subitem.isActive ? 'scale-125' : ''}`}
            style={{
              backgroundColor: subitem.isActive
                ? "var(--it-sidebar-active-icon, var(--color-primary-500))"
                : "var(--it-sidebar-icon-color, var(--color-secondary-400))"
            }}
          />
        )}
        <ITText as="span" className="truncate">{subitem.label}</ITText>
      </button>
    </li>
  );

  const renderSubItemGroup = (group: ITNavigationSubItemGroup, itemId: string) => {
    const headingId = `it-sidebar-subgroup-${itemId}-${group.id}`;
    return (
      <li key={group.id} className="relative">
        <div id={headingId} className="px-3 pt-2.5 pb-1 mt-1">
          <ITText
            as="span"
            className="block"
            style={{
              color: "var(--it-sidebar-icon-color, var(--color-secondary-400))",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {group.label}
          </ITText>
        </div>
        <ul aria-labelledby={headingId} className="flex flex-col gap-0">
          {group.items.map(renderSubItem)}
        </ul>
      </li>
    );
  };

  const renderNotification = () => {
    if (!notification) return null;

    const {
      count,
      icon,
      label = t("sidebar.notifications"),
      onClick,
      badgeProps,
    } = notification;
    const { className: badgeClassName, ...badgeRest } = badgeProps ?? {};

    const badge = (
      <ITBadget
        color="danger"
        size="sm"
        {...badgeRest}
        className={clsx("shadow-md", badgeClassName)}
      >
        {isSidebarCollapsed ? <RailBadge value={count} /> : String(count)}
      </ITBadget>
    );

    if (isSidebarCollapsed) {
      return (
        <button
          type="button"
          aria-label={label}
          title={label}
          onClick={onClick}
          className={`relative flex items-center w-full h-10 mb-1 rounded-xl transition-all duration-300 ${flat ? "px-3" : "px-5"}`}
          style={{ color: "var(--it-sidebar-icon-color, var(--color-secondary-500))" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--it-sidebar-hover-bg, var(--color-secondary-100))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {icon && (
            <span className="flex items-center justify-center text-[1.05rem]">{icon}</span>
          )}
          <span className="absolute top-0.5 right-0.5 max-w-[2.1rem] overflow-hidden pointer-events-none">{badge}</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={onClick}
        className={`flex items-center gap-2.5 w-full text-left h-10 mb-1 rounded-xl transition-all duration-300 ${flat ? "px-3" : "px-5"}`}
        style={{ color: "var(--it-sidebar-label-color, var(--color-secondary-600))" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--it-sidebar-hover-bg, var(--color-secondary-100))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {icon && (
          <span
            className="flex-shrink-0 flex items-center justify-center text-[1.05rem]"
            style={{ color: "var(--it-sidebar-icon-color, #9ca3af)" }}
          >
            {icon}
          </span>
        )}
        <ITText
          as="span"
          className="truncate tracking-wide"
          style={{ fontSize: "0.8rem", fontWeight: 500 }}
        >
          {label}
        </ITText>
        <span className="ml-auto flex-shrink-0">{badge}</span>
      </button>
    );
  };

  return (
    <aside
      ref={sidebarRef}
      className={`
        relative flex flex-col 
        transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)]
        ${sidebarWidth}
        ${className}
        ${!visibleOnMobile ? "hidden lg:flex" : "flex"}
        ${flat ? "" : "shadow-[4px_0_32px_rgba(15,23,42,0.04)]"}
      `}
      style={{
        zIndex: 50,
        backgroundColor: bentoPanel
          ? "transparent"
          : "var(--it-sidebar-bg, rgba(255, 255, 255, 0.90))",
        borderRight: bento || bentoPanel ? "none" : "1px solid var(--it-sidebar-border, var(--color-secondary-200))",
        ...(bentoPanel || !flat
          ? {}
          : { WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }),
      }}
    >
      <div
        className={
          bentoPanel
            ? "flex h-full min-h-0 flex-col overflow-hidden rounded-[26px]"
            : "flex h-full min-h-0 flex-col"
        }
        style={
          bentoPanel
            ? {
                backgroundColor: "var(--it-sidebar-bg, var(--it-card-bg, #ffffff))",
                boxShadow: "0 18px 44px -28px rgba(13, 47, 64, 0.45), inset 0 0 0 1px rgba(13, 47, 64, 0.05)",
              }
            : undefined
        }
      >
      {brand && (brand.logo || brand.text) && (
        <div
          className={`flex items-center flex-shrink-0 h-[64px] ${isSidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-7"}`}
        >
          {brand.logo && <div className="flex-shrink-0 flex items-center">{brand.logo}</div>}
          {brand.text && !isSidebarCollapsed && (
            <ITText
              as="span"
              className="text-[1.05rem] font-bold tracking-tight truncate"
              style={{ color: "var(--it-sidebar-brand-color, var(--it-sidebar-label-color, var(--color-secondary-900)))" }}
            >
              {brand.text}
            </ITText>
          )}
        </div>
      )}

      {/* El header reserva su altura también en el riel para que la navegación no
          salte en vertical al expandir. Se maqueta con el ancho expandido (oculto
          y recortado) para que el texto no se reparta en más líneas en el riel. */}
      {header && (
        <div className={`px-4 pt-4 pb-1 flex-shrink-0 ${isSidebarCollapsed ? "overflow-hidden" : ""}`}>
          {isSidebarCollapsed ? (
            <div className={`${expandedWidth} invisible`} aria-hidden="true">
              {header}
            </div>
          ) : (
            header
          )}
        </div>
      )}

      {notification && (
        <div className="px-4 pt-3 flex-shrink-0">{renderNotification()}</div>
      )}

      {/* Navigation Items */}
      <nav aria-label={t("sidebar.navAria")} className={`flex-1 py-4 px-4 custom-scrollbar ${fixedRail ? "overflow-visible" : "overflow-y-auto overflow-x-hidden"}`}>
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const hasSubmenu = !!item.subitems && item.subitems.length > 0;
            const submenuId = `it-sidebar-submenu-${item.id}`;
            // El submenú solo existe en el DOM cuando la barra está expandida:
            // `aria-controls` a un id inexistente es un valor ARIA inválido.
            const hasRenderedSubmenu = hasSubmenu && !isSidebarCollapsed;
            const { className: badgeClassName, ...badgeRest } = item.badgeProps ?? {};
            // Flat + expanded: a parent whose subitem is active stays plain; the
            // subitem carries the highlight. Collapsed, the parent icon shows it.
            const active = !!item.isActive && !(flat && hasSubmenu && !isSidebarCollapsed);
            return (
            <li key={item.id} className="relative group/navitem">
              <div
                role="button"
                tabIndex={0}
                aria-label={item.label}
                aria-expanded={hasSubmenu ? expandedItems.has(item.id) : undefined}
                aria-controls={hasRenderedSubmenu ? submenuId : undefined}
                className={`flex items-center cursor-pointer 
                  transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                  rounded-xl relative overflow-visible
                  h-10
                  ${isSidebarCollapsed ? "justify-center px-0" : flat ? "px-3" : "px-5"}
                  ${isSidebarCollapsed ? "" : "justify-between"}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary-500)] focus-visible:ring-inset
                `}
                style={{
                  backgroundColor: active ? "var(--it-sidebar-active-bg, var(--color-secondary-50))" : 'transparent',
                  boxShadow: active && !flat ? 'var(--shadow-xs)' : 'none',
                  border: active && !flat ? "1px solid var(--it-sidebar-border, var(--color-secondary-200))" : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = "var(--it-sidebar-hover-bg, var(--color-secondary-100))";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick(item);
                  }
                }}
              >
                {active && !isSidebarCollapsed && !flat && (
                  <div
                    className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all"
                    style={{ backgroundColor: "var(--it-sidebar-active-icon, var(--color-primary-500))", boxShadow: "0 0 10px var(--it-sidebar-active-icon, var(--color-primary-500))" }}
                  />
                )}

                <div className={`flex items-center gap-2.5 relative z-10 w-full ${isSidebarCollapsed ? "justify-center" : ""}`}>
                  {item.icon && (
                    <div
                      className={`transition-all duration-300 flex-shrink-0 flex items-center justify-center`}
                      style={{
                        color: active ? "var(--it-sidebar-active-icon, var(--color-primary-500))" : "var(--it-sidebar-icon-color, #9ca3af)",
                        opacity: active ? 1 : 0.8,
                        fontSize: flat ? '1rem' : active ? '1.12rem' : '1.05rem',
                        filter: active && !flat ? 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' : 'none'
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  {!isSidebarCollapsed && (
                    <ITText as="span"
                      className={`transition-all duration-300 truncate tracking-wide`}
                      style={{
                        color: active ? "var(--it-sidebar-active-color, #ffffff)" : "var(--it-sidebar-label-color, var(--color-secondary-300))",
                        fontSize: flat ? '0.875rem' : '0.8rem',
                        fontWeight: active ? (bento ? '700' : '600') : '500'
                      }}
                    >
                      {item.label}
                    </ITText>
                  )}
                </div>

                {!isSidebarCollapsed && item.subitems && item.subitems.length > 0 && (
                  <div className={`flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "rotate-180" : ""}`}
                    style={{ color: active ? "var(--it-sidebar-active-color, var(--color-secondary-900))" : "var(--it-sidebar-icon-color, var(--color-secondary-500))", opacity: 0.7 }}>
                    <FaChevronDown className="w-3 h-3" />
                  </div>
                )}

                {item.badge != null && item.badge !== "" && (
                  <ITBadget
                    color="primary"
                    size="sm"
                    {...badgeRest}
                    className={clsx(
                      "absolute shadow-md",
                      // En el riel no hay ancho para una etiqueta larga: el badge se
                      // ancla a la esquina y se recorta, así nunca desborda ni tapa el icono.
                      isSidebarCollapsed
                        ? "top-0.5 right-0.5 max-w-[2.1rem] overflow-hidden"
                        : "right-3 top-1/2 -translate-y-1/2",
                      badgeClassName,
                    )}
                  >
                    {isSidebarCollapsed ? <RailBadge value={item.badge} /> : String(item.badge)}
                  </ITBadget>
                )}
              </div>

              {/* Glassmorphism Collapsed Tooltip / Submenu */}
              {isSidebarCollapsed && flat && (
                <div
                  role="tooltip"
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-opacity duration-150 pointer-events-none z-[70]"
                  style={{
                    backgroundColor: "var(--it-sidebar-tooltip-bg, var(--color-secondary-900))",
                    color: "var(--it-sidebar-tooltip-color, #ffffff)",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </div>
              )}
              {isSidebarCollapsed && !flat && (
                <div
                  className="absolute left-full top-0 ml-4 rounded-2xl opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-300 pointer-events-none z-[70] min-w-[220px] overflow-hidden -translate-x-2 group-hover/navitem:translate-x-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]"
                  style={{
                    backgroundColor: "var(--it-sidebar-bg, #ffffff)",
                    border: "1px solid var(--it-sidebar-border, var(--color-secondary-200))",
                    WebkitBackdropFilter: 'blur(16px)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="px-5 py-4 flex items-center gap-3 font-semibold border-b" style={{ borderColor: "var(--it-sidebar-border, var(--color-secondary-200))", color: "var(--it-sidebar-active-color, var(--color-secondary-900))" }}>
                    {item.icon && <span style={{ color: "var(--it-sidebar-active-icon, var(--color-primary-500))" }} className="text-xl drop-shadow-sm">{item.icon}</span>}
                    <ITText as="span" className="tracking-wide text-[15px]">{item.label}</ITText>
                  </div>

                  {item.subitems && item.subitems.length > 0 ? (
                    <div className="py-2">
                      {flattenSubItems(item.subitems).map((subitem) => (
                        <div
                          key={subitem.id}
                          className={`px-5 py-2.5 text-sm flex items-center gap-3 transition-colors relative`}
                        >
                          {subitem.isActive && subitemConnector === '|' && (
                            <div
                              className="absolute left-0 top-1/3 bottom-1/3 w-[2.5px] rounded-r-full"
                              style={{
                                backgroundColor: "var(--it-sidebar-active-icon, var(--color-primary-500))",
                                boxShadow: "0 0 6px color-mix(in srgb, var(--it-sidebar-active-icon, var(--color-primary-500)) 25%, transparent)",
                              }}
                            />
                          )}
                          <span className={`w-1.5 h-1.5 rounded-full transition-all ${subitem.isActive ? "scale-125" : ""}`} style={{ backgroundColor: subitem.isActive ? "var(--it-sidebar-active-icon, var(--color-primary-500))" : "var(--it-sidebar-icon-color, var(--color-secondary-400))" }} />
                          <ITText as="span" style={{ color: subitem.isActive ? "var(--it-sidebar-active-color, var(--color-secondary-900))" : "var(--it-sidebar-label-color, var(--color-secondary-600))", fontWeight: subitem.isActive ? 600 : 500 }}>{subitem.label}</ITText>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ITText as="div" className="px-5 py-3 text-sm italic" style={{ color: "var(--it-sidebar-label-color, var(--color-secondary-400))" }}>{t("sidebar.noSubmenu")}</ITText>
                  )}
                </div>
              )}

              {/* Submenu - smooth height/opacity when not collapsed */}
              {!isSidebarCollapsed && item.subitems && item.subitems.length > 0 && (
                <div id={submenuId} role="group" aria-label={item.label} className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] ${expandedItems.has(item.id) ? "max-h-[1000px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                  <ul
                    className={`${flat && subitemConnector === '|' ? "ml-[21px] pl-2" : "ml-4"} flex flex-col gap-0 py-0.5`}
                    style={{
                      borderLeft: subitemConnector === '|'
                        ? "1px solid var(--it-sidebar-border, var(--color-secondary-200))"
                        : 'none'
                    }}
                  >
                    {item.subitems.map((entry) =>
                      isSubItemGroup(entry)
                        ? renderSubItemGroup(entry, item.id)
                        : renderSubItem(entry),
                    )}
                  </ul>
                </div>
              )}
            </li>
          );})}
        </ul>
      </nav>

      {/* Persona al pie (bento): tarjeta con foto, nombre y detalle */}
      {bentoPanel && profile && (
        <div className="flex-shrink-0 px-3 pb-3">
          <button
            type="button"
            onClick={profile.onClick}
            aria-label={profile.label ?? profile.name}
            title={isSidebarCollapsed ? profile.name : undefined}
            className={`flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2 text-left transition-colors hover:bg-[var(--it-sidebar-hover-bg,var(--color-secondary-100))] ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            {profile.image ? (
              <img src={profile.image} alt="" className="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
                style={{
                  backgroundColor: "var(--color-primary-50)",
                  color: "var(--color-primary-600)",
                }}
              >
                {profile.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
            {!isSidebarCollapsed && (
              <>
                <span className="min-w-0 flex-1">
                  <ITText as="span" className="block truncate text-[13px] font-bold" style={{ color: "var(--it-sidebar-label-color, var(--color-secondary-900))" }}>
                    {profile.name}
                  </ITText>
                  {profile.detail && (
                    <ITText as="span" className="block truncate text-[11px]" style={{ color: "var(--it-sidebar-icon-color, var(--color-secondary-500))" }}>
                      {profile.detail}
                    </ITText>
                  )}
                </span>
                <FaChevronDown className="h-3 w-3 -rotate-90 opacity-50" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
      </div>
    </aside>
  );
}