import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as t,P as c,C as r,S as l}from"./blocks-DefDVuP9.js";import{S as d}from"./stepper.stories-DzhJXT9M.js";import"./preload-helper-C1FmrZbK.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:d}),`
`,e.jsx(n.h1,{id:"itstepper",children:"ITStepper"}),`
`,e.jsx(n.p,{children:"Step-by-step wizard indicator for multi-step workflows with configurable layout and icons."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"steps"})," | ",e.jsx(n.code,{children:"{ label: string; description?: string; icon?: ReactNode }[]"}),` | — | Step definitions |
| `,e.jsx(n.code,{children:"activeStep"})," | ",e.jsx(n.code,{children:"number"})," | ",e.jsx(n.code,{children:"0"}),` | Zero-indexed active step |
| `,e.jsx(n.code,{children:"orientation"})," | ",e.jsx(n.code,{children:"'horizontal' \\| 'vertical'"})," | ",e.jsx(n.code,{children:"'horizontal'"}),` | Layout orientation |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"'default' \\| 'dot' \\| 'icon'"})," | ",e.jsx(n.code,{children:"'default'"}),` | Visual style variant |
| `,e.jsx(n.code,{children:"clickable"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Allow clicking steps to navigate |
| `,e.jsx(n.code,{children:"onStepClick"})," | ",e.jsx(n.code,{children:"(index: number) => void"}),` | — | Click handler for step navigation |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"string"})," | — | Color theme |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITStepper } from '@axzydev/axzy_ui_system';

const steps = [
  { label: 'Details', description: 'Enter your info' },
  { label: 'Payment', description: 'Choose method' },
  { label: 'Confirm', description: 'Review and submit' },
];

<ITStepper steps={steps} activeStep={0} />
<ITStepper steps={steps} activeStep={1} variant="dot" orientation="vertical" />
<ITStepper steps={[
  { label: 'Upload', icon: <UploadIcon /> },
  { label: 'Review', icon: <CheckIcon /> },
]} variant="icon" />
<ITStepper steps={steps} clickable onStepClick={(i) => console.log(i)} />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'variant="default"'})," shows numbered step circles"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'variant="dot"'})," shows minimal dot indicators"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'variant="icon"'})," uses custom icons per step instead of numbers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"clickable"})," + ",e.jsx(n.code,{children:"onStepClick"})," enables step-based navigation"]}),`
`,e.jsxs(n.li,{children:["Optional ",e.jsx(n.code,{children:"description"})," renders below each step label"]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(r,{}),`
`,e.jsx(l,{})]})}function j(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{j as default};
