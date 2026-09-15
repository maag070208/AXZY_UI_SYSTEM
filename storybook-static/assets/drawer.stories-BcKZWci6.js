import{Z as a,r as u,j as e,b as m}from"./iframe-B5RMobo9.js";const x={title:"Components/Overlay/ITDrawer",component:a},r={render:()=>{const[n,t]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{label:"Abrir Drawer",onClick:()=>t(!0)}),e.jsx(a,{isOpen:n,onClose:()=>t(!1),title:"Panel Lateral",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:"Contenido del drawer."})})]})}},s={render:()=>{const[n,t]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{label:"Abrir Izquierda",onClick:()=>t(!0)}),e.jsx(a,{isOpen:n,onClose:()=>t(!1),position:"left",title:"Menú",children:e.jsx("p",{className:"text-sm text-slate-600",children:"Drawer desde la izquierda."})})]})}};var o,l,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <ITButton label="Abrir Drawer" onClick={() => setOpen(true)} />
        <ITDrawer isOpen={open} onClose={() => setOpen(false)} title="Panel Lateral">
          <p className="text-sm text-slate-600 dark:text-slate-300">Contenido del drawer.</p>
        </ITDrawer>
      </>;
  }
}`,...(i=(l=r.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var p,c,d;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <ITButton label="Abrir Izquierda" onClick={() => setOpen(true)} />
        <ITDrawer isOpen={open} onClose={() => setOpen(false)} position="left" title="Menú">
          <p className="text-sm text-slate-600">Drawer desde la izquierda.</p>
        </ITDrawer>
      </>;
  }
}`,...(d=(c=s.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const f=["Default","PositionLeft"],D=Object.freeze(Object.defineProperty({__proto__:null,Default:r,PositionLeft:s,__namedExportsOrder:f,default:x},Symbol.toStringTag,{value:"Module"}));export{D as S};
