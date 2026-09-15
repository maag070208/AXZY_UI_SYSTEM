import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as d,P as r,C as o,S as l}from"./blocks-DefDVuP9.js";import{S as t}from"./checkbox.stories-BbF9mrdO.js";import"./preload-helper-C1FmrZbK.js";function c(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:t}),`
`,e.jsx(n.h1,{id:"itcheckbox",children:"ITCheckbox"}),`
`,e.jsxs(n.p,{children:["A checkbox input component with a custom visual style and a visually hidden native ",e.jsx(n.code,{children:"<input>"})," for full accessibility. Supports checked, unchecked, and indeterminate states with an optional label. The disabled state reduces opacity and prevents interaction."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"checked"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Controlled checked state. |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(checked: boolean) => void"}),` | — | Callback fired when the checkbox value changes. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Label text or element rendered next to the checkbox. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Disables interaction and applies reduced opacity. |
| `,e.jsx(n.code,{children:"indeterminate"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Renders a dash indicator for partial selection. No effect when ",e.jsx(n.code,{children:"checked"})," is ",e.jsx(n.code,{children:"true"}),`. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class names for the label wrapper. |
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"})," | — | HTML name attribute for the native ",e.jsx(n.code,{children:"<input>"})," element. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITCheckbox } from '@axzydev/axzy_ui_system';

<ITCheckbox
  checked={agreed}
  onChange={setAgreed}
  label="Acepto los términos y condiciones"
/>

<ITCheckbox
  indeterminate={someChecked && !allChecked}
  onChange={toggleAll}
  label="Seleccionar todo"
/>
`})}),`
`,e.jsx(n.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Checked"})," — Blue filled square with a white checkmark SVG icon."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Unchecked"})," — White background with a slate gray border."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Indeterminate"})," — A horizontal dash line rendered when ",e.jsx(n.code,{children:"indeterminate"})," is ",e.jsx(n.code,{children:"true"})," and ",e.jsx(n.code,{children:"checked"})," is ",e.jsx(n.code,{children:"false"}),'. Useful for "select all" parent checkboxes.']}),`
`,e.jsxs(n.li,{children:["The native ",e.jsx(n.code,{children:"<input>"})," is visually hidden (",e.jsx(n.code,{children:"sr-only"}),") but remains interactive via the parent ",e.jsx(n.code,{children:"<label>"}),", ensuring keyboard navigation and screen reader support."]}),`
`,e.jsxs(n.li,{children:["When disabled, the entire label wrapper gets ",e.jsx(n.code,{children:"opacity-50"})," and ",e.jsx(n.code,{children:"cursor-not-allowed"}),"."]}),`
`,e.jsxs(n.li,{children:["Renders a focus ring (",e.jsx(n.code,{children:"ring-2 ring-primary-200"}),") on the custom visual element when the input is focused (unless disabled)."]}),`
`,e.jsxs(n.li,{children:["Uses a ",e.jsx(n.code,{children:"ref"})," callback to set ",e.jsx(n.code,{children:"indeterminate"})," on the underlying DOM input for compliance with the HTML spec."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(r,{}),`
`,e.jsx(o,{}),`
`,e.jsx(l,{})]})}function p(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(c,{...s})}):c(s)}export{p as default};
