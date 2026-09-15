import{b as f,j as e}from"./iframe-B5RMobo9.js";const re={title:"Components/Actions/ITButton",component:f,parameters:{layout:"centered"},argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","purple","info"],description:"The semantic color of the button"},variant:{control:"select",options:["filled","outlined","raised","rounded","text","raised-text","icon-only","link"],description:"The visual style variant"},size:{control:"select",options:["small","medium","large"],description:"Button size (padding/font)"},label:{control:"text"},disabled:{control:"boolean"}}},o={args:{label:"Filled Button",color:"primary",variant:"filled"}},s={args:{label:"Outlined Button",color:"primary",variant:"outlined"}},t={args:{label:"Raised Button",color:"primary",variant:"raised"}},l={args:{label:"Rounded Button",color:"success",variant:"rounded"}},i={args:{label:"Text Button",color:"info",variant:"text"}},c={args:{label:"Raised Text",color:"warning",variant:"raised-text"}},d={args:{label:"Guardar",color:"primary",variant:"filled",icon:e.jsx("span",{style:{fontSize:"1em"},children:"💾"})}},p={args:{color:"danger",variant:"icon-only",children:e.jsx("span",{style:{fontSize:"1.2em"},children:"★"}),ariaLabel:"Favorite"}},m={args:{label:"Link Button",color:"primary",variant:"link"}},u={render:x=>e.jsx("div",{className:"flex flex-wrap gap-4",children:["primary","secondary","success","danger","warning","purple","info"].map(a=>e.jsx(f,{...x,color:a,label:a.charAt(0).toUpperCase()+a.slice(1)},a))}),args:{variant:"filled"}},g={args:{label:"Disabled Button",disabled:!0,color:"primary",variant:"filled"}},y={render:x=>{const a=["primary","secondary","success","danger","warning","purple","info"],ee=["filled","outlined","raised","rounded","text","raised-text","icon-only","link"];return e.jsx("div",{className:"flex flex-col gap-8",children:ee.map(r=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h3",{className:"text-sm font-bold uppercase text-gray-400",children:r}),e.jsx("div",{className:"flex flex-wrap gap-4 items-center",children:a.map(n=>e.jsx(f,{...x,color:n,variant:r,label:r==="icon-only"?void 0:n.charAt(0).toUpperCase()+n.slice(1),ariaLabel:r==="icon-only"?n:void 0,children:r==="icon-only"?e.jsx("span",{style:{fontSize:"1.2em"},children:"★"}):void 0},`${r}-${n}`))})]},r))})},args:{}};var v,b,h;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Filled Button',
    color: 'primary',
    variant: 'filled'
  }
}`,...(h=(b=o.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var S,B,T;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Outlined Button',
    color: 'primary',
    variant: 'outlined'
  }
}`,...(T=(B=s.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var j,R,k;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Raised Button',
    color: 'primary',
    variant: 'raised'
  }
}`,...(k=(R=t.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var w,N,z;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Rounded Button',
    color: 'success',
    variant: 'rounded'
  }
}`,...(z=(N=l.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var A,C,I;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Text Button',
    color: 'info',
    variant: 'text'
  }
}`,...(I=(C=i.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var O,L,F;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    label: 'Raised Text',
    color: 'warning',
    variant: 'raised-text'
  }
}`,...(F=(L=c.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var _,D,U;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Guardar',
    color: 'primary',
    variant: 'filled',
    icon: <span style={{
      fontSize: '1em'
    }}>💾</span>
  }
}`,...(U=(D=d.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var $,E,G;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    color: 'danger',
    variant: 'icon-only',
    children: <span style={{
      fontSize: '1.2em'
    }}>★</span>,
    ariaLabel: 'Favorite'
  }
}`,...(G=(E=p.parameters)==null?void 0:E.docs)==null?void 0:G.source}}};var W,M,P;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Link Button',
    color: 'primary',
    variant: 'link'
  }
}`,...(P=(M=m.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var q,H,J;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap gap-4">
      {['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'].map(color => <ITButton key={color} {...args} color={color as any} label={color.charAt(0).toUpperCase() + color.slice(1)} />)}
    </div>,
  args: {
    variant: 'filled'
  }
}`,...(J=(H=u.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,Q,V;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Button',
    disabled: true,
    color: 'primary',
    variant: 'filled'
  }
}`,...(V=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var X,Y,Z;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};const ae=["Filled","Outlined","Raised","Rounded","Text","RaisedText","WithIcon","IconOnly","Link","AllColors","Disabled","AllCombinations"],oe=Object.freeze(Object.defineProperty({__proto__:null,AllColors:u,AllCombinations:y,Disabled:g,Filled:o,IconOnly:p,Link:m,Outlined:s,Raised:t,RaisedText:c,Rounded:l,Text:i,WithIcon:d,__namedExportsOrder:ae,default:re},Symbol.toStringTag,{value:"Module"}));export{oe as S};
