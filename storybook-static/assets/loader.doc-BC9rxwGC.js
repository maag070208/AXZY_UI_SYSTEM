import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as o,P as c,C as d,S as a}from"./blocks-DefDVuP9.js";import{S as l}from"./loader.stories-C40dQ1r5.js";import"./preload-helper-C1FmrZbK.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
`,e.jsx(n.h1,{id:"itloader",children:"ITLoader"}),`
`,e.jsx(n.p,{children:"A loading indicator with four animation variants and customizable sizing and color. Useful for async operations, data fetching states, and any in-progress feedback."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"'spinner' \\| 'dots' \\| 'bar' \\| 'pulse'"})," | ",e.jsx(n.code,{children:"'spinner'"}),` | Animation style. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"'sm' \\| 'md' \\| 'lg' \\| 'xl'"})," | ",e.jsx(n.code,{children:"'md'"}),` | Size preset. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"'primary'"})," | Color value. Accepts theme semantic keys (",e.jsx(n.code,{children:"primary"}),", ",e.jsx(n.code,{children:"secondary"}),", ",e.jsx(n.code,{children:"success"}),", ",e.jsx(n.code,{children:"danger"}),", ",e.jsx(n.code,{children:"warning"}),", ",e.jsx(n.code,{children:"info"}),", ",e.jsx(n.code,{children:"purple"}),`), hex, rgb, or CSS class. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"})," | Additional CSS classes. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITLoader } from '@axzydev/axzy_ui_system';

<ITLoader />
<ITLoader variant="dots" color="secondary" size="lg" />
<ITLoader variant="bar" color="success" />
<ITLoader variant="pulse" color="danger" size="xl" />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spinner"})," — rotating circular indicator."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"dots"})," — bouncing dots sequence."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"pulse"})," — pulsing circle with scaling animation."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"bar"})," — horizontal indeterminate progress bar (intended for use in a container with explicit width)."]}),`
`,e.jsx(n.li,{children:"Color mapping is handled through the theme system; semantic keys resolve to CSS custom properties."}),`
`,e.jsx(n.li,{children:"All animations use CSS keyframes with GPU-accelerated transforms where possible."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(d,{}),`
`,e.jsx(a,{})]})}function p(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{p as default};
