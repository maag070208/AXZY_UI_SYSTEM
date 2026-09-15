import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as o,P as d,C as i,S as l}from"./blocks-DefDVuP9.js";import{S as a}from"./text.stories-DrGgs2Ea.js";import"./preload-helper-C1FmrZbK.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a}),`
`,e.jsx(n.h1,{id:"ittext",children:"ITText"}),`
`,e.jsx(n.p,{children:"Semantic typography wrapper rendering any HTML text element. Foundation for all text in the system."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"as"})," | ",e.jsx(n.code,{children:"'p' \\| 'span' \\| 'h1' \\| 'h2' \\| 'h3' \\| 'h4' \\| 'h5' \\| 'h6' \\| 'small' \\| 'label' \\| 'strong' \\| 'em'"})," | ",e.jsx(n.code,{children:"'p'"}),` | HTML element to render |
| `,e.jsx(n.code,{children:"muted"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Apply muted style via CSS variable |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"})," | — | Text content |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITText } from '@axzydev/axzy_ui_system';

<ITText>Default paragraph text</ITText>
<ITText as="h1">Heading level 1</ITText>
<ITText as="span" muted>Muted secondary text</ITText>
<ITText as="small">Small print</ITText>
<ITText as="strong">Bold emphasis</ITText>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Polymorphic ",e.jsx(n.code,{children:"as"})," prop renders any HTML text-level element"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"muted"})," toggles a CSS variable for reduced-importance text"]}),`
`,e.jsx(n.li,{children:"Used as the foundational text component throughout the system"}),`
`,e.jsxs(n.li,{children:["Renders default paragraph (",e.jsx(n.code,{children:"<p>"}),") when no ",e.jsx(n.code,{children:"as"})," specified"]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(d,{}),`
`,e.jsx(i,{}),`
`,e.jsx(l,{})]})}function m(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{m as default};
