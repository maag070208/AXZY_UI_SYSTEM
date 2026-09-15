import{x as s,r as g,j as o}from"./iframe-B5RMobo9.js";const v={title:"Components/Inputs/ITSlider",component:s},e={render:()=>{const[t,n]=g.useState(50);return o.jsx(s,{value:t,onChange:n,min:0,max:100,label:"Volume"})}},a={render:()=>{const[t,n]=g.useState(3);return o.jsx(s,{value:t,onChange:n,min:1,max:10,step:1,label:"Items per page"})}},r={render:()=>o.jsx(s,{value:40,onChange:()=>{},disabled:!0,label:"Disabled"})};var l,u,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(50);
    return <ITSlider value={val} onChange={setVal} min={0} max={100} label="Volume" />;
  }
}`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var c,m,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(3);
    return <ITSlider value={val} onChange={setVal} min={1} max={10} step={1} label="Items per page" />;
  }
}`,...(i=(m=a.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var p,S,b;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <ITSlider value={40} onChange={() => {}} disabled label="Disabled" />
}`,...(b=(S=r.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};const x=["Default","WithRange","Disabled"],I=Object.freeze(Object.defineProperty({__proto__:null,Default:e,Disabled:r,WithRange:a,__namedExportsOrder:x,default:v},Symbol.toStringTag,{value:"Module"}));export{I as S};
