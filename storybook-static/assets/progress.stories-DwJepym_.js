import{j as e,c as i,r as j,I as w}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const P={primary:"bg-primary-500",secondary:"bg-secondary-500",success:"bg-success-500",danger:"bg-danger-500",warning:"bg-warning-500",info:"bg-info-500",purple:"bg-purple-500",error:"bg-danger-500",gray:"bg-secondary-500"},N={sm:"h-1",md:"h-2",lg:"h-3"};function a({value:s=0,max:n=100,variant:r="determinate",color:x="primary",size:T="md",className:b,style:h}){const I=Math.min(Math.max(s/n*100,0),100);return e.jsx("div",{className:i("w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden",N[T],b),style:h,role:"progressbar","aria-valuenow":r==="determinate"?s:void 0,"aria-valuemax":n,children:e.jsx("div",{className:i("h-full rounded-full transition-all duration-500",P[x],r==="indeterminate"&&"animate-pulse w-1/2"),style:r==="determinate"?{width:`${I}%`}:void 0})})}a.__docgenInfo={description:"",methods:[],displayName:"ITProgress",props:{value:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:'"determinate" | "indeterminate"',elements:[{name:"literal",value:'"determinate"'},{name:"literal",value:'"indeterminate"'}]},description:"",defaultValue:{value:'"determinate"',computed:!1}},color:{required:!1,tsType:{name:"ColorsTypes"},description:"",defaultValue:{value:'"primary"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""}}};const C={title:"Components/Feedback/ITProgress",component:a,tags:["autodocs"]},t={render:()=>{const[s,n]=j.useState(0);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{value:s}),e.jsx(w,{label:"+10%",onClick:()=>n(r=>Math.min(r+10,100))})]})}},l={args:{variant:"indeterminate"}},o={render:()=>e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{value:70,color:"primary"}),e.jsx(a,{value:70,color:"success"}),e.jsx(a,{value:70,color:"danger"}),e.jsx(a,{value:70,color:"warning"})]})};var d,c,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(0);
    return <div className="space-y-3">
        <ITProgress value={val} />
        <ITButton label="+10%" onClick={() => setVal(v => Math.min(v + 10, 100))} />
      </div>;
  }
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,p,g;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: "indeterminate"
  }
}`,...(g=(p=l.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var v,f,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">
      <ITProgress value={70} color="primary" />
      <ITProgress value={70} color="success" />
      <ITProgress value={70} color="danger" />
      <ITProgress value={70} color="warning" />
    </div>
}`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const S=["Determinate","Indeterminate","Colors"];export{o as Colors,t as Determinate,l as Indeterminate,S as __namedExportsOrder,C as default};
