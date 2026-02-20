import { FaUserCircle, FaBars } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { ITTopBarProps } from "./topbar.props";
import { theme } from "@/theme/theme";

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
    <header 
      className="sticky top-0 z-40 backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor: theme.topbar?.backgroundColor || 'rgba(255, 255, 255, 0.9)',
        borderBottom: `1px solid ${theme.topbar?.borderColor || '#e2e8f0'}`,
        boxShadow: theme.topbar?.shadow || 'none',
      }}
    >
      <div className="flex items-center justify-between h-[72px] px-6 lg:px-8">

        {/* LEFT AREA: Logo & Mobile Toggle */}
        <div className="flex items-center gap-5">

          {/* Mobile Sidebar Toggle */}
          {showMobileMenuButton && (
            <button
              className="lg:hidden p-2.5 rounded-xl transition-colors duration-200"
              style={{
                 color: theme.topbar?.iconColor || '#64748b',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.topbar?.userMenu?.hoverBackground || '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={onToggleMobileMenu}
            >
              <FaBars className="w-[1.125rem] h-[1.125rem]" />
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center gap-3">
            {logo && (
              <div className="flex-shrink-0 drop-shadow-sm">
                 {logo}
              </div>
            )}
  
            {logoText && (
              <span 
                 className="text-[1.15rem] font-bold tracking-tight"
                 style={{ color: theme.topbar?.textHoverColor || '#0f172a' }}
              >
                {logoText}
              </span>
            )}
          </div>

          {/* Top Navigation Items (Desktop) */}
          {navItems && navItems.length > 0 && (
            <nav className="hidden md:flex ml-8 space-x-1 border-l pl-8" style={{ borderColor: theme.topbar?.borderColor || '#e2e8f0' }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavItemClick?.(item.id)}
                  className="px-4 py-2 rounded-lg font-medium text-[0.9rem] transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
                  style={{ color: theme.topbar?.textColor || '#475569' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.topbar?.textHoverColor || '#0f172a';
                    e.currentTarget.style.backgroundColor = theme.topbar?.userMenu?.hoverBackground || '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.topbar?.textColor || '#475569';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <span className="opacity-70">{item.icon}</span>}
                    {item.label}
                  </div>
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* RIGHT AREA: User Menu */}
        {userMenu && (
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] border border-transparent hover:border-gray-200"
              style={{
                backgroundColor: isUserMenuOpen ? (theme.topbar?.userMenu?.hoverBackground || '#f1f5f9') : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isUserMenuOpen) e.currentTarget.style.backgroundColor = theme.topbar?.userMenu?.hoverBackground || '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                if (!isUserMenuOpen) e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              {/* Avatar */}
              <div className="relative">
                {userMenu.userImage ? (
                  <img
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                    src={userMenu.userImage}
                    alt="Current user"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-white shadow-sm">
                     <FaUserCircle className="w-6 h-6" style={{ color: theme.topbar?.iconColor || '#94a3b8' }} />
                  </div>
                )}
                {/* Active dot indicator */}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* Name Details */}
              <div className="hidden sm:flex flex-col text-left py-0.5">
                <span 
                  className="font-semibold text-[0.85rem] leading-tight"
                  style={{ color: theme.topbar?.userMenu?.textColor || '#0f172a' }}
                >
                  {userMenu.userName}
                </span>
                <span 
                  className="text-[0.7rem] font-medium"
                  style={{ color: theme.topbar?.userMenu?.subtitleColor || '#64748b' }}
                >
                  {userMenu.userEmail}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            <div
              ref={userMenuRef}
              className={`
                absolute right-0 mt-3 w-64 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-50 overflow-hidden transform origin-top-right transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]
                ${isUserMenuOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2 pointer-events-none"}
              `}
              style={{ 
                backgroundColor: theme.topbar?.userMenu?.dropdown?.backgroundColor || '#ffffff',
                border: `1px solid ${theme.topbar?.userMenu?.dropdown?.borderColor || '#f1f5f9'}`
              }}
            >
               {/* Dropdown Header */}
              <div className="px-5 py-4 border-b bg-slate-50/50" style={{ borderColor: theme.topbar?.userMenu?.dropdown?.borderColor || '#f1f5f9' }}>
                <span className="block font-bold text-[0.9rem]" style={{ color: theme.topbar?.userMenu?.textColor || '#0f172a' }}>
                  {userMenu.userName}
                </span>
                <span className="block text-xs font-medium truncate mt-0.5" style={{ color: theme.topbar?.userMenu?.subtitleColor || '#64748b' }}>
                  {userMenu.userEmail}
                </span>
              </div>
              
              {/* Dropdown Items */}
              <ul className="py-2">
                {userMenu.menuItems.map((m, i) => {
                  const isDestructive = m.label.toLowerCase().includes('salir') || m.label.toLowerCase().includes('cerrar') || m.label.toLowerCase().includes('logout');
                  
                  return (
                    <li key={i} className="px-2">
                       {/* Add a subtle divider before logout if it's the last item */}
                       {i === userMenu.menuItems.length - 1 && isDestructive && i > 0 && (
                          <div className="h-px bg-slate-100 my-1 mx-2"></div>
                       )}
                      <button
                        onClick={(e) => {
                           m.onClick();
                           setIsUserMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2.5 rounded-xl text-[0.875rem] font-medium transition-colors duration-150`}
                        style={{ color: isDestructive ? '#ef4444' : (theme.topbar?.userMenu?.textColor || '#334155') }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDestructive ? '#fef2f2' : (theme.topbar?.userMenu?.dropdown?.itemHoverBackground || '#f8fafc');
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {m.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
