import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{I as j}from"./select-DKI9rr9_.js";import{r as c}from"./iframe-Dr0sZusW.js";import"./clsx-B-dksMZM.js";import"./index-CJju9sOb.js";import"./theme-CuplGK4O.js";import"./preload-helper-C1FmrZbK.js";const _={title:"Components/Form Elements/ITSelect",component:j,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"}}},n=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}],l=e=>{const[v,E]=c.useState(e.value||""),[D,T]=c.useState(!1);return r.jsx("div",{className:"w-[300px]",children:r.jsx(j,{...e,value:v,onChange:O=>E(O.target.value),onBlur:()=>T(!0),touched:D})})},o={render:e=>r.jsx(l,{...e}),args:{name:"select",options:n,placeholder:"Select an option"}},t={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Select Label",options:n,placeholder:"Select an option"}},a={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Select with Error",options:n,placeholder:"Select an option",error:"This field is required",touched:!0}},s={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Disabled Select",options:n,placeholder:"Select an option",disabled:!0}};var p,i,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    options: options,
    placeholder: "Select an option"
  }
}`,...(d=(i=o.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,u,S;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select Label",
    options: options,
    placeholder: "Select an option"
  }
}`,...(S=(u=t.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var h,b,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select with Error",
    options: options,
    placeholder: "Select an option",
    error: "This field is required",
    touched: true // Force touched to show error immediately
  }
}`,...(g=(b=a.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var x,f,W;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Disabled Select",
    options: options,
    placeholder: "Select an option",
    disabled: true
  }
}`,...(W=(f=s.parameters)==null?void 0:f.docs)==null?void 0:W.source}}};const B=["Default","WithLabel","WithError","Disabled"];export{o as Default,s as Disabled,a as WithError,t as WithLabel,B as __namedExportsOrder,_ as default};
