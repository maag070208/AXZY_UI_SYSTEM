import{j as e}from"./iframe-B5RMobo9.js";import{u as a,M as s,P as t,C as o,S as c}from"./blocks-DefDVuP9.js";import{S as d}from"./pagination.stories-2lAf9ONE.js";import"./preload-helper-C1FmrZbK.js";function i(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...a(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(n.h1,{id:"itpagination",children:"ITPagination"}),`
`,e.jsx(n.p,{children:"Page navigation with current/total pages display, first/last buttons, sibling page count control, and an optional items-per-page selector with summary text."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"currentPage"})," | ",e.jsx(n.code,{children:"number"}),` | — | Current active page (1-indexed). |
| `,e.jsx(n.code,{children:"totalPages"})," | ",e.jsx(n.code,{children:"number"}),` | — | Total number of pages available. |
| `,e.jsx(n.code,{children:"onPageChange"})," | ",e.jsx(n.code,{children:"(page: number) => void"}),` | — | Callback fired when a page is clicked or prev/next is activated. |
| `,e.jsx(n.code,{children:"siblingCount"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"1"}),` | Number of visible page siblings before and after the current page. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:'"primary" \\| "secondary" \\| "success" \\| "danger" \\| "warning" \\| "info" \\| "purple"'})," | ",e.jsx(n.code,{children:'"primary"'}),` | Semantic color for active page and buttons. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes for the container. |
| `,e.jsx(n.code,{children:"itemsPerPageOptions"})," | ",e.jsx(n.code,{children:"number[]"}),` | — | Available options for the items-per-page selector dropdown. |
| `,e.jsx(n.code,{children:"itemsPerPage"})," | ",e.jsx(n.code,{children:"number"})," | — | Current items per page value. Required if ",e.jsx(n.code,{children:"itemsPerPageOptions"}),` is provided. |
| `,e.jsx(n.code,{children:"onItemsPerPageChange"})," | ",e.jsx(n.code,{children:"(value: number) => void"}),` | — | Callback fired when the items per page value is changed. |
| `,e.jsx(n.code,{children:"totalItems"})," | ",e.jsx(n.code,{children:"number"}),' | — | Total number of items across all pages. Used for the "1-10 of 50" summary text. |']}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITPagination } from '@axzydev/axzy_ui_system';

<ITPagination
  currentPage={1}
  totalPages={5}
  onPageChange={(page) => setCurrentPage(page)}
/>

<ITPagination
  currentPage={1}
  totalPages={50}
  siblingCount={2}
  color="primary"
  onPageChange={(page) => setCurrentPage(page)}
  itemsPerPageOptions={[10, 20, 30, 50]}
  itemsPerPage={10}
  onItemsPerPageChange={(val) => setItemsPerPage(val)}
  totalItems={500}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"First and last page buttons are always visible for quick navigation."}),`
`,e.jsx(n.li,{children:"Ellipsis indicators appear when sibling gaps exceed the page range."}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"siblingCount"})," prop controls how many page numbers appear around the current page."]}),`
`,e.jsx(n.li,{children:"All seven semantic colors are supported for the active page highlight."}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"itemsPerPageOptions"})," is provided, a dropdown and summary text render alongside pagination."]}),`
`,e.jsxs(n.li,{children:["Compatible with server-side pagination via the ",e.jsx(n.code,{children:"currentPage"})," and ",e.jsx(n.code,{children:"onPageChange"})," controlled pattern."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(t,{}),`
`,e.jsx(o,{}),`
`,e.jsx(c,{})]})}function x(r={}){const{wrapper:n}={...a(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{x as default};
