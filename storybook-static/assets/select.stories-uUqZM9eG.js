import{j as r,r as c}from"./iframe-BUyFEAH8.js";import{I as j}from"./select-ZaK3Plt5.js";import"./preload-helper-C1FmrZbK.js";const y={title:"Components/Form Elements/ITSelect",component:j,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"}}},n=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}],l=e=>{const[v,E]=c.useState(e.value||""),[D,T]=c.useState(!1);return r.jsx("div",{className:"w-[300px]",children:r.jsx(j,{...e,value:v,onChange:O=>E(O.target.value),onBlur:()=>T(!0),touched:D})})},o={render:e=>r.jsx(l,{...e}),args:{name:"select",options:n,placeholder:"Select an option"}},a={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Select Label",options:n,placeholder:"Select an option"}},t={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Select with Error",options:n,placeholder:"Select an option",error:"This field is required",touched:!0}},s={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Disabled Select",options:n,placeholder:"Select an option",disabled:!0}};var p,i,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    options: options,
    placeholder: "Select an option"
  }
}`,...(d=(i=o.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var u,m,S;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select Label",
    options: options,
    placeholder: "Select an option"
  }
}`,...(S=(m=a.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var h,b,g;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select with Error",
    options: options,
    placeholder: "Select an option",
    error: "This field is required",
    touched: true // Force touched to show error immediately
  }
}`,...(g=(b=t.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var x,W,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Disabled Select",
    options: options,
    placeholder: "Select an option",
    disabled: true
  }
}`,...(f=(W=s.parameters)==null?void 0:W.docs)==null?void 0:f.source}}};const I=["Default","WithLabel","WithError","Disabled"];export{o as Default,s as Disabled,t as WithError,a as WithLabel,I as __namedExportsOrder,y as default};
