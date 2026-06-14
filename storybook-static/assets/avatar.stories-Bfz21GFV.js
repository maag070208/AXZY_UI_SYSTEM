import{j as e,h as W,c as d,S as D}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const _={xs:{container:"w-6 h-6",text:"text-[10px]"},sm:{container:"w-8 h-8",text:"text-xs"},md:{container:"w-10 h-10",text:"text-sm"},lg:{container:"w-12 h-12",text:"text-base"},xl:{container:"w-16 h-16",text:"text-xl"}};function l({src:s,alt:o="",initials:z,size:I="md",color:N="bg-primary-500",className:w,badge:c,onClick:n}){const{container:A,text:q}=_[I];return e.jsxs("div",{className:d("relative inline-flex items-center justify-center rounded-full flex-shrink-0",A,w),onClick:n,role:n?"button":void 0,tabIndex:n?0:void 0,children:[s?e.jsx("img",{src:s,alt:o,className:"w-full h-full rounded-full object-cover",onError:S=>{S.currentTarget.style.display="none"}}):e.jsx("div",{className:d("w-full h-full rounded-full flex items-center justify-center text-white font-semibold",q,N),children:e.jsx(W,{as:"span",children:z||o.charAt(0).toUpperCase()||"?"})}),c&&e.jsx("div",{className:"absolute -bottom-0.5 -right-0.5",children:c})]})}l.__docgenInfo={description:"",methods:[],displayName:"ITAvatar",props:{src:{required:!1,tsType:{name:"string"},description:""},alt:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},initials:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:'"xs" | "sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"md"',computed:!1}},color:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"bg-primary-500"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},badge:{required:!1,tsType:{name:"ReactNode"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const U={title:"Components/Data Display/ITAvatar",component:l,tags:["autodocs"]},a={args:{src:"https://i.pravatar.cc/150?u=test",alt:"User",size:"md"}},t={args:{initials:"JD",size:"md",color:"bg-primary-500"}},r={args:{initials:"AG",size:"lg",badge:e.jsx(D,{className:"text-emerald-500 text-[10px]"})}},i={render:()=>e.jsx("div",{className:"flex items-end gap-4",children:["xs","sm","md","lg","xl"].map(s=>e.jsx(l,{initials:"A",size:s},s))})};var m,p,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?u=test",
    alt: "User",
    size: "md"
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var x,g,f;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    initials: "JD",
    size: "md",
    color: "bg-primary-500"
  }
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,v,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    initials: "AG",
    size: "lg",
    badge: <FaCircle className="text-emerald-500 text-[10px]" />
  }
}`,...(y=(v=r.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var T,b,j;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(s => <ITAvatar key={s} initials="A" size={s} />)}
    </div>
}`,...(j=(b=i.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const V=["WithImage","WithInitials","WithBadge","Sizes"];export{i as Sizes,r as WithBadge,a as WithImage,t as WithInitials,V as __namedExportsOrder,U as default};
