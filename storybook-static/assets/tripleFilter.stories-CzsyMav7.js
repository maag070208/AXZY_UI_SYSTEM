import{j as r,y as f,W as n}from"./iframe-B5RMobo9.js";const T={primary:"text-primary-600",secondary:"text-secondary-600",success:"text-success-600",danger:"text-danger-600",warning:"text-warning-600",info:"text-info-600",purple:"text-purple-600",error:"text-danger-600",gray:"text-secondary-600"},u=({value:d,onChange:m,options:v,color:g="primary",className:y})=>r.jsx("div",{className:n("flex bg-slate-100 p-1 rounded-xl gap-1 w-fit",y),children:v.map(t=>r.jsx("button",{onClick:()=>m(t.value),className:n("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap",d===t.value?n("bg-white shadow-sm",T[g]):"text-slate-400 hover:text-slate-600"),children:r.jsx(f,{as:"span",children:t.label})},String(t.value)))});u.__docgenInfo={description:"@description Generic triple/segmented filter component with color support.",methods:[],displayName:"ITTripleFilter",props:{value:{required:!0,tsType:{name:"T"},description:"Currently selected value. Must match one of the option values."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:"Called when the user selects a different option. Receives the new value."},options:{required:!0,tsType:{name:"Array",elements:[{name:"ITTripleFilterOption",elements:[{name:"T"}],raw:"ITTripleFilterOption<T>"}],raw:"ITTripleFilterOption<T>[]"},description:"Array of filter options to render (typically 2-4 items, e.g. All / Active / Inactive)."},color:{required:!1,tsType:{name:"ColorsTypes"},description:'Color theme for the active indicator. One of "primary", "secondary", "success", "danger", "warning", "info", "purple", "error", "gray". @default "primary"',defaultValue:{value:'"primary"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes applied to the outermost container."}}};const x={title:"Components/ITTripleFilter",component:u},e={args:{value:"all",options:[{label:"Todos",value:"all"},{label:"Activos",value:"active"},{label:"Inactivos",value:"inactive"}]}},a={args:{value:!0,options:[{label:"Sí",value:!0},{label:"No",value:!1}]}};var l,o,s;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var i,p,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const b=["Default","Boolean"],w=Object.freeze(Object.defineProperty({__proto__:null,Boolean:a,Default:e,__namedExportsOrder:b,default:x},Symbol.toStringTag,{value:"Module"}));export{w as S};
