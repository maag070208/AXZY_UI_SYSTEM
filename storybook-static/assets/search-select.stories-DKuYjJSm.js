import{J as g,j as a,r as l}from"./iframe-B5RMobo9.js";const y={title:"Components/Form Elements/ITSearchSelect",component:g,parameters:{layout:"centered"},argTypes:{disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"},isLoading:{control:"boolean"}}},c=[{value:1,label:"Juan Pérez"},{value:2,label:"María García"},{value:3,label:"Carlos Rodríguez"},{value:4,label:"Ana Martínez"},{value:5,label:"Luis López"},{value:6,label:"Elena Sánchez"},{value:7,label:"Roberto Díaz"},{value:8,label:"Marta Castro"}],i=e=>{const[d,p]=l.useState(e.value||""),[m,u]=l.useState(!1);return a.jsx("div",{className:"w-[400px]",children:a.jsx(g,{...e,value:d,onChange:h=>p(h),onBlur:()=>u(!0),touched:m})})},r={render:e=>a.jsx(i,{...e}),args:{name:"search-select",options:c,placeholder:"Busca un usuario..."}},s={render:e=>a.jsx(i,{...e}),args:{name:"search-select",label:"Seleccionar Usuario",options:c,placeholder:"Busca un usuario...",required:!0}},o={render:e=>{const[d,p]=l.useState([]),[m,u]=l.useState(!1),[h,w]=l.useState(""),z=S=>{u(!0),setTimeout(()=>{const B=c.filter(P=>P.label.toLowerCase().includes(S.toLowerCase()));p(B),u(!1)},1e3)};return a.jsx("div",{className:"w-[400px]",children:a.jsx(g,{...e,value:h,options:d,isLoading:m,onSearch:z,onChange:S=>w(S)})})},args:{name:"remote-search",label:"Búsqueda en API (Simulada)",placeholder:"Escribe para buscar..."}},t={render:e=>a.jsx(i,{...e}),args:{name:"search-select",label:"Campo con Error",options:c,error:"Este campo es obligatorio",touched:!0}},n={render:e=>a.jsx(i,{...e}),args:{name:"search-select",label:"Campo Deshabilitado",options:c,disabled:!0}};var b,v,x;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    options: options,
    placeholder: "Busca un usuario..."
  }
}`,...(x=(v=r.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var L,C,f;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Seleccionar Usuario",
    options: options,
    placeholder: "Busca un usuario...",
    required: true
  }
}`,...(f=(C=s.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var E,j,O;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(O=(j=o.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var I,T,W;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Campo con Error",
    options: options,
    error: "Este campo es obligatorio",
    touched: true
  }
}`,...(W=(T=t.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var D,R,q;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Campo Deshabilitado",
    options: options,
    disabled: true
  }
}`,...(q=(R=n.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};const A=["Default","WithLabel","RemoteAPI","WithError","Disabled"],M=Object.freeze(Object.defineProperty({__proto__:null,Default:r,Disabled:n,RemoteAPI:o,WithError:t,WithLabel:s,__namedExportsOrder:A,default:y},Symbol.toStringTag,{value:"Module"}));export{M as S};
