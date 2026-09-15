import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as d,P as l,C as c,S as i}from"./blocks-DefDVuP9.js";import{S as a}from"./search-select.stories-DKuYjJSm.js";import"./preload-helper-C1FmrZbK.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a}),`
`,e.jsx(n.h1,{id:"itsearchselect",children:"ITSearchSelect"}),`
`,e.jsx(n.p,{children:"Searchable dropdown select with support for local client-side filtering and remote API search. Includes validation error display, label support, and customizable field mapping."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"}),` | — | Name attribute for form integrations. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | — | Label displayed above the select input. |
| `,e.jsx(n.code,{children:"placeholder"})," | ",e.jsx(n.code,{children:"string"}),` | — | Placeholder text shown when no value is selected. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"string \\| number"}),` | — | Currently selected value (controlled). |
| `,e.jsx(n.code,{children:"options"})," | ",e.jsx(n.code,{children:"ITSearchSelectOption[]"})," | — | Array of options for static or remote data. ",e.jsx(n.code,{children:"{ label, value, ...custom }"}),`. |
| `,e.jsx(n.code,{children:"valueField"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"value"'}),` | Field used as the option value. |
| `,e.jsx(n.code,{children:"labelField"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"label"'}),` | Field used as the option display label. |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(value: string \\| number, option?: ITSearchSelectOption) => void"}),` | — | Callback fired when selection changes. |
| `,e.jsx(n.code,{children:"onBlur"})," | ",e.jsx(n.code,{children:"(e: FocusEvent<any>) => void"}),` | — | Callback fired when input loses focus. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the component is disabled. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes for the container. |
| `,e.jsx(n.code,{children:"touched"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Whether the field has been touched (for form validation). |
| `,e.jsx(n.code,{children:"required"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the field is required. Shows a red asterisk. |
| `,e.jsx(n.code,{children:"error"})," | ",e.jsx(n.code,{children:"string \\| boolean"}),` | — | Error message or boolean indicating an error state. |
| `,e.jsx(n.code,{children:"readOnly"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the field is read-only. |
| `,e.jsx(n.code,{children:"onSearch"})," | ",e.jsx(n.code,{children:"(query: string) => void"}),` | — | Callback for server-side search. Receives the search query string. |
| `,e.jsx(n.code,{children:"isLoading"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether options are being loaded from an external API. |
| `,e.jsx(n.code,{children:"noResultsMessage"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"No se encontraron resultados"'})," | Message displayed when no results match the search. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITSearchSelect } from '@axzydev/axzy_ui_system';

<ITSearchSelect
  name="user"
  label="Select User"
  placeholder="Search user..."
  options={users}
  value={selected}
  onChange={(val) => setSelected(val)}
/>

<ITSearchSelect
  name="remote"
  label="API Search"
  placeholder="Type to search..."
  options={remoteOptions}
  isLoading={loading}
  onSearch={(query) => fetchResults(query)}
  value={selected}
  onChange={(val) => setSelected(val)}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Static mode"}),": provide an ",e.jsx(n.code,{children:"options"})," array and the component filters client-side as the user types."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Remote mode"}),": provide an ",e.jsx(n.code,{children:"onSearch"})," callback and manage ",e.jsx(n.code,{children:"options"}),"/",e.jsx(n.code,{children:"isLoading"})," externally for API-driven searches."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"valueField"})," and ",e.jsx(n.code,{children:"labelField"})," allow custom option object structures beyond ",e.jsx(n.code,{children:"{ value, label }"}),"."]}),`
`,e.jsxs(n.li,{children:["Validation states: ",e.jsx(n.code,{children:"error"})," string displays inline, ",e.jsx(n.code,{children:"touched"})," gates error visibility, ",e.jsx(n.code,{children:"required"})," adds a red asterisk."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"readOnly"})," mode renders the selected value as non-interactive text."]}),`
`,e.jsxs(n.li,{children:["Supports ",e.jsx(n.code,{children:"className"})," for style overrides and width control."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(l,{}),`
`,e.jsx(c,{}),`
`,e.jsx(i,{})]})}function u(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{u as default};
