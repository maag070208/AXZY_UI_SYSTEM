import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as i,P as a,C as l,S as o}from"./blocks-DefDVuP9.js";import{S as c}from"./ITDataTable.stories-dDbnT1LO.js";import"./preload-helper-C1FmrZbK.js";function r(t){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c}),`
`,e.jsx(n.h1,{id:"itdatatable",children:"ITDataTable"}),`
`,e.jsxs(n.p,{children:["Advanced server-side data table with automatic pagination, column sorting, and filtering. Communicates via a ",e.jsx(n.code,{children:"fetchData"})," callback that receives page, limit, filters, and sort parameters, and returns paginated data with a total count. Built on top of the internal table hooks for cohesive state management."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"columns"})," | ",e.jsx(n.code,{children:"Column<T>[]"}),` | — | Column definitions with key, label, type, sortable, filter, render, and width. |
| `,e.jsx(n.code,{children:"fetchData"})," | ",e.jsx(n.code,{children:"(params: ITDataTableFetchParams) => Promise<ITDataTableResponse<T>>"})," | — | Async callback triggered on pagination, filter, or sort change. Must return ",e.jsx(n.code,{children:"{ data, total }"}),`. |
| `,e.jsx(n.code,{children:"debounceMs"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"500"}),` | Delay in ms before firing fetch after filter state changes. |
| `,e.jsx(n.code,{children:"externalFilters"})," | ",e.jsx(n.code,{children:"Record<string, string \\| number \\| boolean \\| Date>"})," | ",e.jsx(n.code,{children:"{}"}),` | Filters managed outside the table (e.g., date pickers) merged with internal column filters. |
| `,e.jsx(n.code,{children:"loadingIndicator"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"<FaSpinner />"}),` | Custom element shown while loading. |
| `,e.jsx(n.code,{children:"fetchOnMount"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"true"}),` | Whether to fetch data on initial mount. |
| `,e.jsx(n.code,{children:"reloadTrigger"})," | ",e.jsx(n.code,{children:"number \\| string \\| boolean"}),` | — | Changing this value forces a re-fetch. Use after mutations. |
| `,e.jsx(n.code,{children:"containerClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | CSS classes for the outer wrapper. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | CSS classes applied to the ",e.jsx(n.code,{children:"<table>"}),` element. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:'"default" \\| "striped" \\| "bordered" \\| "minimal"'})," | ",e.jsx(n.code,{children:'"default"'}),` | Visual style variant. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:'"sm" \\| "md" \\| "lg"'})," | ",e.jsx(n.code,{children:'"md"'}),` | Row density preset. |
| `,e.jsx(n.code,{children:"itemsPerPageOptions"})," | ",e.jsx(n.code,{children:"number[]"})," | ",e.jsx(n.code,{children:"[5, 10, 20]"}),` | Selectable page-size options. |
| `,e.jsx(n.code,{children:"defaultItemsPerPage"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"10"}),` | Initial rows per page. |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string \\| ReactNode"})," | — | Heading displayed above the table. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITDataTable } from '@axzydev/axzy_ui_system';

<ITDataTable
  title="Users"
  columns={[
    { key: 'id', label: 'ID', type: 'number', sortable: true },
    { key: 'name', label: 'Name', type: 'string', sortable: true, filter: true },
    { key: 'role', label: 'Role', type: 'string', filter: 'catalog', catalogOptions: { data: roles } },
    { key: 'active', label: 'Status', type: 'boolean', filter: true, sortable: true },
  ]}
  fetchData={async (params) => api.fetchItems(params)}
  variant="bordered"
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Column filters support ",e.jsx(n.code,{children:'"catalog"'})," (dropdown), ",e.jsx(n.code,{children:"true"})," (text input), and ",e.jsx(n.code,{children:"boolean"})," (tri-state toggle)."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"externalFilters"})," prop allows integrating external filter controls like date pickers without building filter UI into the table itself."]}),`
`,e.jsx(n.li,{children:"Debounce prevents excessive API calls while the user types in filter inputs."}),`
`,e.jsx(n.li,{children:"A loading skeleton overlay covers the table body while fetching, keeping the header visible."}),`
`,e.jsx(n.li,{children:"Empty state is shown automatically when no results match the current filters."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(a,{}),`
`,e.jsx(l,{}),`
`,e.jsx(o,{})]})}function m(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{m as default};
