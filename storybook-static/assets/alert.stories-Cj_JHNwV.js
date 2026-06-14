import{j as e,h as u,M as q,c as F,N as O,O as z,P as D,Q as V,r as _}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const P={info:{icon:e.jsx(V,{size:16}),classes:"bg-info-50 border-info-200 text-info-800 dark:bg-info-950/20 dark:border-info-800 dark:text-info-300"},success:{icon:e.jsx(D,{size:16}),classes:"bg-success-50 border-success-200 text-success-800 dark:bg-success-950/20 dark:border-success-800 dark:text-success-300"},warning:{icon:e.jsx(z,{size:16}),classes:"bg-warning-50 border-warning-200 text-warning-800 dark:bg-warning-950/20 dark:border-warning-800 dark:text-warning-300"},error:{icon:e.jsx(O,{size:16}),classes:"bg-danger-50 border-danger-200 text-danger-800 dark:bg-danger-950/20 dark:border-danger-800 dark:text-danger-300"}};function c({variant:o="info",title:r,children:d,dismissible:A,onDismiss:l,icon:S,className:C}){const m=P[o];return e.jsxs("div",{className:F("flex items-start gap-3 rounded-xl border p-4",m.classes,C),role:"alert",children:[e.jsx("span",{className:"mt-0.5 flex-shrink-0",children:S||m.icon}),e.jsxs("div",{className:"flex-1 min-w-0",children:[r&&e.jsx(u,{as:"p",className:"text-sm font-bold mb-0.5",children:r}),d&&e.jsx(u,{as:"div",className:"text-sm opacity-90",children:d})]}),A&&l&&e.jsx("button",{onClick:l,className:"flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity",children:e.jsx(q,{size:12})})]})}c.__docgenInfo={description:"",methods:[],displayName:"ITAlert",props:{variant:{required:!1,tsType:{name:"union",raw:'"info" | "success" | "warning" | "error"',elements:[{name:"literal",value:'"info"'},{name:"literal",value:'"success"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'}]},description:"",defaultValue:{value:'"info"',computed:!1}},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},dismissible:{required:!1,tsType:{name:"boolean"},description:""},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const W={title:"Components/Feedback/ITAlert",component:c,tags:["autodocs"]},s={args:{variant:"info",title:"Información",children:"Esto es un mensaje informativo."}},a={args:{variant:"success",title:"Operación exitosa",children:"Los cambios se guardaron correctamente."}},n={args:{variant:"warning",title:"Advertencia",children:"Esta acción no se puede deshacer."}},i={args:{variant:"error",title:"Error",children:"Ocurrió un error inesperado."}},t={render:()=>{const[o,r]=_.useState(!0);return o?e.jsx(c,{variant:"info",title:"Cerrar",dismissible:!0,onDismiss:()=>r(!1),children:"Puedes cerrar esta alerta."}):e.jsx("p",{className:"text-xs text-slate-400",children:"Alerta cerrada."})}};var p,g,f;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: "info",
    title: "Información",
    children: "Esto es un mensaje informativo."
  }
}`,...(f=(g=s.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var x,b,v;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: "success",
    title: "Operación exitosa",
    children: "Los cambios se guardaron correctamente."
  }
}`,...(v=(b=a.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var h,j,k;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Advertencia",
    children: "Esta acción no se puede deshacer."
  }
}`,...(k=(j=n.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var T,w,y;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Error",
    children: "Ocurrió un error inesperado."
  }
}`,...(y=(w=i.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var N,E,I;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? <ITAlert variant="info" title="Cerrar" dismissible onDismiss={() => setVisible(false)}>
        Puedes cerrar esta alerta.
      </ITAlert> : <p className="text-xs text-slate-400">Alerta cerrada.</p>;
  }
}`,...(I=(E=t.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const M=["Info","Success","Warning","Error","Dismissible"];export{t as Dismissible,i as Error,s as Info,a as Success,n as Warning,M as __namedExportsOrder,W as default};
