import{K as v,j as r,r as c}from"./iframe-B5RMobo9.js";const _={title:"Components/Form Elements/ITSelect",component:v,parameters:{layout:"centered"},argTypes:{disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"}}},s=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"},{value:"option4",label:"Option 4"}],l=e=>{const[W,E]=c.useState(e.value||""),[D,O]=c.useState(!1);return r.jsx("div",{className:"w-[300px]",children:r.jsx(v,{...e,value:W,onChange:T=>E(T.target.value),onBlur:()=>O(!0),touched:D})})},o={render:e=>r.jsx(l,{...e}),args:{name:"select",options:s,placeholder:"Select an option"}},t={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Select Label",options:s,placeholder:"Select an option"}},a={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Select with Error",options:s,placeholder:"Select an option",error:"This field is required",touched:!0}},n={render:e=>r.jsx(l,{...e}),args:{name:"select",label:"Disabled Select",options:s,placeholder:"Select an option",disabled:!0}};var p,i,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    options: options,
    placeholder: "Select an option"
  }
}`,...(d=(i=o.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var u,m,S;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select Label",
    options: options,
    placeholder: "Select an option"
  }
}`,...(S=(m=t.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var b,g,h;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select with Error",
    options: options,
    placeholder: "Select an option",
    error: "This field is required",
    touched: true // Force touched to show error immediately
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var x,j,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Disabled Select",
    options: options,
    placeholder: "Select an option",
    disabled: true
  }
}`,...(f=(j=n.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};const y=["Default","WithLabel","WithError","Disabled"],L=Object.freeze(Object.defineProperty({__proto__:null,Default:o,Disabled:n,WithError:a,WithLabel:t,__namedExportsOrder:y,default:_},Symbol.toStringTag,{value:"Module"}));export{L as S};
