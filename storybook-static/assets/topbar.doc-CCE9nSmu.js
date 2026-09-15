import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as s,P as a,C as d,S as t}from"./blocks-DefDVuP9.js";import{S as l}from"./topbar.stories-B8FkxGwh.js";import"./preload-helper-C1FmrZbK.js";function o(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(n.h1,{id:"ittopbar",children:"ITTopBar"}),`
`,e.jsx(n.p,{children:"Sticky top navigation bar with glassmorphism effect, logo, breadcrumb-style nav items, and a floating user avatar dropdown. Themed via CSS variables. Designed as a full-width header for dashboards and admin panels."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"logo"})," | ",e.jsx(n.code,{children:"ReactNode"})," | — | Optional logo element (e.g. an ",e.jsx(n.code,{children:"<img>"}),` or SVG component). |
| `,e.jsx(n.code,{children:"logoText"})," | ",e.jsx(n.code,{children:"string"}),` | — | Text displayed next to the logo as the brand/title. |
| `,e.jsx(n.code,{children:"userMenu"})," | ",e.jsx(n.code,{children:"object"}),` | — | User dropdown configuration with name, email, avatar, and menu items. |
| `,e.jsx(n.code,{children:"userMenu.userName"})," | ",e.jsx(n.code,{children:"string"}),` | — | Display name shown in the trigger button and dropdown header. |
| `,e.jsx(n.code,{children:"userMenu.userEmail"})," | ",e.jsx(n.code,{children:"string"}),` | — | User email shown in the trigger button and dropdown header. |
| `,e.jsx(n.code,{children:"userMenu.userImage"})," | ",e.jsx(n.code,{children:"string"}),` | — | Optional avatar image URL. Falls back to a user-circle icon when omitted. |
| `,e.jsx(n.code,{children:"userMenu.menuItems"})," | ",e.jsx(n.code,{children:"{ label: string; onClick: () => void }[]"}),` | — | Array of dropdown menu actions. Items containing "salir", "cerrar", or "logout" are styled as destructive. |
| `,e.jsx(n.code,{children:"navItems"})," | ",e.jsx(n.code,{children:"ITTopBarNavItem[]"})," | — | Desktop navigation items rendered beside the logo. Each has ",e.jsx(n.code,{children:"id"}),", ",e.jsx(n.code,{children:"label"}),", ",e.jsx(n.code,{children:"icon"}),", and ",e.jsx(n.code,{children:"action"}),`. |
| `,e.jsx(n.code,{children:"onNavItemClick"})," | ",e.jsx(n.code,{children:"(id: string) => void"})," | — | Callback fired when a navigation item is clicked. Receives the item's ",e.jsx(n.code,{children:"id"}),`. |
| `,e.jsx(n.code,{children:"showMobileMenuButton"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether to show the mobile hamburger menu toggle button. |
| `,e.jsx(n.code,{children:"onToggleMobileMenu"})," | ",e.jsx(n.code,{children:"() => void"})," | — | Callback fired when the mobile menu toggle button is clicked. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITTopBar } from '@axzydev/axzy_ui_system';
import { FaChartBar, FaUserCog } from 'react-icons/fa';

<ITTopBar
  logoText="AXZY SYSTEM"
  showMobileMenuButton
  userMenu={{
    userName: 'Alejandro G.',
    userEmail: 'alejandro@axzy.io',
    userImage: 'https://i.pravatar.cc/48',
    menuItems: [
      { label: 'Mi Perfil', onClick: () => {} },
      { label: 'Configuración', onClick: () => {} },
      { label: 'Cerrar Sesión', onClick: () => {} },
    ],
  }}
  navItems={[
    { id: '1', label: 'Monitor', icon: <FaChartBar />, action: () => {} },
    { id: '2', label: 'Admin', icon: <FaUserCog />, action: () => {} },
  ]}
  onNavItemClick={(id) => console.log('Nav:', id)}
  onToggleMobileMenu={() => setSidebarOpen(v => !v)}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The bar uses a ",e.jsx(n.strong,{children:"glassmorphism"})," backdrop blur effect (",e.jsx(n.code,{children:"backdrop-blur-xl"}),"), giving it a translucent appearance over scrolling content."]}),`
`,e.jsxs(n.li,{children:["Navigation items support ",e.jsx(n.strong,{children:"icons"})," and highlight the active item with the primary color and an underline indicator."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.strong,{children:"user menu"})," dropdown opens on avatar click and closes on outside click (via ",e.jsx(n.code,{children:"useClickOutside"})," hook)."]}),`
`,e.jsx(n.li,{children:'Menu items containing "salir", "cerrar", or "logout" (case-insensitive) are automatically styled red as destructive actions.'}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"userImage"})," is omitted, a ",e.jsx(n.code,{children:"FaUserCircle"})," fallback icon is displayed."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"showMobileMenuButton"})," renders a hamburger icon (",e.jsx(n.code,{children:"<FaBars />"}),") for toggling a sidebar — the actual sidebar is managed externally via ",e.jsx(n.code,{children:"onToggleMobileMenu"}),"."]}),`
`,e.jsxs(n.li,{children:["All color tokens are sourced from CSS custom properties set by ",e.jsx(n.code,{children:"ITThemeProvider"}),"."]}),`
`,e.jsxs(n.li,{children:["The bar is ",e.jsx(n.code,{children:"sticky"})," by default and sits at ",e.jsx(n.code,{children:"top: 0"})," with a high z-index."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(a,{}),`
`,e.jsx(d,{}),`
`,e.jsx(t,{})]})}function m(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{m as default};
