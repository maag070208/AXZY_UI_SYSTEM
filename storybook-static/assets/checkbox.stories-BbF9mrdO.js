import{c as l,r as C,j as c,d as V}from"./iframe-B5RMobo9.js";const _={title:"Components/Inputs/ITCheckbox",component:l},s={render:()=>{const[a,o]=C.useState(!1);return c.jsx(l,{checked:a,onChange:o,label:"Acepto términos"})}},n={args:{indeterminate:!0,label:"Selección parcial"}},r={args:{checked:!0,disabled:!0,label:"Opción bloqueada"}},t={render:()=>{const[a,o]=C.useState({a:!0,b:!1,c:!1}),d=Object.values(a).every(Boolean),O=Object.values(a).some(Boolean)&&!d;return c.jsxs(V,{spacing:2,children:[c.jsx(l,{checked:d,indeterminate:O,onChange:e=>o({a:e,b:e,c:e}),label:"Seleccionar todo"}),Object.entries(a).map(([e,f])=>c.jsx(l,{checked:f,onChange:I=>o(T=>({...T,[e]:I})),label:`Opción ${e.toUpperCase()}`},e))]})}};var i,p,u;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(false);
    return <ITCheckbox checked={val} onChange={setVal} label="Acepto términos" />;
  }
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,b,v;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    label: "Selección parcial"
  }
}`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var h,g,k;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    checked: true,
    disabled: true,
    label: "Opción bloqueada"
  }
}`,...(k=(g=r.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var S,j,x;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const [vals, setVals] = useState<Record<string, boolean>>({
      a: true,
      b: false,
      c: false
    });
    const all = Object.values(vals).every(Boolean);
    const some = Object.values(vals).some(Boolean) && !all;
    return <ITStack spacing={2}>
        <ITCheckbox checked={all} indeterminate={some} onChange={v => setVals({
        a: v,
        b: v,
        c: v
      })} label="Seleccionar todo" />
        {Object.entries(vals).map(([k, v]) => <ITCheckbox key={k} checked={v} onChange={val => setVals(p => ({
        ...p,
        [k]: val
      }))} label={\`Opción \${k.toUpperCase()}\`} />)}
      </ITStack>;
  }
}`,...(x=(j=t.parameters)==null?void 0:j.docs)==null?void 0:x.source}}};const y=["Default","Indeterminate","Disabled","Group"],B=Object.freeze(Object.defineProperty({__proto__:null,Default:s,Disabled:r,Group:t,Indeterminate:n,__namedExportsOrder:y,default:_},Symbol.toStringTag,{value:"Module"}));export{B as S};
