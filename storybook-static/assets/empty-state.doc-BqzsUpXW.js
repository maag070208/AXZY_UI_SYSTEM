import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as s,P as r,C as a,S as c}from"./blocks-DefDVuP9.js";import{S as l}from"./empty-state.stories-D4nadneG.js";import"./preload-helper-C1FmrZbK.js";function i(t){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(n.h1,{id:"itemptystate",children:"ITEmptyState"}),`
`,e.jsx(n.p,{children:"A placeholder component for displaying a message when no data is available. Configurable icon, title, description, and an action slot for contextual buttons."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"icon"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"<FaInbox size={40} />"}),` | Icon or illustration displayed above the title. |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"}),` | — | Primary heading text (required). |
| `,e.jsx(n.code,{children:"description"})," | ",e.jsx(n.code,{children:"string"}),` | — | Secondary explanatory text. |
| `,e.jsx(n.code,{children:"action"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Action element (typically a button) rendered below the description. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS classes for the wrapper. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITEmptyState } from '@axzydev/axzy_ui_system';

<ITEmptyState
  title="No results"
  description="No data found for the selected filters."
  action={<ITButton label="Clear filters" variant="outlined" size="sm" />}
/>

<ITEmptyState
  icon={<FaDatabase size={48} />}
  title="No records"
  description="Create your first record to get started."
  action={<ITButton label="Create Record" variant="primary" />}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default icon is ",e.jsx(n.code,{children:"FaInbox"})," from react-icons — override with any ReactNode for custom illustrations."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"action"})," slot accepts any ReactNode, most commonly an ",e.jsx(n.code,{children:"ITButton"})," for navigation or reset actions."]}),`
`,e.jsx(n.li,{children:"Centers all content vertically and horizontally within its container."}),`
`,e.jsx(n.li,{children:"Works well as a fallback inside tables, cards, and search result containers."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(r,{}),`
`,e.jsx(a,{}),`
`,e.jsx(c,{})]})}function j(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{j as default};
