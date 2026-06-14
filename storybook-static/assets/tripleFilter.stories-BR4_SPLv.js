import{j as t,h as x,c as n}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const y={primary:"text-primary-600",secondary:"text-secondary-600",success:"text-success-600",danger:"text-danger-600",warning:"text-warning-600",info:"text-info-600",purple:"text-purple-600",error:"text-danger-600",gray:"text-secondary-600"},c=({value:d,onChange:m,options:v,color:T="primary",className:g})=>t.jsx("div",{className:n("flex bg-slate-100 p-1 rounded-xl gap-1 w-fit",g),children:v.map(e=>t.jsx("button",{onClick:()=>m(e.value),className:n("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap",d===e.value?n("bg-white shadow-sm",y[T]):"text-slate-400 hover:text-slate-600"),children:t.jsx(x,{as:"span",children:e.label})},String(e.value)))});c.__docgenInfo={description:"@description Generic triple/segmented filter component with color support.",methods:[],displayName:"ITTripleFilter",props:{value:{required:!0,tsType:{name:"T"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"ITTripleFilterOption",elements:[{name:"T"}],raw:"ITTripleFilterOption<T>"}],raw:"ITTripleFilterOption<T>[]"},description:""},color:{required:!1,tsType:{name:"ColorsTypes"},description:"",defaultValue:{value:'"primary"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const w={title:"Components/ITTripleFilter",component:c,tags:["autodocs"]},a={args:{value:"all",options:[{label:"Todos",value:"all"},{label:"Activos",value:"active"},{label:"Inactivos",value:"inactive"}]}},r={args:{value:!0,options:[{label:"Sí",value:!0},{label:"No",value:!1}]}};var s,l,o;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    value: 'all',
    options: [{
      label: 'Todos',
      value: 'all'
    }, {
      label: 'Activos',
      value: 'active'
    }, {
      label: 'Inactivos',
      value: 'inactive'
    }]
  }
}`,...(o=(l=a.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};var i,p,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    value: true,
    options: [{
      label: 'Sí',
      value: true
    }, {
      label: 'No',
      value: false
    }]
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const h=["Default","Boolean"];export{r as Boolean,a as Default,h as __namedExportsOrder,w as default};
