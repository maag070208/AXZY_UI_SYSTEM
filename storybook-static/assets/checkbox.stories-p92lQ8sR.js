import{j as e,c as b,h as V,r as O}from"./iframe-BUyFEAH8.js";import{I as q}from"./stack-DCw82gtv.js";import"./preload-helper-C1FmrZbK.js";function l({checked:a=!1,onChange:r,label:n,disabled:o=!1,indeterminate:s=!1,className:u,name:m}){return e.jsxs("label",{className:b("inline-flex items-center gap-2 cursor-pointer select-none",o&&"opacity-50 cursor-not-allowed",u),children:[e.jsx("input",{type:"checkbox",name:m,checked:a,onChange:t=>r==null?void 0:r(t.target.checked),disabled:o,ref:t=>{t&&(t.indeterminate=s)},className:"peer sr-only"}),e.jsxs("div",{className:b("w-4 h-4 rounded border-2 flex items-center justify-center transition-all",a?"bg-primary-500 border-primary-500":"border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800",!o&&"peer-focus:ring-2 peer-focus:ring-primary-200"),children:[a&&e.jsx("svg",{className:"w-2.5 h-2.5 text-white",viewBox:"0 0 12 12",fill:"none",children:e.jsx("path",{d:"M2 6L5 9L10 3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),s&&!a&&e.jsx("div",{className:"w-2 h-0.5 bg-slate-500 rounded"})]}),n&&e.jsx(V,{as:"span",className:"text-sm text-slate-700 dark:text-slate-300",children:n})]})}l.__docgenInfo={description:"",methods:[],displayName:"ITCheckbox",props:{checked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},indeterminate:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""}}};const D={title:"Components/Inputs/ITCheckbox",component:l,tags:["autodocs"]},c={render:()=>{const[a,r]=O.useState(!1);return e.jsx(l,{checked:a,onChange:r,label:"Acepto términos"})}},i={args:{indeterminate:!0,label:"Selección parcial"}},d={args:{checked:!0,disabled:!0,label:"Opción bloqueada"}},p={render:()=>{const[a,r]=O.useState({a:!0,b:!1,c:!1}),n=Object.values(a).every(Boolean),o=Object.values(a).some(Boolean)&&!n;return e.jsxs(q,{spacing:2,children:[e.jsx(l,{checked:n,indeterminate:o,onChange:s=>r({a:s,b:s,c:s}),label:"Seleccionar todo"}),Object.entries(a).map(([s,u])=>e.jsx(l,{checked:u,onChange:m=>r(t=>({...t,[s]:m})),label:`Opción ${s.toUpperCase()}`},s))]})}};var f,h,x;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(false);
    return <ITCheckbox checked={val} onChange={setVal} label="Acepto términos" />;
  }
}`,...(x=(h=c.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var g,k,v;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    indeterminate: true,
    label: "Selección parcial"
  }
}`,...(v=(k=i.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var j,y,T;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    checked: true,
    disabled: true,
    label: "Opción bloqueada"
  }
}`,...(T=(y=d.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var I,S,C;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(C=(S=p.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};const L=["Default","Indeterminate","Disabled","Group"];export{c as Default,d as Disabled,p as Group,i as Indeterminate,L as __namedExportsOrder,D as default};
