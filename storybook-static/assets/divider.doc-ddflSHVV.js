import{j as i}from"./iframe-B5RMobo9.js";import{u as r,M as o,P as t,C as c,S as d}from"./blocks-DefDVuP9.js";import{S as l}from"./divider.stories-cLuQFdzm.js";import"./preload-helper-C1FmrZbK.js";function s(n){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...n.components};return i.jsxs(i.Fragment,{children:[i.jsx(o,{of:l}),`
`,i.jsx(e.h1,{id:"itdivider",children:"ITDivider"}),`
`,i.jsx(e.p,{children:"A thin horizontal or vertical separator line for visually dividing content sections. Supports custom color and thickness via Tailwind utility classes."}),`
`,i.jsx(e.h2,{id:"props",children:"Props"}),`
`,i.jsxs(e.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,i.jsx(e.code,{children:"orientation"})," | ",i.jsx(e.code,{children:'"horizontal" \\| "vertical"'})," | ",i.jsx(e.code,{children:'"horizontal"'}),` | Direction the divider flows. |
| `,i.jsx(e.code,{children:"className"})," | ",i.jsx(e.code,{children:"string"}),` | — | Additional CSS classes. |
| `,i.jsx(e.code,{children:"color"})," | ",i.jsx(e.code,{children:"string"})," | ",i.jsx(e.code,{children:'"bg-slate-200 dark:bg-slate-700"'}),` | Tailwind background color class(es). |
| `,i.jsx(e.code,{children:"thickness"})," | ",i.jsx(e.code,{children:"string"})," | ",i.jsx(e.code,{children:'"h-px"'})," (horizontal) / ",i.jsx(e.code,{children:'"w-px"'})," (vertical) | Tailwind width/height utility. |"]}),`
`,i.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-tsx",children:`import { ITDivider } from '@axzydev/axzy_ui_system';

<ITDivider />

<ITDivider orientation="vertical" color="bg-red-500" thickness="w-1" />

<ITDivider color="bg-primary-300" thickness="h-0.5" />
`})}),`
`,i.jsx(e.h2,{id:"notes",children:"Notes"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:"Horizontal divider is full-width by default; vertical divider is full-height of its parent."}),`
`,i.jsx(e.li,{children:"Use in combination with ITStack or ITFlex for consistent layout spacing between sections."}),`
`,i.jsxs(e.li,{children:["Auto-detects orientation for default thickness: ",i.jsx(e.code,{children:"h-px"})," for horizontal, ",i.jsx(e.code,{children:"w-px"})," for vertical."]}),`
`,i.jsxs(e.li,{children:["The ",i.jsx(e.code,{children:"color"})," prop accepts any valid Tailwind background color class, including dark mode variants."]}),`
`]}),`
`,i.jsx(e.h2,{id:"stories",children:"Stories"}),`
`,i.jsx(t,{}),`
`,i.jsx(c,{}),`
`,i.jsx(d,{})]})}function p(n={}){const{wrapper:e}={...r(),...n.components};return e?i.jsx(e,{...n,children:i.jsx(s,{...n})}):s(n)}export{p as default};
