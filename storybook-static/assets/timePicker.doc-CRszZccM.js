import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as s,P as d,C as t,S as l}from"./blocks-DefDVuP9.js";import{S as c}from"./timePicker.stories-cCisedmk.js";import"./preload-helper-C1FmrZbK.js";import"./timePicker-C8-Z5vK2.js";function i(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(n.h1,{id:"ittimepicker",children:"ITTimePicker"}),`
`,e.jsxs(n.p,{children:["Time selection input with a dual-column dropdown (hours / minutes). Supports manual typing with auto-formatting to ",e.jsx(n.code,{children:"HH:MM"}),", validation, 12h and 24h format display, configurable minute steps, and keyboard-friendly picker navigation."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"}),` | — | Form field name attribute and key for the change event. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"string"})," | — | Controlled time value in ",e.jsx(n.code,{children:'"HH:MM"'}),` format. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | — | Label text displayed above the input. |
| `,e.jsx(n.code,{children:"placeholder"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"HH:MM"'}),` | Placeholder text when no value is set. |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(e: any) => void"})," | — | Callback fired on valid time selection, receives event-like object with ",e.jsx(n.code,{children:"target.name"})," and ",e.jsx(n.code,{children:"target.value"}),`. |
| `,e.jsx(n.code,{children:"onBlur"})," | ",e.jsx(n.code,{children:"(e: any) => void"}),` | — | Callback fired when the input loses focus. |
| `,e.jsx(n.code,{children:"required"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Marks the field as required. |
| `,e.jsx(n.code,{children:"touched"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Whether the input has been interacted with. |
| `,e.jsx(n.code,{children:"error"})," | ",e.jsx(n.code,{children:"string \\| boolean"}),` | — | Validation error message or boolean to show error state. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Disables the time picker when true. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes for the wrapper. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"SizesTypes"})," | ",e.jsx(n.code,{children:'"md"'})," | Size preset: ",e.jsx(n.code,{children:'"sm"'}),", ",e.jsx(n.code,{children:'"md"'}),", ",e.jsx(n.code,{children:'"lg"'}),`. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:'"primary" \\| "secondary" \\| "danger" \\| "success" \\| "warning" \\| "info" \\| "purple"'})," | ",e.jsx(n.code,{children:'"primary"'}),` | Style variant for the input. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:'"primary" \\| "secondary" \\| "danger" \\| "success" \\| "warning" \\| "info" \\| "purple" \\| string'})," | ",e.jsx(n.code,{children:'"primary"'})," | Theme color used for the dropdown highlight and confirm button. Accepts semantic keys or raw hex. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITTimePicker } from '@axzydev/axzy_ui_system';

<ITTimePicker
  name="startTime"
  label="Start Time"
  value={startTime}
  onChange={(e) => setStartTime(e.target.value)}
  color="primary"
/>

<ITTimePicker
  name="endTime"
  label="End Time"
  value={endTime}
  onChange={(e) => setEndTime(e.target.value)}
  error={isInvalid ? "Invalid time range" : undefined}
  touched={true}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The dropdown opens on input focus and can be navigated via scroll or keyboard."}),`
`,e.jsx(n.li,{children:"Hour and minute columns scroll independently for quick selection."}),`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.strong,{children:"Set"})," button at the bottom of the dropdown confirms the selection."]}),`
`,e.jsx(n.li,{children:"Supports both 12-hour and 24-hour format display via the internal formatting logic."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"minuteStep"})," is available internally (1, 5, 10, 15, 30 minutes) for granular control over the minute column."]}),`
`,e.jsx(n.li,{children:'Invalid times (e.g., "25:99") trigger validation and display an error state.'}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"touched"})," prop combined with an empty value or bad time forces error visibility."]}),`
`,e.jsx(n.li,{children:"Clearable via clearing the input field; the dropdown resets accordingly."}),`
`,e.jsx(n.li,{children:"Colors available: primary, secondary, success, danger, warning, info, purple — plus any raw hex string."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(d,{}),`
`,e.jsx(t,{}),`
`,e.jsx(l,{})]})}function j(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{j as default};
