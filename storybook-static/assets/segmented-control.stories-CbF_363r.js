import{m as o,r,j as n,n as b,o as h}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const V={title:"Components/Inputs/ITSegmentedControl",component:o,tags:["autodocs"]},s={render:()=>{const[e,a]=r.useState("day");return n.jsx(o,{options:[{value:"day",label:"Día"},{value:"week",label:"Semana"},{value:"month",label:"Mes"}],value:e,onChange:a})}},t={render:()=>{const[e,a]=r.useState("list");return n.jsx(o,{options:[{value:"list",label:"Lista",icon:n.jsx(b,{size:10})},{value:"grid",label:"Grid",icon:n.jsx(h,{size:10})}],value:e,onChange:a})}},l={render:()=>{const[e,a]=r.useState("sm");return n.jsx(o,{size:"sm",options:[{value:"sm",label:"Chico"},{value:"md",label:"Mediano"}],value:e,onChange:a})}};var u,i,c;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("day");
    return <ITSegmentedControl options={[{
      value: "day",
      label: "Día"
    }, {
      value: "week",
      label: "Semana"
    }, {
      value: "month",
      label: "Mes"
    }]} value={val} onChange={setVal} />;
  }
}`,...(c=(i=s.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var m,d,v;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("list");
    return <ITSegmentedControl options={[{
      value: "list",
      label: "Lista",
      icon: <FaList size={10} />
    }, {
      value: "grid",
      label: "Grid",
      icon: <FaTh size={10} />
    }]} value={val} onChange={setVal} />;
  }
}`,...(v=(d=t.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};var p,S,g;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("sm");
    return <ITSegmentedControl size="sm" options={[{
      value: "sm",
      label: "Chico"
    }, {
      value: "md",
      label: "Mediano"
    }]} value={val} onChange={setVal} />;
  }
}`,...(g=(S=l.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};const I=["Default","WithIcons","Small"];export{s as Default,l as Small,t as WithIcons,I as __namedExportsOrder,V as default};
