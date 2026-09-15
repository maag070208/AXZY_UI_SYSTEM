import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as t,P as c,C as l,S as d}from"./blocks-DefDVuP9.js";import{S as a}from"./stack.stories-BPBplXPo.js";import"./preload-helper-C1FmrZbK.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:a}),`
`,e.jsx(n.h1,{id:"itstack",children:"ITStack"}),`
`,e.jsx(n.p,{children:"ITStack is a simplified flexbox layout primitive for consistent spacing and alignment. It controls direction, gap, cross-axis alignment, main-axis justification, and flex wrapping in a single component, with optional dividers between children."}),`
`,e.jsx(n.p,{children:"ITStack powers most internal layouts across the AXZY UI System — from button toolbars and form rows to card lists and centered hero sections."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Stack children elements. |
| `,e.jsx(n.code,{children:"direction"})," | ",e.jsx(n.code,{children:'"column" \\| "row" \\| "row-reverse" \\| "column-reverse"'})," | ",e.jsx(n.code,{children:'"column"'}),` | Flex direction. |
| `,e.jsx(n.code,{children:"spacing"})," | ",e.jsx(n.code,{children:"number"})," (0–12) | ",e.jsx(n.code,{children:"0"})," | Gap between children in ",e.jsx(n.code,{children:"0.25rem"})," units. ",e.jsx(n.code,{children:"spacing={4}"})," = ",e.jsx(n.code,{children:"1rem"}),` gap. |
| `,e.jsx(n.code,{children:"alignItems"})," | ",e.jsx(n.code,{children:'"start" \\| "end" \\| "center" \\| "stretch" \\| "baseline"'}),` | — | Cross-axis alignment: vertical in row, horizontal in column. |
| `,e.jsx(n.code,{children:"justifyContent"})," | ",e.jsx(n.code,{children:'"start" \\| "end" \\| "center" \\| "between" \\| "around" \\| "evenly"'}),` | — | Main-axis distribution of children. |
| `,e.jsx(n.code,{children:"flexWrap"})," | ",e.jsx(n.code,{children:'"nowrap" \\| "wrap" \\| "wrap-reverse"'}),` | — | Whether children wrap to the next line. |
| `,e.jsx(n.code,{children:"divider"})," | ",e.jsx(n.code,{children:"ReactNode"})," | — | Optional element rendered between each pair of children via ",e.jsx(n.code,{children:"cloneElement"}),`. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes on the container. |
| `,e.jsx(n.code,{children:"style"})," | ",e.jsx(n.code,{children:"CSSProperties"}),` | — | Inline styles on the container. |
| `,e.jsx(n.code,{children:"as"})," | ",e.jsx(n.code,{children:"ElementType"})," | ",e.jsx(n.code,{children:'"div"'})," | HTML element to render as — ",e.jsx(n.code,{children:'"section"'}),", ",e.jsx(n.code,{children:'"nav"'}),", ",e.jsx(n.code,{children:'"ul"'}),", ",e.jsx(n.code,{children:'"form"'}),", etc. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITStack } from '@axzydev/axzy_ui_system';

// ── Vertical (default) ──
<ITStack spacing={4}>
  <h2>Section Title</h2>
  <p>Section content goes here.</p>
</ITStack>

// ── Horizontal toolbar ──
<ITStack direction="row" spacing={2} alignItems="center" justifyContent="between">
  <ITButton>Cancel</ITButton>
  <ITButton color="primary">Save</ITButton>
</ITStack>

// ── Form row with wrap ──
<ITStack direction="row" spacing={3} flexWrap="wrap">
  <ITInput name="first" label="First Name" />
  <ITInput name="last" label="Last Name" />
  <ITInput name="email" label="Email" />
</ITStack>

// ── Card list with dividers ──
<ITStack spacing={0} divider={<hr />}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ITStack>

// ── Tag cloud ──
<ITStack direction="row" spacing={1} flexWrap="wrap">
  {tags.map((t) => <ITBadget key={t} label={t} />)}
</ITStack>

// ── Centered hero ──
<ITStack spacing={4} alignItems="center" justifyContent="center" className="h-64">
  <h1>Hero Title</h1>
  <p>Subtitle text</p>
  <ITButton label="CTA" />
</ITStack>

// ── Semantic list (as="ul") ──
<ITStack as="ul" spacing={2}>
  <li>First item</li>
  <li>Second item</li>
</ITStack>
`})}),`
`,e.jsx(n.h2,{id:"variants--patterns",children:"Variants & Patterns"}),`
`,e.jsx(n.h3,{id:"direction",children:"Direction"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"column"})," — default; stacks children vertically."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"row"})," — stacks children horizontally (toolbars, button groups)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"row-reverse"})," / ",e.jsx(n.strong,{children:"column-reverse"})," — reverse the visual order."]}),`
`]}),`
`,e.jsx(n.h3,{id:"spacing",children:"Spacing"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Measured in 0.25rem units (Tailwind spacing scale)."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spacing={0}"})," = no gap (compact)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spacing={4}"})," = 1rem (comfortable)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spacing={8}"})," = 2rem (breathing room)."]}),`
`]}),`
`,e.jsx(n.h3,{id:"justify-content-main-axis",children:"Justify Content (main axis)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"start"})," — children packed at the start."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"center"})," — children centered."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"end"})," — children packed at the end."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"between"})," — first/last at edges, others spaced evenly."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"around"})," — equal space around each child."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"evenly"})," — equal space between all items and edges."]}),`
`]}),`
`,e.jsx(n.h3,{id:"align-items-cross-axis",children:"Align Items (cross axis)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"start"})," — align to the start of the cross axis."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"center"})," — center on the cross axis."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"end"})," — align to the end."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"stretch"})," — stretch to fill (default CSS flex behavior)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"baseline"})," — align text baselines."]}),`
`]}),`
`,e.jsx(n.h3,{id:"wrap",children:"Wrap"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"nowrap"})," — default; overflow if needed."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"wrap"})," — children wrap to the next line when out of space (great for tags, chips)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"wrap-reverse"})," — wrap in reverse order."]}),`
`]}),`
`,e.jsx(n.h3,{id:"divider",children:"Divider"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Takes a single React element, cloned between each pair of children."}),`
`,e.jsxs(n.li,{children:["Common dividers: ",e.jsx(n.code,{children:"<hr />"}),", ",e.jsx(n.code,{children:'<div className="h-px bg-slate-200" />'}),", vertical bars for row direction."]}),`
`]}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["ITStack is ",e.jsx(n.strong,{children:"always"})," ",e.jsx(n.code,{children:"display: flex"})," — use ",e.jsx(n.code,{children:"direction"})," to switch between vertical/horizontal."]}),`
`,e.jsxs(n.li,{children:["For complex multi-axis layouts (direction + wrap + alignment simultaneously), prefer ",e.jsx(n.strong,{children:"ITFlex"}),"."]}),`
`,e.jsxs(n.li,{children:["For CSS Grid layouts (columns), use ",e.jsx(n.strong,{children:"ITGrid"}),"."]}),`
`,e.jsxs(n.li,{children:["Spacing is applied via the CSS ",e.jsx(n.code,{children:"gap"})," property, cleanly separating layout from children."]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:'as="ul"'})," and wrap children in ",e.jsx(n.code,{children:"<li>"})," for semantic list rendering."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(l,{}),`
`,e.jsx(d,{})]})}function p(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{p as default};
