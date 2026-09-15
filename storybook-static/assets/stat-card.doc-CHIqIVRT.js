import{j as e}from"./iframe-B5RMobo9.js";import{u as s,M as i,P as l,C as o,S as c}from"./blocks-DefDVuP9.js";import{S as t}from"./stat-card.stories-U7rGS6dp.js";import"./preload-helper-C1FmrZbK.js";function d(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:t}),`
`,e.jsx(n.h1,{id:"itstatcard",children:"ITStatCard"}),`
`,e.jsx(n.p,{children:"Metric card displaying a label, value, and optional trend indicator with color theme."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"label"})," | ",e.jsx(n.code,{children:"string"}),` | — | Card label |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"string \\| number"}),` | — | Primary metric value |
| `,e.jsx(n.code,{children:"trend"})," | ",e.jsx(n.code,{children:"'up' \\| 'down' \\| 'neutral'"}),` | — | Trend direction |
| `,e.jsx(n.code,{children:"trendValue"})," | ",e.jsx(n.code,{children:"string \\| number"}),` | — | Trend percentage or value |
| `,e.jsx(n.code,{children:"icon"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Icon displayed on the card |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"string"}),` | — | Color theme |
| `,e.jsx(n.code,{children:"size"})," | ",e.jsx(n.code,{children:"'sm' \\| 'md' \\| 'lg'"})," | ",e.jsx(n.code,{children:"'md'"}),` | Card size variant |
| `,e.jsx(n.code,{children:"subtitle"})," | ",e.jsx(n.code,{children:"string"}),` | — | Secondary descriptive text |
| `,e.jsx(n.code,{children:"loading"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Show loading skeleton |
| `,e.jsx(n.code,{children:"onClick"})," | ",e.jsx(n.code,{children:"() => void"})," | — | Click handler |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITStatCard } from '@axzydev/axzy_ui_system';

<ITStatCard label="Revenue" value="$12,430" trend="up" trendValue="12.5%" color="success" />
<ITStatCard label="Users" value="1,024" icon={<UsersIcon />} size="lg" />
<ITStatCard label="Bounce Rate" value="42%" trend="down" trendValue="3.1%" color="danger" subtitle="vs last week" />
<ITStatCard label="Loading" loading />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"trend"})," direction renders an arrow indicator with formatted ",e.jsx(n.code,{children:"trendValue"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"loading"})," shows a skeleton placeholder for async data"]}),`
`,e.jsx(n.li,{children:"Three sizes: sm, md, lg"}),`
`,e.jsxs(n.li,{children:["Clickable via ",e.jsx(n.code,{children:"onClick"})," for drill-down dashboards"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"subtitle"})," provides supporting context below the value"]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(l,{}),`
`,e.jsx(o,{}),`
`,e.jsx(c,{})]})}function u(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}export{u as default};
