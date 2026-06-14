import{j as e,c as u,h as T,r as x}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";function t({name:a,value:n,onChange:g,options:b,disabled:l=!1,direction:y="column",className:h}){return e.jsx("div",{className:u("flex gap-3",y==="row"?"flex-row flex-wrap":"flex-col",h),children:b.map(r=>{const i=r.value===n;return e.jsxs("label",{className:u("inline-flex items-center gap-2 cursor-pointer select-none",l&&"opacity-50 cursor-not-allowed"),children:[e.jsx("input",{type:"radio",name:a,value:r.value,checked:i,onChange:()=>g(r.value),disabled:l,className:"peer sr-only"}),e.jsx("div",{className:u("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",i?"border-primary-500":"border-slate-300 dark:border-slate-600",!l&&"peer-focus:ring-2 peer-focus:ring-primary-200"),children:i&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-primary-500"})}),e.jsx(T,{as:"span",className:"text-sm text-slate-700 dark:text-slate-300",children:r.label})]},r.value)})})}t.__docgenInfo={description:"",methods:[],displayName:"ITRadioGroup",props:{name:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"ITRadioOption"}],raw:"ITRadioOption[]"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},direction:{required:!1,tsType:{name:"union",raw:'"row" | "column"',elements:[{name:"literal",value:'"row"'},{name:"literal",value:'"column"'}]},description:"",defaultValue:{value:'"column"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const I={title:"Components/Inputs/ITRadioGroup",component:t,tags:["autodocs"]},o={render:()=>{const[a,n]=x.useState("option1");return e.jsx(t,{name:"example",value:a,onChange:n,options:[{value:"option1",label:"Opción 1"},{value:"option2",label:"Opción 2"},{value:"option3",label:"Opción 3"}]})}},s={render:()=>{const[a,n]=x.useState("sm");return e.jsx(t,{name:"size",value:a,onChange:n,direction:"row",options:[{value:"sm",label:"Chico"},{value:"md",label:"Mediano"},{value:"lg",label:"Grande"}]})}};var c,p,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("option1");
    return <ITRadioGroup name="example" value={val} onChange={setVal} options={[{
      value: "option1",
      label: "Opción 1"
    }, {
      value: "option2",
      label: "Opción 2"
    }, {
      value: "option3",
      label: "Opción 3"
    }]} />;
  }
}`,...(d=(p=o.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,v,f;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("sm");
    return <ITRadioGroup name="size" value={val} onChange={setVal} direction="row" options={[{
      value: "sm",
      label: "Chico"
    }, {
      value: "md",
      label: "Mediano"
    }, {
      value: "lg",
      label: "Grande"
    }]} />;
  }
}`,...(f=(v=s.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const R=["Default","Row"];export{o as Default,s as Row,R as __namedExportsOrder,I as default};
