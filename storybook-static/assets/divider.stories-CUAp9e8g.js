import{b as t,j as e}from"./iframe-BUyFEAH8.js";import{I as u}from"./stack-DCw82gtv.js";import{I as S}from"./flex-BtJQ6ORA.js";import"./preload-helper-C1FmrZbK.js";const T={title:"Components/Layout/ITDivider",component:t,tags:["autodocs"]},s={args:{orientation:"horizontal"}},a={decorators:[x=>e.jsxs(S,{gap:3,className:"h-12",children:[e.jsx("span",{children:"Left"}),e.jsx(x,{}),e.jsx("span",{children:"Right"})]})],args:{orientation:"vertical"}},r={render:()=>e.jsxs(u,{spacing:3,children:[e.jsx("div",{className:"p-3 bg-slate-50 rounded-lg text-sm",children:"Sección 1"}),e.jsx(t,{}),e.jsx("div",{className:"p-3 bg-slate-50 rounded-lg text-sm",children:"Sección 2"}),e.jsx(t,{}),e.jsx("div",{className:"p-3 bg-slate-50 rounded-lg text-sm",children:"Sección 3"})]})};var n,o,c;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    orientation: "horizontal"
  }
}`,...(c=(o=s.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var i,d,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  decorators: [Story => <ITFlex gap={3} className="h-12"><span>Left</span><Story /><span>Right</span></ITFlex>],
  args: {
    orientation: "vertical"
  }
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,p,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <ITStack spacing={3}>
      <div className="p-3 bg-slate-50 rounded-lg text-sm">Sección 1</div>
      <ITDivider />
      <div className="p-3 bg-slate-50 rounded-lg text-sm">Sección 2</div>
      <ITDivider />
      <div className="p-3 bg-slate-50 rounded-lg text-sm">Sección 3</div>
    </ITStack>
}`,...(g=(p=r.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const N=["Horizontal","Vertical","InStack"];export{s as Horizontal,r as InStack,a as Vertical,N as __namedExportsOrder,T as default};
