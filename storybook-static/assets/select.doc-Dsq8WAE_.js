import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as d,P as l,C as i,S as c}from"./blocks-DefDVuP9.js";import{S as t}from"./select.stories-D8iJh9Fp.js";import"./preload-helper-C1FmrZbK.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:t}),`
`,e.jsx(n.h1,{id:"itselect",children:"ITSelect"}),`
`,e.jsx(n.p,{children:"Native-like dropdown select with validation error display, label support, and read-only mode. Styled consistently with ITInput for seamless form integration."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"})," | — | Name attribute for the underlying ",e.jsx(n.code,{children:"<select>"}),` element. |
| `,e.jsx(n.code,{children:"options"})," | ",e.jsx(n.code,{children:"OptionType[]"})," | — | Array of option objects with value/label key-value pairs. ",e.jsx(n.code,{children:"{ [key: string]: string }"}),`. |
| `,e.jsx(n.code,{children:"valueField"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"value"'}),` | Key in each option object used as the option value. |
| `,e.jsx(n.code,{children:"labelField"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"label"'}),` | Key in each option object used as the display label. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | — | Label text rendered above the select. |
| `,e.jsx(n.code,{children:"placeholder"})," | ",e.jsx(n.code,{children:"string"}),` | — | Placeholder text for the default empty option. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"string"}),` | — | Currently selected value (controlled). |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(event: ChangeEvent<HTMLSelectElement>) => void"}),` | — | Callback fired on selection change. |
| `,e.jsx(n.code,{children:"onBlur"})," | ",e.jsx(n.code,{children:"(event: FocusEvent<HTMLSelectElement>) => void"}),` | — | Callback fired on blur. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"ColorsTypes"}),` | — | Theme color variant for the select border and focus ring. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"SizesTypes"})," | — | Control size: ",e.jsx(n.code,{children:'"sm"'}),", ",e.jsx(n.code,{children:'"md"'}),", or ",e.jsx(n.code,{children:'"lg"'}),`. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the select is disabled. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS classes on the ",e.jsx(n.code,{children:"<select>"}),` element. |
| `,e.jsx(n.code,{children:"touched"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Marks the field as touched (for validation error display). |
| `,e.jsx(n.code,{children:"error"})," | ",e.jsx(n.code,{children:"string \\| boolean"})," | — | Error message string, or ",e.jsx(n.code,{children:"true"}),` for a default required error message. |
| `,e.jsx(n.code,{children:"required"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the field is required. Shows a red asterisk on the label. |
| `,e.jsx(n.code,{children:"autoFocus"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Autofocus the select on mount. |
| `,e.jsx(n.code,{children:"readOnly"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Read-only mode: shows the current value as a single disabled option. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITSelect } from '@axzydev/axzy_ui_system';

<ITSelect
  name="country"
  label="Country"
  placeholder="Select a country"
  options={[
    { value: "mx", label: "Mexico" },
    { value: "us", label: "United States" },
  ]}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
/>

<ITSelect
  name="status"
  label="Status"
  options={statusOptions}
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  required
  error={touched && !status ? "This field is required" : undefined}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Custom ",e.jsx(n.code,{children:"valueField"})," and ",e.jsx(n.code,{children:"labelField"})," support option objects with arbitrary key names."]}),`
`,e.jsxs(n.li,{children:["Error state: provides a red border and inline error message when ",e.jsx(n.code,{children:"touched"})," is true and ",e.jsx(n.code,{children:"error"})," is set."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"required"})," adds a red asterisk on the label and shows a default required error if no custom error is given."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"readOnly"})," renders the selected value as a single non-interactive option."]}),`
`,e.jsxs(n.li,{children:["Arrow-down icon rendered via ",e.jsx(n.code,{children:"FaAngleDown"})," from react-icons."]}),`
`,e.jsxs(n.li,{children:["Styles inherited from the theme's ",e.jsx(n.code,{children:"input"})," configuration for visual consistency with ITInput."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"variant"})," prop maps to theme color tokens for border and focus ring colors."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(l,{}),`
`,e.jsx(i,{}),`
`,e.jsx(c,{})]})}function u(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{u as default};
