import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as o,P as t,C as a,S as d}from"./blocks-DefDVuP9.js";import{S as l}from"./layout.stories-BMV582He.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
`,e.jsx(n.h1,{id:"itlayout",children:"ITLayout"}),`
`,e.jsx(n.p,{children:"The application shell layout component that combines a topbar, sidebar, and main content area into a full-page interface. The sidebar supports collapse/expand via hover, and all visual styles are driven by ITThemeProvider CSS variables."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"topBar"})," | ",e.jsx(n.code,{children:"ITTopBarProps"}),` | required | Top bar configuration including logo, nav items, and user menu. |
| `,e.jsx(n.code,{children:"sidebar"})," | ",e.jsx(n.code,{children:"ITSidebarProps"}),` | required | Sidebar configuration including navigation items. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | required | Main content rendered in the center area. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Additional CSS classes for the outermost wrapper. |
| `,e.jsx(n.code,{children:"contentClassName"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"})," | Additional CSS classes for the content container. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITLayout } from '@axzydev/axzy_ui_system';

<ITLayout
  topBar={{
    logoText: 'AXZY',
    userMenu: { userName: 'Jane', userEmail: 'jane@axzy.io', menuItems: [...] },
    navItems: [...]
  }}
  sidebar={{
    navigationItems: [...]
  }}
>
  <div>Your page content here</div>
</ITLayout>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The topbar spans the full viewport width at the top of the page."}),`
`,e.jsx(n.li,{children:"The sidebar sits under the topbar on the left and floats over content when expanded via hover."}),`
`,e.jsx(n.li,{children:"Sidebar in collapsed state shows only icons; expanding reveals labels."}),`
`,e.jsx(n.li,{children:"Themed entirely through CSS custom properties from ITThemeProvider."}),`
`,e.jsx(n.li,{children:"Includes mobile responsive behavior with a hamburger-style toggle."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(t,{}),`
`,e.jsx(a,{}),`
`,e.jsx(d,{})]})}function x(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{x as default};
