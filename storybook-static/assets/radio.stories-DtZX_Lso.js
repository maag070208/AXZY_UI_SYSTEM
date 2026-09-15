import{q as t,r as c,j as m}from"./iframe-B5RMobo9.js";const d={title:"Components/Inputs/ITRadioGroup",component:t},e={render:()=>{const[n,o]=c.useState("option1");return m.jsx(t,{name:"example",value:n,onChange:o,options:[{value:"option1",label:"Opción 1"},{value:"option2",label:"Opción 2"},{value:"option3",label:"Opción 3"}]})}},a={render:()=>{const[n,o]=c.useState("sm");return m.jsx(t,{name:"size",value:n,onChange:o,direction:"row",options:[{value:"sm",label:"Chico"},{value:"md",label:"Mediano"},{value:"lg",label:"Grande"}]})}};var l,r,s;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("option1");
    return <ITRadioGroup name="example" value={val} onChange={setVal} options={[{
      value: "option1",
      label: "Opción 1"
    }, {
      value: "option2",
      label: "Opción 2"
    }, {
      value: "option3",
      label: "Opción 3"
    }]} />;
  }
}`,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var i,p,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState("sm");
    return <ITRadioGroup name="size" value={val} onChange={setVal} direction="row" options={[{
      value: "sm",
      label: "Chico"
    }, {
      value: "md",
      label: "Mediano"
    }, {
      value: "lg",
      label: "Grande"
    }]} />;
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const v=["Default","Row"],g=Object.freeze(Object.defineProperty({__proto__:null,Default:e,Row:a,__namedExportsOrder:v,default:d},Symbol.toStringTag,{value:"Module"}));export{g as S};
