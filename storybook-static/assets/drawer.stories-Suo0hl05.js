import{r as l,u as T,j as e,h as v,M as y,c as O,I as f}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";function n({isOpen:s,onClose:t,position:h="right",size:b="w-80",title:i,children:g,className:w,style:j}){const o=l.useRef(null);return T(o,t),e.jsx(e.Fragment,{children:s&&e.jsxs("div",{className:"fixed inset-0 z-[100] flex",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"}),e.jsxs("div",{ref:o,className:O("relative z-10 h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300",h==="right"?"ml-auto":"mr-auto",b,w),style:j,children:[i&&e.jsxs("div",{className:"flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700",children:[e.jsx(v,{as:"h2",className:"text-lg font-bold text-slate-800 dark:text-white",children:i}),e.jsx("button",{onClick:t,className:"w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors",children:e.jsx(y,{size:14})})]}),e.jsx("div",{className:"flex-1 overflow-y-auto p-5",children:g})]})]})})}n.__docgenInfo={description:"",methods:[],displayName:"ITDrawer",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},position:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},size:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"w-80"',computed:!1}},title:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const k={title:"Components/Overlay/ITDrawer",component:n,tags:["autodocs"]},r={render:()=>{const[s,t]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{label:"Abrir Drawer",onClick:()=>t(!0)}),e.jsx(n,{isOpen:s,onClose:()=>t(!1),title:"Panel Lateral",children:e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:"Contenido del drawer."})})]})}},a={render:()=>{const[s,t]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(f,{label:"Abrir Izquierda",onClick:()=>t(!0)}),e.jsx(n,{isOpen:s,onClose:()=>t(!1),position:"left",title:"Menú",children:e.jsx("p",{className:"text-sm text-slate-600",children:"Drawer desde la izquierda."})})]})}};var d,c,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <ITButton label="Abrir Drawer" onClick={() => setOpen(true)} />
        <ITDrawer isOpen={open} onClose={() => setOpen(false)} title="Panel Lateral">
          <p className="text-sm text-slate-600 dark:text-slate-300">Contenido del drawer.</p>
        </ITDrawer>
      </>;
  }
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,m,x;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <ITButton label="Abrir Izquierda" onClick={() => setOpen(true)} />
        <ITDrawer isOpen={open} onClose={() => setOpen(false)} position="left" title="Menú">
          <p className="text-sm text-slate-600">Drawer desde la izquierda.</p>
        </ITDrawer>
      </>;
  }
}`,...(x=(m=a.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const C=["Default","PositionLeft"];export{r as Default,a as PositionLeft,C as __namedExportsOrder,k as default};
