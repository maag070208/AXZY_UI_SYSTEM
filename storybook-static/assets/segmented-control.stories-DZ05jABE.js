import{s as o,r,j as l,t as b,u as h}from"./iframe-B5RMobo9.js";const C={title:"Components/Inputs/ITSegmentedControl",component:o},n={render:()=>{const[e,a]=r.useState("day");return l.jsx(o,{options:[{value:"day",label:"Día"},{value:"week",label:"Semana"},{value:"month",label:"Mes"}],value:e,onChange:a})}},t={render:()=>{const[e,a]=r.useState("list");return l.jsx(o,{options:[{value:"list",label:"Lista",icon:l.jsx(b,{size:10})},{value:"grid",label:"Grid",icon:l.jsx(h,{size:10})}],value:e,onChange:a})}},s={render:()=>{const[e,a]=r.useState("sm");return l.jsx(o,{size:"sm",options:[{value:"sm",label:"Chico"},{value:"md",label:"Mediano"}],value:e,onChange:a})}};var u,i,c;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var m,d,v;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(v=(d=t.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};var p,S,g;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(g=(S=s.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};const x=["Default","WithIcons","Small"],V=Object.freeze(Object.defineProperty({__proto__:null,Default:n,Small:s,WithIcons:t,__namedExportsOrder:x,default:C},Symbol.toStringTag,{value:"Module"}));export{V as S};
