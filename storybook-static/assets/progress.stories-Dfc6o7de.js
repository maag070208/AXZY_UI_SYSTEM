import{p as r,j as e,r as j,b as I}from"./iframe-B5RMobo9.js";const T={title:"Components/Feedback/ITProgress",component:r},s={render:()=>{const[v,g]=j.useState(0);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{value:v}),e.jsx(I,{label:"+10%",onClick:()=>g(x=>Math.min(x+10,100))})]})}},a={args:{variant:"indeterminate"}},o={render:()=>e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{value:70,color:"primary"}),e.jsx(r,{value:70,color:"success"}),e.jsx(r,{value:70,color:"danger"}),e.jsx(r,{value:70,color:"warning"})]})};var n,t,c;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(0);
    return <div className="space-y-3">
        <ITProgress value={val} />
        <ITButton label="+10%" onClick={() => setVal(v => Math.min(v + 10, 100))} />
      </div>;
  }
}`,...(c=(t=s.parameters)==null?void 0:t.docs)==null?void 0:c.source}}};var l,i,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: "indeterminate"
  }
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var d,u,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">
      <ITProgress value={70} color="primary" />
      <ITProgress value={70} color="success" />
      <ITProgress value={70} color="danger" />
      <ITProgress value={70} color="warning" />
    </div>
}`,...(p=(u=o.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const S=["Determinate","Indeterminate","Colors"],P=Object.freeze(Object.defineProperty({__proto__:null,Colors:o,Determinate:s,Indeterminate:a,__namedExportsOrder:S,default:T},Symbol.toStringTag,{value:"Module"}));export{P as S};
