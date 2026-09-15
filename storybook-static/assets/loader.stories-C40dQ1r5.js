import{n as r,j as e}from"./iframe-B5RMobo9.js";const L={title:"Components/Feedback/ITLoader",component:r,parameters:{layout:"centered"},argTypes:{size:{control:"select",options:["sm","md","lg","xl"],description:"Size of the loader"},variant:{control:"select",options:["spinner","dots","bar","pulse"],description:"Visual style of the loader"},color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"],description:"Semantic color from theme"}}},s={args:{variant:"spinner",color:"primary",size:"md"}},a={args:{variant:"dots",color:"secondary",size:"md"}},n={args:{variant:"pulse",color:"danger",size:"lg"}},o={render:i=>e.jsx("div",{className:"w-[300px]",children:e.jsx(r,{...i})}),args:{variant:"bar",color:"success",size:"md"}},t={render:i=>e.jsx("div",{className:"flex gap-4 items-center",children:["primary","secondary","success","danger","warning","info","purple"].map(l=>e.jsx(r,{...i,color:l},l))}),args:{variant:"spinner",size:"md"}},c={render:()=>e.jsxs("div",{className:"flex flex-col gap-8 items-center",children:[e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Spinner"}),e.jsx(r,{variant:"spinner",color:"primary"})]}),e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Dots"}),e.jsx(r,{variant:"dots",color:"primary"})]}),e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Pulse"}),e.jsx(r,{variant:"pulse",color:"primary"})]}),e.jsxs("div",{className:"flex gap-4 items-center w-[300px]",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Bar"}),e.jsx(r,{variant:"bar",color:"primary"})]})]})};var d,p,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: "spinner",
    color: "primary",
    size: "md"
  }
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var x,g,u;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: "dots",
    color: "secondary",
    size: "md"
  }
}`,...(u=(g=a.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var v,f,y;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: "pulse",
    color: "danger",
    size: "lg"
  }
}`,...(y=(f=n.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var N,j,b;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <div className="w-[300px]">
      <ITLoader {...args} />
    </div>,
  args: {
    variant: "bar",
    color: "success",
    size: "md"
  }
}`,...(b=(j=o.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var S,w,h;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <div className="flex gap-4 items-center">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map(color => <ITLoader key={color} {...args} color={color} />)}
    </div>,
  args: {
    variant: "spinner",
    size: "md"
  }
}`,...(h=(w=t.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var z,T,I;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-8 items-center">
        <div className="flex gap-4 items-center">
             <span className="w-20 text-sm font-bold text-gray-500">Spinner</span>
             <ITLoader variant="spinner" color="primary" />
        </div>
        <div className="flex gap-4 items-center">
             <span className="w-20 text-sm font-bold text-gray-500">Dots</span>
             <ITLoader variant="dots" color="primary" />
        </div>
        <div className="flex gap-4 items-center">
             <span className="w-20 text-sm font-bold text-gray-500">Pulse</span>
             <ITLoader variant="pulse" color="primary" />
        </div>
         <div className="flex gap-4 items-center w-[300px]">
             <span className="w-20 text-sm font-bold text-gray-500">Bar</span>
             <ITLoader variant="bar" color="primary" />
        </div>
      </div>
}`,...(I=(T=c.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};const _=["Spinner","Dots","Pulse","Bar","AllColors","AllVariants"],P=Object.freeze(Object.defineProperty({__proto__:null,AllColors:t,AllVariants:c,Bar:o,Dots:a,Pulse:n,Spinner:s,__namedExportsOrder:_,default:L},Symbol.toStringTag,{value:"Module"}));export{P as S};
