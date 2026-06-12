import { FaUserCircle, FaBars } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { ITTopBarProps } from "./topbar.props";
import ITText from "@/components/text/text";

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
        backgroundColor: "var(--topbar-bg, rgba(255, 255, 255, 0.9))",
        borderBottom: "1px solid var(--topbar-border, #e2e8f0)",
        boxShadow: "none",
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
                 color: "var(--topbar-icon, #64748b)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--topbar-user-hover, #f1f5f9)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
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
              <ITText as="span" 
                 className="text-[1.15rem] font-bold tracking-tight"
                 style={{ color: "var(--topbar-text, #0f172a)" }}
              >
                {logoText}
              </ITText>
            )}
          </div>

          {/* Top Navigation Items (Desktop) */}
          {navItems && navItems.length > 0 && (
            <nav className="hidden md:flex ml-8 space-x-1 border-l pl-8" style={{ borderColor: "var(--topbar-border, #e2e8f0)" }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavItemClick?.(item.id)}
                  className="px-4 py-2 rounded-lg font-medium text-[0.9rem] transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
                  style={{ color: "var(--topbar-text, #475569)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--topbar-text, #0f172a)";
                    e.currentTarget.style.backgroundColor = "var(--topbar-user-hover, #f1f5f9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--topbar-text, #475569)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <span className="opacity-70">{item.icon}</span>}
                    <ITText as="span">{item.label}</ITText>
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
                backgroundColor: isUserMenuOpen ? "var(--topbar-user-hover, #f1f5f9)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isUserMenuOpen) e.currentTarget.style.backgroundColor = "var(--topbar-user-hover, #f1f5f9)";
              }}
              onMouseLeave={(e) => {
                if (!isUserMenuOpen) e.currentTarget.style.backgroundColor = "transparent";
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
                     <FaUserCircle className="w-6 h-6" style={{ color: "var(--topbar-icon, #94a3b8)" }} />
                  </div>
                )}
                {/* Active dot indicator */}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* Name Details */}
              <div className="hidden sm:flex flex-col text-left py-0.5">
                <ITText as="span" 
                  className="font-semibold text-[0.85rem] leading-tight"
                  style={{ color: "var(--topbar-user-text, #0f172a)" }}
                >
                  {userMenu.userName}
                </ITText>
                <ITText as="span" 
                  className="text-[0.7rem] font-medium"
                  style={{ color: "var(--topbar-user-subtitle, #64748b)" }}
                >
                  {userMenu.userEmail}
                </ITText>
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
                backgroundColor: "var(--topbar-user-dropdown-bg, #ffffff)",
                border: "1px solid var(--topbar-user-dropdown-border, #f1f5f9)"
              }}
            >
               {/* Dropdown Header */}
              <div className="px-5 py-4 border-b" style={{ borderColor: "var(--topbar-user-dropdown-border, #f1f5f9)", backgroundColor: "var(--topbar-user-bg, #f8fafc)" }}>
                <ITText as="span" className="block font-bold text-[0.9rem]" style={{ color: "var(--topbar-user-text, #0f172a)" }}>
                  {userMenu.userName}
                </ITText>
                <ITText as="span" className="block text-xs font-medium truncate mt-0.5" style={{ color: "var(--topbar-user-subtitle, #64748b)" }}>
                  {userMenu.userEmail}
                </ITText>
              </div>
              
              {/* Dropdown Items */}
              <ul className="py-2">
                {userMenu.menuItems.map((m, i) => {
                  const isDestructive = m.label.toLowerCase().includes('salir') || m.label.toLowerCase().includes('cerrar') || m.label.toLowerCase().includes('logout');
                  
                  return (
                    <li key={i} className="px-2">
                       {i === userMenu.menuItems.length - 1 && isDestructive && i > 0 && (
                          <div className="h-px bg-slate-100 my-1 mx-2"></div>
                       )}
                      <button
                        onClick={(e) => {
                           m.onClick();
                           setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2.5 rounded-xl text-[0.875rem] font-medium transition-colors duration-150"
                        style={{ color: isDestructive ? '#ef4444' : "var(--topbar-user-text, #334155)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDestructive ? '#fef2f2' : "var(--topbar-user-item-hover, #f8fafc)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <ITText as="span">{m.label}</ITText>
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
