import{j as e,c as j}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";function N(r,d){return r===void 0?void 0:`col-span-${Math.min(Math.max(Math.round(r),1),d)}`}function l(r,d,t){if(r===void 0)return;const a=Math.min(Math.max(Math.round(r),1),t);return`${d}:col-span-${a}`}function s({children:r,container:d,item:t,spacing:a=0,columns:i=12,xs:$,sm:u,md:T,lg:f,xl:h,className:p,style:x,as:g="div"}){return d?e.jsx(g,{className:j("grid",p),style:{gridTemplateColumns:`repeat(${i}, minmax(0, 1fr))`,gap:a>0?`${a*.25}rem`:void 0,...x},children:r}):t?e.jsx(g,{className:j(N($??u,i),u!==void 0&&l(u,"sm",i),T!==void 0&&l(T,"md",i),f!==void 0&&l(f,"lg",i),h!==void 0&&l(h,"xl",i),p),style:x,children:r}):e.jsx(g,{className:p,style:x,children:r})}s.__docgenInfo={description:"",methods:[],displayName:"ITGrid",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},container:{required:!1,tsType:{name:"boolean"},description:""},item:{required:!1,tsType:{name:"boolean"},description:""},spacing:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},columns:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"12",computed:!1}},xs:{required:!1,tsType:{name:"number"},description:""},sm:{required:!1,tsType:{name:"number"},description:""},md:{required:!1,tsType:{name:"number"},description:""},lg:{required:!1,tsType:{name:"number"},description:""},xl:{required:!1,tsType:{name:"number"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},as:{required:!1,tsType:{name:"ElementType"},description:"",defaultValue:{value:'"div"',computed:!1}}}};const E={title:"Layout/ITGrid",component:s,tags:["autodocs"],argTypes:{spacing:{control:{type:"range",min:0,max:8,step:1}},columns:{control:{type:"number",min:1,max:12}}}},n=({children:r})=>e.jsx("div",{className:"bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium h-full flex items-center justify-center",children:r}),m={args:{container:!0,spacing:2},render:r=>e.jsxs(s,{...r,children:[e.jsx(s,{item:!0,xs:4,children:e.jsx(n,{children:"1/3"})}),e.jsx(s,{item:!0,xs:4,children:e.jsx(n,{children:"1/3"})}),e.jsx(s,{item:!0,xs:4,children:e.jsx(n,{children:"1/3"})})]})},o={args:{container:!0,spacing:3},render:r=>e.jsxs(s,{...r,children:[e.jsx(s,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(n,{children:"xs=12 sm=6 md=4 lg=3"})}),e.jsx(s,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(n,{children:"xs=12 sm=6 md=4 lg=3"})}),e.jsx(s,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(n,{children:"xs=12 sm=6 md=4 lg=3"})}),e.jsx(s,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsx(n,{children:"xs=12 sm=6 md=4 lg=3"})})]})},c={args:{container:!0,spacing:4,columns:12},render:r=>e.jsxs(s,{...r,children:[e.jsx(s,{item:!0,xs:12,md:3,children:e.jsx(n,{children:"Sidebar (md: 3/12)"})}),e.jsx(s,{item:!0,xs:12,md:9,children:e.jsx(n,{children:"Main Content (md: 9/12)"})})]})};var I,G,C;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(C=(G=m.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};var y,v,b;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(b=(v=o.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var q,S,M;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(M=(S=c.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};const V=["ThreeColumns","Responsive","SidebarContent"];export{o as Responsive,c as SidebarContent,m as ThreeColumns,V as __namedExportsOrder,E as default};
