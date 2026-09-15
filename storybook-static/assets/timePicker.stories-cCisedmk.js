import{j as r,r as m}from"./iframe-B5RMobo9.js";import{I as H}from"./timePicker-C8-Z5vK2.js";const N={title:"Components/Form Elements/ITTimePicker",component:H,parameters:{layout:"centered"},argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]},size:{control:"select",options:["small","medium","large"]},variant:{control:"select",options:["primary","secondary"]},disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"}},decorators:[e=>r.jsx("div",{className:"w-[300px]",children:r.jsx(e,{})})]},a=e=>{const[M,C]=m.useState(e.value||""),[D,E]=m.useState(!1);return r.jsx(H,{...e,value:M,touched:D,onChange:c=>{C(c.target.value),e.onChange&&e.onChange(c)},onBlur:c=>{E(!0),e.onBlur&&e.onBlur(c)}})},s={render:e=>r.jsx(a,{...e}),args:{name:"default_time",label:"Select Time",placeholder:"HH:MM",color:"primary"}},l={render:e=>r.jsx(a,{...e}),args:{name:"predefined_time",label:"Meeting Time",value:"14:30",color:"success"}},i={render:e=>r.jsx(a,{...e}),args:{name:"disabled_time",label:"Unavailable Time",value:"09:00",disabled:!0}},n={render:e=>r.jsx(a,{...e}),args:{name:"validation_time",label:"End Time",value:"25:99",touched:!0,error:"Custom error message if passed explicitly"}},o={render:e=>r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsx(a,{...e,size:"sm",label:"Small TimePicker",name:"sm"}),r.jsx(a,{...e,size:"md",label:"Medium TimePicker",name:"md"}),r.jsx(a,{...e,size:"lg",label:"Large TimePicker",name:"lg"})]}),args:{value:"10:15"}},t={render:e=>r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsx(a,{...e,color:"primary",label:"Primary Theme Highlight",name:"c1",value:"12:00"}),r.jsx(a,{...e,color:"danger",label:"Danger Theme Highlight",name:"c2",value:"13:15"}),r.jsx(a,{...e,color:"purple",label:"Purple Theme Highlight",name:"c3",value:"14:45"})]})};var d,p,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "default_time",
    label: "Select Time",
    placeholder: "HH:MM",
    color: "primary"
  }
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,T,b;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "predefined_time",
    label: "Meeting Time",
    value: "14:30",
    color: "success"
  }
}`,...(b=(T=l.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var v,h,x;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "disabled_time",
    label: "Unavailable Time",
    value: "09:00",
    disabled: true
  }
}`,...(x=(h=i.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var f,P,j;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "validation_time",
    label: "End Time",
    value: "25:99",
    // Invalid time string to trigger intrinsic validation
    touched: true,
    // Force validation display
    error: "Custom error message if passed explicitly"
  }
}`,...(j=(P=n.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var k,S,y;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} size="sm" label="Small TimePicker" name="sm" />
      <TimePickerWrapper {...args} size="md" label="Medium TimePicker" name="md" />
      <TimePickerWrapper {...args} size="lg" label="Large TimePicker" name="lg" />
    </div>,
  args: {
    value: "10:15"
  }
}`,...(y=(S=o.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var _,W,z;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} color="primary" label="Primary Theme Highlight" name="c1" value="12:00" />
      <TimePickerWrapper {...args} color="danger" label="Danger Theme Highlight" name="c2" value="13:15" />
      <TimePickerWrapper {...args} color="purple" label="Purple Theme Highlight" name="c3" value="14:45" />
    </div>
}`,...(z=(W=t.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};const V=["Default","WithPredefinedValue","Disabled","Validation","Sizes","Colors"],O=Object.freeze(Object.defineProperty({__proto__:null,Colors:t,Default:s,Disabled:i,Sizes:o,Validation:n,WithPredefinedValue:l,__namedExportsOrder:V,default:N},Symbol.toStringTag,{value:"Module"}));export{O as S};
