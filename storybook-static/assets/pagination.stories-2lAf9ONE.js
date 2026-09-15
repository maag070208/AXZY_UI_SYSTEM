import{H as m,j as r,r as P}from"./iframe-B5RMobo9.js";const D={title:"Components/Data Display/ITPagination",component:m,parameters:{layout:"centered"},argTypes:{currentPage:{control:"number"},totalPages:{control:"number"},siblingCount:{control:"number"},color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]}}},l=e=>{const[a,g]=P.useState(e.currentPage||1);return r.jsx(m,{...e,currentPage:a,onPageChange:i=>g(i)})},t={render:e=>r.jsx(l,{...e}),args:{currentPage:1,totalPages:5,color:"primary"}},s={render:e=>r.jsx(l,{...e}),args:{currentPage:1,totalPages:50,siblingCount:1,color:"primary"}},n={render:e=>r.jsx(l,{...e}),args:{currentPage:25,totalPages:50,siblingCount:1,color:"primary"}},o={render:e=>{const[a,g]=P.useState(1),[i,W]=P.useState(10),u=500,_=Math.ceil(u/i);return r.jsx(m,{...e,currentPage:a,totalPages:_,onPageChange:p=>g(p),itemsPerPageOptions:[10,20,30,50],itemsPerPage:i,onItemsPerPageChange:p=>{W(p),g(1)},totalItems:u})},args:{color:"primary",className:"w-[600px]"}},c={render:e=>r.jsx("div",{className:"flex flex-col gap-4",children:["primary","secondary","success","danger","warning","info","purple"].map(a=>r.jsxs("div",{className:"flex gap-4 items-center",children:[r.jsx("span",{className:"w-20 text-sm font-bold text-gray-500 capitalize",children:a}),r.jsx(l,{...e,color:a})]},a))}),args:{currentPage:1,totalPages:5}};var d,x,y;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
    color: "primary"
  }
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var C,f,I;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 50,
    siblingCount: 1,
    color: "primary"
  }
}`,...(I=(f=s.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};var h,S,b;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 25,
    totalPages: 50,
    siblingCount: 1,
    color: "primary"
  }
}`,...(b=(S=n.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var j,v,w;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var M,N,O;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(O=(N=c.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};const T=["Default","ManyPages","MiddlePageOpened","WithItemsPerPage","Colors"],E=Object.freeze(Object.defineProperty({__proto__:null,Colors:c,Default:t,ManyPages:s,MiddlePageOpened:n,WithItemsPerPage:o,__namedExportsOrder:T,default:D},Symbol.toStringTag,{value:"Module"}));export{E as S};
