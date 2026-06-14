import{j as e}from"./iframe-BUyFEAH8.js";import{I as o}from"./flex-BtJQ6ORA.js";import"./preload-helper-C1FmrZbK.js";const F={title:"Layout/ITFlex",component:o,tags:["autodocs"],argTypes:{direction:{control:"select",options:["row","column","row-reverse","column-reverse"]},align:{control:"select",options:[void 0,"start","end","center","stretch","baseline"]},justify:{control:"select",options:[void 0,"start","end","center","between","around","evenly"]},wrap:{control:"select",options:[void 0,"nowrap","wrap","wrap-reverse"]},gap:{control:{type:"range",min:0,max:16,step:1}},grow:{control:"boolean"}}},r=({children:n,className:w=""})=>e.jsx("div",{className:`bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium ${w}`,children:n}),s={args:{direction:"row",gap:3},render:n=>e.jsxs(o,{...n,children:[e.jsx(r,{children:"Flex 1"}),e.jsx(r,{children:"Flex 2"}),e.jsx(r,{children:"Flex 3"})]})},a={args:{justify:"between",align:"center",className:"w-full"},render:n=>e.jsxs(o,{...n,children:[e.jsx(r,{children:"Left"}),e.jsx(r,{children:"Center"}),e.jsx(r,{children:"Right"})]})},t={args:{direction:"column",gap:2,className:"h-60"},render:n=>e.jsxs(o,{...n,children:[e.jsx(o,{grow:!0,className:"bg-primary-100 rounded-lg p-4",children:e.jsx(r,{children:"Grow (flex: 1)"})}),e.jsx(r,{className:"w-full",children:"Fixed height"})]})};var l,c,i;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    direction: "row",
    gap: 3
  },
  render: args => <ITFlex {...args}>
      <Box>Flex 1</Box>
      <Box>Flex 2</Box>
      <Box>Flex 3</Box>
    </ITFlex>
}`,...(i=(c=s.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var x,d,m;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    justify: "between",
    align: "center",
    className: "w-full"
  },
  render: args => <ITFlex {...args}>
      <Box>Left</Box>
      <Box>Center</Box>
      <Box>Right</Box>
    </ITFlex>
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,g,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    direction: "column",
    gap: 2,
    className: "h-60"
  },
  render: args => <ITFlex {...args}>
      <ITFlex grow className="bg-primary-100 rounded-lg p-4">
        <Box>Grow (flex: 1)</Box>
      </ITFlex>
      <Box className="w-full">Fixed height</Box>
    </ITFlex>
}`,...(u=(g=t.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const f=["Row","SpaceBetween","ColumnGrow"];export{t as ColumnGrow,s as Row,a as SpaceBetween,f as __namedExportsOrder,F as default};
