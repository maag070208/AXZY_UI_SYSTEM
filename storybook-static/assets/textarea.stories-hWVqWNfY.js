import{j as r,h as d,Z as I,c as p,$ as V,r as w}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const S={none:"resize-none",vertical:"resize-y",horizontal:"resize-x",both:"resize"};function i({value:l,onChange:e,label:u,placeholder:q,rows:z=4,disabled:c=!1,error:a,className:D,name:o,maxLength:E,resize:N="vertical"}){return r.jsxs("div",{className:p("flex flex-col gap-1.5",D),children:[u&&r.jsx(d,{as:"label",className:I(!!a),htmlFor:o,children:u}),r.jsx("textarea",{id:o,name:o,value:l,onChange:j=>e==null?void 0:e(j.target.value),placeholder:q,rows:z,disabled:c,maxLength:E,className:p("w-full border border-solid transition-all duration-200 rounded-lg px-3 py-2 text-sm outline-none","focus:ring-2",S[N],a?"border-red-500 ring-red-100 focus:border-red-500 focus:ring-red-100":"border-gray-300 focus:border-primary-500 focus:ring-primary-100",c&&"opacity-50 cursor-not-allowed bg-gray-100 dark:bg-slate-800")}),a&&r.jsx(d,{as:"span",className:V,children:a})]})}i.__docgenInfo={description:"",methods:[],displayName:"ITTextarea",props:{value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},rows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"4",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},maxLength:{required:!1,tsType:{name:"number"},description:""},resize:{required:!1,tsType:{name:"union",raw:'"none" | "vertical" | "horizontal" | "both"',elements:[{name:"literal",value:'"none"'},{name:"literal",value:'"vertical"'},{name:"literal",value:'"horizontal"'},{name:"literal",value:'"both"'}]},description:"",defaultValue:{value:'"vertical"',computed:!1}}}};const M={title:"Components/Inputs/ITTextarea",component:i,tags:["autodocs"]},s={render:()=>{const[l,e]=w.useState("");return r.jsx(i,{value:l,onChange:e,label:"Descripción",placeholder:"Escribe aquí..."})}},t={args:{label:"Comentarios",value:"Mal",error:"Debe tener al menos 10 caracteres"}},n={args:{label:"Bloqueado",value:"No editable",disabled:!0}};var m,f,b;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("");
    return <ITTextarea value={val} onChange={setVal} label="Descripción" placeholder="Escribe aquí..." />;
  }
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var g,v,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: "Comentarios",
    value: "Mal",
    error: "Debe tener al menos 10 caracteres"
  }
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var y,T,h;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: "Bloqueado",
    value: "No editable",
    disabled: true
  }
}`,...(h=(T=n.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};const B=["Default","WithError","Disabled"];export{s as Default,n as Disabled,t as WithError,B as __namedExportsOrder,M as default};
