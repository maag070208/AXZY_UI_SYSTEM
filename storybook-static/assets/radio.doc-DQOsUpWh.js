import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as r,P as l,C as d,S as t}from"./blocks-DefDVuP9.js";import{S as a}from"./radio.stories-DtZX_Lso.js";import"./preload-helper-C1FmrZbK.js";function i(o){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a}),`
`,e.jsx(n.h1,{id:"itradiogroup",children:"ITRadioGroup"}),`
`,e.jsx(n.p,{children:"Radio button group for selecting a single option from a set. Supports horizontal and vertical layouts, disabled state, and an options-array API for declarative rendering."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"}),` | — | Name attribute for the radio input group. Used for form accessibility. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"string"}),` | — | Currently selected value (controlled). |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(value: string) => void"}),` | — | Callback fired when a radio option is selected. |
| `,e.jsx(n.code,{children:"options"})," | ",e.jsx(n.code,{children:"ITRadioOption[]"})," | — | Array of radio options: ",e.jsx(n.code,{children:"{ value: string, label: ReactNode }"}),`. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the entire radio group is disabled. |
| `,e.jsx(n.code,{children:"direction"})," | ",e.jsx(n.code,{children:'"row" \\| "column"'})," | ",e.jsx(n.code,{children:'"column"'}),` | Layout direction of the radio options. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS classes for the container. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITRadioGroup } from '@axzydev/axzy_ui_system';

<ITRadioGroup
  name="size"
  value={selected}
  onChange={setSelected}
  options={[
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ]}
/>

<ITRadioGroup
  name="layout"
  value={selected}
  onChange={setSelected}
  direction="row"
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Fully controlled component: ",e.jsx(n.code,{children:"value"})," and ",e.jsx(n.code,{children:"onChange"})," must be provided."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'direction="column"'})," stacks options vertically; ",e.jsx(n.code,{children:'direction="row"'})," lays them out horizontally."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"disabled"})," disables all radio inputs in the group at once."]}),`
`,e.jsxs(n.li,{children:["Label accepts ",e.jsx(n.code,{children:"ReactNode"}),", allowing rich content like icons or custom markup."]}),`
`,e.jsxs(n.li,{children:["Group uses a shared ",e.jsx(n.code,{children:"name"})," attribute, ensuring mutual exclusivity across options."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(l,{}),`
`,e.jsx(d,{}),`
`,e.jsx(t,{})]})}function p(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{p as default};
