import{g as r,j as e}from"./iframe-B5RMobo9.js";const T={title:"Layout/ITGrid",component:r,argTypes:{spacing:{control:{type:"range",min:0,max:8,step:1}},columns:{control:{type:"number",min:1,max:12}}}},s=({children:n})=>e.jsx("div",{className:"bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium h-full flex items-center justify-center",children:n}),i={args:{container:!0,spacing:2},render:n=>e.jsxs(r,{...n,children:[e.jsx(r,{item:!0,xs:4,children:e.jsx(s,{children:"1/3"})}),e.jsx(r,{item:!0,xs:4,children:e.jsx(s,{children:"1/3"})}),e.jsx(r,{item:!0,xs:4,children:e.jsx(s,{children:"1/3"})})]})},t={args:{container:!0,spacing:3},render:n=>e.jsxs(r,{...n,children:[e.jsx(r,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(s,{children:"xs=12 sm=6 md=4 lg=3"})}),e.jsx(r,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(s,{children:"xs=12 sm=6 md=4 lg=3"})}),e.jsx(r,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(s,{children:"xs=12 sm=6 md=4 lg=3"})}),e.jsx(r,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(s,{children:"xs=12 sm=6 md=4 lg=3"})})]})},d={args:{container:!0,spacing:4,columns:12},render:n=>e.jsxs(r,{...n,children:[e.jsx(r,{item:!0,xs:12,md:3,children:e.jsx(s,{children:"Sidebar (md: 3/12)"})}),e.jsx(r,{item:!0,xs:12,md:9,children:e.jsx(s,{children:"Main Content (md: 9/12)"})})]})};var l,m,a;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    container: true,
    spacing: 2
  },
  render: args => <ITGrid {...args}>
      <ITGrid item xs={4}>
        <Cell>1/3</Cell>
      </ITGrid>
      <ITGrid item xs={4}>
        <Cell>1/3</Cell>
      </ITGrid>
      <ITGrid item xs={4}>
        <Cell>1/3</Cell>
      </ITGrid>
    </ITGrid>
}`,...(a=(m=i.parameters)==null?void 0:m.docs)==null?void 0:a.source}}};var c,o,x;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    container: true,
    spacing: 3
  },
  render: args => <ITGrid {...args}>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
    </ITGrid>
}`,...(x=(o=t.parameters)==null?void 0:o.docs)==null?void 0:x.source}}};var g,u,p;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    container: true,
    spacing: 4,
    columns: 12
  },
  render: args => <ITGrid {...args}>
      <ITGrid item xs={12} md={3}>
        <Cell>Sidebar (md: 3/12)</Cell>
      </ITGrid>
      <ITGrid item xs={12} md={9}>
        <Cell>Main Content (md: 9/12)</Cell>
      </ITGrid>
    </ITGrid>
}`,...(p=(u=d.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const j=["ThreeColumns","Responsive","SidebarContent"],I=Object.freeze(Object.defineProperty({__proto__:null,Responsive:t,SidebarContent:d,ThreeColumns:i,__namedExportsOrder:j,default:T},Symbol.toStringTag,{value:"Module"}));export{I as S};
