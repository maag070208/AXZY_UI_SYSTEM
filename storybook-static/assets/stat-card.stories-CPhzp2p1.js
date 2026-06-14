import{j as e,h as o,c as d,X as j}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const D={up:"text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30",down:"text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30",neutral:"text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800"};function v({label:y,value:T,trend:r,trendDirection:h=r&&r.startsWith("-")?"down":"neutral",icon:i,color:k="bg-primary-50 dark:bg-primary-950/20",className:w,style:N,onClick:n}){return e.jsxs("div",{className:d("rounded-xl p-4 border border-slate-100 dark:border-slate-800",k,w),style:N,onClick:n,role:n?"button":void 0,tabIndex:n?0:void 0,children:[e.jsxs("div",{className:"flex items-start justify-between mb-1",children:[e.jsx(o,{as:"span",className:"text-xs font-medium text-slate-400 dark:text-slate-500",children:y}),i&&e.jsx("span",{className:"text-slate-400",children:i})]}),e.jsxs("div",{className:"flex items-baseline gap-2",children:[e.jsx(o,{as:"span",className:"text-2xl font-bold text-slate-800 dark:text-white",children:T}),r&&e.jsx(o,{as:"span",className:d("text-[11px] font-semibold px-1.5 py-0.5 rounded-md",D[h]),children:r})]})]})}v.__docgenInfo={description:"",methods:[],displayName:"ITStatCard",props:{label:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},trend:{required:!1,tsType:{name:"string"},description:""},trendDirection:{required:!1,tsType:{name:"union",raw:'"up" | "down" | "neutral"',elements:[{name:"literal",value:'"up"'},{name:"literal",value:'"down"'},{name:"literal",value:'"neutral"'}]},description:"",defaultValue:{value:'trend && trend.startsWith("-") ? "down" : "neutral"',computed:!1}},icon:{required:!1,tsType:{name:"ReactNode"},description:""},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"bg-primary-50 dark:bg-primary-950/20"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const S={title:"Components/Data Display/ITStatCard",component:v,tags:["autodocs"]},a={args:{label:"Usuarios Activos",value:"1,245",trend:"+12.5%",trendDirection:"up"}},t={args:{label:"Tickets Abiertos",value:"23",trend:"-8.2%",trendDirection:"down",color:"bg-rose-50 dark:bg-rose-950/20"}},s={args:{label:"Ventas Hoy",value:"$4,320",trend:"+5.4%",trendDirection:"up",icon:e.jsx(j,{size:12})}};var l,c,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    label: "Usuarios Activos",
    value: "1,245",
    trend: "+12.5%",
    trendDirection: "up"
  }
}`,...(u=(c=a.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var p,m,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: "Tickets Abiertos",
    value: "23",
    trend: "-8.2%",
    trendDirection: "down",
    color: "bg-rose-50 dark:bg-rose-950/20"
  }
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var x,b,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: "Ventas Hoy",
    value: "$4,320",
    trend: "+5.4%",
    trendDirection: "up",
    icon: <FaArrowUp size={12} />
  }
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const A=["Default","Negative","WithIcon"];export{a as Default,t as Negative,s as WithIcon,A as __namedExportsOrder,S as default};
