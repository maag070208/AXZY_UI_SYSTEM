import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as i,P as d,C as t,S as l}from"./blocks-DefDVuP9.js";import{S as a}from"./form-header.stories-CChx7gs3.js";import"./preload-helper-C1FmrZbK.js";function o(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:a}),`
`,e.jsx(n.h1,{id:"itformheader",children:"ITFormHeader"}),`
`,e.jsx(n.p,{children:"A colored header bar for modal dialogs and form containers. Displays a title centered on a primary-colored background, with an optional close (X) button on the right side."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"}),` | required | Header title text, centered in the bar. |
| `,e.jsx(n.code,{children:"onClose"})," | ",e.jsx(n.code,{children:"() => void"})," | ",e.jsx(n.code,{children:"undefined"}),` | Optional close button handler. When provided, an X button renders. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"})," | Additional CSS classes applied to the container. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITFormHeader } from '@axzydev/axzy_ui_system';

<ITFormHeader title="Edit Record" />
<ITFormHeader title="Confirm" onClose={() => handleClose()} />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Uses the theme primary color as the background."}),`
`,e.jsx(n.li,{children:"The title truncates with ellipsis when it overflows the available width."}),`
`,e.jsxs(n.li,{children:["Close button is only rendered when ",e.jsx(n.code,{children:"onClose"})," is provided."]}),`
`,e.jsx(n.li,{children:"Intended for use inside modals, drawers, or form panels."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(d,{}),`
`,e.jsx(t,{}),`
`,e.jsx(l,{})]})}function m(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(o,{...r})}):o(r)}export{m as default};
