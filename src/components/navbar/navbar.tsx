import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import { FaChevronDown, FaChevronRight, FaUserCircle } from "react-icons/fa";
import { ITNavbarProps, ITNavigationItem } from "./navbar.props";
import ITText from "@/components/text/text";
import { theme } from "@/theme/theme";

/**
 * Full sidebar navigation shell with collapsible submenus, user menu dropdown, and themed styling.
 *
 * @example
 * ```tsx
 * <ITNavbar
 *   logo={<LogoIcon />}
 *   logoText="My App"
 *   navigationItems={[
 *     { id: 'home', label: 'Home', icon: <FaHome />, isActive: true },
 *     {
 *       id: 'settings',
 *       label: 'Settings',
 *       icon: <FaCog />,
 *       subitems: [{ id: 'profile', label: 'Profile', action: () => {} }],
 *     },
 *   ]}
 *   userMenu={{
 *     userName: 'John Doe',
 *     userEmail: 'john@example.com',
 *     menuItems: [{ label: 'Logout', onClick: () => {} }],
 *   }}
 * >
 *   <ITPage title="Dashboard">...</ITPage>
 * </ITNavbar>
 * ```
 */
export default function ITNavbar({
  logo,
  logoText,
  navigationItems = [],
  userMenu,
  children,
  // Legacy props for backward compatibility
  navItems,
  showSidebar = false,
  showSidebarOnMobile = false,
  sidebarItems,
}: ITNavbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const userMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleExpanded = (itemId: string) => {
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
      toggleExpanded(item.id);
    } else if (item.action) {
      item.action();
    }
  };

  // Use new navigation items if provided, otherwise fall back to legacy
  const shouldUseLegacy = !navigationItems.length && (navItems || sidebarItems);

  if (shouldUseLegacy) {
    // Legacy behavior - original navbar implementation
    return (
      <div className="flex flex-col h-screen">
        <nav className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mx-auto p-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {logo && <div className="h-8">{logo}</div>}
              {logoText && (
                <ITText as="span" className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
                  {logoText}
                </ITText>
              )}
            </div>

            <div className="flex items-center justify-end w-full md:w-auto md:order-2">
              <div className="flex items-center space-x-4 md:order-2">
                <ul className="hidden md:flex space-x-4">{navItems}</ul>

                {userMenu && (
                  <div className="relative">
                    <button
                      type="button"
                      className="flex text-sm bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                      onClick={toggleUserMenu}
                    >
                      {userMenu.userImage ? (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={userMenu.userImage}
                          alt="user photo"
                        />
                      ) : (
                        <FaUserCircle className="w-8 h-8 text-gray-500" />
                      )}
                    </button>

                    {isUserMenuOpen && (
                      <div
                        ref={userMenuRef}
                        className="z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
                      >
                        <div className="px-4 py-3">
                          <ITText as="span" className="block text-sm text-gray-900">
                            {userMenu.userName}
                          </ITText>
                          <ITText as="span" className="block text-sm text-gray-500 truncate">
                            {userMenu.userEmail}
                          </ITText>
                        </div>
                        <ul className="py-2">
                          {userMenu.menuItems.map((item, index) => (
                            <li key={index}>
                              <button
                                onClick={() => {
                                  item.onClick();
                                  setIsUserMenuOpen(false);
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                 <ITText as="span">{item.label}</ITText>
                                </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 flex overflow-hidden relative">
          {(showSidebar || showSidebarOnMobile) && (
            <aside className="fixed inset-y-0 left-0 w-64 bg-gray-50 transform transition-transform duration-300 ease-in-out z-50 shadow-lg md:static md:transform-none md:shadow-none md:border-r md:border-gray-200">
              <div className="h-full overflow-y-auto py-4 px-3">
                <ul className="space-y-2 font-medium">{sidebarItems}</ul>
              </div>
            </aside>
          )}
          <main className="flex-1 bg-gray-100 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // New sidebar design
  const sidebar = theme.sidebar;
  const topbar = theme.topbar;

  return (
    <div className="flex h-screen font-sans" style={{ backgroundColor: theme.layout.backgroundColor }}>
      {/* Sidebar */}
      <aside
        className="w-72 shadow-xl flex flex-col transition-all duration-300 ease-in-out"
        style={{ backgroundColor: sidebar.backgroundColor, borderRight: `1px solid ${sidebar.borderColor}` }}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3" style={{ borderBottom: `1px solid ${sidebar.borderColor}` }}>
          {logo && <div className="h-8 w-auto object-contain transition-transform hover:scale-105">{logo}</div>}
          {logoText && (
            <ITText as="span" className="text-lg font-bold tracking-wide" style={{ color: sidebar.active.color }}>
              {logoText}
            </ITText>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <ul className="flex flex-col gap-1.5">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <div
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${
                    item.isActive
                      ? 'shadow-sm'
                      : 'hover:shadow-sm'
                  }`}
                  onClick={() => handleItemClick(item)}
                  style={{
                    backgroundColor: item.isActive ? sidebar.active.backgroundColor : "transparent",
                    borderColor: item.isActive ? sidebar.active.iconColor : "transparent",
                    color: item.isActive ? sidebar.active.color : sidebar.label.color
                  }}
                  onMouseEnter={(e) => {
                    if (!item.isActive) {
                      e.currentTarget.style.backgroundColor = sidebar.hover.backgroundColor;
                      e.currentTarget.style.color = sidebar.active.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = sidebar.label.color;
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <div className="text-xl transition-colors" style={{
                        color: item.isActive ? sidebar.active.iconColor : sidebar.icon.color
                      }}>
                        {item.icon}
                      </div>
                    )}
                    <ITText as="span" className={`font-medium text-sm ${item.isActive ? 'font-semibold' : ''}`}>{item.label}</ITText>
                  </div>

                  {item.subitems && item.subitems.length > 0 && (
                    <div className="transition-transform" style={{ color: sidebar.icon.color }}>
                      {expandedItems.has(item.id) ? (
                        <FaChevronDown className="w-3 h-3" />
                      ) : (
                        <FaChevronRight className="w-3 h-3" />
                      )}
                    </div>
                  )}
                </div>

                {item.subitems &&
                 item.subitems.length > 0 &&
                 expandedItems.has(item.id) && (
                  <ul className="mt-1 ml-4 pl-4 space-y-1" style={{ borderLeft: `1px solid ${sidebar.borderColor}` }}>
                    {item.subitems.map((subitem) => (
                      <li key={subitem.id}>
                        <button
                          onClick={subitem.action}
                          className="block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
                          style={{
                            color: subitem.isActive ? sidebar.active.color : sidebar.label.color,
                            backgroundColor: subitem.isActive ? sidebar.active.backgroundColor : "transparent"
                          }}
                          onMouseEnter={(e) => {
                            if (!subitem.isActive) {
                              e.currentTarget.style.backgroundColor = sidebar.hover.backgroundColor;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!subitem.isActive) {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }
                          }}
                        >
                          <ITText as="span">{subitem.label}</ITText>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Menu */}
        {userMenu && (
          <div className="p-4" style={{ borderTop: `1px solid ${sidebar.borderColor}` }}>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-3 w-full p-3 rounded-xl transition-colors duration-200 group"
                style={{ color: sidebar.label.color }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = sidebar.hover.backgroundColor; e.currentTarget.style.color = sidebar.active.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = sidebar.label.color; }}
                onClick={toggleUserMenu}
              >
                {userMenu.userImage ? (
                  <img
                    className="w-10 h-10 rounded-full border-2 transition-colors"
                    src={userMenu.userImage}
                    alt="user photo"
                    style={{ borderColor: sidebar.borderColor }}
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: sidebar.hover.backgroundColor, color: sidebar.icon.color }}
                  >
                    <FaUserCircle className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 text-left overflow-hidden">
                  <ITText as="div" className="font-medium text-sm truncate" style={{ color: sidebar.active.color }}>
                    {userMenu.userName}
                  </ITText>
                  <ITText as="div" className="text-xs truncate" style={{ color: sidebar.label.color }}>
                    {userMenu.userEmail}
                  </ITText>
                </div>
                <FaChevronRight className="w-3 h-3" style={{ color: sidebar.icon.color }} />
              </button>

              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute bottom-full left-0 mb-3 w-full rounded-xl shadow-2xl overflow-hidden transform transition-all duration-200 origin-bottom"
                  style={{ backgroundColor: topbar.userMenu.dropdown.backgroundColor, border: `1px solid ${topbar.userMenu.dropdown.borderColor}` }}
                >
                  <div className="px-4 py-3" style={{ backgroundColor: topbar.userMenu.backgroundColor, borderBottom: `1px solid ${topbar.userMenu.dropdown.borderColor}` }}>
                    <ITText as="span" className="block text-sm font-semibold" style={{ color: topbar.userMenu.textColor }}>
                      {userMenu.userName}
                    </ITText>
                    <ITText as="span" className="block text-xs truncate" style={{ color: topbar.userMenu.subtitleColor }}>
                      {userMenu.userEmail}
                    </ITText>
                  </div>
                  <ul className="py-1">
                    {userMenu.menuItems.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            item.onClick();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2.5 text-sm transition-colors"
                          style={{ color: topbar.userMenu.textColor }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = topbar.userMenu.dropdown.itemHoverBackground; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        >
                          <ITText as="span">{item.label}</ITText>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative" style={{ backgroundColor: theme.layout.backgroundColor }}>
        {children}
      </main>
    </div>
  );
}
