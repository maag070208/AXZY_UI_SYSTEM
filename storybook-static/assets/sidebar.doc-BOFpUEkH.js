import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as l,P as t,C as d,S as c}from"./blocks-DefDVuP9.js";import{S as r}from"./sidebar.stories-hNxuocG8.js";import"./preload-helper-C1FmrZbK.js";function s(n){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:r}),`
`,e.jsx(i.h1,{id:"itsidebar",children:"ITSidebar"}),`
`,e.jsx(i.p,{children:"Vertical navigation sidebar with collapsible submenus, tooltips when collapsed, active item highlighting, badge support, and themed glassmorphism styling. Designed for admin panels and dashboard layouts."}),`
`,e.jsx(i.h2,{id:"props",children:"Props"}),`
`,e.jsxs(i.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(i.code,{children:"navigationItems"})," | ",e.jsx(i.code,{children:"ITNavigationItem[]"}),` | — | Navigation structure: top-level items with optional sub-items. |
| `,e.jsx(i.code,{children:"isCollapsed"})," | ",e.jsx(i.code,{children:"boolean"})," | ",e.jsx(i.code,{children:"false"}),` | Whether the sidebar is collapsed to icon-only mode. |
| `,e.jsx(i.code,{children:"onToggleCollapse"})," | ",e.jsx(i.code,{children:"() => void"}),` | — | Callback when the user toggles collapse via the toggle button. |
| `,e.jsx(i.code,{children:"visibleOnMobile"})," | ",e.jsx(i.code,{children:"boolean"})," | ",e.jsx(i.code,{children:"false"}),` | Force sidebar visible on mobile breakpoints. |
| `,e.jsx(i.code,{children:"onItemClick"})," | ",e.jsx(i.code,{children:"(item: ITNavigationItem) => void"}),` | — | Callback when a top-level navigation item is clicked. |
| `,e.jsx(i.code,{children:"onSubItemClick"})," | ",e.jsx(i.code,{children:"(subitem: ITNavigationSubItem) => void"}),` | — | Callback when a sub-navigation item is clicked. |
| `,e.jsx(i.code,{children:"subitemConnector"})," | ",e.jsx(i.code,{children:'"dot" \\| "\\|" \\| "none"'})," | ",e.jsx(i.code,{children:'"dot"'}),` | Visual connector style for sub-items. |
| `,e.jsx(i.code,{children:"className"})," | ",e.jsx(i.code,{children:"string"})," | — | Additional CSS classes on the sidebar ",e.jsx(i.code,{children:"<aside>"}),". |"]}),`
`,e.jsx(i.h3,{id:"itnavigationitem",children:"ITNavigationItem"}),`
`,e.jsxs(i.p,{children:[`| Prop | Type | Description |
|------|------|-------------|
| `,e.jsx(i.code,{children:"id"})," | ",e.jsx(i.code,{children:"string"}),` | Unique identifier. |
| `,e.jsx(i.code,{children:"label"})," | ",e.jsx(i.code,{children:"string"}),` | Display label. |
| `,e.jsx(i.code,{children:"icon"})," | ",e.jsx(i.code,{children:"ReactNode"}),` | Icon rendered left of the label. |
| `,e.jsx(i.code,{children:"action"})," | ",e.jsx(i.code,{children:"() => void"}),` | Click handler for top-level items without submenus. |
| `,e.jsx(i.code,{children:"isActive"})," | ",e.jsx(i.code,{children:"boolean"}),` | Whether this item is active/highlighted. |
| `,e.jsx(i.code,{children:"subitems"})," | ",e.jsx(i.code,{children:"ITNavigationSubItem[]"}),` | Nested sub-navigation items. |
| `,e.jsx(i.code,{children:"badge"})," | ",e.jsx(i.code,{children:"string"})," | Badge text (e.g. notification count). |"]}),`
`,e.jsx(i.h3,{id:"itnavigationsubitem",children:"ITNavigationSubItem"}),`
`,e.jsxs(i.p,{children:[`| Prop | Type | Description |
|------|------|-------------|
| `,e.jsx(i.code,{children:"id"})," | ",e.jsx(i.code,{children:"string"}),` | Unique identifier. |
| `,e.jsx(i.code,{children:"label"})," | ",e.jsx(i.code,{children:"string"}),` | Display label. |
| `,e.jsx(i.code,{children:"action"})," | ",e.jsx(i.code,{children:"() => void"}),` | Click handler. |
| `,e.jsx(i.code,{children:"isActive"})," | ",e.jsx(i.code,{children:"boolean"})," | Whether this sub-item is active/highlighted. |"]}),`
`,e.jsx(i.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`import { ITSidebar } from '@axzydev/axzy_ui_system';
import { FaHome, FaUsers, FaCog } from 'react-icons/fa';

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, isActive: true, action: () => {} },
  {
    id: 'users',
    label: 'Users',
    icon: <FaUsers />,
    badge: '3',
    subitems: [
      { id: 'users-list', label: 'User List', action: () => {} },
      { id: 'users-roles', label: 'Roles', action: () => {}, isActive: true },
    ],
  },
];

<ITSidebar
  navigationItems={items}
  isCollapsed={false}
  onToggleCollapse={toggleCollapse}
  subitemConnector="dot"
/>
`})}),`
`,e.jsx(i.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Collapsed mode shrinks to icon-only; tooltips show labels on hover with glassmorphism style."}),`
`,e.jsx(i.li,{children:"Submenus expand/collapse with smooth transitions when a parent item is clicked."}),`
`,e.jsx(i.li,{children:"Active item highlighting uses a colored left-border accent and subtle background tint."}),`
`,e.jsx(i.li,{children:"Badge support renders a notification-style counter on the item."}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"subitemConnector"})," styles the visual link between parent and sub-items: ",e.jsx(i.code,{children:"dot"})," (default), ",e.jsx(i.code,{children:"|"})," (vertical bar), or ",e.jsx(i.code,{children:"none"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"visibleOnMobile"})," forces sidebar visibility on smaller screens for responsive layouts."]}),`
`,e.jsx(i.li,{children:"Themed via CSS variables for consistent colors, shadows, and glassmorphism effects across light and dark modes."}),`
`]}),`
`,e.jsx(i.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(t,{}),`
`,e.jsx(d,{}),`
`,e.jsx(c,{})]})}function m(n={}){const{wrapper:i}={...o(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(s,{...n})}):s(n)}export{m as default};
