import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{t as g}from"./theme-Cu8onXxY.js";import{c as O}from"./clsx-B-dksMZM.js";import{r as f}from"./iframe-B9rAFiN_.js";import{F as D,u as M,v as $,w as B,o as R}from"./index-hWgMQIRJ.js";import{I as U}from"./button-CjKvNsZ3.js";import"./preload-helper-C1FmrZbK.js";const G={"top-right":"top-4 right-4","top-center":"top-4 left-1/2 transform -translate-x-1/2","top-left":"top-4 left-4","bottom-right":"bottom-4 right-4","bottom-center":"bottom-4 left-1/2 transform -translate-x-1/2","bottom-left":"bottom-4 left-4"};function p({message:t,type:s="info",duration:r=1500,position:d="top-right",onClose:a}){const[n,h]=f.useState(!0);f.useEffect(()=>{const z=setTimeout(()=>{h(!1),setTimeout(()=>{a&&a()},300)},r);return()=>clearTimeout(z)},[r,a]);const _=()=>{h(!1),setTimeout(()=>{a&&a()},300)},V=s in g.colors?g.colors[s][500]:g.colors.primary[500],W=()=>{switch(s){case"success":return e.jsx(R,{className:"w-5 h-5 flex-shrink-0"});case"error":case"danger":return e.jsx(B,{className:"w-5 h-5 flex-shrink-0"});case"warning":return e.jsx($,{className:"w-5 h-5 flex-shrink-0"});case"info":default:return e.jsx(M,{className:"w-5 h-5 flex-shrink-0"})}};return e.jsxs("div",{className:O("fixed z-50 p-4 rounded-xl shadow-xl flex items-center justify-between gap-4 transition-all duration-300 text-white min-w-[300px]",G[d],{"opacity-100 translate-y-0 scale-100":n,"opacity-0 scale-95":!n,"-translate-y-4":!n&&d.startsWith("top"),"translate-y-4":!n&&d.startsWith("bottom")}),style:{backgroundColor:V},role:"alert",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(W,{}),e.jsx("span",{className:"font-medium text-sm sm:text-base leading-snug",children:t})]}),e.jsx("button",{onClick:_,className:"p-1.5 rounded-full hover:bg-black/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50","aria-label":"Close notification",children:e.jsx(D,{className:"w-4 h-4"})})]})}p.__docgenInfo={description:"",methods:[],displayName:"ITToast",props:{message:{required:!0,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:'"success" | "error" | "warning" | "info" | "primary" | "danger" | string',elements:[{name:"literal",value:'"success"'},{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"info"'},{name:"literal",value:'"primary"'},{name:"literal",value:'"danger"'},{name:"string"}]},description:"",defaultValue:{value:'"info"',computed:!1}},duration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1500",computed:!1}},position:{required:!1,tsType:{name:"union",raw:`| "top-right"
| "top-center"
| "top-left"
| "bottom-right"
| "bottom-center"
| "bottom-left"`,elements:[{name:"literal",value:'"top-right"'},{name:"literal",value:'"top-center"'},{name:"literal",value:'"top-left"'},{name:"literal",value:'"bottom-right"'},{name:"literal",value:'"bottom-center"'},{name:"literal",value:'"bottom-left"'}]},description:"",defaultValue:{value:'"top-right"',computed:!1}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const ee={title:"Components/Feedback/ITToast",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:"select",options:["success","error","warning","info","primary","danger"]},position:{control:"select",options:["top-right","top-center","top-left","bottom-right","bottom-center","bottom-left"]},duration:{control:{type:"number",min:1e3,max:1e4,step:500}},message:{control:"text"}}},u=t=>{const[s,r]=f.useState(!1);return e.jsxs("div",{className:"flex items-center justify-center p-12",children:[e.jsxs(U,{variant:"solid",color:t.type in["success","error","warning","info","primary"]?t.type:"primary",onClick:()=>{r(!1),setTimeout(()=>r(!0),10)},children:["Show Toast (",t.type,")"]}),s&&e.jsx(p,{...t,onClose:()=>{r(!1),t.onClose&&t.onClose()}})]})},i={render:t=>e.jsx(u,{...t}),args:{message:"This is a default information message.",type:"info",position:"top-right",duration:3e3}},l={render:t=>e.jsx(u,{...t}),args:{message:"Operation completed successfully!",type:"success",position:"top-right",duration:3e3}},c={render:t=>e.jsx(u,{...t}),args:{message:"There was a critical error processing your request.",type:"error",position:"top-center",duration:5e3}},m={render:t=>e.jsx(u,{...t}),args:{message:"Please check your input values before proceeding.",type:"warning",position:"bottom-left",duration:4e3}},o=()=>{const t=["primary","success","error","warning","info"];return e.jsxs("div",{className:"flex flex-col gap-8 w-[400px]",children:[e.jsx("h3",{className:"text-gray-500 text-sm font-semibold mb-2",children:"Static Preview (Not positioned fixed)"}),e.jsx("div",{className:"flex flex-col gap-4 relative",children:t.map(s=>e.jsx("div",{className:"relative z-0",children:e.jsx(p,{message:`This is a ${s} notification message`,type:s,duration:999999,position:"top-right"})},s))}),e.jsx("p",{className:"text-xs text-gray-400 mt-4",children:"Note: Actual ITToasts are position: fixed and rendered at the edges of the screen according to their position prop."})]})};o.__docgenInfo={description:`Multiple Toasts Preview
Note: A real implementation would manage multiple toasts via a Toast Provider Context. 
This just shows how the colors resolve visually.`,methods:[],displayName:"AllTypesPreview"};var x,y,T;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "This is a default information message.",
    type: "info",
    position: "top-right",
    duration: 3000
  }
}`,...(T=(y=i.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var v,w,b;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "Operation completed successfully!",
    type: "success",
    position: "top-right",
    duration: 3000
  }
}`,...(b=(w=l.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var j,N,k;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "There was a critical error processing your request.",
    type: "error",
    // Uses theme.colors.error or danger
    position: "top-center",
    duration: 5000
  }
}`,...(k=(N=c.parameters)==null?void 0:N.docs)==null?void 0:k.source}}};var C,S,I;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "Please check your input values before proceeding.",
    type: "warning",
    position: "bottom-left",
    duration: 4000
  }
}`,...(I=(S=m.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var P,q,A,E,F;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const types = ["primary", "success", "error", "warning", "info"] as const;
  return <div className="flex flex-col gap-8 w-[400px]">
      <h3 className="text-gray-500 text-sm font-semibold mb-2">Static Preview (Not positioned fixed)</h3>
      <div className="flex flex-col gap-4 relative">
        {types.map(type =>
      // We inline style it simply to bypass the fixed positioning just for this preview story block.
      <div key={type} className="relative z-0">
             <ITToast message={\`This is a \${type} notification message\`} type={type} duration={999999} position="top-right" />
           </div>)}
      </div>
      <p className="text-xs text-gray-400 mt-4">Note: Actual ITToasts are position: fixed and rendered at the edges of the screen according to their position prop.</p>
    </div>;
}`,...(A=(q=o.parameters)==null?void 0:q.docs)==null?void 0:A.source},description:{story:`Multiple Toasts Preview
Note: A real implementation would manage multiple toasts via a Toast Provider Context. 
This just shows how the colors resolve visually.`,...(F=(E=o.parameters)==null?void 0:E.docs)==null?void 0:F.description}}};const te=["Default","Success","Error","Warning","AllTypesPreview"];export{o as AllTypesPreview,i as Default,c as Error,l as Success,m as Warning,te as __namedExportsOrder,ee as default};
