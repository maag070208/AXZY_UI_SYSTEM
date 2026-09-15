import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as r,P as s,C as l,S as a}from"./blocks-DefDVuP9.js";import{S as d}from"./tooltip.stories-Bp7ay5VM.js";import"./preload-helper-C1FmrZbK.js";function n(o){const t={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(t.h1,{id:"ittooltip",children:"ITTooltip"}),`
`,e.jsx(t.p,{children:"Hover and focus tooltip that wraps a trigger element and displays contextual information in a small popup. Supports four placement positions with a triangular arrow pointing toward the trigger, configurable show delay, and customizable max-width."}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(t.code,{children:"content"})," | ",e.jsx(t.code,{children:"ReactNode"}),` | — | The tooltip content to display on hover/focus. Accepts text or any ReactNode. |
| `,e.jsx(t.code,{children:"children"})," | ",e.jsx(t.code,{children:"ReactNode"}),` | — | The trigger element that reveals the tooltip on interaction. |
| `,e.jsx(t.code,{children:"position"})," | ",e.jsx(t.code,{children:'"top" \\| "bottom" \\| "left" \\| "right"'})," | ",e.jsx(t.code,{children:'"top"'}),` | Placement relative to children. |
| `,e.jsx(t.code,{children:"delay"})," | ",e.jsx(t.code,{children:"number"})," | ",e.jsx(t.code,{children:"200"}),` | Delay in milliseconds before the tooltip becomes visible. |
| `,e.jsx(t.code,{children:"className"})," | ",e.jsx(t.code,{children:"string"})," | — | Additional CSS classes applied to the wrapper element. |"]}),`
`,e.jsx(t.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import { ITTooltip } from '@axzydev/axzy_ui_system';

<ITTooltip content="Click to save" position="bottom">
  <button>Save</button>
</ITTooltip>

<ITTooltip content={<span>Delete this item?</span>} position="top" delay={500}>
  <IconButton icon={TrashIcon} />
</ITTooltip>
`})}),`
`,e.jsx(t.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The tooltip appears after a ",e.jsx(t.strong,{children:"delay"})," (default 200ms) once the mouse enters the trigger, and disappears immediately on mouse leave."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"position"})," controls both the popup placement and the arrow direction: ",e.jsx(t.code,{children:"top"})," (tooltip above, arrow pointing down), ",e.jsx(t.code,{children:"bottom"})," (below, arrow up), ",e.jsx(t.code,{children:"left"})," (to the left, arrow right), ",e.jsx(t.code,{children:"right"})," (to the right, arrow left)."]}),`
`,e.jsxs(t.li,{children:["An optional triangular ",e.jsx(t.strong,{children:"arrow"})," is always rendered, styled with CSS borders pointing toward the trigger."]}),`
`,e.jsxs(t.li,{children:["Tooltip body uses dark slate (",e.jsx(t.code,{children:"slate-800"}),") background with white text and rounded corners."]}),`
`,e.jsxs(t.li,{children:["The wrapper is ",e.jsx(t.code,{children:"inline-flex"})," by default, so it only takes as much width as the trigger — add ",e.jsx(t.code,{children:"className"})," to constrain max-width on the tooltip content."]}),`
`,e.jsx(t.li,{children:"Supports keyboard focus: the tooltip also appears when the trigger element receives focus."}),`
`]}),`
`,e.jsx(t.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(s,{}),`
`,e.jsx(l,{}),`
`,e.jsx(a,{})]})}function j(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{j as default};
