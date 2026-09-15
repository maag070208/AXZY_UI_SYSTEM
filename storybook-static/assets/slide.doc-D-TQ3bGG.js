import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as d,P as i,C as c,S as r}from"./blocks-DefDVuP9.js";import{S as t}from"./slide.stories-B3GyiFrB.js";import"./preload-helper-C1FmrZbK.js";function o(l){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:t}),`
`,e.jsx(n.h1,{id:"itslidetoggle",children:"ITSlideToggle"}),`
`,e.jsx(n.p,{children:"iOS-style toggle switch for boolean settings. Supports controlled and uncontrolled modes."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"checked"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Controlled checked state |
| `,e.jsx(n.code,{children:"defaultChecked"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Uncontrolled default state |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(checked: boolean) => void"}),` | — | Change handler |
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | — | Label text |
| `,e.jsx(n.code,{children:"labelPosition"})," | ",e.jsx(n.code,{children:"'left' \\| 'right'"})," | ",e.jsx(n.code,{children:"'right'"}),` | Label placement |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"'sm' \\| 'md' \\| 'lg'"})," | ",e.jsx(n.code,{children:"'md'"}),` | Toggle size |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"'primary' \\| 'secondary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info' \\| 'neutral'"})," | ",e.jsx(n.code,{children:"'primary'"}),` | Color theme when checked |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Disables the toggle |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITSlideToggle } from '@axzydev/axzy_ui_system';

<ITSlideToggle />
<ITSlideToggle label="Enable notifications" defaultChecked />
<ITSlideToggle label="Dark mode" labelPosition="left" size="sm" color="success" />
<ITSlideToggle disabled label="Locked" />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Controlled mode via ",e.jsx(n.code,{children:"checked"})," + ",e.jsx(n.code,{children:"onChange"})]}),`
`,e.jsxs(n.li,{children:["Uncontrolled mode via ",e.jsx(n.code,{children:"defaultChecked"})]}),`
`,e.jsx(n.li,{children:"Label renders alongside the toggle with configurable position"}),`
`,e.jsx(n.li,{children:"Seven semantic color themes available"}),`
`,e.jsx(n.li,{children:"Three sizes: sm (small), md (medium), lg (large)"}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(i,{}),`
`,e.jsx(c,{}),`
`,e.jsx(r,{})]})}function g(l={}){const{wrapper:n}={...s(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(o,{...l})}):o(l)}export{g as default};
