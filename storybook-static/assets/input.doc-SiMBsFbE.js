import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as i,P as o,C as s,S as l}from"./blocks-DefDVuP9.js";import{S as t}from"./input.stories-CJlFAQsV.js";import"./preload-helper-C1FmrZbK.js";function c(d){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:t}),`
`,e.jsx(n.h1,{id:"itinput",children:"ITInput"}),`
`,e.jsx(n.p,{children:"A versatile form input component supporting text, password, email, number, textarea, checkbox, and radio types. Features labels, validation errors, left/right icons, helper text with character count, currency formatting, and configurable sizes."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"name"})," | ",e.jsx(n.code,{children:"string"}),` | required | Field name used for form identification. |
| `,e.jsx(n.code,{children:"type"})," | ",e.jsx(n.code,{children:"'text' \\| 'password' \\| 'number' \\| 'email' \\| 'checkbox' \\| 'radio' \\| 'textarea'"})," | ",e.jsx(n.code,{children:"'text'"}),` | Input type. |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Label displayed above the input. |
| `,e.jsx(n.code,{children:"placeholder"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Placeholder text. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"any"})," | ",e.jsx(n.code,{children:"undefined"}),` | Current input value. |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(event: any) => void"}),` | required | Change event handler. |
| `,e.jsx(n.code,{children:"onBlur"})," | ",e.jsx(n.code,{children:"(event) => void"})," | ",e.jsx(n.code,{children:"undefined"}),` | Blur event handler. |
| `,e.jsx(n.code,{children:"onKeyDown"})," | ",e.jsx(n.code,{children:"(event) => void"})," | ",e.jsx(n.code,{children:"undefined"}),` | Keydown event handler. |
| `,e.jsx(n.code,{children:"error"})," | ",e.jsx(n.code,{children:"string \\| boolean"})," | ",e.jsx(n.code,{children:"undefined"})," | Validation error message. Pass ",e.jsx(n.code,{children:"true"}),` for generic error styling. |
| `,e.jsx(n.code,{children:"touched"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"undefined"}),` | Whether the field has been touched by the user. |
| `,e.jsx(n.code,{children:"required"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Mark the field as required (adds asterisk to label). |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Disable the input. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"SizesTypes"})," | ",e.jsx(n.code,{children:"'md'"})," | Size preset: ",e.jsx(n.code,{children:'"sm"'}),", ",e.jsx(n.code,{children:'"md"'}),", ",e.jsx(n.code,{children:'"lg"'}),`. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"ColorsTypes"})," | ",e.jsx(n.code,{children:"undefined"}),` | Color variant from the theme palette. |
| `,e.jsx(n.code,{children:"iconLeft"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Icon element rendered on the left side. |
| `,e.jsx(n.code,{children:"iconRight"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:"undefined"}),` | Icon element rendered on the right side. |
| `,e.jsx(n.code,{children:"maxLength"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"}),` | Maximum allowed character length. |
| `,e.jsx(n.code,{children:"minLength"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"}),` | Minimum allowed character length. |
| `,e.jsx(n.code,{children:"showHintLength"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Show character count hint below the input. |
| `,e.jsx(n.code,{children:"currencyFormat"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Enable currency formatting for number inputs (MX locale). |
| `,e.jsx(n.code,{children:"formatNumber"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Enable number formatting on blur. |
| `,e.jsx(n.code,{children:"autoFocus"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Auto-focus the input on mount. |
| `,e.jsx(n.code,{children:"focusContent"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Select all content on click/focus. |
| `,e.jsx(n.code,{children:"readOnly"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Render the input in read-only mode. |
| `,e.jsx(n.code,{children:"min"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"}),` | Minimum numeric value for number inputs. |
| `,e.jsx(n.code,{children:"max"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"}),` | Maximum numeric value for number inputs. |
| `,e.jsx(n.code,{children:"rows"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"undefined"}),` | Number of visible rows for textarea. |
| `,e.jsx(n.code,{children:"checked"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"undefined"}),` | Checked state for checkbox and radio types. |
| `,e.jsx(n.code,{children:"containerClassName"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Additional CSS classes for the outer container. |
| `,e.jsx(n.code,{children:"labelClassName"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Additional CSS classes for the label. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Additional CSS classes for the input element. |
| `,e.jsx(n.code,{children:"onClick"})," | ",e.jsx(n.code,{children:"() => void"})," | ",e.jsx(n.code,{children:"undefined"})," | Click handler for the input. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITInput } from '@axzydev/axzy_ui_system';

<ITInput name="email" label="Email" type="email" placeholder="example@mail.com" />
<ITInput name="password" label="Password" type="password" iconLeft={<FaLock />} />
<ITInput name="bio" label="Bio" type="textarea" rows={4} />
<ITInput name="qty" label="Quantity" type="number" min={0} max={100} />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Error message only displays when both ",e.jsx(n.code,{children:"error"})," and ",e.jsx(n.code,{children:"touched"})," are truthy."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"showHintLength"})," with ",e.jsx(n.code,{children:"maxLength"}),' displays a counter (e.g. "45/200").']}),`
`,e.jsxs(n.li,{children:["Currency formatting uses MX locale by default when ",e.jsx(n.code,{children:"currencyFormat"})," is true."]}),`
`,e.jsxs(n.li,{children:["Icons rendered via ",e.jsx(n.code,{children:"iconLeft"}),"/",e.jsx(n.code,{children:"iconRight"})," can be clickable React nodes (e.g. a toggle visibility button)."]}),`
`,e.jsx(n.li,{children:"Checkbox and radio types render inline labels instead of stacked layout."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(s,{}),`
`,e.jsx(l,{})]})}function u(d={}){const{wrapper:n}={...r(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(c,{...d})}):c(d)}export{u as default};
