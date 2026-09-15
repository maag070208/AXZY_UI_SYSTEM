import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as r,P as o,C as c,S as a}from"./blocks-DefDVuP9.js";import{S as t}from"./navbar.stories-B3Uqgteh.js";import"./preload-helper-C1FmrZbK.js";function d(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:t}),`
`,e.jsx(n.h1,{id:"itnavbar",children:"ITNavbar"}),`
`,e.jsxs(n.p,{children:["A full sidebar navigation shell for application layouts. Provides collapsible submenus with expand/collapse animation, active state highlighting via ",e.jsx(n.code,{children:"isActive"}),", and an optional user menu dropdown with avatar, name, and email."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"navigationItems"})," | ",e.jsx(n.code,{children:"ITNavigationItem[]"})," | ",e.jsx(n.code,{children:"undefined"}),` | Navigation items with labels, icons, subitems, and active states. |
| `,e.jsx(n.code,{children:"logo"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Logo element rendered in the sidebar header. |
| `,e.jsx(n.code,{children:"logoText"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Text displayed next to the logo. |
| `,e.jsx(n.code,{children:"userMenu"})," | ",e.jsx(n.code,{children:"{ userImage?, userName, userEmail, menuItems }"})," | ",e.jsx(n.code,{children:"undefined"}),` | User dropdown configuration. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Main content rendered next to the sidebar. |
| `,e.jsx(n.code,{children:"navItems"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"})," | ",e.jsx(n.strong,{children:"Deprecated."})," Use ",e.jsx(n.code,{children:"navigationItems"}),` instead. |
| `,e.jsx(n.code,{children:"showSidebar"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"undefined"})," | ",e.jsx(n.strong,{children:"Deprecated."}),` Legacy flag. |
| `,e.jsx(n.code,{children:"showSidebarOnMobile"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"undefined"})," | ",e.jsx(n.strong,{children:"Deprecated."}),` Legacy flag. |
| `,e.jsx(n.code,{children:"sidebarItems"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"})," | ",e.jsx(n.strong,{children:"Deprecated."})," Use ",e.jsx(n.code,{children:"navigationItems"})," instead. |"]}),`
`,e.jsx(n.h3,{id:"itnavigationitem",children:"ITNavigationItem"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"id"})," | ",e.jsx(n.code,{children:"string"}),` | required | Unique identifier. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | required | Display label. |
| `,e.jsx(n.code,{children:"icon"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Icon rendered next to the label. |
| `,e.jsx(n.code,{children:"action"})," | ",e.jsx(n.code,{children:"() => void"})," | ",e.jsx(n.code,{children:"undefined"}),` | Callback on click. |
| `,e.jsx(n.code,{children:"isActive"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the item is currently highlighted as active. |
| `,e.jsx(n.code,{children:"subitems"})," | ",e.jsx(n.code,{children:"ITNavigationSubItem[]"})," | ",e.jsx(n.code,{children:"undefined"})," | Nested items shown on expand. |"]}),`
`,e.jsx(n.h3,{id:"itnavigationsubitem",children:"ITNavigationSubItem"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"id"})," | ",e.jsx(n.code,{children:"string"}),` | required | Unique identifier. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | required | Display label. |
| `,e.jsx(n.code,{children:"action"})," | ",e.jsx(n.code,{children:"() => void"}),` | required | Callback on click. |
| `,e.jsx(n.code,{children:"isActive"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Whether the sub-item is highlighted. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITNavbar } from '@axzydev/axzy_ui_system';
import { FaHome, FaChartBar } from 'react-icons/fa';

<ITNavbar
  logoText="AXZY"
  navigationItems={[
    { id: 'home', label: 'Dashboard', icon: <FaHome />, isActive: true },
    { id: 'analytics', label: 'Analytics', icon: <FaChartBar />,
      subitems: [{ id: 'reports', label: 'Reports', action: () => {} }]
    }
  ]}
  userMenu={{ userName: 'John', userEmail: 'john@axzy.dev', menuItems: [...] }}
>
  <div>Content area</div>
</ITNavbar>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Sidebar has a collapsed state where only icons are visible; expanding shows labels."}),`
`,e.jsx(n.li,{children:"Submenus animate open/closed with a height transition."}),`
`,e.jsxs(n.li,{children:["Items with ",e.jsx(n.code,{children:"isActive"})," are visually highlighted."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"userMenu"})," renders a dropdown at the bottom of the sidebar with user info and action items."]}),`
`,e.jsxs(n.li,{children:["Legacy props (",e.jsx(n.code,{children:"navItems"}),", ",e.jsx(n.code,{children:"showSidebar"}),", etc.) are maintained for backward compatibility but should be migrated to ",e.jsx(n.code,{children:"navigationItems"}),"."]}),`
`,e.jsx(n.li,{children:"Supports dark mode via CSS variables from the theme provider."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(c,{}),`
`,e.jsx(a,{})]})}function u(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}export{u as default};
