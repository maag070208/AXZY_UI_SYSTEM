import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as o,P as t,C as d,S as r}from"./blocks-DefDVuP9.js";import{S as c}from"./segmented-control.stories-DZ05jABE.js";import"./preload-helper-C1FmrZbK.js";function l(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
`,e.jsx(n.h1,{id:"itsegmentedcontrol",children:"ITSegmentedControl"}),`
`,e.jsx(n.p,{children:"iOS-style segmented toggle for mutually exclusive options with optional icons. Supports two sizes and a disabled state. Ideal for filter and view switching."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"options"})," | ",e.jsx(n.code,{children:"ISegmentedOption[]"})," | — | Array of mutually exclusive options: ",e.jsx(n.code,{children:"{ value: string, label: string, icon?: ReactNode }"}),`. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"string"}),` | — | Currently selected value (controlled). |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(value: string) => void"}),` | — | Callback fired when the user selects a different option. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:'"sm" \\| "md"'})," | ",e.jsx(n.code,{children:'"md"'}),` | Control size. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes on the container. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Whether the entire control is disabled. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITSegmentedControl } from '@axzydev/axzy_ui_system';

<ITSegmentedControl
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
  value={selected}
  onChange={setSelected}
/>

<ITSegmentedControl
  size="sm"
  options={[
    { value: "list", label: "List", icon: <FaList /> },
    { value: "grid", label: "Grid", icon: <FaTh /> },
  ]}
  value={view}
  onChange={setView}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Only one option can be selected at a time — mutually exclusive by design."}),`
`,e.jsxs(n.li,{children:["Each option may include an optional ",e.jsx(n.code,{children:"icon"})," rendered alongside the label."]}),`
`,e.jsxs(n.li,{children:["Two sizes available: ",e.jsx(n.code,{children:"sm"})," (compact) and ",e.jsx(n.code,{children:"md"})," (default)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"disabled"})," applies to all segments simultaneously."]}),`
`,e.jsx(n.li,{children:"Commonly used for view toggling (list/grid), date range selection (day/week/month), and filter switching."}),`
`,e.jsxs(n.li,{children:["Fully controlled component: ",e.jsx(n.code,{children:"value"})," and ",e.jsx(n.code,{children:"onChange"})," are required."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(t,{}),`
`,e.jsx(d,{}),`
`,e.jsx(r,{})]})}function j(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(l,{...s})}):l(s)}export{j as default};
