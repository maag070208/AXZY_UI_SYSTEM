import{a6 as i}from"./iframe-B5RMobo9.js";const c=[{key:"id",label:"ID",type:"number",sortable:!0},{key:"name",label:"Name",type:"string",sortable:!0,filter:!0},{key:"email",label:"Email",type:"string",sortable:!0},{key:"status",label:"Status",type:"catalog",filter:"catalog",sortable:!0}],p=[{id:1,name:"Alice",email:"alice@example.com",status:"Active"},{id:2,name:"Bob",email:"bob@example.com",status:"Inactive"},{id:3,name:"Charlie",email:"charlie@example.com",status:"Active"}],u={title:"Components/Data Display/ITSearchTable",component:i,parameters:{layout:"padded"},argTypes:{columns:{control:!1,description:"Column definitions"},data:{control:!1,description:"Row data array"},title:{control:"text",description:"Table header title"},searchInputPlaceholder:{control:"text",description:"Placeholder for the search input"},variant:{control:"select",options:["default","striped","bordered"],description:"Visual variant"},size:{control:"select",options:["sm","md","lg"],description:"Row size"},pageIndex:{control:"number",description:"Current page index (0-based)"},totalCount:{control:"number",description:"Total number of rows across all pages"},totalPages:{control:"number",description:"Total number of pages"},hasPreviousPage:{control:"boolean",description:"Whether there is a previous page"},hasNextPage:{control:"boolean",description:"Whether there is a next page"}}},e={args:{columns:c,data:p,title:"Users",searchInputPlaceholder:"Search users...",pageIndex:0,totalCount:3,totalPages:1,hasPreviousPage:!1,hasNextPage:!1}},a={args:{columns:c,data:[],title:"Users",searchInputPlaceholder:"Search users...",pageIndex:0,totalCount:0,totalPages:0,hasPreviousPage:!1,hasNextPage:!1}};var t,s,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    columns: sampleColumns,
    data: sampleData,
    title: 'Users',
    searchInputPlaceholder: 'Search users...',
    pageIndex: 0,
    totalCount: 3,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false
  } as any
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var r,l,n;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    columns: sampleColumns,
    data: [],
    title: 'Users',
    searchInputPlaceholder: 'Search users...',
    pageIndex: 0,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false
  } as any
}`,...(n=(l=a.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const m=["Default","EmptyState"],g=Object.freeze(Object.defineProperty({__proto__:null,Default:e,EmptyState:a,__namedExportsOrder:m,default:u},Symbol.toStringTag,{value:"Module"}));export{g as S};
