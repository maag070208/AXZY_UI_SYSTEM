import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as r,P as c,C as o,S as l}from"./blocks-DefDVuP9.js";import{S as t}from"./grid.stories-CIzsrssH.js";import"./preload-helper-C1FmrZbK.js";function i(d){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:t}),`
`,e.jsx(n.h1,{id:"itgrid",children:"ITGrid"}),`
`,e.jsx(n.p,{children:"A responsive 12-column CSS grid system for building flexible layouts. Supports grid container and item modes, configurable column spans per breakpoint, and customizable gap spacing."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Child elements rendered inside the grid. |
| `,e.jsx(n.code,{children:"container"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | When true, renders as a CSS grid parent. |
| `,e.jsx(n.code,{children:"item"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | When true, renders as a CSS grid child with column span. |
| `,e.jsx(n.code,{children:"spacing"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"}),` | Gap between children in units of 0.25rem. Container only. |
| `,e.jsx(n.code,{children:"columns"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"12"}),` | Number of grid columns (1-12). Container only. |
| `,e.jsx(n.code,{children:"xs"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"})," | Column span at base breakpoint (mobile). Falls back to ",e.jsx(n.code,{children:"sm"}),`. |
| `,e.jsx(n.code,{children:"sm"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"})," | Column span at the ",e.jsx(n.code,{children:"sm"}),` breakpoint. |
| `,e.jsx(n.code,{children:"md"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"})," | Column span at the ",e.jsx(n.code,{children:"md"}),` breakpoint. |
| `,e.jsx(n.code,{children:"lg"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"})," | Column span at the ",e.jsx(n.code,{children:"lg"}),` breakpoint. |
| `,e.jsx(n.code,{children:"xl"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"})," | Column span at the ",e.jsx(n.code,{children:"xl"}),` breakpoint. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Additional CSS classes. |
| `,e.jsx(n.code,{children:"style"})," | ",e.jsx(n.code,{children:"CSSProperties"})," | ",e.jsx(n.code,{children:"undefined"}),` | Inline styles. |
| `,e.jsx(n.code,{children:"as"})," | ",e.jsx(n.code,{children:"ElementType"})," | ",e.jsx(n.code,{children:"'div'"})," | Custom HTML element type to render instead of div. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITGrid } from '@axzydev/axzy_ui_system';

<ITGrid container spacing={3}>
  <ITGrid item xs={12} md={8}>
    <div>Main content</div>
  </ITGrid>
  <ITGrid item xs={12} md={4}>
    <div>Sidebar</div>
  </ITGrid>
</ITGrid>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Uses CSS Grid under the hood with responsive breakpoint classes."}),`
`,e.jsxs(n.li,{children:["Omitting both ",e.jsx(n.code,{children:"container"})," and ",e.jsx(n.code,{children:"item"})," renders a plain ",e.jsx(n.code,{children:"div"})," with no grid behavior."]}),`
`,e.jsxs(n.li,{children:["Breakpoint spans cascade down: if ",e.jsx(n.code,{children:"lg"})," is not set, it inherits ",e.jsx(n.code,{children:"md"}),", then ",e.jsx(n.code,{children:"sm"}),", then ",e.jsx(n.code,{children:"xs"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spacing"})," multiplies by 0.25rem internally (spacing=",2," = 0.5rem gap)."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(o,{}),`
`,e.jsx(l,{})]})}function m(d={}){const{wrapper:n}={...s(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(i,{...d})}):i(d)}export{m as default};
