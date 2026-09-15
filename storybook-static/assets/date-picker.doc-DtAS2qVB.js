import{j as e}from"./iframe-B5RMobo9.js";import{u as d,M as t,P as i,C as c,S as a}from"./blocks-DefDVuP9.js";import{S as l}from"./date-picker.stories-a5tCSHiF.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...d(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:l}),`
`,e.jsx(n.h1,{id:"itdatepicker",children:"ITDatePicker"}),`
`,e.jsx(n.p,{children:"A date picker supporting single date and date range selection. Includes built-in validation error display, min/max date constraints, and placeholder formatting."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"}),` | — | Unique name attribute for the input. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"Date \\| [Date \\| null, Date \\| null]"})," | — | Selected date or start–end tuple when ",e.jsx(n.code,{children:"range"}),` is true. |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(event) => void"})," | — | Callback with ",e.jsx(n.code,{children:"{ target: { name, value } }"}),` on date selection. |
| `,e.jsx(n.code,{children:"onBlur"})," | ",e.jsx(n.code,{children:"(event) => void"}),` | — | Callback when the input loses focus. |
| `,e.jsx(n.code,{children:"range"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Enable date-range selection mode. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"ColorsTypes"})," | ",e.jsx(n.code,{children:'"primary"'}),` | Color variant from design system. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"SizesTypes"})," | ",e.jsx(n.code,{children:'"md"'})," | Size preset: ",e.jsx(n.code,{children:'"sm"'}),", ",e.jsx(n.code,{children:'"md"'}),", ",e.jsx(n.code,{children:'"lg"'}),`. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | CSS classes for the wrapper. |
| `,e.jsx(n.code,{children:"calendarClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | CSS classes for the calendar popover. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Disables the date picker. |
| `,e.jsx(n.code,{children:"placeholder"})," | ",e.jsx(n.code,{children:"string"}),` | — | Placeholder text when no date is selected. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | — | Accessible label rendered above the input. |
| `,e.jsx(n.code,{children:"required"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Marks the field as required. |
| `,e.jsx(n.code,{children:"touched"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Visually indicates the field has been interacted with. |
| `,e.jsx(n.code,{children:"error"})," | ",e.jsx(n.code,{children:"string \\| boolean"})," | — | Error message string or ",e.jsx(n.code,{children:"true"}),` for default error styling. |
| `,e.jsx(n.code,{children:"minDate"})," | ",e.jsx(n.code,{children:"Date"}),` | — | Earliest selectable date. |
| `,e.jsx(n.code,{children:"maxDate"})," | ",e.jsx(n.code,{children:"Date"})," | — | Latest selectable date. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITDatePicker } from '@axzydev/axzy_ui_system';

<ITDatePicker
  name="birthdate"
  label="Birth Date"
  placeholder="DD/MM/YYYY"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

<ITDatePicker
  range
  name="audit_range"
  label="Audit Range"
  value={range}
  onChange={(e) => setRange(e.target.value)}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"range"})," is true, ",e.jsx(n.code,{children:"value"})," must be a tuple ",e.jsx(n.code,{children:"[startDate, endDate]"})," and the onChange target value will be the same shape."]}),`
`,e.jsxs(n.li,{children:["The component emits a synthetic event with ",e.jsx(n.code,{children:"target.name"})," and ",e.jsx(n.code,{children:"target.value"}),", compatible with Formik integration."]}),`
`,e.jsxs(n.li,{children:["Error state is shown when both ",e.jsx(n.code,{children:"error"})," and ",e.jsx(n.code,{children:"touched"})," are truthy."]}),`
`,e.jsxs(n.li,{children:["Date format follows the locale configuration; placeholder text like ",e.jsx(n.code,{children:"DD/MM/YYYY"})," guides the user."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(i,{}),`
`,e.jsx(c,{}),`
`,e.jsx(a,{})]})}function u(r={}){const{wrapper:n}={...d(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{u as default};
