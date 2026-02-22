import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{I as P}from"./pagination-DJJWJM8_.js";import{r as p}from"./iframe-Dr0sZusW.js";import"./clsx-B-dksMZM.js";import"./index-CJju9sOb.js";import"./theme-CuplGK4O.js";import"./select-DKI9rr9_.js";import"./preload-helper-C1FmrZbK.js";const B={title:"Components/Data Display/ITPagination",component:P,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{currentPage:{control:"number"},totalPages:{control:"number"},siblingCount:{control:"number"},color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]}}},l=e=>{const[a,t]=p.useState(e.currentPage||1);return r.jsx(P,{...e,currentPage:a,onPageChange:s=>t(s)})},n={render:e=>r.jsx(l,{...e}),args:{currentPage:1,totalPages:5,color:"primary"}},o={render:e=>r.jsx(l,{...e}),args:{currentPage:1,totalPages:50,siblingCount:1,color:"primary"}},g={render:e=>r.jsx(l,{...e}),args:{currentPage:25,totalPages:50,siblingCount:1,color:"primary"}},c={render:e=>{const[a,t]=p.useState(1),[s,O]=p.useState(10),u=500,D=Math.ceil(u/s);return r.jsx(P,{...e,currentPage:a,totalPages:D,onPageChange:m=>t(m),itemsPerPageOptions:[10,20,30,50],itemsPerPage:s,onItemsPerPageChange:m=>{O(m),t(1)},totalItems:u})},args:{color:"primary",className:"w-[600px]"}},i={render:e=>r.jsx("div",{className:"flex flex-col gap-4",children:["primary","secondary","success","danger","warning","info","purple"].map(a=>r.jsxs("div",{className:"flex gap-4 items-center",children:[r.jsx("span",{className:"w-20 text-sm font-bold text-gray-500 capitalize",children:a}),r.jsx(l,{...e,color:a})]},a))}),args:{currentPage:1,totalPages:5}};var d,x,y;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
    color: "primary"
  }
}`,...(y=(x=n.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var C,f,I;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 50,
    siblingCount: 1,
    color: "primary"
  }
}`,...(I=(f=o.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};var h,j,b;g.parameters={...g.parameters,docs:{...(h=g.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 25,
    totalPages: 50,
    siblingCount: 1,
    color: "primary"
  }
}`,...(b=(j=g.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var S,v,w;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItems = 500;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return <ITPagination {...args} currentPage={currentPage} totalPages={totalPages} onPageChange={page => setCurrentPage(page)} itemsPerPageOptions={[10, 20, 30, 50]} itemsPerPage={itemsPerPage} onItemsPerPageChange={val => {
      setItemsPerPage(val);
      setCurrentPage(1);
    }} totalItems={totalItems} />;
  },
  args: {
    color: "primary",
    className: "w-[600px]" // Make it wide enough to see the layout
  }
}`,...(w=(v=c.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var N,M,W;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map(color => <div key={color} className="flex gap-4 items-center">
            <span className="w-20 text-sm font-bold text-gray-500 capitalize">{color}</span>
             <PaginationWrapper {...args} color={color} />
        </div>)}
    </div>,
  args: {
    currentPage: 1,
    totalPages: 5
  }
}`,...(W=(M=i.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};const F=["Default","ManyPages","MiddlePageOpened","WithItemsPerPage","Colors"];export{i as Colors,n as Default,o as ManyPages,g as MiddlePageOpened,c as WithItemsPerPage,F as __namedExportsOrder,B as default};
