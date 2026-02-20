import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as f}from"./badget-CCCmPiT5.js";import"./clsx-B-dksMZM.js";import"./theme-Cu8onXxY.js";import"./iframe-B9rAFiN_.js";import"./preload-helper-C1FmrZbK.js";const C={title:"Components/Data Display/ITBadge",component:f,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","purple","info"]},variant:{control:"select",options:["filled","outlined"]},size:{control:"select",options:["small","medium","large"]}}},s={args:{label:"Filled Badge",color:"primary",variant:"filled"}},o={args:{label:"Outlined Badge",color:"primary",variant:"outlined"}},l={render:x=>{const v=["primary","secondary","success","danger","warning","purple","info"],y=["filled","outlined"];return e.jsx("div",{className:"flex flex-col gap-8",children:y.map(a=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h3",{className:"text-sm font-bold uppercase text-gray-400",children:a}),e.jsx("div",{className:"flex flex-wrap gap-4 items-center",children:v.map(r=>e.jsx(f,{...x,color:r,variant:a,label:r.charAt(0).toUpperCase()+r.slice(1)},`${a}-${r}`))})]},a))})},args:{}};var t,n,i;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    label: 'Filled Badge',
    color: 'primary',
    variant: 'filled'
  }
}`,...(i=(n=s.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var c,d,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Outlined Badge',
    color: 'primary',
    variant: 'outlined'
  }
}`,...(p=(d=o.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,g,u;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'];
    const variants = ['filled', 'outlined'];
    return <div className="flex flex-col gap-8">
        {variants.map(variant => <div key={variant} className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase text-gray-400">{variant}</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {colors.map(color => <ITBadget key={\`\${variant}-\${color}\`} {...args} color={color as any} variant={variant as any} label={color.charAt(0).toUpperCase() + color.slice(1)} />)}
            </div>
          </div>)}
      </div>;
  },
  args: {}
}`,...(u=(g=l.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const O=["Filled","Outlined","AllCombinations"];export{l as AllCombinations,s as Filled,o as Outlined,O as __namedExportsOrder,C as default};
