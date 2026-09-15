import{Q as R,j as t,a as O,r as _,b as F,R as N}from"./iframe-B5RMobo9.js";const z={title:"Components/Data Display/ITTable",component:R,parameters:{layout:"padded"},argTypes:{variant:{control:"select",options:["default","striped","bordered"]},size:{control:"select",options:["sm","md","lg"]}}},U=[{id:1,name:"Administrator"},{id:2,name:"Editor"},{id:3,name:"Viewer"}],L=e=>Array.from({length:e},(d,a)=>({id:a+1,name:`User ${a+1}`,email:`user${a+1}@example.com`,roleId:a%3+1,balance:Math.random()*1e4,isActive:a%4!==0,lastLogin:new Date(Date.now()-Math.random()*1e10).toISOString()})),c=L(25),m=[{key:"id",label:"ID",type:"number"},{key:"name",label:"Name",type:"string"},{key:"email",label:"Email",type:"string"}],E=[{key:"id",label:"ID",type:"number",sortable:!0,filter:!0},{key:"name",label:"Name",type:"string",sortable:!0,filter:!0},{key:"email",label:"Email",type:"string",sortable:!0,filter:!0},{key:"roleId",label:"Role",type:"catalog",sortable:!0,filter:"catalog",catalogOptions:{data:U}},{key:"balance",label:"Balance",type:"number",sortable:!0,currencyMX:!0},{key:"isActive",label:"Status",type:"boolean",sortable:!0,filter:!0,render:e=>t.jsx(O,{label:e.isActive?"Active":"Inactive",color:e.isActive?"success":"danger"})}],s={args:{columns:m,data:c.slice(0,5),title:"Basic Users Table"}},r={args:{columns:m,data:c,title:"Paginated Table",defaultItemsPerPage:5,itemsPerPageOptions:[5,10,20]}},n={args:{columns:E.map(e=>({...e,render:void 0})),data:c,title:"Data Management (Sort & Filter)"}},o={args:{columns:E,data:c,title:"Custom Rendering (Badges & Catalogs)"}},$=e=>{const[d,a]=_.useState(c.slice(0,5)),W={key:"actions",label:"Actions",type:"actions",actions:w=>t.jsx(t.Fragment,{children:t.jsx(F,{size:"sm",variant:"text",color:"danger",ariaLabel:"Delete",onClick:()=>a(B=>B.filter(M=>M.id!==w.id)),children:t.jsx(N,{})})})};return t.jsx(R,{...e,data:d,columns:[...m,W]})},l={render:e=>t.jsx($,{...e}),args:{title:"Table with Actions"}},i={args:{columns:m,data:[],title:"No Data Available"}};var u,g,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    columns: basicColumns,
    data: mockData.slice(0, 5),
    // Just a few
    title: "Basic Users Table"
  } as any
}`,...(p=(g=s.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var b,y,D;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    columns: basicColumns,
    data: mockData,
    title: "Paginated Table",
    defaultItemsPerPage: 5,
    itemsPerPageOptions: [5, 10, 20]
  } as any
}`,...(D=(y=r.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var S,f,k;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    columns: advancedColumns.map(col => ({
      ...col,
      render: undefined
    })),
    // Remove custom render to show raw formatting
    data: mockData,
    title: "Data Management (Sort & Filter)"
  } as any
}`,...(k=(f=n.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var A,T,v;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    columns: advancedColumns,
    data: mockData,
    title: "Custom Rendering (Badges & Catalogs)"
  } as any
}`,...(v=(T=o.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var h,C,x;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <ActionsTableWrapper {...args} />,
  args: {
    title: "Table with Actions"
  } as any
}`,...(x=(C=l.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var P,I,j;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    columns: basicColumns,
    data: [],
    title: "No Data Available"
  } as any
}`,...(j=(I=i.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};const J=["Default","WithPagination","WithSortingAndFiltering","CustomRendering","WithActions","EmptyState"],V=Object.freeze(Object.defineProperty({__proto__:null,CustomRendering:o,Default:s,EmptyState:i,WithActions:l,WithPagination:r,WithSortingAndFiltering:n,__namedExportsOrder:J,default:z},Symbol.toStringTag,{value:"Module"}));export{V as S};
