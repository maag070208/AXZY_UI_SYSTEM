import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as c,P as o,C as d,S as l}from"./blocks-DefDVuP9.js";import{S as t}from"./flex.stories-DS_myVHF.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:t}),`
`,e.jsx(n.h1,{id:"itflex",children:"ITFlex"}),`
`,e.jsx(n.p,{children:"A complete flexbox layout container exposing the full CSS Flexbox API through React props. Supports direction, wrap, alignment, justification, gap, grow, shrink, basis, and custom element rendering."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Child elements inside the flex container. |
| `,e.jsx(n.code,{children:"direction"})," | ",e.jsx(n.code,{children:'"row" \\| "column" \\| "row-reverse" \\| "column-reverse"'}),` | — | Main axis direction. |
| `,e.jsx(n.code,{children:"align"})," | ",e.jsx(n.code,{children:'"start" \\| "end" \\| "center" \\| "stretch" \\| "baseline"'}),` | — | Cross-axis alignment. |
| `,e.jsx(n.code,{children:"justify"})," | ",e.jsx(n.code,{children:'"start" \\| "end" \\| "center" \\| "between" \\| "around" \\| "evenly"'}),` | — | Main-axis justification. |
| `,e.jsx(n.code,{children:"wrap"})," | ",e.jsx(n.code,{children:'"nowrap" \\| "wrap" \\| "wrap-reverse"'}),` | — | Wrapping behavior. |
| `,e.jsx(n.code,{children:"gap"})," | ",e.jsx(n.code,{children:"number"})," | — | Gap between children in units of ",e.jsx(n.code,{children:"0.25rem"}),`. |
| `,e.jsx(n.code,{children:"grow"})," | ",e.jsx(n.code,{children:"boolean \\| number"})," | — | Flex grow factor. ",e.jsx(n.code,{children:"true"})," = 1, ",e.jsx(n.code,{children:"false"}),` = 0, or pass a number. |
| `,e.jsx(n.code,{children:"shrink"})," | ",e.jsx(n.code,{children:"boolean \\| number"})," | — | Flex shrink factor. Works like ",e.jsx(n.code,{children:"grow"}),`. |
| `,e.jsx(n.code,{children:"basis"})," | ",e.jsx(n.code,{children:"string \\| number"})," | — | Flex basis value. Numbers multiplied by ",e.jsx(n.code,{children:"0.25rem"}),`; strings used as-is. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes. |
| `,e.jsx(n.code,{children:"style"})," | ",e.jsx(n.code,{children:"CSSProperties"}),` | — | Inline styles. |
| `,e.jsx(n.code,{children:"as"})," | ",e.jsx(n.code,{children:"ElementType"})," | ",e.jsx(n.code,{children:'"div"'}),` | Custom HTML element type to render. |
| `,e.jsx(n.code,{children:"onClick"})," | ",e.jsx(n.code,{children:"(e: React.MouseEvent) => void"})," | — | Click handler. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITFlex } from '@axzydev/axzy_ui_system';

<ITFlex direction="row" gap={3} justify="between" align="center">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</ITFlex>

<ITFlex direction="column" gap={2} className="h-60">
  <ITFlex grow className="bg-primary-100 rounded-lg p-4">
    <span>Grow (flex: 1)</span>
  </ITFlex>
  <div className="w-full">Fixed height</div>
</ITFlex>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"gap"})," accepts an integer where ",e.jsx(n.code,{children:"1"})," = ",e.jsx(n.code,{children:"0.25rem"})," (4px), ",e.jsx(n.code,{children:"4"})," = ",e.jsx(n.code,{children:"1rem"})," (16px), etc., matching Tailwind's spacing scale."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"as"})," prop allows rendering as a ",e.jsx(n.code,{children:"<section>"}),", ",e.jsx(n.code,{children:"<nav>"}),", ",e.jsx(n.code,{children:"<form>"}),", or any other semantic HTML element."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"grow"})," and ",e.jsx(n.code,{children:"shrink"})," accept ",e.jsx(n.code,{children:"boolean"})," for quick on/off or ",e.jsx(n.code,{children:"number"})," for precise flex factor control."]}),`
`,e.jsxs(n.li,{children:["Combine ",e.jsx(n.code,{children:"basis"}),", ",e.jsx(n.code,{children:"grow"}),", and ",e.jsx(n.code,{children:"shrink"})," for complete flex item control on the container itself."]}),`
`,e.jsxs(n.li,{children:["All flex props are optional — the component renders as a standard ",e.jsx(n.code,{children:"div"})," when no layout props are set."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(d,{}),`
`,e.jsx(l,{})]})}function p(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{p as default};
