import{j as e}from"./iframe-B5RMobo9.js";import{u as t,M as o,P as i,C as c,S as s}from"./blocks-DefDVuP9.js";import{S as l}from"./page.stories-CEI7bivQ.js";import"./preload-helper-C1FmrZbK.js";function r(d){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...t(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
`,e.jsx(n.h1,{id:"itpage",children:"ITPage"}),`
`,e.jsx(n.p,{children:"A page template component that wraps an ITPageHeader with content area and built-in state handling for loading, error, and empty states. Provides automatic skeleton placeholders during loading, an error boundary with retry action, and a customizable empty state with action."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Page title passed to the header. |
| `,e.jsx(n.code,{children:"description"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Description text shown below the title. |
| `,e.jsx(n.code,{children:"breadcrumbs"})," | ",e.jsx(n.code,{children:"ITBreadcrumbItem[]"})," | ",e.jsx(n.code,{children:"undefined"}),` | Breadcrumb navigation items. |
| `,e.jsx(n.code,{children:"actions"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Action buttons rendered in the header. |
| `,e.jsx(n.code,{children:"backAction"})," | ",e.jsx(n.code,{children:"() => void"})," | ",e.jsx(n.code,{children:"undefined"}),` | Callback for the back button. |
| `,e.jsx(n.code,{children:"icon"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Icon displayed next to the title. |
| `,e.jsx(n.code,{children:"iconColor"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Custom color for the icon. |
| `,e.jsx(n.code,{children:"loading"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | When true, shows skeleton placeholders instead of content. |
| `,e.jsx(n.code,{children:"error"})," | ",e.jsx(n.code,{children:"string \\| null"})," | ",e.jsx(n.code,{children:"null"}),` | Error message. When provided, shows an error state with retry button. |
| `,e.jsx(n.code,{children:"errorTitle"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"'Error'"}),` | Custom title for the error state. |
| `,e.jsx(n.code,{children:"errorActionLabel"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"'Reintentar'"}),` | Label for the retry button in the error state. |
| `,e.jsx(n.code,{children:"onRetry"})," | ",e.jsx(n.code,{children:"() => void"})," | ",e.jsx(n.code,{children:"undefined"}),` | Callback when the retry button is clicked. |
| `,e.jsx(n.code,{children:"empty"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | When true, shows an empty state placeholder. |
| `,e.jsx(n.code,{children:"emptyTitle"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"'Sin datos'"}),` | Custom title for the empty state. |
| `,e.jsx(n.code,{children:"emptyDescription"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Custom description for the empty state. |
| `,e.jsx(n.code,{children:"emptyAction"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Custom action element for the empty state. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | required | Content rendered when no special state (loading/error/empty) is active. |
| `,e.jsx(n.code,{children:"maxWidth"})," | ",e.jsx(n.code,{children:"'2xl' \\| '3xl' \\| '4xl' \\| '5xl' \\| '6xl' \\| '7xl'"})," | ",e.jsx(n.code,{children:"'7xl'"}),` | Maximum width of the page content container. |
| `,e.jsx(n.code,{children:"noPadding"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | When true, removes default padding from the page wrapper. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"})," | Additional CSS classes for the page wrapper. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITPage } from '@axzydev/axzy_ui_system';

<ITPage title="Users" description="Manage system users" actions={<ITButton label="Add" />}>
  <p>Your page content</p>
</ITPage>

<ITPage title="Dashboard" loading>
  <p>Content not shown while loading</p>
</ITPage>

<ITPage
  title="Orders"
  error="Failed to load orders"
  onRetry={() => refetch()}
>
  <p>Content not shown while error</p>
</ITPage>

<ITPage
  title="Notifications"
  empty
  emptyTitle="No notifications"
  emptyAction={<ITButton label="Refresh" />}
>
  <p>Content not shown while empty</p>
</ITPage>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["State priority: ",e.jsx(n.code,{children:"error"})," > ",e.jsx(n.code,{children:"loading"})," > ",e.jsx(n.code,{children:"empty"})," > ",e.jsx(n.code,{children:"children"}),"."]}),`
`,e.jsx(n.li,{children:"The loading state renders animated skeleton blocks matching common page patterns."}),`
`,e.jsx(n.li,{children:"The error state renders a centered error icon, message, and a retry button."}),`
`,e.jsx(n.li,{children:"The empty state renders a centered placeholder with optional title, description, and action."}),`
`,e.jsxs(n.li,{children:["All header props (",e.jsx(n.code,{children:"title"}),", ",e.jsx(n.code,{children:"description"}),", ",e.jsx(n.code,{children:"breadcrumbs"}),", ",e.jsx(n.code,{children:"actions"}),", ",e.jsx(n.code,{children:"backAction"}),", ",e.jsx(n.code,{children:"icon"}),") are forwarded to ITPageHeader."]}),`
`,e.jsxs(n.li,{children:["Content maximum width is controlled by Tailwind max-width classes via ",e.jsx(n.code,{children:"maxWidth"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"noPadding"})," is useful for full-bleed layouts like dashboards."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(i,{}),`
`,e.jsx(c,{}),`
`,e.jsx(s,{})]})}function p(d={}){const{wrapper:n}={...t(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(r,{...d})}):r(d)}export{p as default};
