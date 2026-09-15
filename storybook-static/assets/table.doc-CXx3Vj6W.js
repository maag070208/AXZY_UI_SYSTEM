import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as d,P as i,C as t,S as l}from"./blocks-DefDVuP9.js";import{S as a}from"./table.stories-DfM96WeG.js";import"./preload-helper-C1FmrZbK.js";function o(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a}),`
`,e.jsx(n.h1,{id:"ittable",children:"ITTable"}),`
`,e.jsx(n.p,{children:"Basic data table with column definitions, sorting, and configurable visual variants."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"columns"})," | ",e.jsx(n.code,{children:"{ key: string; label: string; render?: (value, row) => ReactNode; sortable?: boolean; width?: string }[]"}),` | — | Column definitions |
| `,e.jsx(n.code,{children:"data"})," | ",e.jsx(n.code,{children:"Record<string, any>[]"}),` | — | Row data array |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"'default' \\| 'striped' \\| 'bordered'"})," | ",e.jsx(n.code,{children:"'default'"}),` | Visual style variant |
| `,e.jsx(n.code,{children:"sortKey"})," | ",e.jsx(n.code,{children:"string"}),` | — | Current sort column key |
| `,e.jsx(n.code,{children:"sortDirection"})," | ",e.jsx(n.code,{children:"'asc' \\| 'desc'"}),` | — | Current sort direction |
| `,e.jsx(n.code,{children:"onSort"})," | ",e.jsx(n.code,{children:"(key: string, direction: 'asc' \\| 'desc') => void"}),` | — | Sort handler |
| `,e.jsx(n.code,{children:"onRowClick"})," | ",e.jsx(n.code,{children:"(row: Record<string, any>) => void"}),` | — | Row click handler |
| `,e.jsx(n.code,{children:"loading"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Show loading state |
| `,e.jsx(n.code,{children:"emptyMessage"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"'No data'"})," | Empty state message |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITTable } from '@axzydev/axzy_ui_system';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', render: (v) => <ITBadge>{v}</ITBadge> },
];
const data = [
  { name: 'Alice', role: 'Admin', status: 'Active' },
  { name: 'Bob', role: 'Editor', status: 'Inactive' },
];

<ITTable columns={columns} data={data} />
<ITTable columns={columns} data={data} variant="striped" sortKey="name" sortDirection="asc" />
<ITTable columns={columns} data={data} variant="bordered" onRowClick={(row) => console.log(row)} />
<ITTable columns={columns} data={[]} emptyMessage="No records found" />
<ITTable columns={columns} data={data} loading />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"columns[].render"})," provides custom cell rendering via render function"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"columns[].sortable"})," enables column header sort toggles"]}),`
`,e.jsxs(n.li,{children:["Sorting controlled via ",e.jsx(n.code,{children:"sortKey"}),", ",e.jsx(n.code,{children:"sortDirection"}),", and ",e.jsx(n.code,{children:"onSort"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"onRowClick"})," fires with the row data on click"]}),`
`,e.jsx(n.li,{children:"Three visual variants: default (no borders), striped (alternating rows), bordered (full grid)"}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(i,{}),`
`,e.jsx(t,{}),`
`,e.jsx(l,{})]})}function j(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{j as default};
