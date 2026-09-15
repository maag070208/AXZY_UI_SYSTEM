import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as d,P as l,C as o,S as t}from"./blocks-DefDVuP9.js";import{S as c}from"./drawer.stories-BcKZWci6.js";import"./preload-helper-C1FmrZbK.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:c}),`
`,e.jsx(n.h1,{id:"itdrawer",children:"ITDrawer"}),`
`,e.jsx(n.p,{children:"A sliding panel that emerges from the left or right edge with a backdrop overlay. Includes an optional title bar with close button and a scrollable body. Ideal for side panels, navigation menus, filters, and detail views."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"isOpen"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Controls drawer visibility. |
| `,e.jsx(n.code,{children:"onClose"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Called on overlay click or close button press. |
| `,e.jsx(n.code,{children:"position"})," | ",e.jsx(n.code,{children:'"left" \\| "right"'})," | ",e.jsx(n.code,{children:'"right"'}),` | Screen edge the drawer attaches to. |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"w-80"'})," | Tailwind width class (e.g., ",e.jsx(n.code,{children:'"w-72"'}),", ",e.jsx(n.code,{children:'"w-96"'}),`). |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Optional heading in the drawer header. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Content displayed in the drawer body. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS classes for the drawer panel. |
| `,e.jsx(n.code,{children:"style"})," | ",e.jsx(n.code,{children:"CSSProperties"})," | — | Inline styles for the drawer panel. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITDrawer } from '@axzydev/axzy_ui_system';

<ITDrawer
  isOpen={menuOpen}
  onClose={() => setMenuOpen(false)}
  title="Navigation"
  position="left"
  size="w-72"
>
  <NavMenu />
</ITDrawer>

<ITDrawer
  isOpen={filterOpen}
  onClose={() => setFilterOpen(false)}
  title="Filters"
>
  <FilterPanel />
</ITDrawer>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The overlay uses ",e.jsx(n.code,{children:"bg-black/40 backdrop-blur-sm"})," for a blurred background effect."]}),`
`,e.jsxs(n.li,{children:["Overlay click outside the panel dismisses the drawer via ",e.jsx(n.code,{children:"useClickOutside"}),"."]}),`
`,e.jsxs(n.li,{children:["The body area scrolls independently (",e.jsx(n.code,{children:"overflow-y-auto"}),"), keeping the header fixed."]}),`
`,e.jsxs(n.li,{children:["Default size ",e.jsx(n.code,{children:"w-80"})," (320px); adjust with any Tailwind width class like ",e.jsx(n.code,{children:"w-96"})," (384px) or ",e.jsx(n.code,{children:"w-[400px]"}),"."]}),`
`,e.jsx(n.li,{children:"No built-in footer slot — add buttons or actions directly in the children content."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(l,{}),`
`,e.jsx(o,{}),`
`,e.jsx(t,{})]})}function p(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{p as default};
