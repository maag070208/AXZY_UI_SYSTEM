import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as y}from"./button-B3GxPMjY.js";import"./clsx-B-dksMZM.js";import"./iframe-Dr0sZusW.js";import"./preload-helper-C1FmrZbK.js";import"./theme-CuplGK4O.js";const oe={title:"Components/Actions/ITButton",component:y,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","purple","info"],description:"The semantic color of the button"},variant:{control:"select",options:["filled","outlined","raised","rounded","text","raised-text","icon-only","link"],description:"The visual style variant"},size:{control:"select",options:["small","medium","large"],description:"Button size (padding/font)"},label:{control:"text"},disabled:{control:"boolean"}}},n={args:{label:"Filled Button",color:"primary",variant:"filled"}},s={args:{label:"Outlined Button",color:"primary",variant:"outlined"}},t={args:{label:"Raised Button",color:"primary",variant:"raised"}},l={args:{label:"Rounded Button",color:"success",variant:"rounded"}},i={args:{label:"Text Button",color:"info",variant:"text"}},c={args:{label:"Raised Text",color:"warning",variant:"raised-text"}},d={args:{color:"danger",variant:"icon-only",children:e.jsx("span",{style:{fontSize:"1.2em"},children:"★"}),ariaLabel:"Favorite"}},p={args:{label:"Link Button",color:"primary",variant:"link"}},m={render:x=>e.jsx("div",{className:"flex flex-wrap gap-4",children:["primary","secondary","success","danger","warning","purple","info"].map(a=>e.jsx(y,{...x,color:a,label:a.charAt(0).toUpperCase()+a.slice(1)},a))}),args:{variant:"filled"}},u={args:{label:"Disabled Button",disabled:!0,color:"primary",variant:"filled"}},g={render:x=>{const a=["primary","secondary","success","danger","warning","purple","info"],W=["filled","outlined","raised","rounded","text","raised-text","icon-only","link"];return e.jsx("div",{className:"flex flex-col gap-8",children:W.map(r=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h3",{className:"text-sm font-bold uppercase text-gray-400",children:r}),e.jsx("div",{className:"flex flex-wrap gap-4 items-center",children:a.map(o=>e.jsx(y,{...x,color:o,variant:r,label:r==="icon-only"?void 0:o.charAt(0).toUpperCase()+o.slice(1),ariaLabel:r==="icon-only"?o:void 0,children:r==="icon-only"?e.jsx("span",{style:{fontSize:"1.2em"},children:"★"}):void 0},`${r}-${o}`))})]},r))})},args:{}};var f,v,b;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Filled Button',
    color: 'primary',
    variant: 'filled'
  }
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var h,B,S;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Outlined Button',
    color: 'primary',
    variant: 'outlined'
  }
}`,...(S=(B=s.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var T,R,k;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Raised Button',
    color: 'primary',
    variant: 'raised'
  }
}`,...(k=(R=t.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var j,w,N;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Rounded Button',
    color: 'success',
    variant: 'rounded'
  }
}`,...(N=(w=l.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var A,C,I;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Text Button',
    color: 'info',
    variant: 'text'
  }
}`,...(I=(C=i.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var L,O,z;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Raised Text',
    color: 'warning',
    variant: 'raised-text'
  }
}`,...(z=(O=c.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var F,D,U;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    color: 'danger',
    variant: 'icon-only',
    children: <span style={{
      fontSize: '1.2em'
    }}>★</span>,
    // Simple inline icon representation
    ariaLabel: 'Favorite'
  }
}`,...(U=(D=d.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var $,E,_;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: 'Link Button',
    color: 'primary',
    variant: 'link'
  }
}`,...(_=(E=p.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var q,G,H;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap gap-4">
      {['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'].map(color => <ITButton key={color} {...args} color={color as any} label={color.charAt(0).toUpperCase() + color.slice(1)} />)}
    </div>,
  args: {
    variant: 'filled'
  }
}`,...(H=(G=m.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,K,M;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Button',
    disabled: true,
    color: 'primary',
    variant: 'filled'
  }
}`,...(M=(K=u.parameters)==null?void 0:K.docs)==null?void 0:M.source}}};var P,Q,V;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'];
    const variants = ['filled', 'outlined', 'raised', 'rounded', 'text', 'raised-text', 'icon-only', 'link'];
    return <div className="flex flex-col gap-8">
        {variants.map(variant => <div key={variant} className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase text-gray-400">{variant}</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {colors.map(color => <ITButton key={\`\${variant}-\${color}\`} {...args} color={color as any} variant={variant as any} label={variant === 'icon-only' ? undefined : color.charAt(0).toUpperCase() + color.slice(1)} ariaLabel={variant === 'icon-only' ? color : undefined}>
                  {variant === 'icon-only' ? <span style={{
              fontSize: '1.2em'
            }}>★</span> : undefined}
                </ITButton>)}
            </div>
          </div>)}
      </div>;
  },
  args: {}
}`,...(V=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};const ne=["Filled","Outlined","Raised","Rounded","Text","RaisedText","IconOnly","Link","AllColors","Disabled","AllCombinations"];export{m as AllColors,g as AllCombinations,u as Disabled,n as Filled,d as IconOnly,p as Link,s as Outlined,t as Raised,c as RaisedText,l as Rounded,i as Text,ne as __namedExportsOrder,oe as default};
