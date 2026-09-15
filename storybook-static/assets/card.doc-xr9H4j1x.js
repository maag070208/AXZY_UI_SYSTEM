import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as t,P as o,C as d,S as a}from"./blocks-DefDVuP9.js";import{S as c}from"./card.stories-CRjTbQw2.js";import"./preload-helper-C1FmrZbK.js";function s(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:c}),`
`,e.jsx(n.h1,{id:"itcard",children:"ITCard"}),`
`,e.jsxs(n.p,{children:["A versatile container component for grouping related content and actions. Supports an optional header image, title, body content, and a footer action area. Cards become interactive with hover shadow animation when an ",e.jsx(n.code,{children:"onClick"})," handler is provided."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"onClick"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Click handler. When provided, the card becomes interactive with hover shadow effect. |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"}),` | — | Card title displayed in the header area. |
| `,e.jsx(n.code,{children:"image"})," | ",e.jsx(n.code,{children:"string"}),` | — | Image source URL displayed at the top of the card. |
| `,e.jsx(n.code,{children:"alt"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"Card Image"'}),` | Alt text for the card image. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Card body content, rendered below the title. |
| `,e.jsx(n.code,{children:"actions"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Action elements rendered in a footer section separated by a border. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class names for the card container. |
| `,e.jsx(n.code,{children:"imageClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class names for the image element. |
| `,e.jsx(n.code,{children:"titleClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class names for the title element. |
| `,e.jsx(n.code,{children:"contentClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class names for the content wrapper. |
| `,e.jsx(n.code,{children:"actionClassName"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS class names for the actions footer. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITCard } from '@axzydev/axzy_ui_system';

<ITCard title="Bienvenido" image="/hero.jpg" actions={<ITButton label="Ver más" />}>
  Contenido de la tarjeta.
</ITCard>

<ITCard onClick={() => navigate("/details")} className="max-w-sm">
  Tarjeta interactiva con sombra al hover.
</ITCard>
`})}),`
`,e.jsx(n.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"})," — Clean container with theme-driven background, border, and border-radius via CSS custom properties."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive"})," — When ",e.jsx(n.code,{children:"onClick"})," is provided, the card gains a subtle base shadow, a stronger shadow on hover, a pointer cursor, and smooth transition animation."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"With image"})," — The ",e.jsx(n.code,{children:"image"})," prop renders a full-width image at the top with ",e.jsx(n.code,{children:"object-cover"})," and a fixed height."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"With actions"})," — The ",e.jsx(n.code,{children:"actions"})," prop renders a footer section with a top border, perfect for button groups."]}),`
`,e.jsxs(n.li,{children:["Styling is driven by CSS custom properties (",e.jsx(n.code,{children:"--card-bg"}),", ",e.jsx(n.code,{children:"--card-border"}),", ",e.jsx(n.code,{children:"--card-radius"}),") for easy theming."]}),`
`,e.jsxs(n.li,{children:["All style class names are customizable via the dedicated ",e.jsx(n.code,{children:"*ClassName"})," props."]}),`
`,e.jsxs(n.li,{children:["Card contents are wrapped with ",e.jsx(n.code,{children:"ITText"})," for consistent typography."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(d,{}),`
`,e.jsx(a,{})]})}function m(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{m as default};
