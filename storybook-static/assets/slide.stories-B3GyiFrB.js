import{w as a,j as e,r as I}from"./iframe-B5RMobo9.js";const _={title:"Components/Form Elements/ITSlideToggle",component:a,parameters:{layout:"centered"},argTypes:{activeColor:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},isOn:{control:"boolean"},initialState:{control:"boolean"}}},r={args:{activeColor:"success",size:"md"}},l={args:{initialState:!0,activeColor:"primary"}},D=s=>{const[t,O]=I.useState(!1);return e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(a,{...s,isOn:t,onToggle:O}),e.jsxs("span",{className:"text-sm font-medium text-gray-500",children:["External State: ",t?"ON":"OFF"]})]})},n={render:s=>e.jsx(D,{...s}),args:{activeColor:"info",size:"lg"}},i={render:s=>e.jsxs("div",{className:"flex flex-col gap-6 items-center",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-16 text-sm text-gray-500 font-bold",children:"Small"}),e.jsx(a,{...s,size:"sm",initialState:!0})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-16 text-sm text-gray-500 font-bold",children:"Medium"}),e.jsx(a,{...s,size:"md",initialState:!0})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-16 text-sm text-gray-500 font-bold",children:"Large"}),e.jsx(a,{...s,size:"lg",initialState:!0})]})]}),args:{activeColor:"primary"}},o={render:s=>e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"Off"}),e.jsx(a,{...s,initialState:!1})]}),e.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"On"}),e.jsx(a,{...s,initialState:!0})]})]}),args:{disabled:!0}},c={render:s=>e.jsx("div",{className:"flex flex-col gap-4",children:["primary","secondary","success","danger","warning","info","purple"].map(t=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-24 text-sm text-gray-500 font-bold capitalize",children:t}),e.jsx(a,{...s,activeColor:t,initialState:!0})]},t))})};var d,m,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    activeColor: "success",
    size: "md"
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,x,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    initialState: true,
    activeColor: "primary"
  }
}`,...(f=(x=l.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var u,S,v;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <ControlledSlideWrapper {...args} />,
  args: {
    activeColor: "info",
    size: "lg"
  }
}`,...(v=(S=n.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var N,j,y;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6 items-center">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-gray-500 font-bold">Small</span>
        <ITSlideToggle {...args} size="sm" initialState={true} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-gray-500 font-bold">Medium</span>
        <ITSlideToggle {...args} size="md" initialState={true} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-gray-500 font-bold">Large</span>
        <ITSlideToggle {...args} size="lg" initialState={true} />
      </div>
    </div>,
  args: {
    activeColor: "primary"
  }
}`,...(y=(j=i.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var C,b,h;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <div className="flex gap-8">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-gray-500">Off</span>
        <ITSlideToggle {...args} initialState={false} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-gray-500">On</span>
        <ITSlideToggle {...args} initialState={true} />
      </div>
    </div>,
  args: {
    disabled: true
  }
}`,...(h=(b=o.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var T,z,w;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map(col => <div key={col} className="flex items-center gap-4">
          <span className="w-24 text-sm text-gray-500 font-bold capitalize">{col}</span>
          <ITSlideToggle {...args} activeColor={col} initialState={true} />
        </div>)}
    </div>
}`,...(w=(z=c.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};const E=["Default","CheckedUncontrolled","Controlled","Sizes","Disabled","Colors"],F=Object.freeze(Object.defineProperty({__proto__:null,CheckedUncontrolled:l,Colors:c,Controlled:n,Default:r,Disabled:o,Sizes:i,__namedExportsOrder:E,default:_},Symbol.toStringTag,{value:"Module"}));export{F as S};
