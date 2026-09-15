import{a9 as l,j as s,r as A,b as C}from"./iframe-B5RMobo9.js";const I={title:"Components/Feedback/ITToast",component:l,parameters:{layout:"centered"},argTypes:{type:{control:"select",options:["success","error","warning","info","primary","danger"]},position:{control:"select",options:["top-right","top-center","top-left","bottom-right","bottom-center","bottom-left"]},duration:{control:{type:"number",min:1e3,max:1e4,step:500}},message:{control:"text"}}},c=e=>{const[t,p]=A.useState(!1);return s.jsxs("div",{className:"flex items-center justify-center p-12",children:[s.jsxs(C,{variant:"solid",color:e.type in["success","error","warning","info","primary"]?e.type:"primary",onClick:()=>{p(!1),setTimeout(()=>p(!0),10)},children:["Show Toast (",e.type,")"]}),t&&s.jsx(l,{...e,onClose:()=>{p(!1),e.onClose&&e.onClose()}})]})},o={render:e=>s.jsx(c,{...e}),args:{message:"This is a default information message.",type:"info",position:"top-right",duration:3e3}},a={render:e=>s.jsx(c,{...e}),args:{message:"Operation completed successfully!",type:"success",position:"top-right",duration:3e3}},n={render:e=>s.jsx(c,{...e}),args:{message:"There was a critical error processing your request.",type:"error",position:"top-center",duration:5e3}},i={render:e=>s.jsx(c,{...e}),args:{message:"Please check your input values before proceeding.",type:"warning",position:"bottom-left",duration:4e3}},r=()=>{const e=["primary","success","error","warning","info"];return s.jsxs("div",{className:"flex flex-col gap-8 w-[400px]",children:[s.jsx("h3",{className:"text-gray-500 text-sm font-semibold mb-2",children:"Static Preview (Not positioned fixed)"}),s.jsx("div",{className:"flex flex-col gap-4 relative",children:e.map(t=>s.jsx("div",{className:"relative z-0",children:s.jsx(l,{message:`This is a ${t} notification message`,type:t,duration:999999,position:"top-right"})},t))}),s.jsx("p",{className:"text-xs text-gray-400 mt-4",children:"Note: Actual ITToasts are position: fixed and rendered at the edges of the screen according to their position prop."})]})};r.__docgenInfo={description:`Multiple Toasts Preview
Note: A real implementation would manage multiple toasts via a Toast Provider Context. 
This just shows how the colors resolve visually.`,methods:[],displayName:"AllTypesPreview"};var d,m,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "This is a default information message.",
    type: "info",
    position: "top-right",
    duration: 3000
  }
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var u,f,y;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "Operation completed successfully!",
    type: "success",
    position: "top-right",
    duration: 3000
  }
}`,...(y=(f=a.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var x,h,T;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "There was a critical error processing your request.",
    type: "error",
    // Uses theme.colors.error or danger
    position: "top-center",
    duration: 5000
  }
}`,...(T=(h=n.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var v,w,j;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <ToastTrigger {...args} />,
  args: {
    message: "Please check your input values before proceeding.",
    type: "warning",
    position: "bottom-left",
    duration: 4000
  }
}`,...(j=(w=i.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var b,N,S,P,_;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
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
}`,...(S=(N=r.parameters)==null?void 0:N.docs)==null?void 0:S.source},description:{story:`Multiple Toasts Preview
Note: A real implementation would manage multiple toasts via a Toast Provider Context. 
This just shows how the colors resolve visually.`,...(_=(P=r.parameters)==null?void 0:P.docs)==null?void 0:_.description}}};const k=["Default","Success","Error","Warning","AllTypesPreview"],O=Object.freeze(Object.defineProperty({__proto__:null,AllTypesPreview:r,Default:o,Error:n,Success:a,Warning:i,__namedExportsOrder:k,default:I},Symbol.toStringTag,{value:"Module"}));export{O as S};
