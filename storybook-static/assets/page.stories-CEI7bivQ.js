import{ad as S,j as e,C as l,b as i}from"./iframe-B5RMobo9.js";const D={title:"Components/Layout/ITPage",component:S},t={args:{title:"Usuarios",description:"Gestión de usuarios del sistema",children:e.jsx(l,{title:"Contenido",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-400",children:"Aquí va el contenido de la página."})})}},r={args:{title:"Editar Producto",description:"Modifica los datos del producto",breadcrumbs:[{label:"Productos",href:"#"},{label:"Editar Producto"}],actions:e.jsxs(e.Fragment,{children:[e.jsx(i,{label:"Cancelar",variant:"outlined",size:"sm"}),e.jsx(i,{label:"Guardar",size:"sm"})]}),children:e.jsx(l,{title:"Información General",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-400",children:"Contenido del formulario aquí."})})}},a={args:{title:"Dashboard",loading:!0,children:null}},n={args:{title:"Órdenes",error:"No se pudieron cargar las órdenes. Verifica tu conexión.",onRetry:()=>alert("Retry clicked"),children:null}},s={args:{title:"Notificaciones",empty:!0,emptyTitle:"Sin notificaciones",emptyDescription:"No tienes notificaciones pendientes.",emptyAction:e.jsx(i,{label:"Recargar",size:"sm",onClick:()=>alert("Refresh")}),children:null}},o={args:{title:"Detalle del Usuario",description:"Información completa del usuario",backAction:()=>alert("Back"),breadcrumbs:[{label:"Usuarios",href:"#"},{label:"Detalle"}],children:e.jsx(l,{title:"Perfil",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-400",children:"Contenido del detalle aquí."})})}};var c,d,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    title: "Usuarios",
    description: "Gestión de usuarios del sistema",
    children: <ITCard title="Contenido">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Aquí va el contenido de la página.
        </p>
      </ITCard>
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,p,x;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: "Editar Producto",
    description: "Modifica los datos del producto",
    breadcrumbs: [{
      label: "Productos",
      href: "#"
    }, {
      label: "Editar Producto"
    }],
    actions: <>
        <ITButton label="Cancelar" variant="outlined" size="sm" />
        <ITButton label="Guardar" size="sm" />
      </>,
    children: <ITCard title="Información General">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Contenido del formulario aquí.
        </p>
      </ITCard>
  }
}`,...(x=(p=r.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var g,h,b;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: "Dashboard",
    loading: true,
    children: null
  }
}`,...(b=(h=a.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var f,C,y;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: "Órdenes",
    error: "No se pudieron cargar las órdenes. Verifica tu conexión.",
    onRetry: () => alert("Retry clicked"),
    children: null
  }
}`,...(y=(C=n.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var I,k,T;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: "Notificaciones",
    empty: true,
    emptyTitle: "Sin notificaciones",
    emptyDescription: "No tienes notificaciones pendientes.",
    emptyAction: <ITButton label="Recargar" size="sm" onClick={() => alert("Refresh")} />,
    children: null
  }
}`,...(T=(k=s.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var j,A,N;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    title: "Detalle del Usuario",
    description: "Información completa del usuario",
    backAction: () => alert("Back"),
    breadcrumbs: [{
      label: "Usuarios",
      href: "#"
    }, {
      label: "Detalle"
    }],
    children: <ITCard title="Perfil">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Contenido del detalle aquí.
        </p>
      </ITCard>
  }
}`,...(N=(A=o.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};const P=["Default","WithBreadcrumbsAndActions","Loading","WithError","Empty","WithBackAction"],E=Object.freeze(Object.defineProperty({__proto__:null,Default:t,Empty:s,Loading:a,WithBackAction:o,WithBreadcrumbsAndActions:r,WithError:n,__namedExportsOrder:P,default:D},Symbol.toStringTag,{value:"Module"}));export{E as S};
