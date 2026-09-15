import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as o,P as t,C as c,S as l}from"./blocks-DefDVuP9.js";import{S as d}from"./alert.stories-C4jV40gz.js";import"./preload-helper-C1FmrZbK.js";function r(n){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d}),`
`,e.jsx(s.h1,{id:"italert",children:"ITAlert"}),`
`,e.jsx(s.p,{children:"Dismissible alert banners that provide contextual feedback messages to users. Supports four semantic variants — info, success, warning, and error — each with a distinct icon and color scheme. Alerts can optionally include a bold title, a custom icon override, and a dismiss button for user-dismissible notifications."}),`
`,e.jsx(s.h2,{id:"props",children:"Props"}),`
`,e.jsxs(s.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(s.code,{children:"variant"})," | ",e.jsx(s.code,{children:'"info" \\| "success" \\| "warning" \\| "error"'})," | ",e.jsx(s.code,{children:'"info"'}),` | Visual style with corresponding icon and color scheme. |
| `,e.jsx(s.code,{children:"title"})," | ",e.jsx(s.code,{children:"string"}),` | — | Bold heading text displayed above the message. |
| `,e.jsx(s.code,{children:"children"})," | ",e.jsx(s.code,{children:"ReactNode"}),` | — | Alert message content. |
| `,e.jsx(s.code,{children:"dismissible"})," | ",e.jsx(s.code,{children:"boolean"})," | ",e.jsx(s.code,{children:"false"}),` | Whether the alert can be dismissed by the user. |
| `,e.jsx(s.code,{children:"onDismiss"})," | ",e.jsx(s.code,{children:"() => void"}),` | — | Callback fired when the dismiss button is clicked. |
| `,e.jsx(s.code,{children:"icon"})," | ",e.jsx(s.code,{children:"ReactNode"}),` | — | Custom icon element that overrides the default variant icon. |
| `,e.jsx(s.code,{children:"className"})," | ",e.jsx(s.code,{children:"string"})," | — | Additional CSS class names for the alert container. |"]}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { ITAlert } from '@axzydev/axzy_ui_system';

<ITAlert variant="success" title="Guardado" dismissible onDismiss={() => {}}>
  Los cambios se guardaron correctamente.
</ITAlert>

<ITAlert variant="error">Ocurrió un error inesperado.</ITAlert>
`})}),`
`,e.jsx(s.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"info"})," — Neutral blue style for general informational messages."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"success"})," — Green style for positive confirmation and completion messages."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"warning"})," — Amber/yellow style for cautionary messages."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"error"})," — Red style for critical errors and failures."]}),`
`,e.jsxs(s.li,{children:["All variants render with ",e.jsx(s.code,{children:'role="alert"'})," for accessibility."]}),`
`,e.jsx(s.li,{children:"Supports dark mode with appropriate color adjustments."}),`
`,e.jsxs(s.li,{children:["The dismiss button only renders when both ",e.jsx(s.code,{children:"dismissible"})," and ",e.jsx(s.code,{children:"onDismiss"})," are set."]}),`
`]}),`
`,e.jsx(s.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(t,{}),`
`,e.jsx(c,{}),`
`,e.jsx(l,{})]})}function j(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{j as default};
