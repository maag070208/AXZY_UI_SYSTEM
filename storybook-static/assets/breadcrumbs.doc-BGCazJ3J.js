import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as t,P as c,C as a,S as d}from"./blocks-DefDVuP9.js";import{S as o}from"./breadcrumbs.stories-Du9ccoYG.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:o}),`
`,e.jsx(n.h1,{id:"itbreadcrumbs",children:"ITBreadcrumbs"}),`
`,e.jsxs(n.p,{children:["Navigation breadcrumb trail component that displays the user's current location within a site hierarchy. Each item can be a link (",e.jsx(n.code,{children:"href"}),") or a button (",e.jsx(n.code,{children:"onClick"}),"), with the last item automatically rendered as plain inactive text. Supports a custom separator between segments."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"items"})," | ",e.jsx(n.code,{children:"ITBreadcrumbItem[]"}),` | required | Ordered array of breadcrumb segments. The last item is rendered as plain text. |
| `,e.jsx(n.code,{children:"separator"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"<FaChevronRight size={10} />"}),` | Custom separator element rendered between items. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS class names for the ",e.jsx(n.code,{children:"<nav>"})," container. |"]}),`
`,e.jsx(n.h3,{id:"itbreadcrumbitem",children:"ITBreadcrumbItem"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | required | Display text for the breadcrumb segment. |
| `,e.jsx(n.code,{children:"href"})," | ",e.jsx(n.code,{children:"string"})," | — | URL for the breadcrumb link. Renders an ",e.jsx(n.code,{children:"<a>"}),` tag. |
| `,e.jsx(n.code,{children:"onClick"})," | ",e.jsx(n.code,{children:"() => void"})," | — | Click handler. Renders a ",e.jsx(n.code,{children:"<button>"})," when no ",e.jsx(n.code,{children:"href"})," is set. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITBreadcrumbs } from '@axzydev/axzy_ui_system';

<ITBreadcrumbs
  items={[
    { label: "Inicio", href: "#" },
    { label: "Usuarios", href: "#" },
    { label: "Editar Perfil" },
  ]}
/>

<ITBreadcrumbs
  items={[...]}
  separator={<FaArrowRight size={10} />}
/>
`})}),`
`,e.jsx(n.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The last item in the ",e.jsx(n.code,{children:"items"})," array is always rendered as plain, non-interactive text representing the current page."]}),`
`,e.jsxs(n.li,{children:["Items with an ",e.jsx(n.code,{children:"href"})," render as anchor tags (",e.jsx(n.code,{children:"<a>"}),"), while items with only ",e.jsx(n.code,{children:"onClick"})," render as buttons (",e.jsx(n.code,{children:"<button>"}),")."]}),`
`,e.jsxs(n.li,{children:["Default separator is a chevron-right icon from FontAwesome (",e.jsx(n.code,{children:"FaChevronRight"}),")."]}),`
`,e.jsxs(n.li,{children:["Wrapped in a semantic ",e.jsx(n.code,{children:"<nav>"})," element for accessibility."]}),`
`,e.jsxs(n.li,{children:["The component is purely presentational — routing/navigation logic is handled by ",e.jsx(n.code,{children:"href"})," or ",e.jsx(n.code,{children:"onClick"})," props."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(a,{}),`
`,e.jsx(d,{})]})}function j(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{j as default};
