import{r,j as a,h as m,c as T,W as ye,t as Te}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";function E({name:s,options:o=[],label:p,placeholder:f="Selecciona una opción",valueField:n="value",labelField:l="label",value:c,onChange:b,onBlur:i,disabled:g=!1,className:L,touched:P,required:D,error:S,readOnly:k=!1,onSearch:v,isLoading:O=!1,noResultsMessage:de="No se encontraron resultados"}){const[B,x]=r.useState(!1),[y,R]=r.useState(""),[d,_]=r.useState(!1),[ue,me]=r.useState(!1),V=r.useRef(null),z=r.useRef(null),A=r.useMemo(()=>o.find(e=>e[n]===c),[o,c,n]);r.useEffect(()=>{d||R(A?String(A[l]):"")},[A,d,l]),r.useEffect(()=>{function e(u){V.current&&!V.current.contains(u.target)&&x(!1)}return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);const U=r.useMemo(()=>v||!y||!d?o:o.filter(e=>String(e[l]).toLowerCase().includes(y.toLowerCase())),[o,y,v,l,d]),pe=e=>{const u=e.target.value;R(u),x(!0),v&&(z.current&&clearTimeout(z.current),z.current=setTimeout(()=>{v(u)},500))},fe=e=>{b&&b(e[n],e),R(String(e[l])),x(!1)},ge=()=>{g||k||(_(!0),x(!0))},he=e=>{setTimeout(()=>{_(!1),me(!0),i==null||i(e)},200)},t=Te.input||{},be=P!==void 0?P:ue,Se=c==null||String(c).trim()==="",M=S!==void 0&&S!==!1?S===!0?"Este campo es requerido":S:D&&Se?"Este campo es requerido":void 0,W=be&&!!M,ve=typeof M=="string"?M:"Este campo es requerido",xe=()=>{var u,F,G,J,H,K;const e={backgroundColor:t.backgroundColor||"#ffffff",borderColor:t.borderColor||"#e2e8f0",borderRadius:t.borderRadius||"0.5rem",padding:t.padding||"0.5rem 0.75rem",fontSize:t.fontSize||"0.875rem",borderWidth:"1px",borderStyle:"solid",transition:"all 0.2s",color:"var(--input-text-color, var(--color-secondary-900))",width:"100%"};return g&&(e.backgroundColor=((u=t.disabled)==null?void 0:u.backgroundColor)||"#f1f5f9",e.borderColor=((F=t.disabled)==null?void 0:F.borderColor)||"#e2e8f0",e.opacity=.7,e.cursor="not-allowed"),W?(e.borderColor=((G=t.error)==null?void 0:G.borderColor)||"red",d&&(e.boxShadow=(J=t.error)==null?void 0:J.ring)):d&&!k&&(e.boxShadow=(H=t.focus)==null?void 0:H.ring,e.borderColor=(K=t.focus)==null?void 0:K.borderColor),e};return a.jsxs("div",{className:T("w-full flex flex-col gap-1.5",L,B&&"relative z-30"),ref:V,children:[p&&a.jsxs(m,{as:"label",className:T("text-sm font-medium text-gray-700 dark:text-slate-300",{"text-red-500":W}),children:[a.jsx(m,{as:"span",children:p}),D&&a.jsx(m,{as:"span",className:"text-red-500 ml-1",children:"*"})]}),a.jsxs("div",{className:"relative",children:[a.jsxs("div",{className:"relative flex items-center",children:[a.jsx("input",{type:"text",name:s,value:y,onChange:pe,onFocus:ge,onBlur:he,disabled:g,readOnly:k,placeholder:f,className:"outline-none pr-10",style:xe(),autoComplete:"off"}),a.jsxs("div",{className:"absolute right-3 flex items-center gap-2 text-gray-400 pointer-events-none",children:[O&&a.jsx("div",{className:"animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"}),!O&&a.jsx(ye,{size:14,className:T({"text-primary-500":d})})]})]}),B&&a.jsx("div",{className:"absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top",children:a.jsx("div",{className:"max-h-60 overflow-y-auto",children:U.length>0?U.map(e=>a.jsx(m,{as:"div",onClick:()=>fe(e),className:T("px-4 py-2 text-sm cursor-pointer transition-colors",c===e[n]?"bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-medium":"hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300"),children:a.jsx(m,{as:"span",children:e[l]})},e[n])):a.jsx(m,{as:"div",className:"px-4 py-6 text-sm text-center text-gray-500 italic",children:O?"Cargando...":de})})})]}),W&&a.jsx(m,{as:"p",className:"text-red-500 text-xs mt-1",children:ve})]})}E.__docgenInfo={description:`ITSearchSelect - Un componente de selección con buscador integrado.
Soporta filtrado local y búsqueda remota via API.`,methods:[],displayName:"ITSearchSelect",props:{name:{required:!1,tsType:{name:"string"},description:"Nombre del campo para integraciones con formularios"},label:{required:!1,tsType:{name:"string"},description:"Etiqueta que se muestra arriba del select"},placeholder:{required:!1,tsType:{name:"string"},description:"Texto que se muestra cuando no hay nada seleccionado",defaultValue:{value:'"Selecciona una opción"',computed:!1}},value:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Valor seleccionado"},options:{required:!1,tsType:{name:"Array",elements:[{name:"ITSearchSelectOption"}],raw:"ITSearchSelectOption[]"},description:"Arreglo de opciones (Modo 1: Lista estática)",defaultValue:{value:"[]",computed:!1}},valueField:{required:!1,tsType:{name:"string"},description:'Campo que se usará como valor (por defecto "value")',defaultValue:{value:'"value"',computed:!1}},labelField:{required:!1,tsType:{name:"string"},description:'Campo que se usará como etiqueta (por defecto "label")',defaultValue:{value:'"label"',computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string | number, option?: ITSearchSelectOption) => void",signature:{arguments:[{type:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},name:"value"},{type:{name:"ITSearchSelectOption"},name:"option"}],return:{name:"void"}}},description:"Callback cuando cambia el valor"},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: FocusEvent<any>) => void",signature:{arguments:[{type:{name:"FocusEvent",elements:[{name:"any"}],raw:"FocusEvent<any>"},name:"e"}],return:{name:"void"}}},description:"Callback cuando pierde el foco"},disabled:{required:!1,tsType:{name:"boolean"},description:"Indica si el componente está deshabilitado",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Clase CSS adicional para el contenedor"},touched:{required:!1,tsType:{name:"boolean"},description:"Indica si el campo ha sido tocado (para validaciones)"},required:{required:!1,tsType:{name:"boolean"},description:"Indica si el campo es requerido"},error:{required:!1,tsType:{name:"union",raw:"string | boolean",elements:[{name:"string"},{name:"boolean"}]},description:"Mensaje de error"},readOnly:{required:!1,tsType:{name:"boolean"},description:"Indica si el campo es de solo lectura",defaultValue:{value:"false",computed:!1}},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(query: string) => void",signature:{arguments:[{type:{name:"string"},name:"query"}],return:{name:"void"}}},description:"Callback para búsqueda en servidor (Modo 2: Conexión con API)"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Indica si se está cargando información desde la API",defaultValue:{value:"false",computed:!1}},noResultsMessage:{required:!1,tsType:{name:"string"},description:"Mensaje cuando no hay resultados",defaultValue:{value:'"No se encontraron resultados"',computed:!1}}}};const we={title:"Components/Form Elements/ITSearchSelect",component:E,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"},isLoading:{control:"boolean"}}},h=[{value:1,label:"Juan Pérez"},{value:2,label:"María García"},{value:3,label:"Carlos Rodríguez"},{value:4,label:"Ana Martínez"},{value:5,label:"Luis López"},{value:6,label:"Elena Sánchez"},{value:7,label:"Roberto Díaz"},{value:8,label:"Marta Castro"}],N=s=>{const[o,p]=r.useState(s.value||""),[f,n]=r.useState(!1);return a.jsx("div",{className:"w-[400px]",children:a.jsx(E,{...s,value:o,onChange:l=>p(l),onBlur:()=>n(!0),touched:f})})},C={render:s=>a.jsx(N,{...s}),args:{name:"search-select",options:h,placeholder:"Busca un usuario..."}},q={render:s=>a.jsx(N,{...s}),args:{name:"search-select",label:"Seleccionar Usuario",options:h,placeholder:"Busca un usuario...",required:!0}},w={render:s=>{const[o,p]=r.useState([]),[f,n]=r.useState(!1),[l,c]=r.useState(""),b=i=>{n(!0),setTimeout(()=>{const g=h.filter(L=>L.label.toLowerCase().includes(i.toLowerCase()));p(g),n(!1)},1e3)};return a.jsx("div",{className:"w-[400px]",children:a.jsx(E,{...s,value:l,options:o,isLoading:f,onSearch:b,onChange:i=>c(i)})})},args:{name:"remote-search",label:"Búsqueda en API (Simulada)",placeholder:"Escribe para buscar..."}},I={render:s=>a.jsx(N,{...s}),args:{name:"search-select",label:"Campo con Error",options:h,error:"Este campo es obligatorio",touched:!0}},j={render:s=>a.jsx(N,{...s}),args:{name:"search-select",label:"Campo Deshabilitado",options:h,disabled:!0}};var Q,X,Y;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    options: options,
    placeholder: "Busca un usuario..."
  }
}`,...(Y=(X=C.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;q.parameters={...q.parameters,docs:{...(Z=q.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Seleccionar Usuario",
    options: options,
    placeholder: "Busca un usuario...",
    required: true
  }
}`,...(ee=($=q.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ae,re,se;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => {
    const [remoteOptions, setRemoteOptions] = useState<ITSearchSelectOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [val, setVal] = useState<string | number>("");
    const handleSearch = (query: string) => {
      setLoading(true);
      // Simular llamada a API
      setTimeout(() => {
        const results = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
        setRemoteOptions(results);
        setLoading(false);
      }, 1000);
    };
    return <div className="w-[400px]">
        <ITSearchSelect {...args} value={val} options={remoteOptions} isLoading={loading} onSearch={handleSearch} onChange={v => setVal(v)} />
      </div>;
  },
  args: {
    name: "remote-search",
    label: "Búsqueda en API (Simulada)",
    placeholder: "Escribe para buscar..."
  }
}`,...(se=(re=w.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var te,oe,ne;I.parameters={...I.parameters,docs:{...(te=I.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Campo con Error",
    options: options,
    error: "Este campo es obligatorio",
    touched: true
  }
}`,...(ne=(oe=I.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var le,ce,ie;j.parameters={...j.parameters,docs:{...(le=j.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Campo Deshabilitado",
    options: options,
    disabled: true
  }
}`,...(ie=(ce=j.parameters)==null?void 0:ce.docs)==null?void 0:ie.source}}};const Ie=["Default","WithLabel","RemoteAPI","WithError","Disabled"];export{C as Default,j as Disabled,w as RemoteAPI,I as WithError,q as WithLabel,Ie as __namedExportsOrder,we as default};
