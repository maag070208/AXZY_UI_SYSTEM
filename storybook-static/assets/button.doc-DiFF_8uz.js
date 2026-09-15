import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as d,P as o,C as c,S as l}from"./blocks-DefDVuP9.js";import{S as t}from"./button.stories-CW5TYM8T.js";import"./preload-helper-C1FmrZbK.js";function i(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:t}),`
`,e.jsx(n.h1,{id:"itbutton",children:"ITButton"}),`
`,e.jsx(n.p,{children:"The primary action component for triggering user interactions. Supports 8 distinct visual variants, 7 semantic color themes, and 3 sizes. Can render with an icon alongside a label, as an icon-only control, as a text link, or with custom children for flexible content."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"})," | — | Button text label. Overridden if ",e.jsx(n.code,{children:"children"}),` is provided. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"})," | — | Custom content rendered inside the button. Takes precedence over ",e.jsx(n.code,{children:"label"}),`. |
| `,e.jsx(n.code,{children:"icon"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Icon element rendered before the label. |
| `,e.jsx(n.code,{children:"onClick"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Click handler for the button. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"ColorsTypes"})," | ",e.jsx(n.code,{children:'"primary"'})," | Color theme key (",e.jsx(n.code,{children:'"primary"'}),", ",e.jsx(n.code,{children:'"secondary"'}),", ",e.jsx(n.code,{children:'"success"'}),", ",e.jsx(n.code,{children:'"danger"'}),", ",e.jsx(n.code,{children:'"warning"'}),", ",e.jsx(n.code,{children:'"purple"'}),", ",e.jsx(n.code,{children:'"info"'}),`). |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"SizesTypes"})," | ",e.jsx(n.code,{children:'"md"'})," | Button size (",e.jsx(n.code,{children:'"sm"'}),", ",e.jsx(n.code,{children:'"md"'}),", ",e.jsx(n.code,{children:'"lg"'}),`). |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:'"filled" \\| "outlined" \\| "raised" \\| "rounded" \\| "text" \\| "raised-text" \\| "icon-only" \\| "link"'})," | ",e.jsx(n.code,{children:'"filled"'}),` | Visual style variant. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Disables interaction and applies reduced opacity. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class names for the button element. |
| `,e.jsx(n.code,{children:"type"})," | ",e.jsx(n.code,{children:'"submit" \\| "reset" \\| "button"'})," | ",e.jsx(n.code,{children:'"button"'}),` | HTML button type attribute. |
| `,e.jsx(n.code,{children:"ariaLabel"})," | ",e.jsx(n.code,{children:"string"})," | — | Accessible label for screen readers. Falls back to ",e.jsx(n.code,{children:"label"}),`. |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"})," | — | HTML title attribute for native tooltip. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITButton } from '@axzydev/axzy_ui_system';

<ITButton label="Guardar" color="primary" variant="filled" />

<ITButton label="Descargar" color="success" variant="outlined" icon={<FaDownload />} />

<ITButton color="danger" variant="icon-only" ariaLabel="Eliminar">
  <FaTrash />
</ITButton>
`})}),`
`,e.jsx(n.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"filled"})," — Solid background with shadow, the default and most prominent variant."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"outlined"})," — Transparent background with a colored border."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"raised"})," — Solid background with a pronounced box shadow for depth."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"rounded"})," — Like filled but with fully rounded (",e.jsx(n.code,{children:"rounded-full"}),") corners."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"text"})," — Minimal transparent background with hover highlight, suitable for toolbars."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"raised-text"})," — White background with subtle border and shadow, elevated appearance."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"icon-only"})," — Square aspect ratio with centered icon, no text label."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"link"})," — Renders as an inline text link with underline on hover."]}),`
`,e.jsxs(n.li,{children:["Seven color themes: ",e.jsx(n.code,{children:"primary"}),", ",e.jsx(n.code,{children:"secondary"}),", ",e.jsx(n.code,{children:"success"}),", ",e.jsx(n.code,{children:"danger"}),", ",e.jsx(n.code,{children:"warning"}),", ",e.jsx(n.code,{children:"purple"}),", ",e.jsx(n.code,{children:"info"}),"."]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"disabled"}),", the button becomes non-interactive with reduced opacity."]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:'type="submit"'})," for form submission behavior."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(c,{}),`
`,e.jsx(l,{})]})}function u(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{u as default};
