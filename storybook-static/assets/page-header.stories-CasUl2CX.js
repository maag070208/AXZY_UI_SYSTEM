import{j as e,I as t}from"./iframe-BUyFEAH8.js";import{I}from"./page-header-1Z0WfBsf.js";import"./preload-helper-C1FmrZbK.js";import"./breadcrumbs-zAcXCUfE.js";const D={title:"Components/Layout/ITPageHeader",component:I,tags:["autodocs"]},a={args:{title:"Usuarios",description:"Gestiona los usuarios del sistema"}},r={args:{title:"Editar Usuario",description:"Modifica los datos del usuario seleccionado",breadcrumbs:[{label:"Inicio",href:"#"},{label:"Usuarios",href:"#"},{label:"Editar Usuario"}]}},s={args:{title:"Órdenes de Compra",description:"Listado de órdenes activas",breadcrumbs:[{label:"Dashboard",href:"#"},{label:"Órdenes"}],actions:e.jsxs(e.Fragment,{children:[e.jsx(t,{label:"Exportar",variant:"outlined",size:"small"}),e.jsx(t,{label:"Nueva Orden",size:"small"})]})}},o={args:{title:"Detalle del Producto",description:"Información completa del producto",backAction:()=>alert("Back clicked"),breadcrumbs:[{label:"Productos",href:"#"},{label:"Detalle"}],actions:e.jsx(t,{label:"Editar",size:"small"})}};var n,i,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    title: "Usuarios",
    description: "Gestiona los usuarios del sistema"
  }
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,d,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,p,b;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
        <ITButton label="Exportar" variant="outlined" size="small" />
        <ITButton label="Nueva Orden" size="small" />
      </>
  }
}`,...(b=(p=s.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var f,h,g;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
    actions: <ITButton label="Editar" size="small" />
  }
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const U=["Default","WithBreadcrumbs","WithActions","WithBackAction"];export{a as Default,s as WithActions,o as WithBackAction,r as WithBreadcrumbs,U as __namedExportsOrder,D as default};
