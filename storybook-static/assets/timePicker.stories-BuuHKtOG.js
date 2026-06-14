import{j as r,r as t}from"./iframe-BUyFEAH8.js";import{I as z}from"./timePicker-Bio6tN6N.js";import"./preload-helper-C1FmrZbK.js";const B={title:"Components/Form Elements/ITTimePicker",component:z,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]},size:{control:"select",options:["small","medium","large"]},variant:{control:"select",options:["primary","secondary"]},disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"}},decorators:[e=>r.jsx("div",{className:"w-[300px]",children:r.jsx(e,{})})]},a=e=>{const[C,M]=t.useState(e.value||""),[D,E]=t.useState(!1);return r.jsx(z,{...e,value:C,touched:D,onChange:s=>{M(s.target.value),e.onChange&&e.onChange(s)},onBlur:s=>{E(!0),e.onBlur&&e.onBlur(s)}})},l={render:e=>r.jsx(a,{...e}),args:{name:"default_time",label:"Select Time",placeholder:"HH:MM",color:"primary"}},i={render:e=>r.jsx(a,{...e}),args:{name:"predefined_time",label:"Meeting Time",value:"14:30",color:"success"}},n={render:e=>r.jsx(a,{...e}),args:{name:"disabled_time",label:"Unavailable Time",value:"09:00",disabled:!0}},o={render:e=>r.jsx(a,{...e}),args:{name:"validation_time",label:"End Time",value:"25:99",touched:!0,error:"Custom error message if passed explicitly"}},m={render:e=>r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsx(a,{...e,size:"small",label:"Small TimePicker",name:"sm"}),r.jsx(a,{...e,size:"medium",label:"Medium TimePicker",name:"md"}),r.jsx(a,{...e,size:"large",label:"Large TimePicker",name:"lg"})]}),args:{value:"10:15"}},c={render:e=>r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsx(a,{...e,color:"primary",label:"Primary Theme Highlight",name:"c1",value:"12:00"}),r.jsx(a,{...e,color:"danger",label:"Danger Theme Highlight",name:"c2",value:"13:15"}),r.jsx(a,{...e,color:"purple",label:"Purple Theme Highlight",name:"c3",value:"14:45"})]})};var d,p,u;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "default_time",
    label: "Select Time",
    placeholder: "HH:MM",
    color: "primary"
  }
}`,...(u=(p=l.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,T,h;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "predefined_time",
    label: "Meeting Time",
    value: "14:30",
    color: "success"
  }
}`,...(h=(T=i.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var v,x,b;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "disabled_time",
    label: "Unavailable Time",
    value: "09:00",
    disabled: true
  }
}`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,P,k;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(k=(P=o.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var j,y,S;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} size="small" label="Small TimePicker" name="sm" />
      <TimePickerWrapper {...args} size="medium" label="Medium TimePicker" name="md" />
      <TimePickerWrapper {...args} size="large" label="Large TimePicker" name="lg" />
    </div>,
  args: {
    value: "10:15"
  }
}`,...(S=(y=m.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var W,H,_;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} color="primary" label="Primary Theme Highlight" name="c1" value="12:00" />
      <TimePickerWrapper {...args} color="danger" label="Danger Theme Highlight" name="c2" value="13:15" />
      <TimePickerWrapper {...args} color="purple" label="Purple Theme Highlight" name="c3" value="14:45" />
    </div>
}`,...(_=(H=c.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};const w=["Default","WithPredefinedValue","Disabled","Validation","Sizes","Colors"];export{c as Colors,l as Default,n as Disabled,m as Sizes,o as Validation,i as WithPredefinedValue,w as __namedExportsOrder,B as default};
