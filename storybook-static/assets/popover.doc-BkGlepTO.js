import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as i,P as s,C as l,S as d}from"./blocks-DefDVuP9.js";import{S as c}from"./popover.stories-B4msMTvM.js";import"./preload-helper-C1FmrZbK.js";function t(o){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c}),`
`,e.jsx(n.h1,{id:"itpopover",children:"ITPopover"}),`
`,e.jsxs(n.p,{children:["Floating content panel triggered by click on a trigger element. Supports four position placements and offers both uncontrolled (click toggle) and controlled (",e.jsx(n.code,{children:"isOpen"}),"/",e.jsx(n.code,{children:"onClose"}),") modes."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"trigger"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Element that triggers the popover when clicked. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Content rendered inside the popover panel. |
| `,e.jsx(n.code,{children:"position"})," | ",e.jsx(n.code,{children:'"top" \\| "bottom" \\| "left" \\| "right"'})," | ",e.jsx(n.code,{children:'"bottom"'}),` | Position of the popover relative to the trigger element. |
| `,e.jsx(n.code,{children:"isOpen"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Controlled open state. When provided, the component acts in controlled mode. |
| `,e.jsx(n.code,{children:"onClose"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Callback fired when the popover is closed in controlled mode. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | Additional CSS classes for the container. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITPopover } from '@axzydev/axzy_ui_system';

<ITPopover trigger={<ITButton label="Abrir" />}>
  <button>Editar</button>
  <button>Eliminar</button>
</ITPopover>

<ITPopover
  trigger={<ITButton label="Controlled" />}
  position="top"
  isOpen={open}
  onClose={() => setOpen(false)}
>
  <p>Contenido controlado</p>
</ITPopover>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Default mode is uncontrolled: clicking the trigger toggles the popover open/closed."}),`
`,e.jsxs(n.li,{children:["Controlled mode via ",e.jsx(n.code,{children:"isOpen"})," and ",e.jsx(n.code,{children:"onClose"})," allows external state management."]}),`
`,e.jsxs(n.li,{children:["Four positions available: ",e.jsx(n.code,{children:"top"}),", ",e.jsx(n.code,{children:"bottom"}),", ",e.jsx(n.code,{children:"left"}),", ",e.jsx(n.code,{children:"right"})," relative to the trigger element."]}),`
`,e.jsx(n.li,{children:"Popover is dismissed automatically when clicking outside the panel."}),`
`,e.jsx(n.li,{children:"Ideal for dropdown menus, action lists, and contextual tool panels."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(s,{}),`
`,e.jsx(l,{}),`
`,e.jsx(d,{})]})}function j(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{j as default};
