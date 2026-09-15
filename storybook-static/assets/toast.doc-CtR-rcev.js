import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as i,P as r,C as c,S as a}from"./blocks-DefDVuP9.js";import{S as d}from"./toast.stories-CxnlVGGy.js";import"./preload-helper-C1FmrZbK.js";function t(n){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:d}),`
`,e.jsx(s.h1,{id:"ittoast",children:"ITToast"}),`
`,e.jsx(s.p,{children:"Floating notification with automatic dismiss and severity-based styling. Renders a positioned alert with an icon, message, and optional action button. Supports six on-screen positions and four semantic types — success, error, warning, and info — plus primary and danger variants."}),`
`,e.jsx(s.h2,{id:"props",children:"Props"}),`
`,e.jsxs(s.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(s.code,{children:"message"})," | ",e.jsx(s.code,{children:"string"}),` | — | Toast message text to display. |
| `,e.jsx(s.code,{children:"type"})," | ",e.jsx(s.code,{children:'"success" \\| "error" \\| "warning" \\| "info" \\| "primary" \\| "danger" \\| string'})," | ",e.jsx(s.code,{children:'"info"'}),` | Severity type determining icon and background color. |
| `,e.jsx(s.code,{children:"duration"})," | ",e.jsx(s.code,{children:"number"})," | ",e.jsx(s.code,{children:"1500"}),` | Auto-dismiss duration in milliseconds. |
| `,e.jsx(s.code,{children:"position"})," | ",e.jsx(s.code,{children:'"top-right" \\| "top-center" \\| "top-left" \\| "bottom-right" \\| "bottom-center" \\| "bottom-left"'})," | ",e.jsx(s.code,{children:'"top-right"'}),` | On-screen placement of the toast. |
| `,e.jsx(s.code,{children:"onClose"})," | ",e.jsx(s.code,{children:"() => void"})," | — | Callback invoked after the toast finishes its dismiss transition animation. |"]}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { ITToast } from '@axzydev/axzy_ui_system';

<ITToast message="Operation completed successfully!" type="success" />

<ITToast
  message="There was a critical error processing your request."
  type="error"
  position="top-center"
  duration={5000}
  onClose={() => console.log("dismissed")}
/>
`})}),`
`,e.jsx(s.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"type"})," values map to icons: ",e.jsx(s.code,{children:"success"})," → check circle, ",e.jsx(s.code,{children:"error"})," → times circle, ",e.jsx(s.code,{children:"warning"})," → exclamation triangle, ",e.jsx(s.code,{children:"info"})," → info circle. Unknown types fall back to the info icon."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"duration"})," starts counting after mount; the toast fades out with a 300ms transition after the timer expires."]}),`
`,e.jsxs(s.li,{children:["The toast renders with ",e.jsx(s.code,{children:"position: fixed"}),", so it overlays all page content at the chosen screen edge."]}),`
`,e.jsxs(s.li,{children:["A close button (",e.jsx(s.code,{children:"×"}),") is always present for manual dismissal."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"onClose"})," fires after the fade-out transition completes — useful for unmounting the toast from a list."]}),`
`,e.jsxs(s.li,{children:["For managing multiple toasts simultaneously, wrap with a toast provider context pattern outside ",e.jsx(s.code,{children:"ITToast"}),"."]}),`
`,e.jsx(s.li,{children:"All types also accept raw hex color strings, which get applied as background behind the themed icon."}),`
`]}),`
`,e.jsx(s.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(r,{}),`
`,e.jsx(c,{}),`
`,e.jsx(a,{})]})}function m(n={}){const{wrapper:s}={...o(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}export{m as default};
