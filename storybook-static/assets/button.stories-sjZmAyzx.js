import{I as f,j as e}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const ne={title:"Components/Actions/ITButton",component:f,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","purple","info"],description:"The semantic color of the button"},variant:{control:"select",options:["filled","outlined","raised","rounded","text","raised-text","icon-only","link"],description:"The visual style variant"},size:{control:"select",options:["small","medium","large"],description:"Button size (padding/font)"},label:{control:"text"},disabled:{control:"boolean"}}},o={args:{label:"Filled Button",color:"primary",variant:"filled"}},s={args:{label:"Outlined Button",color:"primary",variant:"outlined"}},t={args:{label:"Raised Button",color:"primary",variant:"raised"}},l={args:{label:"Rounded Button",color:"success",variant:"rounded"}},i={args:{label:"Text Button",color:"info",variant:"text"}},c={args:{label:"Raised Text",color:"warning",variant:"raised-text"}},d={args:{label:"Guardar",color:"primary",variant:"filled",icon:e.jsx("span",{style:{fontSize:"1em"},children:"💾"})}},p={args:{color:"danger",variant:"icon-only",children:e.jsx("span",{style:{fontSize:"1.2em"},children:"★"}),ariaLabel:"Favorite"}},m={args:{label:"Link Button",color:"primary",variant:"link"}},u={render:y=>e.jsx("div",{className:"flex flex-wrap gap-4",children:["primary","secondary","success","danger","warning","purple","info"].map(r=>e.jsx(f,{...y,color:r,label:r.charAt(0).toUpperCase()+r.slice(1)},r))}),args:{variant:"filled"}},g={args:{label:"Disabled Button",disabled:!0,color:"primary",variant:"filled"}},x={render:y=>{const r=["primary","secondary","success","danger","warning","purple","info"],ee=["filled","outlined","raised","rounded","text","raised-text","icon-only","link"];return e.jsx("div",{className:"flex flex-col gap-8",children:ee.map(a=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h3",{className:"text-sm font-bold uppercase text-gray-400",children:a}),e.jsx("div",{className:"flex flex-wrap gap-4 items-center",children:r.map(n=>e.jsx(f,{...y,color:n,variant:a,label:a==="icon-only"?void 0:n.charAt(0).toUpperCase()+n.slice(1),ariaLabel:a==="icon-only"?n:void 0,children:a==="icon-only"?e.jsx("span",{style:{fontSize:"1.2em"},children:"★"}):void 0},`${a}-${n}`))})]},a))})},args:{}};var v,b,h;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Filled Button',
    color: 'primary',
    variant: 'filled'
  }
}`,...(h=(b=o.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var B,S,T;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Outlined Button',
    color: 'primary',
    variant: 'outlined'
  }
}`,...(T=(S=s.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var R,j,k;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Raised Button',
    color: 'primary',
    variant: 'raised'
  }
}`,...(k=(j=t.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var w,I,N;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Rounded Button',
    color: 'success',
    variant: 'rounded'
  }
}`,...(N=(I=l.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var A,C,z;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Text Button',
    color: 'info',
    variant: 'text'
  }
}`,...(z=(C=i.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var L,O,F;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Raised Text',
    color: 'warning',
    variant: 'raised-text'
  }
}`,...(F=(O=c.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var D,U,$;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Guardar',
    color: 'primary',
    variant: 'filled',
    icon: <span style={{
      fontSize: '1em'
    }}>💾</span>
  }
}`,...($=(U=d.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var E,G,W;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    color: 'danger',
    variant: 'icon-only',
    children: <span style={{
      fontSize: '1.2em'
    }}>★</span>,
    ariaLabel: 'Favorite'
  }
}`,...(W=(G=p.parameters)==null?void 0:G.docs)==null?void 0:W.source}}};var _,q,H;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Link Button',
    color: 'primary',
    variant: 'link'
  }
}`,...(H=(q=m.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};var J,K,M;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap gap-4">
      {['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'].map(color => <ITButton key={color} {...args} color={color as any} label={color.charAt(0).toUpperCase() + color.slice(1)} />)}
    </div>,
  args: {
    variant: 'filled'
  }
}`,...(M=(K=u.parameters)==null?void 0:K.docs)==null?void 0:M.source}}};var P,Q,V;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Button',
    disabled: true,
    color: 'primary',
    variant: 'filled'
  }
}`,...(V=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var X,Y,Z;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const oe=["Filled","Outlined","Raised","Rounded","Text","RaisedText","WithIcon","IconOnly","Link","AllColors","Disabled","AllCombinations"];export{u as AllColors,x as AllCombinations,g as Disabled,o as Filled,p as IconOnly,m as Link,s as Outlined,t as Raised,c as RaisedText,l as Rounded,i as Text,d as WithIcon,oe as __namedExportsOrder,ne as default};
