import{j as e,I as d,c as H}from"./iframe-BUyFEAH8.js";import{I as t}from"./page-header-1Z0WfBsf.js";import{I as u}from"./skeleton-B2phDRwG.js";import{I as y}from"./empty-state-B4CDd50T.js";import{I as O}from"./stack-DCw82gtv.js";import{I as m}from"./card-BjNAcQuu.js";import"./preload-helper-C1FmrZbK.js";import"./breadcrumbs-zAcXCUfE.js";function U({title:r,description:W,breadcrumbs:p,actions:f,backAction:g,loading:w=!1,error:x=null,onRetry:h,empty:V=!1,emptyTitle:_,emptyDescription:L,emptyAction:M,className:a,children:F}){return w?e.jsxs("div",{className:a,children:[r&&e.jsx(t,{title:r}),e.jsx("div",{className:"mt-6",children:e.jsxs(O,{spacing:4,children:[e.jsx(u,{variant:"rectangular",height:40,width:"40%"}),e.jsx(u,{variant:"rectangular",height:200}),e.jsx(u,{variant:"rectangular",height:200})]})})]}):x?e.jsxs("div",{className:a,children:[r&&e.jsx(t,{title:r}),e.jsx(y,{title:"Error",description:x,action:h?e.jsx(d,{label:"Reintentar",onClick:h,size:"small"}):void 0})]}):V?e.jsxs("div",{className:a,children:[r&&e.jsx(t,{title:r}),e.jsx(y,{title:_||"Sin datos",description:L||"No hay información para mostrar",action:M})]}):e.jsxs("div",{className:H("space-y-6",a),children:[(r||p||f||g)&&e.jsx(t,{title:r||"",description:W,breadcrumbs:p,actions:f,backAction:g}),F]})}U.__docgenInfo={description:"",methods:[],displayName:"ITPage",props:{title:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},breadcrumbs:{required:!1,tsType:{name:"Array",elements:[{name:"ITBreadcrumbItem"}],raw:"ITBreadcrumbItem[]"},description:""},actions:{required:!1,tsType:{name:"ReactNode"},description:""},backAction:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},empty:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},emptyTitle:{required:!1,tsType:{name:"string"},description:""},emptyDescription:{required:!1,tsType:{name:"string"},description:""},emptyAction:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const re={title:"Components/Layout/ITPage",component:U,tags:["autodocs"]},n={args:{title:"Usuarios",description:"Gestión de usuarios del sistema",children:e.jsx(m,{title:"Contenido",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-400",children:"Aquí va el contenido de la página."})})}},s={args:{title:"Editar Producto",description:"Modifica los datos del producto",breadcrumbs:[{label:"Productos",href:"#"},{label:"Editar Producto"}],actions:e.jsxs(e.Fragment,{children:[e.jsx(d,{label:"Cancelar",variant:"outlined",size:"small"}),e.jsx(d,{label:"Guardar",size:"small"})]}),children:e.jsx(m,{title:"Información General",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-400",children:"Contenido del formulario aquí."})})}},i={args:{title:"Dashboard",loading:!0,children:null}},o={args:{title:"Órdenes",error:"No se pudieron cargar las órdenes. Verifica tu conexión.",onRetry:()=>alert("Retry clicked"),children:null}},l={args:{title:"Notificaciones",empty:!0,emptyTitle:"Sin notificaciones",emptyDescription:"No tienes notificaciones pendientes.",emptyAction:e.jsx(d,{label:"Recargar",size:"small",onClick:()=>alert("Refresh")}),children:null}},c={args:{title:"Detalle del Usuario",description:"Información completa del usuario",backAction:()=>alert("Back"),breadcrumbs:[{label:"Usuarios",href:"#"},{label:"Detalle"}],children:e.jsx(m,{title:"Perfil",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-400",children:"Contenido del detalle aquí."})})}};var T,b,I;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: "Usuarios",
    description: "Gestión de usuarios del sistema",
    children: <ITCard title="Contenido">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Aquí va el contenido de la página.
        </p>
      </ITCard>
  }
}`,...(I=(b=n.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var j,q,v;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
        <ITButton label="Cancelar" variant="outlined" size="small" />
        <ITButton label="Guardar" size="small" />
      </>,
    children: <ITCard title="Información General">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Contenido del formulario aquí.
        </p>
      </ITCard>
  }
}`,...(v=(q=s.parameters)==null?void 0:q.docs)==null?void 0:v.source}}};var k,C,N;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    title: "Dashboard",
    loading: true,
    children: null
  }
}`,...(N=(C=i.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var A,R,B;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    title: "Órdenes",
    error: "No se pudieron cargar las órdenes. Verifica tu conexión.",
    onRetry: () => alert("Retry clicked"),
    children: null
  }
}`,...(B=(R=o.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var E,P,S;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    title: "Notificaciones",
    empty: true,
    emptyTitle: "Sin notificaciones",
    emptyDescription: "No tienes notificaciones pendientes.",
    emptyAction: <ITButton label="Recargar" size="small" onClick={() => alert("Refresh")} />,
    children: null
  }
}`,...(S=(P=l.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};var D,z,G;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(G=(z=c.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};const ae=["Default","WithBreadcrumbsAndActions","Loading","WithError","Empty","WithBackAction"];export{n as Default,l as Empty,i as Loading,c as WithBackAction,s as WithBreadcrumbsAndActions,o as WithError,ae as __namedExportsOrder,re as default};
