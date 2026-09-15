import{z as p,r as g,j as v}from"./iframe-B5RMobo9.js";const x={title:"Components/Inputs/ITTextarea",component:p},e={render:()=>{const[m,b]=g.useState("");return v.jsx(p,{value:m,onChange:b,label:"Descripción",placeholder:"Escribe aquí..."})}},a={args:{label:"Comentarios",value:"Mal",error:"Debe tener al menos 10 caracteres"}},r={args:{label:"Bloqueado",value:"No editable",disabled:!0}};var s,t,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("");
    return <ITTextarea value={val} onChange={setVal} label="Descripción" placeholder="Escribe aquí..." />;
  }
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var n,l,c;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: "Comentarios",
    value: "Mal",
    error: "Debe tener al menos 10 caracteres"
  }
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var u,d,i;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: "Bloqueado",
    value: "No editable",
    disabled: true
  }
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};const D=["Default","WithError","Disabled"],E=Object.freeze(Object.defineProperty({__proto__:null,Default:e,Disabled:r,WithError:a,__namedExportsOrder:D,default:x},Symbol.toStringTag,{value:"Module"}));export{E as S};
