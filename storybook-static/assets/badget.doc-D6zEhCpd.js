import{j as e}from"./iframe-B5RMobo9.js";import{u as d,M as i,P as c,C as l,S as o}from"./blocks-DefDVuP9.js";import{S as t}from"./badget.stories-C823Wenw.js";import"./preload-helper-C1FmrZbK.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...d(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:t}),`
`,e.jsx(n.h1,{id:"itbadget",children:"ITBadget"}),`
`,e.jsx(n.p,{children:"Small status tags and labels for highlighting metadata, categories, or states. Offers filled and outlined visual variants across all semantic color themes. Accepts either a simple label string or custom React children for complex content."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"})," | — | Text label displayed inside the badge. Overridden if ",e.jsx(n.code,{children:"children"}),` is provided. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"})," | — | Custom content rendered inside the badge. Takes precedence over ",e.jsx(n.code,{children:"label"}),`. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"ColorsTypes"})," | ",e.jsx(n.code,{children:'"primary"'})," | Color theme key (",e.jsx(n.code,{children:'"primary"'}),", ",e.jsx(n.code,{children:'"secondary"'}),", ",e.jsx(n.code,{children:'"success"'}),", ",e.jsx(n.code,{children:'"danger"'}),", ",e.jsx(n.code,{children:'"warning"'}),", ",e.jsx(n.code,{children:'"purple"'}),", ",e.jsx(n.code,{children:'"info"'}),`). |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"SizesTypes"})," | ",e.jsx(n.code,{children:'"md"'})," | Badge size (",e.jsx(n.code,{children:'"sm"'}),", ",e.jsx(n.code,{children:'"md"'}),", ",e.jsx(n.code,{children:'"lg"'}),`). |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:'"filled" \\| "outlined"'})," | ",e.jsx(n.code,{children:'"filled"'}),` | Visual style — solid background or transparent with colored border. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS class names for the badge element. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITBadget } from '@axzydev/axzy_ui_system';

<ITBadget label="Active" color="success" variant="filled" />

<ITBadget color="danger" variant="outlined" size="sm">
  <span className="flex items-center gap-1">3 new</span>
</ITBadget>
`})}),`
`,e.jsx(n.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"filled"})," — Solid background with contrasting text (default for most theme colors)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"outlined"})," — Transparent background with a colored border and darker text."]}),`
`,e.jsxs(n.li,{children:["Colors include ",e.jsx(n.code,{children:"primary"}),", ",e.jsx(n.code,{children:"secondary"}),", ",e.jsx(n.code,{children:"success"}),", ",e.jsx(n.code,{children:"danger"}),", ",e.jsx(n.code,{children:"warning"}),", ",e.jsx(n.code,{children:"purple"}),", and ",e.jsx(n.code,{children:"info"}),"."]}),`
`,e.jsxs(n.li,{children:["Border radius defaults to fully rounded (",e.jsx(n.code,{children:"borderRadius: 9999px"}),"), giving a pill shape."]}),`
`,e.jsx(n.li,{children:"Styles are fully theme-driven via the centralized theme configuration."}),`
`,e.jsxs(n.li,{children:["Custom children override the ",e.jsx(n.code,{children:"label"})," prop entirely."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(l,{}),`
`,e.jsx(o,{})]})}function p(s={}){const{wrapper:n}={...d(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{p as default};
