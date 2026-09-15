import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as l,P as a,C as o,S as d}from"./blocks-DefDVuP9.js";import{S as t}from"./searchTable.stories-Tx8SfVVE.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:t}),`
`,e.jsx(n.h1,{id:"itsearchtable",children:"ITSearchTable"}),`
`,e.jsx(n.p,{children:"Server-side data table with global search across all fields, column-level filtering, sortable columns, inline row editing, and integrated pagination. Supports six column types and optional Yup validation schema."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"columns"})," | ",e.jsx(n.code,{children:"SearchColumn<T>[]"}),` | — | Column definitions with key, label, type, filter, sortable, editable, and custom render options. |
| `,e.jsx(n.code,{children:"data"})," | ",e.jsx(n.code,{children:"T[]"}),` | — | Array of row data objects (server-side paginated). |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"}),` | — | Title displayed in the table header bar. |
| `,e.jsx(n.code,{children:"searchInputPlaceholder"})," | ",e.jsx(n.code,{children:"string"}),` | — | Placeholder text for the global search input. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:'"default" \\| "striped" \\| "bordered"'}),` | — | Table visual variant. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:'"sm" \\| "md" \\| "lg"'}),` | — | Table row size. |
| `,e.jsx(n.code,{children:"containerClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class for the outer container wrapper. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS class applied to the ",e.jsx(n.code,{children:"<table>"}),` element. |
| `,e.jsx(n.code,{children:"itemsPerPageOptions"})," | ",e.jsx(n.code,{children:"number[]"}),` | — | Available page-size options for the pagination dropdown. |
| `,e.jsx(n.code,{children:"defaultItemsPerPage"})," | ",e.jsx(n.code,{children:"number"}),` | — | Initial/default number of rows per page. |
| `,e.jsx(n.code,{children:"validationSchema"})," | ",e.jsx(n.code,{children:"yup.ObjectSchema"}),` | — | Yup validation schema for inline row editing. |
| `,e.jsx(n.code,{children:"pageIndex"})," | ",e.jsx(n.code,{children:"number"}),` | — | Current page index (0-based, server-side). |
| `,e.jsx(n.code,{children:"totalCount"})," | ",e.jsx(n.code,{children:"number"}),` | — | Total number of rows across all pages. |
| `,e.jsx(n.code,{children:"totalPages"})," | ",e.jsx(n.code,{children:"number"}),` | — | Total number of available pages. |
| `,e.jsx(n.code,{children:"hasPreviousPage"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Whether there is a previous page available. |
| `,e.jsx(n.code,{children:"hasNextPage"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Whether there is a next page available. |
| `,e.jsx(n.code,{children:"onPageChange"})," | ",e.jsx(n.code,{children:"(page: number) => void"}),` | — | Callback when the user navigates to a different page. |
| `,e.jsx(n.code,{children:"onItemsPerPageChange"})," | ",e.jsx(n.code,{children:"(itemsPerPage: number) => void"}),` | — | Callback when the user changes the page size. |
| `,e.jsx(n.code,{children:"onSortChange"})," | ",e.jsx(n.code,{children:'(sortConfig: { key: string, direction: "asc" \\| "desc" }) => void'}),` | — | Callback when a column header sort is triggered. |
| `,e.jsx(n.code,{children:"onFilterChange"})," | ",e.jsx(n.code,{children:"(filters: Record<string, string \\| boolean \\| number>) => void"})," | — | Callback when global search or column filter changes. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITSearchTable } from '@axzydev/axzy_ui_system';
import type { SearchColumn } from '@axzydev/axzy_ui_system';

const columns: SearchColumn<MyRow>[] = [
  { key: 'id', label: 'ID', type: 'number', sortable: true },
  { key: 'name', label: 'Name', type: 'string', sortable: true, filter: true, editable: true },
  { key: 'email', label: 'Email', type: 'string', sortable: true },
  { key: 'status', label: 'Status', type: 'catalog', filter: 'catalog', sortable: true },
];

<ITSearchTable
  columns={columns}
  data={rows}
  title="Users"
  searchInputPlaceholder="Search users..."
  pageIndex={0}
  totalCount={100}
  totalPages={10}
  hasPreviousPage={false}
  hasNextPage={true}
  onPageChange={handlePageChange}
  onSortChange={handleSort}
  onFilterChange={handleFilter}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Column types"}),": ",e.jsx(n.code,{children:"string"}),", ",e.jsx(n.code,{children:"number"}),", ",e.jsx(n.code,{children:"boolean"}),", ",e.jsx(n.code,{children:"date"}),", ",e.jsx(n.code,{children:"actions"}),", and ",e.jsx(n.code,{children:"catalog"})," provide specialized filtering and rendering."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Global search"}),": built-in search input filters across all filterable columns via ",e.jsx(n.code,{children:"onFilterChange"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Column filtering"}),": ",e.jsx(n.code,{children:"filter: true"})," enables text filtering; ",e.jsx(n.code,{children:"filter: 'catalog'"})," renders a dropdown with ",e.jsx(n.code,{children:"catalogOptions"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sorting"}),": ",e.jsx(n.code,{children:"sortable: true"})," on a column triggers ",e.jsx(n.code,{children:"onSortChange"})," with ",e.jsx(n.code,{children:"{ key, direction }"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Inline editing"}),": ",e.jsx(n.code,{children:"editable: true"})," with ",e.jsx(n.code,{children:"inputType"})," enables cell-level editing with optional ",e.jsx(n.code,{children:"validation"})," and Yup ",e.jsx(n.code,{children:"validationSchema"})," support."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pagination"}),": fully server-driven via ",e.jsx(n.code,{children:"pageIndex"}),", ",e.jsx(n.code,{children:"totalPages"}),", ",e.jsx(n.code,{children:"hasPreviousPage"}),", ",e.jsx(n.code,{children:"hasNextPage"}),", and callbacks."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rendering"}),": ",e.jsx(n.code,{children:"currencyMX"})," formats numbers as MXN; ",e.jsx(n.code,{children:"render"})," provides a custom cell render function; ",e.jsx(n.code,{children:"actions"})," renders custom action buttons with edit helpers."]}),`
`,e.jsxs(n.li,{children:["Variants ",e.jsx(n.code,{children:"striped"})," and ",e.jsx(n.code,{children:"bordered"})," provide alternative visual styles."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(a,{}),`
`,e.jsx(o,{}),`
`,e.jsx(d,{})]})}function g(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{g as default};
