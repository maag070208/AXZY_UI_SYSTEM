import{A as E,r as I,j as n}from"./iframe-B5RMobo9.js";const O={title:"Components/Feedback/ITAlert",component:E},e={args:{variant:"info",title:"Información",children:"Esto es un mensaje informativo."}},r={args:{variant:"success",title:"Operación exitosa",children:"Los cambios se guardaron correctamente."}},s={args:{variant:"warning",title:"Advertencia",children:"Esta acción no se puede deshacer."}},a={args:{variant:"error",title:"Error",children:"Ocurrió un error inesperado."}},t={render:()=>{const[A,j]=I.useState(!0);return A?n.jsx(E,{variant:"info",title:"Cerrar",dismissible:!0,onDismiss:()=>j(!1),children:"Puedes cerrar esta alerta."}):n.jsx("p",{className:"text-xs text-slate-400",children:"Alerta cerrada."})}};var i,o,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: "info",
    title: "Información",
    children: "Esto es un mensaje informativo."
  }
}`,...(c=(o=e.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var l,d,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: "success",
    title: "Operación exitosa",
    children: "Los cambios se guardaron correctamente."
  }
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,p,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Advertencia",
    children: "Esta acción no se puede deshacer."
  }
}`,...(g=(p=s.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var v,b,f;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Error",
    children: "Ocurrió un error inesperado."
  }
}`,...(f=(b=a.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var x,S,h;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? <ITAlert variant="info" title="Cerrar" dismissible onDismiss={() => setVisible(false)}>
        Puedes cerrar esta alerta.
      </ITAlert> : <p className="text-xs text-slate-400">Alerta cerrada.</p>;
  }
}`,...(h=(S=t.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const _=["Info","Success","Warning","Error","Dismissible"],T=Object.freeze(Object.defineProperty({__proto__:null,Dismissible:t,Error:a,Info:e,Success:r,Warning:s,__namedExportsOrder:_,default:O},Symbol.toStringTag,{value:"Module"}));export{T as S};
