import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as s,P as o,C as c,S as d}from"./blocks-DefDVuP9.js";import{S as l}from"./skeleton.stories-PgOaW_qg.js";import"./preload-helper-C1FmrZbK.js";function t(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(n.h1,{id:"itskeleton",children:"ITSkeleton"}),`
`,e.jsx(n.p,{children:"Content placeholder loaders used during data loading to indicate upcoming content."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"'text' \\| 'circular' \\| 'rectangular' \\| 'rounded'"})," | ",e.jsx(n.code,{children:"'text'"}),` | Shape of the skeleton placeholder |
| `,e.jsx(n.code,{children:"animation"})," | ",e.jsx(n.code,{children:"'pulse' \\| 'wave' \\| 'none'"})," | ",e.jsx(n.code,{children:"'pulse'"}),` | Animation style |
| `,e.jsx(n.code,{children:"width"})," | ",e.jsx(n.code,{children:"number \\| string"}),` | — | Width of the skeleton |
| `,e.jsx(n.code,{children:"height"})," | ",e.jsx(n.code,{children:"number \\| string"}),` | — | Height of the skeleton |
| `,e.jsx(n.code,{children:"count"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"1"})," | Number of skeleton items to render |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITSkeleton } from '@axzydev/axzy_ui_system';

<ITSkeleton />
<ITSkeleton variant="circular" width={40} height={40} />
<ITSkeleton variant="rectangular" width="100%" height={200} animation="wave" />
<ITSkeleton variant="text" count={3} />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use during data loading to reduce perceived wait time"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"count"})," prop repeats the skeleton for placeholder lists or paragraphs"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"rectangular"})," variant suits image or card placeholders"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"circular"})," variant suits avatar or icon placeholders"]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:'animation="none"'})," for static placeholders"]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(c,{}),`
`,e.jsx(d,{})]})}function u(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{u as default};
