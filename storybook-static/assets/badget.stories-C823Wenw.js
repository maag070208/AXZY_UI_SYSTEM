import{a as f,j as e}from"./iframe-B5RMobo9.js";const b={title:"Components/Data Display/ITBadge",component:f,parameters:{layout:"centered"},argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","purple","info"]},variant:{control:"select",options:["filled","outlined"]},size:{control:"select",options:["small","medium","large"]}}},a={args:{label:"Filled Badge",color:"primary",variant:"filled"}},r={args:{label:"Outlined Badge",color:"primary",variant:"outlined"}},s={render:x=>{const v=["primary","secondary","success","danger","warning","purple","info"],y=["filled","outlined"];return e.jsx("div",{className:"flex flex-col gap-8",children:y.map(l=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h3",{className:"text-sm font-bold uppercase text-gray-400",children:l}),e.jsx("div",{className:"flex flex-wrap gap-4 items-center",children:v.map(o=>e.jsx(f,{...x,color:o,variant:l,label:o.charAt(0).toUpperCase()+o.slice(1)},`${l}-${o}`))})]},l))})},args:{}};var t,n,c;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    label: 'Filled Badge',
    color: 'primary',
    variant: 'filled'
  }
}`,...(c=(n=a.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var i,d,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Outlined Badge',
    color: 'primary',
    variant: 'outlined'
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,g,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(u=(g=s.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const h=["Filled","Outlined","AllCombinations"],N=Object.freeze(Object.defineProperty({__proto__:null,AllCombinations:s,Filled:a,Outlined:r,__namedExportsOrder:h,default:b},Symbol.toStringTag,{value:"Module"}));export{N as S};
