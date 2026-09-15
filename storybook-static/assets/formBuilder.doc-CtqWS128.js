import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as d,P as l,C as s,S as c}from"./blocks-DefDVuP9.js";import{S as a}from"./formBuilder.stories-B3n0PoMo.js";import"./preload-helper-C1FmrZbK.js";import"./timePicker-C8-Z5vK2.js";function i(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a}),`
`,e.jsx(n.h1,{id:"itformbuilder",children:"ITFormBuilder"}),`
`,e.jsx(n.p,{children:"A dynamic form generator that renders fields from JSON-like configuration (V1 or V2). Integrates with Formik and Yup for validation. Supports conditional rendering, calculated fields, grid layout, async validation, and custom components."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"fields"})," | ",e.jsx(n.code,{children:"FieldConfig[]"}),` | — | Legacy V1 field definitions (backward compatible). |
| `,e.jsx(n.code,{children:"config"})," | ",e.jsx(n.code,{children:"FieldConfigV2[]"}),` | — | V2 field configuration array with conditional logic, dynamic props, and grid layout. |
| `,e.jsx(n.code,{children:"columns"})," | ",e.jsx(n.code,{children:"number"}),` | — | Number of grid columns (1–12). |
| `,e.jsx(n.code,{children:"values"})," | ",e.jsx(n.code,{children:"any"}),` | — | Current form values keyed by field name. |
| `,e.jsx(n.code,{children:"handleChange"})," | ",e.jsx(n.code,{children:"(event) => void"}),` | — | Change handler for input, select, and textarea elements. |
| `,e.jsx(n.code,{children:"handleBlur"})," | ",e.jsx(n.code,{children:"(event) => void"}),` | — | Blur handler for input, select, and textarea elements. |
| `,e.jsx(n.code,{children:"touched"})," | ",e.jsx(n.code,{children:"any"}),` | — | Touch state keyed by field name. |
| `,e.jsx(n.code,{children:"errors"})," | ",e.jsx(n.code,{children:"any"}),` | — | Validation errors keyed by field name. |
| `,e.jsx(n.code,{children:"setFieldValue"})," | ",e.jsx(n.code,{children:"(field, value, shouldValidate?) => Promise<void>"}),` | — | Programmatically set a field value. |
| `,e.jsx(n.code,{children:"setFieldTouched"})," | ",e.jsx(n.code,{children:"(field, touched?, shouldValidate?) => Promise<void>"}),` | — | Programmatically mark a field as touched. |
| `,e.jsx(n.code,{children:"setFieldError"})," | ",e.jsx(n.code,{children:"(field, message?) => void"}),` | — | Programmatically set a field-level error. |
| `,e.jsx(n.code,{children:"isSubmitting"})," | ",e.jsx(n.code,{children:"boolean"})," | — | Whether the form is currently submitting. |"]}),`
`,e.jsx(n.h3,{id:"fieldconfigv2-key-properties",children:"FieldConfigV2 Key Properties"}),`
`,e.jsxs(n.p,{children:[`| Property | Type | Description |
|----------|------|-------------|
| `,e.jsx(n.code,{children:"type"})," | ",e.jsx(n.code,{children:'"text" \\| "number" \\| "password" \\| "email" \\| "select" \\| "date" \\| "time" \\| "checkbox" \\| "radio" \\| "array" \\| "section" \\| "custom"'}),` | Field input type. |
| `,e.jsx(n.code,{children:"column"})," | ",e.jsx(n.code,{children:"number \\| { sm?, md?, lg?, xl? }"}),` | Grid column span (responsive object or single number). |
| `,e.jsx(n.code,{children:"dependsOn"})," | ",e.jsx(n.code,{children:"string[]"}),` | Sibling field names to watch for conditional re-evaluation. |
| `,e.jsx(n.code,{children:"renderWhen"})," | ",e.jsx(n.code,{children:"(values) => boolean"}),` | When false, the field is not rendered or submitted. |
| `,e.jsx(n.code,{children:"dynamicProps"})," | ",e.jsx(n.code,{children:"(values) => Partial<FieldConfigV2>"}),` | Dynamically override field props based on form state. |
| `,e.jsx(n.code,{children:"validation"})," | ",e.jsx(n.code,{children:"Yup.AnySchema"}),` | Per-field Yup validation schema. |
| `,e.jsx(n.code,{children:"asyncValidation"})," | ",e.jsx(n.code,{children:"(value, values) => Promise<string \\| null>"}),` | Async per-field validation returning error string. |
| `,e.jsx(n.code,{children:"onChangeAction"})," | ",e.jsx(n.code,{children:"(val, context) => void \\| Promise<void>"}),` | Lifecycle hook for side effects (e.g., calculate totals). |
| `,e.jsx(n.code,{children:"options"})," | ",e.jsx(n.code,{children:"Array \\| () => Promise<Array>"}),` | Select/radio options, sync or async. |
| `,e.jsx(n.code,{children:"component"})," | ",e.jsx(n.code,{children:"React.ComponentType"})," | Custom renderer for ",e.jsx(n.code,{children:'type: "custom"'}),". |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITFormBuilder } from '@axzydev/axzy_ui_system';
import { Formik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8).required("Required"),
});

const fields = [
  { name: "email", label: "Email", type: "email", required: true, column: { sm: 12 } },
  { name: "password", label: "Password", type: "password", required: true, column: { sm: 12 } },
  {
    name: "subtotal",
    label: "Subtotal",
    type: "number",
    currencyFormat: true,
    column: { sm: 12, md: 4 },
    onChangeAction: (val, { setFieldValue }) => {
      const num = parseFloat(val) || 0;
      setFieldValue("total", (num * 1.16).toFixed(2));
    },
  },
  {
    name: "total",
    label: "Total",
    type: "number",
    currencyFormat: true,
    disabled: true,
    column: { sm: 12, md: 4 },
  },
  {
    name: "rfc",
    label: "RFC",
    type: "text",
    dependsOn: ["country"],
    renderWhen: (vals) => vals.country === "MX",
    required: true,
    column: { sm: 12, md: 6 },
  },
];

<Formik
  initialValues={{ email: "", password: "", subtotal: "", total: "", rfc: "" }}
  validationSchema={schema}
  onSubmit={handleSubmit}
>
  {(formikProps) => (
    <form onSubmit={formikProps.handleSubmit}>
      <ITFormBuilder
        config={fields}
        columns={12}
        values={formikProps.values}
        handleChange={formikProps.handleChange}
        handleBlur={formikProps.handleBlur}
        touched={formikProps.touched}
        errors={formikProps.errors}
        setFieldValue={formikProps.setFieldValue}
      />
      <button type="submit">Submit</button>
    </form>
  )}
</Formik>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Supports both legacy V1 (",e.jsx(n.code,{children:"fields"})," prop) and enterprise V2 (",e.jsx(n.code,{children:"config"})," prop) field configurations."]}),`
`,e.jsxs(n.li,{children:["V2 fields support a powerful rules engine: ",e.jsx(n.code,{children:"dependsOn"}),", ",e.jsx(n.code,{children:"renderWhen"}),", and ",e.jsx(n.code,{children:"dynamicProps"})," for conditional behavior."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"onChangeAction"})," enables real-time field calculations and cross-field updates."]}),`
`,e.jsx(n.li,{children:"Grid layout uses a responsive 12-column system with per-breakpoint column span configuration."}),`
`,e.jsxs(n.li,{children:["Field types include ",e.jsx(n.code,{children:"section"})," (grouping with collapsible regions) and ",e.jsx(n.code,{children:"array"})," (dynamic repeatable lists)."]}),`
`,e.jsx(n.li,{children:"Fully Formik-compatible — requires Formik context wrapping for state management."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"custom"})," type allows injecting arbitrary React components for complete layout control."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(l,{}),`
`,e.jsx(s,{}),`
`,e.jsx(c,{})]})}function x(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{x as default};
