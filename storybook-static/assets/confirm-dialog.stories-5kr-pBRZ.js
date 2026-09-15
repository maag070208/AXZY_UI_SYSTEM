import{X as t,r as l,j as n,b as m}from"./iframe-B5RMobo9.js";const c={title:"Components/Overlay/ITConfirmDialog",component:t},e={render:()=>{const[i,a]=l.useState(!1);return n.jsxs(n.Fragment,{children:[n.jsx(m,{label:"Eliminar",color:"danger",onClick:()=>a(!0)}),n.jsx(t,{isOpen:i,onClose:()=>a(!1),onConfirm:()=>{alert("Confirmado"),a(!1)},title:"Eliminar usuario",message:"Esta acción no se puede deshacer. ¿Deseas eliminar este usuario?",confirmLabel:"Eliminar",variant:"danger"})]})}};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <ITButton label="Eliminar" color="danger" onClick={() => setOpen(true)} />
        <ITConfirmDialog isOpen={open} onClose={() => setOpen(false)} onConfirm={() => {
        alert("Confirmado");
        setOpen(false);
      }} title="Eliminar usuario" message="Esta acción no se puede deshacer. ¿Deseas eliminar este usuario?" confirmLabel="Eliminar" variant="danger" />
      </>;
  }
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const u=["Default"],d=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:u,default:c},Symbol.toStringTag,{value:"Module"}));export{d as S};
