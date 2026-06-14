import{j as e}from"./iframe-BUyFEAH8.js";import{I as t}from"./stack-DCw82gtv.js";import"./preload-helper-C1FmrZbK.js";const T={title:"Layout/ITStack",component:t,tags:["autodocs"],argTypes:{direction:{control:"select",options:["row","column","row-reverse","column-reverse"]},spacing:{control:{type:"range",min:0,max:16,step:1}},alignItems:{control:"select",options:[void 0,"start","end","center","stretch","baseline"]},justifyContent:{control:"select",options:[void 0,"start","end","center","between","around","evenly"]},flexWrap:{control:"select",options:[void 0,"nowrap","wrap","wrap-reverse"]}}},r=({children:n,className:v=""})=>e.jsx("div",{className:`bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium ${v}`,children:n}),s={args:{direction:"column",spacing:2,children:null},render:n=>e.jsxs(t,{...n,children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"})]})},o={args:{direction:"row",spacing:2,children:null},render:n=>e.jsxs(t,{...n,children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"})]})},a={args:{direction:"row",spacing:2,divider:e.jsx("div",{className:"w-px bg-gray-300 self-stretch"})},render:n=>e.jsxs(t,{...n,children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"})]})},c={args:{direction:"row",spacing:4,alignItems:"center",justifyContent:"center",className:"h-40 bg-gray-50 rounded-xl"},render:n=>e.jsxs(t,{...n,children:[e.jsx(r,{children:"Center"}),e.jsx(r,{children:"Middle"})]})};var i,d,l;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    direction: "column",
    spacing: 2,
    children: null
  },
  render: args => <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,x,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    direction: "row",
    spacing: 2,
    children: null
  },
  render: args => <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
}`,...(p=(x=o.parameters)==null?void 0:x.docs)==null?void 0:p.source}}};var g,u,I;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    direction: "row",
    spacing: 2,
    divider: <div className="w-px bg-gray-300 self-stretch" />
  },
  render: args => <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
}`,...(I=(u=a.parameters)==null?void 0:u.docs)==null?void 0:I.source}}};var h,B,j;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    direction: "row",
    spacing: 4,
    alignItems: "center",
    justifyContent: "center",
    className: "h-40 bg-gray-50 rounded-xl"
  },
  render: args => <ITStack {...args}>
      <Box>Center</Box>
      <Box>Middle</Box>
    </ITStack>
}`,...(j=(B=c.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};const f=["Vertical","Horizontal","WithDivider","Centered"];export{c as Centered,o as Horizontal,s as Vertical,a as WithDivider,f as __namedExportsOrder,T as default};
