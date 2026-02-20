import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as h}from"./iframe-B9rAFiN_.js";import{c as N}from"./clsx-B-dksMZM.js";import{t as o}from"./theme-Cu8onXxY.js";import"./preload-helper-C1FmrZbK.js";function t({onToggle:s,isOn:a,initialState:g=!1,activeColor:f="success",inactiveColor:x="#9ca3af",disabled:v=!1,size:L="md",className:M=""}){const n=a!==void 0,[R,S]=h.useState(g);h.useEffect(()=>{n&&S(a)},[a,n]);const l=n?a:R,y=()=>{if(v)return;const r=!l;n||S(r),s&&s(r)},K=f in o.colors?o.colors[f][500]:f,B=x in o.colors?o.colors[x][400]:x,G=l?K:B,H={sm:{container:"w-10 h-5",knob:"w-3.5 h-3.5",translate:"translate-x-5"},md:{container:"w-14 h-7",knob:"w-5 h-5",translate:"translate-x-7"},lg:{container:"w-16 h-8",knob:"w-6 h-6",translate:"translate-x-8"}},{container:J,knob:P,translate:Q}=H[L];return e.jsx("div",{onClick:y,className:N("flex items-center rounded-full p-1 transition-colors duration-300",J,v?"opacity-50 cursor-not-allowed":"cursor-pointer",M),style:{backgroundColor:G},role:"switch","aria-checked":l,tabIndex:v?-1:0,onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),y())},children:e.jsx("div",{className:N("bg-white rounded-full shadow-md transform transition-transform duration-300 pointer-events-none",P,l?Q:"translate-x-0")})})}t.__docgenInfo={description:"Slide toggle switch component.\nSupports fully controlled (`isOn`) or uncontrolled (`initialState`) modes.",methods:[],displayName:"ITSlideToggle",props:{onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"value"}],return:{name:"void"}}},description:"Callback executed when the switch is toggled. Receives the new state."},isOn:{required:!1,tsType:{name:"boolean"},description:"Controlled state. Use this to completely control the component externally."},initialState:{required:!1,tsType:{name:"boolean"},description:`Initial state for uncontrolled usage.
Default: false`,defaultValue:{value:"false",computed:!1}},activeColor:{required:!1,tsType:{name:"string"},description:`Semantic theme color when activated (e.g., 'primary', 'success').
Default: 'success'`,defaultValue:{value:'"success"',computed:!1}},inactiveColor:{required:!1,tsType:{name:"string"},description:`Semantic theme color or hex when deactivated.
Default: '#9ca3af' (gray-400)`,defaultValue:{value:'"#9ca3af"',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the switch is disabled.",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:`Size of the switch: sm, md, lg.
Default: md`,defaultValue:{value:'"md"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional container classes.",defaultValue:{value:'""',computed:!1}}}};const re={title:"Components/Form Elements/ITSlideToggle",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{activeColor:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]},size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},isOn:{control:"boolean"},initialState:{control:"boolean"}}},i={args:{activeColor:"success",size:"md"}},c={args:{initialState:!0,activeColor:"primary"}},X=s=>{const[a,g]=h.useState(!1);return e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(t,{...s,isOn:a,onToggle:g}),e.jsxs("span",{className:"text-sm font-medium text-gray-500",children:["External State: ",a?"ON":"OFF"]})]})},d={render:s=>e.jsx(X,{...s}),args:{activeColor:"info",size:"lg"}},m={render:s=>e.jsxs("div",{className:"flex flex-col gap-6 items-center",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-16 text-sm text-gray-500 font-bold",children:"Small"}),e.jsx(t,{...s,size:"sm",initialState:!0})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-16 text-sm text-gray-500 font-bold",children:"Medium"}),e.jsx(t,{...s,size:"md",initialState:!0})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-16 text-sm text-gray-500 font-bold",children:"Large"}),e.jsx(t,{...s,size:"lg",initialState:!0})]})]}),args:{activeColor:"primary"}},p={render:s=>e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"Off"}),e.jsx(t,{...s,initialState:!1})]}),e.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"On"}),e.jsx(t,{...s,initialState:!0})]})]}),args:{disabled:!0}},u={render:s=>e.jsx("div",{className:"flex flex-col gap-4",children:["primary","secondary","success","danger","warning","info","purple"].map(a=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"w-24 text-sm text-gray-500 font-bold capitalize",children:a}),e.jsx(t,{...s,activeColor:a,initialState:!0})]},a))})};var w,T,C;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    activeColor: "success",
    size: "md"
  }
}`,...(C=(T=i.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var b,j,z;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    initialState: true,
    activeColor: "primary"
  }
}`,...(z=(j=c.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var I,k,O;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <ControlledSlideWrapper {...args} />,
  args: {
    activeColor: "info",
    size: "lg"
  }
}`,...(O=(k=d.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var D,q,E;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(E=(q=m.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var V,_,F;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(F=(_=p.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var U,W,A;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map(col => <div key={col} className="flex items-center gap-4">
          <span className="w-24 text-sm text-gray-500 font-bold capitalize">{col}</span>
          <ITSlideToggle {...args} activeColor={col} initialState={true} />
        </div>)}
    </div>
}`,...(A=(W=u.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};const ne=["Default","CheckedUncontrolled","Controlled","Sizes","Disabled","Colors"];export{c as CheckedUncontrolled,u as Colors,d as Controlled,i as Default,p as Disabled,m as Sizes,ne as __namedExportsOrder,re as default};
