import{j as e}from"./iframe-B5RMobo9.js";import{u as a,M as l,P as o,C as r,S as t}from"./blocks-DefDVuP9.js";import{S as c}from"./tabs.stories-DqCqjrkH.js";import"./preload-helper-C1FmrZbK.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(n.h1,{id:"ittabs",children:"ITTabs"}),`
`,e.jsx(n.p,{children:"Tab navigation component with multiple visual variants, orientation options, and color themes."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"tabs"})," | ",e.jsx(n.code,{children:"{ label: string; icon?: ReactNode; disabled?: boolean }[]"}),` | — | Tab definitions |
| `,e.jsx(n.code,{children:"activeTab"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"0"}),` | Zero-indexed active tab |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(index: number) => void"}),` | — | Tab change handler |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"'default' \\| 'pills' \\| 'underline' \\| 'enclosed'"})," | ",e.jsx(n.code,{children:"'default'"}),` | Visual style variant |
| `,e.jsx(n.code,{children:"orientation"})," | ",e.jsx(n.code,{children:"'horizontal' \\| 'vertical'"})," | ",e.jsx(n.code,{children:"'horizontal'"}),` | Tab layout orientation |
| `,e.jsx(n.code,{children:"fullWidth"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Stretch tabs to fill container |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"'primary' \\| 'secondary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'info' \\| 'neutral'"})," | ",e.jsx(n.code,{children:"'primary'"})," | Color theme |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITTabs } from '@axzydev/axzy_ui_system';

const tabs = [
  { label: 'General' },
  { label: 'Security', icon: <LockIcon /> },
  { label: 'Billing', disabled: true },
];

<ITTabs tabs={tabs} activeTab={0} onChange={(i) => console.log(i)} />
<ITTabs tabs={tabs} variant="pills" fullWidth />
<ITTabs tabs={tabs} variant="underline" orientation="vertical" color="success" />
<ITTabs tabs={tabs} variant="enclosed" />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Four visual variants: default, pills, underline, enclosed"}),`
`,e.jsx(n.li,{children:"Horizontal or vertical tab layout"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"fullWidth"})," makes tabs span the full container width"]}),`
`,e.jsxs(n.li,{children:["Icons rendered alongside tab labels via the ",e.jsx(n.code,{children:"icon"})," prop"]}),`
`,e.jsx(n.li,{children:"Individual tabs can be disabled"}),`
`,e.jsx(n.li,{children:"Seven color themes available"}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(o,{}),`
`,e.jsx(r,{}),`
`,e.jsx(t,{})]})}function b(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{b as default};
