import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as s,P as i,C as c,S as t}from"./blocks-DefDVuP9.js";import{S as d}from"./tripleFilter.stories-CzsyMav7.js";import"./preload-helper-C1FmrZbK.js";function l(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(n.h1,{id:"ittriplefilter",children:"ITTripleFilter"}),`
`,e.jsx(n.p,{children:'Generic segmented toggle filter bar for quick data filtering. Renders a row of pill-shaped buttons where exactly one is active at a time. Supports any string or boolean value type, configurable color theming, and full-width mode. Commonly used for "All / Active / Inactive" or similar tri-state filters in tables, lists, and dashboards.'}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"T extends string \\| boolean"}),` | — | Currently selected value. Must match one of the option values. |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(value: T) => void"}),` | — | Called when the user selects a different option. Receives the new value. |
| `,e.jsx(n.code,{children:"options"})," | ",e.jsx(n.code,{children:"ITTripleFilterOption<T>[]"})," | — | Array of filter options to render (typically 2–4 items). Each has ",e.jsx(n.code,{children:"label: string"})," and ",e.jsx(n.code,{children:"value: T"}),`. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"ColorsTypes"})," | ",e.jsx(n.code,{children:'"primary"'})," | Color theme for the active indicator. One of ",e.jsx(n.code,{children:"primary"}),", ",e.jsx(n.code,{children:"secondary"}),", ",e.jsx(n.code,{children:"success"}),", ",e.jsx(n.code,{children:"danger"}),", ",e.jsx(n.code,{children:"warning"}),", ",e.jsx(n.code,{children:"info"}),", ",e.jsx(n.code,{children:"purple"}),", ",e.jsx(n.code,{children:"error"}),", ",e.jsx(n.code,{children:"gray"}),`. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS classes applied to the outermost container. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITTripleFilter } from '@axzydev/axzy_ui_system';

<ITTripleFilter<string>
  value={status}
  onChange={setStatus}
  options={[
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]}
  color="success"
/>

<ITTripleFilter<boolean>
  value={showActive}
  onChange={setShowActive}
  options={[
    { label: 'All', value: false },
    { label: 'Active', value: true },
  ]}
  color="danger"
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Generic component — works with ",e.jsx(n.code,{children:"string"})," or ",e.jsx(n.code,{children:"boolean"})," value types."]}),`
`,e.jsxs(n.li,{children:["Active option receives a full background fill matching the ",e.jsx(n.code,{children:"color"})," prop, while inactive options use a subtle outlined style."]}),`
`,e.jsxs(n.li,{children:["Exactly ",e.jsx(n.strong,{children:"one"})," option is always active; selecting the already-active option is a no-op."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"color"})," accepts all semantic color tokens: ",e.jsx(n.code,{children:"primary"}),", ",e.jsx(n.code,{children:"secondary"}),", ",e.jsx(n.code,{children:"success"}),", ",e.jsx(n.code,{children:"danger"}),", ",e.jsx(n.code,{children:"warning"}),", ",e.jsx(n.code,{children:"info"}),", ",e.jsx(n.code,{children:"purple"}),", ",e.jsx(n.code,{children:"error"}),", ",e.jsx(n.code,{children:"gray"}),"."]}),`
`,e.jsxs(n.li,{children:["Both ",e.jsx(n.code,{children:"error"})," and ",e.jsx(n.code,{children:"danger"})," map to the same danger color."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"className"})," to control width — for full-width mode, apply ",e.jsx(n.code,{children:"w-full"}),"."]}),`
`,e.jsx(n.li,{children:"The filter bar is rendered as a horizontal inline-flex row; options wrap naturally on narrow containers."}),`
`,e.jsx(n.li,{children:"Ideal for filter bars above data tables, alongside search inputs and date pickers."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(i,{}),`
`,e.jsx(c,{}),`
`,e.jsx(t,{})]})}function p(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(l,{...r})}):l(r)}export{p as default};
