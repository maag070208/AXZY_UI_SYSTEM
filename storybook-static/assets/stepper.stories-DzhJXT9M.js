import{N as y,j as e,O as C,k as w,P as W,r as P}from"./iframe-B5RMobo9.js";const _={title:"Components/Layout & Navigation/ITStepper",component:y,parameters:{layout:"padded"},argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]},currentStep:{control:{type:"number",min:0,max:2}},allowClickToJump:{control:"boolean"},useIcons:{control:"boolean"},scrollableContent:{control:"boolean"},disableNext:{control:"boolean"}}},N=e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("h3",{className:"text-lg font-bold",children:"Personal Information"}),e.jsx("p",{className:"text-gray-600",children:"Please provide your basic details to get started."}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 mt-4",children:[e.jsx("div",{className:"bg-gray-100 h-10 rounded animate-pulse"}),e.jsx("div",{className:"bg-gray-100 h-10 rounded animate-pulse"}),e.jsx("div",{className:"bg-gray-100 h-10 rounded animate-pulse col-span-2"})]})]}),v=e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("h3",{className:"text-lg font-bold",children:"Address Details"}),e.jsx("p",{className:"text-gray-600",children:"Where should we send your documents?"}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 mt-4",children:[e.jsx("div",{className:"bg-gray-100 h-10 rounded animate-pulse col-span-3"}),e.jsx("div",{className:"bg-gray-100 h-10 rounded animate-pulse col-span-2"}),e.jsx("div",{className:"bg-gray-100 h-10 rounded animate-pulse"})]})]}),I=e.jsxs("div",{className:"flex flex-col gap-4 items-center justify-center h-full text-center py-8",children:[e.jsx(C,{className:"w-16 h-16 text-success-500 mb-4"}),e.jsx("h3",{className:"text-2xl font-bold",children:"You're all set!"}),e.jsx("p",{className:"text-gray-600 max-w-sm",children:"Review your information before final submission. If everything looks good, click Finish."})]}),c=e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("h3",{className:"text-lg font-bold",children:"Terms and Conditions"}),Array.from({length:15}).map((s,l)=>e.jsx("p",{className:"text-gray-600",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},l))]}),T=[{label:"Personal Info",content:N},{label:"Address",content:v},{label:"Confirmation",content:I}],q=[{label:"Account",icon:e.jsx(w,{}),content:N},{label:"Identity",icon:e.jsx(W,{}),content:v},{label:"Complete",icon:e.jsx(C,{}),content:I}],F=[{label:"Terms",content:c},{label:"Privacy Policy",content:c}],n=s=>{const[l,k]=P.useState(0);return e.jsx(y,{...s,currentStep:l,onStepChange:k,onFinish:()=>alert("Stepper Finished!")})},r={render:s=>e.jsx(n,{...s}),args:{steps:T,color:"primary",allowClickToJump:!0}},t={render:s=>e.jsx(n,{...s}),args:{steps:q,color:"purple",useIcons:!0}},a={render:s=>e.jsx(n,{...s}),args:{steps:T,color:"danger",allowClickToJump:!1}},o={render:s=>e.jsx(n,{...s}),args:{steps:F,color:"info",scrollableContent:!0,maxContentHeight:"300px"}};var i,p,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <StepperWrapper {...args} />,
  args: {
    steps: basicSteps,
    color: "primary",
    allowClickToJump: true
  }
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,u,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <StepperWrapper {...args} />,
  args: {
    steps: iconSteps,
    color: "purple",
    useIcons: true
  }
}`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var x,b,h;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <StepperWrapper {...args} />,
  args: {
    steps: basicSteps,
    color: "danger",
    allowClickToJump: false // User must use Next/Back buttons
  }
}`,...(h=(b=a.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var S,j,f;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <StepperWrapper {...args} />,
  args: {
    steps: scrollableSteps,
    color: "info",
    scrollableContent: true,
    maxContentHeight: "300px" // Restricts height to demonstrate scrolling
  }
}`,...(f=(j=o.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};const J=["Default","WithIcons","StrictSequential","ScrollableContent"],D=Object.freeze(Object.defineProperty({__proto__:null,Default:r,ScrollableContent:o,StrictSequential:a,WithIcons:t,__namedExportsOrder:J,default:_},Symbol.toStringTag,{value:"Module"}));export{D as S};
