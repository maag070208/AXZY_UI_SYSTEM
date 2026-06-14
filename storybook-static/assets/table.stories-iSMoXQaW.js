import{j as t,r as M,I as O,C as N}from"./iframe-BUyFEAH8.js";import{I as E}from"./table-DKpZr88s.js";import{I as U}from"./badget-BXwYqZWc.js";import"./preload-helper-C1FmrZbK.js";import"./pagination-BRK0WJhw.js";import"./select-ZaK3Plt5.js";const H={title:"Components/Data Display/ITTable",component:E,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","striped","bordered"]},size:{control:"select",options:["sm","md","lg"]}}},_=[{id:1,name:"Administrator"},{id:2,name:"Editor"},{id:3,name:"Viewer"}],z=e=>Array.from({length:e},(d,a)=>({id:a+1,name:`User ${a+1}`,email:`user${a+1}@example.com`,roleId:a%3+1,balance:Math.random()*1e4,isActive:a%4!==0,lastLogin:new Date(Date.now()-Math.random()*1e10).toISOString()})),r=z(25),m=[{key:"id",label:"ID",type:"number"},{key:"name",label:"Name",type:"string"},{key:"email",label:"Email",type:"string"}],R=[{key:"id",label:"ID",type:"number",sortable:!0,filter:!0},{key:"name",label:"Name",type:"string",sortable:!0,filter:!0},{key:"email",label:"Email",type:"string",sortable:!0,filter:!0},{key:"roleId",label:"Role",type:"catalog",sortable:!0,filter:"catalog",catalogOptions:{data:_}},{key:"balance",label:"Balance",type:"number",sortable:!0,currencyMX:!0},{key:"isActive",label:"Status",type:"boolean",sortable:!0,filter:!0,render:e=>t.jsx(U,{label:e.isActive?"Active":"Inactive",color:e.isActive?"success":"danger"})}],s={args:{columns:m,data:r.slice(0,5),title:"Basic Users Table"}},n={args:{columns:m,data:r,title:"Paginated Table",defaultItemsPerPage:5,itemsPerPageOptions:[5,10,20]}},o={args:{columns:R.map(e=>({...e,render:void 0})),data:r,title:"Data Management (Sort & Filter)"}},l={args:{columns:R,data:r,title:"Custom Rendering (Badges & Catalogs)"}},L=e=>{const[d,a]=M.useState(r.slice(0,5)),W={key:"actions",label:"Actions",type:"actions",actions:w=>t.jsx(t.Fragment,{children:t.jsx(O,{size:"small",variant:"text",color:"danger",ariaLabel:"Delete",onClick:()=>a(B=>B.filter(F=>F.id!==w.id)),children:t.jsx(N,{})})})};return t.jsx(E,{...e,data:d,columns:[...m,W]})},i={render:e=>t.jsx(L,{...e}),args:{title:"Table with Actions"}},c={args:{columns:m,data:[],title:"No Data Available"}};var u,p,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    columns: basicColumns,
    data: mockData.slice(0, 5),
    // Just a few
    title: "Basic Users Table"
  } as any
}`,...(g=(p=s.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var b,y,D;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    columns: basicColumns,
    data: mockData,
    title: "Paginated Table",
    defaultItemsPerPage: 5,
    itemsPerPageOptions: [5, 10, 20]
  } as any
}`,...(D=(y=n.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var f,k,A;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    columns: advancedColumns.map(col => ({
      ...col,
      render: undefined
    })),
    // Remove custom render to show raw formatting
    data: mockData,
    title: "Data Management (Sort & Filter)"
  } as any
}`,...(A=(k=o.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var C,S,T;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    columns: advancedColumns,
    data: mockData,
    title: "Custom Rendering (Badges & Catalogs)"
  } as any
}`,...(T=(S=l.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var h,v,I;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <ActionsTableWrapper {...args} />,
  args: {
    title: "Table with Actions"
  } as any
}`,...(I=(v=i.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var x,P,j;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    columns: basicColumns,
    data: [],
    title: "No Data Available"
  } as any
}`,...(j=(P=c.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};const K=["Default","WithPagination","WithSortingAndFiltering","CustomRendering","WithActions","EmptyState"];export{l as CustomRendering,s as Default,c as EmptyState,i as WithActions,n as WithPagination,o as WithSortingAndFiltering,K as __namedExportsOrder,H as default};
