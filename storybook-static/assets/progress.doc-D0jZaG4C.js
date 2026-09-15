import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as o,P as d,C as c,S as l}from"./blocks-DefDVuP9.js";import{S as t}from"./progress.stories-Dfc6o7de.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:t}),`
`,e.jsx(n.h1,{id:"itprogress",children:"ITProgress"}),`
`,e.jsx(n.p,{children:"Progress indicator with determinate and indeterminate variants. Supports multiple semantic colors and three sizes for indicating completion or loading states."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"0"}),` | Current progress value. |
| `,e.jsx(n.code,{children:"max"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"100"}),` | Maximum progress value. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:'"determinate" \\| "indeterminate"'})," | ",e.jsx(n.code,{children:'"determinate"'})," | Progress variant. ",e.jsx(n.code,{children:'"determinate"'})," shows a fixed-width fill, ",e.jsx(n.code,{children:'"indeterminate"'}),` shows an animated pulsing bar. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:'"primary" \\| "secondary" \\| "success" \\| "danger" \\| "warning" \\| "info" \\| "purple" \\| "error" \\| "gray"'})," | ",e.jsx(n.code,{children:'"primary"'}),` | Semantic color for the progress fill. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:'"sm" \\| "md" \\| "lg"'})," | ",e.jsx(n.code,{children:'"md"'}),` | Height and visual scale of the progress bar. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes for the container. |
| `,e.jsx(n.code,{children:"style"})," | ",e.jsx(n.code,{children:"CSSProperties"})," | — | Inline styles applied to the container. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITProgress } from '@axzydev/axzy_ui_system';

<ITProgress value={70} />

<ITProgress value={45} color="success" size="lg" />

<ITProgress variant="indeterminate" />

<ITProgress value={90} color="danger" size="sm" />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"determinate"})," mode shows a solid fill proportional to ",e.jsx(n.code,{children:"value / max"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"indeterminate"})," mode renders a continuous animated bar for loading states where progress is unknown."]}),`
`,e.jsx(n.li,{children:"All nine semantic colors are available for the fill."}),`
`,e.jsxs(n.li,{children:["Sizes ",e.jsx(n.code,{children:"sm"}),", ",e.jsx(n.code,{children:"md"}),", and ",e.jsx(n.code,{children:"lg"})," control bar height and overall scale."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"style"})," for custom width or container-level overrides."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(d,{}),`
`,e.jsx(c,{}),`
`,e.jsx(l,{})]})}function j(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{j as default};
