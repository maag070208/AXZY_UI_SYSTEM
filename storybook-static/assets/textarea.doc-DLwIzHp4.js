import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as t,P as o,C as a,S as d}from"./blocks-DefDVuP9.js";import{S as l}from"./textarea.stories-CKqK7ctk.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:l}),`
`,e.jsx(n.h1,{id:"ittextarea",children:"ITTextarea"}),`
`,e.jsxs(n.p,{children:["Multi-line text input with label, validation error display, character limit, and configurable resize behavior. Built on native ",e.jsx(n.code,{children:"<textarea>"})," with consistent styling and focus ring effects."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"string"}),` | — | Controlled value of the textarea. |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(value: string) => void"}),` | — | Callback fired when the value changes, receiving the new string. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | — | Label text rendered above the textarea. |
| `,e.jsx(n.code,{children:"placeholder"})," | ",e.jsx(n.code,{children:"string"}),` | — | Placeholder text shown when the textarea is empty. |
| `,e.jsx(n.code,{children:"rows"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"4"}),` | Number of visible text rows. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Disables the textarea when true. |
| `,e.jsx(n.code,{children:"error"})," | ",e.jsx(n.code,{children:"string"}),` | — | Validation error message displayed below the textarea. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes for the wrapper. |
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"})," | — | Name attribute for form submission and label association via ",e.jsx(n.code,{children:"htmlFor"}),`. |
| `,e.jsx(n.code,{children:"maxLength"})," | ",e.jsx(n.code,{children:"number"}),` | — | Maximum number of characters allowed. |
| `,e.jsx(n.code,{children:"resize"})," | ",e.jsx(n.code,{children:'"none" \\| "vertical" \\| "horizontal" \\| "both"'})," | ",e.jsx(n.code,{children:'"vertical"'})," | Resize behavior of the textarea. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITTextarea } from '@axzydev/axzy_ui_system';

<ITTextarea
  name="bio"
  label="Biography"
  value={bio}
  onChange={setBio}
  maxLength={500}
  rows={6}
  resize="vertical"
  error={bio.length > 500 ? "Max 500 characters" : undefined}
/>

<ITTextarea
  name="comments"
  label="Comments"
  placeholder="Write your feedback..."
  rows={3}
  resize="none"
  disabled
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"resize"})," controls the native CSS resize property: ",e.jsx(n.code,{children:"none"})," (no resize handle), ",e.jsx(n.code,{children:"vertical"})," (height only), ",e.jsx(n.code,{children:"horizontal"})," (width only), or ",e.jsx(n.code,{children:"both"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"error"})," renders a red error message below the textarea and applies red border/ring styling."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"maxLength"})," enforces a hard character limit via the native ",e.jsx(n.code,{children:"maxLength"})," attribute — no visual counter included."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"rows"})," only sets the initial visible height; combined with ",e.jsx(n.code,{children:"resize"}),", the user can adjust as needed."]}),`
`,e.jsxs(n.li,{children:["Disabled state applies ",e.jsx(n.code,{children:"opacity-50"})," and ",e.jsx(n.code,{children:"cursor-not-allowed"})," with a gray background."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(a,{}),`
`,e.jsx(d,{})]})}function m(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{m as default};
