import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as t,P as d,C as i,S as c}from"./blocks-DefDVuP9.js";import{S as l}from"./themeProvider.stories-Ced6TJxC.js";import"./preload-helper-C1FmrZbK.js";function o(n){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:l}),`
`,e.jsx(r.h1,{id:"itthemeprovider",children:"ITThemeProvider"}),`
`,e.jsx(r.p,{children:"Root theme context that injects CSS custom properties into the entire component tree. Provides a centralized color palette with semantic tokens (primary, secondary, ternary, danger, success, info, alert, warning) plus overridable layout and table sections. Includes a floating action button that opens an in-app real-time theme designer drawer for live palette editing, dark/light/system mode switching, and preset themes."}),`
`,e.jsx(r.h2,{id:"props",children:"Props"}),`
`,e.jsxs(r.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(r.code,{children:"theme"})," | ",e.jsx(r.code,{children:"Partial<ITThemePalette>"}),` | — | Partial palette overrides merged with the default theme. Supports primary, secondary, ternary, danger, success, info, alert, warning, layout, and table colors. |
| `,e.jsx(r.code,{children:"children"})," | ",e.jsx(r.code,{children:"React.ReactNode"}),` | — | The subtree that receives the theme context and CSS variables. |
| `,e.jsx(r.code,{children:"showFab"})," | ",e.jsx(r.code,{children:"boolean"})," | ",e.jsx(r.code,{children:"false"}),` | Whether to show the floating action button for opening the theme designer drawer. |
| `,e.jsx(r.code,{children:"density"})," | ",e.jsx(r.code,{children:"number"})," | ",e.jsx(r.code,{children:"1"})," | Global density/compactness factor: values below ",e.jsx(r.code,{children:"1"})," shrink base sizes (fonts, paddings, gaps), above ",e.jsx(r.code,{children:"1"})," grow them. Applies by scaling the root font-size so every ",e.jsx(r.code,{children:"rem"}),"-based token compacts together while the layout stays fluid. Clamped to ",e.jsx(r.code,{children:"0.5"}),"–",e.jsx(r.code,{children:"1.5"}),`. |
| `,e.jsx(r.code,{children:"radius"})," | ",e.jsx(r.code,{children:"number"})," | — | Global border radius in ",e.jsx(r.strong,{children:"px"})," applied to the whole rounding scale. ",e.jsx(r.code,{children:"2"})," ⇒ 2px corners (near-square), ",e.jsx(r.code,{children:"8"})," ⇒ 8px, ",e.jsx(r.code,{children:"0"}),` ⇒ square. No override when omitted (Tailwind defaults). |
| `,e.jsx(r.code,{children:"shadow"})," | ",e.jsx(r.code,{children:"number"})," | ",e.jsx(r.code,{children:"2"})," | Global shadow strength level: ",e.jsx(r.code,{children:"0"})," ⇒ none, ",e.jsx(r.code,{children:"1"})," ⇒ subtle, ",e.jsx(r.code,{children:"2"})," ⇒ default current look, ",e.jsx(r.code,{children:"3"})," ⇒ pronounced. No override when omitted (keeps defaults). |"]}),`
`,e.jsx(r.h3,{id:"itthemepalette-shape",children:"ITThemePalette Shape"}),`
`,e.jsxs(r.p,{children:[`| Key | Type | Description |
|-----|------|-------------|
| `,e.jsx(r.code,{children:"primary"})," | ",e.jsx(r.code,{children:"string"}),` | Primary color for buttons, links, active states. |
| `,e.jsx(r.code,{children:"secondary"})," | ",e.jsx(r.code,{children:"string"}),` | Secondary/muted color. |
| `,e.jsx(r.code,{children:"ternary"})," | ",e.jsx(r.code,{children:"string"}),` | Tertiary accent color. |
| `,e.jsx(r.code,{children:"danger"})," | ",e.jsx(r.code,{children:"string"}),` | Destructive action color. |
| `,e.jsx(r.code,{children:"success"})," | ",e.jsx(r.code,{children:"string"}),` | Positive/success color. |
| `,e.jsx(r.code,{children:"info"})," | ",e.jsx(r.code,{children:"string"}),` | Informational color. |
| `,e.jsx(r.code,{children:"alert"})," | ",e.jsx(r.code,{children:"string"}),` | Alert/warning highlight color. |
| `,e.jsx(r.code,{children:"warning"})," | ",e.jsx(r.code,{children:"string"}),` | Cautionary yellow color. |
| `,e.jsx(r.code,{children:"layout.sidebarBg"})," | ",e.jsx(r.code,{children:"string"}),` | Sidebar background color. |
| `,e.jsx(r.code,{children:"layout.sidebarText"})," | ",e.jsx(r.code,{children:"string"}),` | Sidebar text color. |
| `,e.jsx(r.code,{children:"layout.navbarBg"})," | ",e.jsx(r.code,{children:"string"}),` | Navbar background color. |
| `,e.jsx(r.code,{children:"layout.navbarText"})," | ",e.jsx(r.code,{children:"string"}),` | Navbar text color. |
| `,e.jsx(r.code,{children:"table.headerBg"})," | ",e.jsx(r.code,{children:"string"}),` | Table header background color. |
| `,e.jsx(r.code,{children:"table.headerText"})," | ",e.jsx(r.code,{children:"string"}),` | Table header text color. |
| `,e.jsx(r.code,{children:"table.rowBg"})," | ",e.jsx(r.code,{children:"string"}),` | Table row background color. |
| `,e.jsx(r.code,{children:"table.rowText"})," | ",e.jsx(r.code,{children:"string"})," | Table row text color. |"]}),`
`,e.jsx(r.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`import { ITThemeProvider } from '@axzydev/axzy_ui_system';

<ITThemeProvider
  theme={{
    primary: '#8b5cf6',
    success: '#22c55e',
    layout: {
      sidebarBg: '#0b1120',
      sidebarText: '#94a3b8',
    },
  }}
>
  <App />
</ITThemeProvider>

<ITThemeProvider showFab>
  <App />
</ITThemeProvider>

{/* Cuadrado en todos lados y sombras nivel 2 */}
<ITThemeProvider radius={2} shadow={2}>
  <App />
</ITThemeProvider>
`})}),`
`,e.jsx(r.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Wrap your entire application in ",e.jsx(r.code,{children:"ITThemeProvider"})," once at the root level."]}),`
`,e.jsxs(r.li,{children:["The default palette uses cyan (",e.jsx(r.code,{children:"#06b6d4"}),") as primary and supports all semantic color tokens."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"showFab"})," renders a floating palette icon. Clicking it opens a drawer with color pickers for each token, dark/light/system mode toggle, preset theme cards, live preview, and persistent localStorage save."]}),`
`,e.jsxs(r.li,{children:["Theme preferences are persisted to localStorage under the ",e.jsx(r.code,{children:"it-theme-palette"})," key."]}),`
`,e.jsxs(r.li,{children:["All child components consume theme colors via CSS custom properties (e.g., ",e.jsx(r.code,{children:"var(--it-primary)"}),") injected by the provider."]}),`
`,e.jsx(r.li,{children:"Custom palettes can override any subset of tokens; unset keys fall back to the default palette."}),`
`]}),`
`,e.jsx(r.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(d,{}),`
`,e.jsx(i,{}),`
`,e.jsx(c,{})]})}function p(n={}){const{wrapper:r}={...s(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(o,{...n})}):o(n)}export{p as default};
