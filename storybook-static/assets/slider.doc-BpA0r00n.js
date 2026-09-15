import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as l,P as c,C as d,S as o}from"./blocks-DefDVuP9.js";import{S as t}from"./slider.stories-DdL3V7II.js";import"./preload-helper-C1FmrZbK.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:t}),`
`,e.jsx(n.h1,{id:"itslider",children:"ITSlider"}),`
`,e.jsx(n.p,{children:"Range slider with configurable min, max, and step values. Displays the current value."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"number"}),` | — | Current slider value |
| `,e.jsx(n.code,{children:"defaultValue"})," | ",e.jsx(n.code,{children:"number"}),` | — | Default uncontrolled value |
| `,e.jsx(n.code,{children:"min"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"0"}),` | Minimum value |
| `,e.jsx(n.code,{children:"max"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"100"}),` | Maximum value |
| `,e.jsx(n.code,{children:"step"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"1"}),` | Step increment |
| `,e.jsx(n.code,{children:"orientation"})," | ",e.jsx(n.code,{children:"'horizontal' \\| 'vertical'"})," | ",e.jsx(n.code,{children:"'horizontal'"}),` | Slider orientation |
| `,e.jsx(n.code,{children:"showValue"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"true"}),` | Show current value label |
| `,e.jsx(n.code,{children:"ticks"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Show tick marks |
| `,e.jsx(n.code,{children:"tickLabels"})," | ",e.jsx(n.code,{children:"string[]"}),` | — | Custom labels for tick marks |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"'primary'"}),` | Semantic color theme |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Disables the slider |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITSlider } from '@axzydev/axzy_ui_system';

<ITSlider />
<ITSlider min={0} max={100} step={10} defaultValue={50} />
<ITSlider orientation="vertical" showValue ticks color="success" />
<ITSlider tickLabels={['Low', 'Mid', 'High']} step={50} max={100} />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Current value displayed by default; set ",e.jsx(n.code,{children:"showValue={false}"})," to hide"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ticks"})," renders tick marks at each step interval"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"tickLabels"})," provides custom string labels for tick positions"]}),`
`,e.jsx(n.li,{children:"Orientation supports horizontal and vertical layouts"}),`
`,e.jsx(n.li,{children:"All semantic color themes supported"}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(d,{}),`
`,e.jsx(o,{})]})}function u(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{u as default};
