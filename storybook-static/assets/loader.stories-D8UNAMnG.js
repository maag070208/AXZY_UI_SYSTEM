import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{t as h}from"./theme-CuplGK4O.js";import"./iframe-Dr0sZusW.js";import"./preload-helper-C1FmrZbK.js";const x={sm:"h-4 w-4",md:"h-8 w-8",lg:"h-12 w-12",xl:"h-16 w-16"};function s({size:r="md",variant:a="spinner",color:n="primary",className:t=""}){const f=n in h.colors,o=f?h.colors[n][500]:n,i=f||n.startsWith("#")||n.startsWith("rgb"),P=i?{color:o}:{},v=i?{backgroundColor:o}:{},l=i?"":n;return a==="spinner"?e.jsx("div",{className:`inline-block ${x[r]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${l} ${t}`,role:"status",style:P,children:e.jsx("span",{className:"!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]",children:"Loading..."})}):a==="dots"?e.jsx("div",{className:`flex items-center justify-center space-x-2 ${t}`,children:[...Array(3)].map((E,y)=>e.jsx("div",{className:`${x[r.replace(/l|g/,"")]} animate-bounce rounded-full ${l}`,style:{...v,animationDelay:`${y*.1}s`}},y))}):a==="bar"?e.jsx("div",{className:`w-full ${r==="sm"?"h-1":r==="md"?"h-1.5":r==="lg"?"h-2":"h-2.5"} bg-gray-200 rounded-full overflow-hidden ${t}`,children:e.jsx("div",{className:`h-full animate-progress ${l}`,style:{backgroundColor:o,backgroundImage:i?`linear-gradient(to right, ${o}DD, ${o})`:void 0,animation:"progress 1.5s ease-in-out infinite"}})}):a==="pulse"?e.jsx("div",{className:`rounded-full ${x[r]} animate-pulse ${l} ${t}`,style:v}):null}s.__docgenInfo={description:"",methods:[],displayName:"ITLoader",props:{size:{required:!1,tsType:{name:"LoaderSize"},description:"",defaultValue:{value:'"md"',computed:!1}},variant:{required:!1,tsType:{name:"LoaderVariant"},description:"",defaultValue:{value:'"spinner"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"primary"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const G={title:"Components/Feedback/ITLoader",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl"],description:"Size of the loader"},variant:{control:"select",options:["spinner","dots","bar","pulse"],description:"Visual style of the loader"},color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"],description:"Semantic color from theme"}}},c={args:{variant:"spinner",color:"primary",size:"md"}},d={args:{variant:"dots",color:"secondary",size:"md"}},p={args:{variant:"pulse",color:"danger",size:"lg"}},m={render:r=>e.jsx("div",{className:"w-[300px]",children:e.jsx(s,{...r})}),args:{variant:"bar",color:"success",size:"md"}},u={render:r=>e.jsx("div",{className:"flex gap-4 items-center",children:["primary","secondary","success","danger","warning","info","purple"].map(a=>e.jsx(s,{...r,color:a},a))}),args:{variant:"spinner",size:"md"}},g={render:r=>e.jsxs("div",{className:"flex flex-col gap-8 items-center",children:[e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Spinner"}),e.jsx(s,{variant:"spinner",color:"primary"})]}),e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Dots"}),e.jsx(s,{variant:"dots",color:"primary"})]}),e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Pulse"}),e.jsx(s,{variant:"pulse",color:"primary"})]}),e.jsxs("div",{className:"flex gap-4 items-center w-[300px]",children:[e.jsx("span",{className:"w-20 text-sm font-bold text-gray-500",children:"Bar"}),e.jsx(s,{variant:"bar",color:"primary"})]})]})};var b,N,j;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: "spinner",
    color: "primary",
    size: "md"
  }
}`,...(j=(N=c.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var w,S,$;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: "dots",
    color: "secondary",
    size: "md"
  }
}`,...($=(S=d.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};var T,L,I;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: "pulse",
    color: "danger",
    size: "lg"
  }
}`,...(I=(L=p.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};var z,C,V;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <div className="w-[300px]">
      <ITLoader {...args} />
    </div>,
  args: {
    variant: "bar",
    color: "success",
    size: "md"
  }
}`,...(V=(C=m.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var _,D,k;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <div className="flex gap-4 items-center">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map(color => <ITLoader key={color} {...args} color={color} />)}
    </div>,
  args: {
    variant: "spinner",
    size: "md"
  }
}`,...(k=(D=u.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var A,q,B;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-8 items-center">
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
}`,...(B=(q=g.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};const H=["Spinner","Dots","Pulse","Bar","AllColors","AllVariants"];export{u as AllColors,g as AllVariants,m as Bar,d as Dots,p as Pulse,c as Spinner,H as __namedExportsOrder,G as default};
