import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{c as u}from"./clsx-B-dksMZM.js";import{t as B}from"./theme-BneCghHy.js";import"./iframe-BlebJggh.js";import"./preload-helper-C1FmrZbK.js";const S={small:"text-xs px-2 py-1",medium:"text-sm px-3 py-1.5",large:"text-base px-4 py-2"};function p({children:i,label:d,color:c="primary",size:o="medium",variant:r="filled",className:T}){const m=B.badge||{},e=m[c]||m.primary||{},j=()=>{const a={fontSize:e.fontSize,fontWeight:e.fontWeight,padding:e.padding,borderRadius:e.borderRadius,borderWidth:"1px",borderStyle:"solid",borderColor:"transparent",transition:"all 0.2s"};return r==="filled"?(a.backgroundColor=e.backgroundColor,a.color=e.color,a.borderColor=e.borderColor||"transparent"):r==="outlined"&&(a.backgroundColor="transparent",a.color=e.color,a.borderColor=e.color),a};return s.jsx("span",{className:u("inline-flex items-center justify-center",e.padding?"":S[o],T),style:j(),children:i||s.jsx("span",{className:u("font-semibold"),children:d})})}p.__docgenInfo={description:"",methods:[],displayName:"ITBadget",props:{label:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!1,tsType:{name:"ColorsTypes"},description:"",defaultValue:{value:'"primary"',computed:!1}},size:{required:!1,tsType:{name:"SizesTypes"},description:"",defaultValue:{value:'"medium"',computed:!1}},variant:{required:!1,tsType:{name:"unknown"},description:"",defaultValue:{value:'"filled"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const I={title:"Components/ITBadget",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","purple","info"]},variant:{control:"select",options:["filled","outlined"]},size:{control:"select",options:["small","medium","large"]}}},l={args:{label:"Filled Badge",color:"primary",variant:"filled"}},t={args:{label:"Outlined Badge",color:"primary",variant:"outlined"}},n={render:i=>{const d=["primary","secondary","success","danger","warning","purple","info"],c=["filled","outlined"];return s.jsx("div",{className:"flex flex-col gap-8",children:c.map(o=>s.jsxs("div",{className:"flex flex-col gap-2",children:[s.jsx("h3",{className:"text-sm font-bold uppercase text-gray-400",children:o}),s.jsx("div",{className:"flex flex-wrap gap-4 items-center",children:d.map(r=>s.jsx(p,{...i,color:r,variant:o,label:r.charAt(0).toUpperCase()+r.slice(1)},`${o}-${r}`))})]},o))})},args:{}};var f,g,y;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Filled Badge',
    color: 'primary',
    variant: 'filled'
  }
}`,...(y=(g=l.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var x,b,v;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Outlined Badge',
    color: 'primary',
    variant: 'outlined'
  }
}`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var h,N,C;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(C=(N=n.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};const O=["Filled","Outlined","AllCombinations"];export{n as AllCombinations,l as Filled,t as Outlined,O as __namedExportsOrder,I as default};
