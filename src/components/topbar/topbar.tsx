import { FaUserCircle, FaBars } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { ITTopBarProps } from "./topbar.props";

export default function ITTopBar({
  logo,
  logoText,
  userMenu,
  showMobileMenuButton,
  onToggleMobileMenu,
  navItems,
  onNavItemClick,
}: ITTopBarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">

        {/* LEFT AREA */}
        <div className="flex items-center gap-4">


          {/* ✅ Mobile Sidebar Toggle */}
          {showMobileMenuButton && (
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={onToggleMobileMenu}
            >
              <FaBars className="text-gray-700 w-5 h-5" />
            </button>
          )}

          {/* ✅ Logo */}
          {logo}

          {logoText && (
            <span className="text-xl font-semibold text-gray-900">
              {logoText}
            </span>
          )}

          {/* ✅ Top Navigation Items */}
          {navItems && navItems.length > 0 && (
            <nav className="hidden md:flex ml-6 space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavItemClick?.(item.id)}
                  className="text-gray-700 hover:text-slate-600 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* USER MENU */}
        {userMenu && (
          <div className="relative">
            <button
              type="button"
              className="flex items-center space-x-3 text-sm bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
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
              <div className="hidden sm:block text-left">
                <div className="font-medium text-gray-900 text-sm">
                  {userMenu.userName}
                </div>
                <div className="text-gray-500 text-xs">
                  {userMenu.userEmail}
                </div>
              </div>
            </button>

            {/* Dropdown */}
            {isUserMenuOpen && (
              <div
                ref={userMenuRef}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50"
              >
                <div className="px-4 py-3 border-b">
                  <span className="block font-medium">
                    {userMenu.userName}
                  </span>
                  <span className="text-gray-500 text-sm truncate">
                    {userMenu.userEmail}
                  </span>
                </div>
                <ul className="py-2">
                  {userMenu.menuItems.map((m, i) => (
                    <li key={i}>
                      <button
                        onClick={m.onClick}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {m.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
