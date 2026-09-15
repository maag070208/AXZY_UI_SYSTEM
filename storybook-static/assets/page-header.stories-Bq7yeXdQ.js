import{a5 as E,j as e,b as n,a3 as j}from"./iframe-B5RMobo9.js";const z={title:"Components/Layout/ITPageHeader",component:E},a={args:{title:"Usuarios",description:"Gestiona los usuarios del sistema"}},s={args:{title:"Editar Usuario",description:"Modifica los datos del usuario seleccionado",breadcrumbs:[{label:"Inicio",href:"#"},{label:"Usuarios",href:"#"},{label:"Editar Usuario"}]}},r={args:{title:"Órdenes de Compra",description:"Listado de órdenes activas",breadcrumbs:[{label:"Dashboard",href:"#"},{label:"Órdenes"}],actions:e.jsxs(e.Fragment,{children:[e.jsx(n,{label:"Exportar",variant:"outlined",size:"sm"}),e.jsx(n,{label:"Nueva Orden",size:"sm"})]})}},o={args:{title:"Detalle del Producto",description:"Información completa del producto",backAction:()=>alert("Back clicked"),breadcrumbs:[{label:"Productos",href:"#"},{label:"Detalle"}],actions:e.jsx(n,{label:"Editar",size:"sm"})}},t={args:{title:"Usuarios",description:"Gestiona los usuarios del sistema",icon:e.jsx(j,{size:20}),iconColor:"#6366f1",breadcrumbs:[{label:"Inicio",href:"#"},{label:"Usuarios"}]}};var i,c,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    title: "Usuarios",
    description: "Gestiona los usuarios del sistema"
  }
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,u,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    title: "Editar Usuario",
    description: "Modifica los datos del usuario seleccionado",
    breadcrumbs: [{
      label: "Inicio",
      href: "#"
    }, {
      label: "Usuarios",
      href: "#"
    }, {
      label: "Editar Usuario"
    }]
  }
}`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var b,p,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: "Órdenes de Compra",
    description: "Listado de órdenes activas",
    breadcrumbs: [{
      label: "Dashboard",
      href: "#"
    }, {
      label: "Órdenes"
    }],
    actions: <>
        <ITButton label="Exportar" variant="outlined" size="sm" />
        <ITButton label="Nueva Orden" size="sm" />
      </>
  }
}`,...(f=(p=r.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var h,g,I;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: "Detalle del Producto",
    description: "Información completa del producto",
    backAction: () => alert("Back clicked"),
    breadcrumbs: [{
      label: "Productos",
      href: "#"
    }, {
      label: "Detalle"
    }],
    actions: <ITButton label="Editar" size="sm" />
  }
}`,...(I=(g=o.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var U,x,B;t.parameters={...t.parameters,docs:{...(U=t.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    title: "Usuarios",
    description: "Gestiona los usuarios del sistema",
    icon: <FaUsers size={20} />,
    iconColor: "#6366f1",
    breadcrumbs: [{
      label: "Inicio",
      href: "#"
    }, {
      label: "Usuarios"
    }]
  }
}`,...(B=(x=t.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};const D=["Default","WithBreadcrumbs","WithActions","WithBackAction","WithIcon"],k=Object.freeze(Object.defineProperty({__proto__:null,Default:a,WithActions:r,WithBackAction:o,WithBreadcrumbs:s,WithIcon:t,__namedExportsOrder:D,default:z},Symbol.toStringTag,{value:"Module"}));export{k as S};
