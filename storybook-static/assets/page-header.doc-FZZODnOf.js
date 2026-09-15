import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as o,P as r,C as c,S as d}from"./blocks-DefDVuP9.js";import{S as a}from"./page-header.stories-Bq7yeXdQ.js";import"./preload-helper-C1FmrZbK.js";function i(t){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a}),`
`,e.jsx(n.h1,{id:"itpageheader",children:"ITPageHeader"}),`
`,e.jsx(n.p,{children:"A page title bar component that displays a heading with optional breadcrumbs, description text, action buttons, and a back navigation button. Designed to sit at the top of page content for consistent page-level navigation."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"}),` | required | Page title displayed as the main heading. |
| `,e.jsx(n.code,{children:"description"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Optional description text shown below the title. |
| `,e.jsx(n.code,{children:"breadcrumbs"})," | ",e.jsx(n.code,{children:"ITBreadcrumbItem[]"})," | ",e.jsx(n.code,{children:"undefined"}),` | Breadcrumb navigation items above the title. |
| `,e.jsx(n.code,{children:"actions"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Action buttons or elements rendered on the right side. |
| `,e.jsx(n.code,{children:"backAction"})," | ",e.jsx(n.code,{children:"() => void"})," | ",e.jsx(n.code,{children:"undefined"}),` | Callback fired when the back button is clicked. |
| `,e.jsx(n.code,{children:"icon"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Optional icon displayed next to the title. |
| `,e.jsx(n.code,{children:"iconColor"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Custom CSS color value for the icon. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"})," | Additional CSS classes for the container. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITPageHeader } from '@axzydev/axzy_ui_system';
import { FaUsers } from 'react-icons/fa';

<ITPageHeader
  title="Users"
  description="Manage system users"
  breadcrumbs={[{ label: 'Dashboard', href: '#' }, { label: 'Users' }]}
  actions={<ITButton label="Add User" />}
/>
<ITPageHeader
  title="Edit User"
  backAction={() => navigate(-1)}
  breadcrumbs={[{ label: 'Users', href: '/users' }, { label: 'Edit' }]}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Breadcrumbs render above the title using the ITBreadcrumbs component."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"backAction"})," renders a left-arrow button before the content; breadcrumbs shift to the right of the back button."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"icon"})," slot places an icon beside the title, colored by ",e.jsx(n.code,{children:"iconColor"})," or the primary theme color."]}),`
`,e.jsxs(n.li,{children:["Actions area accepts any React nodes; typically ITButton components with ",e.jsx(n.code,{children:"small"})," sizing."]}),`
`,e.jsx(n.li,{children:"The component uses a flex layout: breadcrumbs + back button on the left, actions on the right."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(r,{}),`
`,e.jsx(c,{}),`
`,e.jsx(d,{})]})}function u(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{u as default};
