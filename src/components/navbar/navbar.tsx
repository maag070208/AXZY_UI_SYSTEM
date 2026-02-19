import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import { FaChevronDown, FaChevronRight, FaUserCircle } from "react-icons/fa";
import { ITNavbarProps, ITNavigationItem } from "./navbar.props";

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
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
                  {logoText}
                </span>
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
                          <span className="block text-sm text-gray-900">
                            {userMenu.userName}
                          </span>
                          <span className="block text-sm text-gray-500 truncate">
                            {userMenu.userEmail}
                          </span>
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
                                {item.label}
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
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-secondary-900 shadow-xl flex flex-col transition-all duration-300 ease-in-out">
        {/* Logo Section */}
        <div className="p-6 border-b border-secondary-800/50 flex items-center gap-3">
          {logo && <div className="h-8 w-auto object-contain transition-transform hover:scale-105">{logo}</div>}
          {logoText && (
            <span className="text-lg font-bold text-white tracking-wide">
              {logoText}
            </span>
          )}
        </div>

        {/* Menu Title (Optional or remove for pure minimalism) */}
        {/* <div className="px-6 py-4">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-secondary-500">Menu</h2>
        </div> */}

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1.5">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <div
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${
                    item.isActive 
                      ? 'bg-secondary-800/60 border-primary-500 text-white shadow-sm' 
                      : 'border-transparent text-secondary-400 hover:bg-secondary-800 hover:text-white'
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    {item.icon && (
                      <div className={`text-xl transition-colors ${item.isActive ? 'text-primary-400' : 'text-secondary-500 group-hover:text-white'}`}>
                        {item.icon}
                      </div>
                    )}
                    
                    {/* Label */}
                    <span className={`font-medium text-sm ${item.isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                  </div>

                  {/* Chevron for expandable items */}
                  {item.subitems && item.subitems.length > 0 && (
                    <div className="text-secondary-500 group-hover:text-white transition-transform">
                      {expandedItems.has(item.id) ? (
                        <FaChevronDown className="w-3 h-3" />
                      ) : (
                        <FaChevronRight className="w-3 h-3" />
                      )}
                    </div>
                  )}
                </div>

                {/* Submenu */}
                {item.subitems && 
                 item.subitems.length > 0 && 
                 expandedItems.has(item.id) && (
                  <ul className="mt-1 ml-4 pl-4 border-l border-secondary-800 space-y-1">
                    {item.subitems.map((subitem) => (
                      <li key={subitem.id}>
                        <button
                          onClick={subitem.action}
                          className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                            subitem.isActive
                              ? 'text-primary-400 font-medium bg-secondary-800/30'
                              : 'text-secondary-400 hover:text-white hover:bg-secondary-800/30'
                          }`}
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

        {/* User Menu */}
        {userMenu && (
          <div className="p-4 border-t border-secondary-800">
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-secondary-800 transition-colors duration-200 group"
                onClick={toggleUserMenu}
              >
                {userMenu.userImage ? (
                  <img
                    className="w-10 h-10 rounded-full border-2 border-secondary-700 group-hover:border-primary-500 transition-colors"
                    src={userMenu.userImage}
                    alt="user photo"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center text-secondary-400 group-hover:text-white group-hover:bg-secondary-700 transition-colors">
                      <FaUserCircle className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 text-left overflow-hidden">
                  <div className="text-white font-medium text-sm truncate group-hover:text-primary-400 transition-colors">
                    {userMenu.userName}
                  </div>
                  <div className="text-secondary-500 text-xs truncate">
                    {userMenu.userEmail}
                  </div>
                </div>
                <FaChevronRight className="text-secondary-600 w-3 h-3 group-hover:text-white transition-colors" />
              </button>

              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute bottom-full left-0 mb-3 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-200 origin-bottom"
                >
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                      <span className="block text-sm font-semibold text-gray-800">
                        {userMenu.userName}
                      </span>
                      <span className="block text-xs text-gray-500 truncate">
                        {userMenu.userEmail}
                      </span>
                  </div>
                  <ul className="py-1">
                    {userMenu.menuItems.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            item.onClick();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                          {item.label}
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
      <main className="flex-1 overflow-y-auto bg-gray-50/50 relative">
        {/* Subtle top bar or just content area */}
        {children}
      </main>
    </div>
  );
}
