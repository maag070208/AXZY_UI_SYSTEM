import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{c as y}from"./clsx-B-dksMZM.js";import{r as l}from"./iframe-B9rAFiN_.js";import{t as fe}from"./index-hWgMQIRJ.js";import{I as xe}from"./input-wneKBxxc.js";import{I as he}from"./button-CjKvNsZ3.js";import{t as I}from"./theme-Cu8onXxY.js";import"./preload-helper-C1FmrZbK.js";function V({name:a,value:c,label:N,placeholder:M="HH:MM",onChange:m,onBlur:n,required:re,touched:ae,error:te,disabled:x,className:se,size:le="medium",variant:oe="primary",color:h="primary"}){const[v,w]=l.useState(!1),[i,b]=l.useState(c||""),[ne,d]=l.useState(!0),E=l.useRef(null),u=l.useRef(null),p=l.useRef(null),z=h in I.colors,_=z?I.colors[h][50]:"#f3f4f6",W=z?I.colors[h][100]:"#e5e7eb";l.useEffect(()=>{b(c||"")},[c]),l.useEffect(()=>{const e=t=>{E.current&&!E.current.contains(t.target)&&w(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]);const T=e=>/^([01]\d|2[0-3]):([0-5]\d)$/.test(e),g=T(i)?i.split(":")[0]:null,f=T(i)?i.split(":")[1]:null;l.useEffect(()=>{v&&setTimeout(()=>{if(u.current&&g){const e=u.current.querySelector(`[data-value="${g}"]`);e&&(u.current.scrollTop=e.offsetTop-u.current.clientHeight/2+e.clientHeight/2)}if(p.current&&f){const e=p.current.querySelector(`[data-value="${f}"]`);e&&(p.current.scrollTop=e.offsetTop-p.current.clientHeight/2+e.clientHeight/2)}},50)},[v,g,f]);const ie=e=>{let t=e.target.value.replace(/\D/g,"");t.length>4&&(t=t.slice(0,4)),t.length>=3&&(t=`${t.slice(0,2)}:${t.slice(2)}`),b(t),T(t)?(d(!0),m({target:{name:a,value:t}})):d(!1)},ce=()=>{if(!T(i)){d(!1),n({target:{name:a,value:c}});return}d(!0),n({target:{name:a,value:i}})},de=e=>{const s=`${e}:${f||"00"}`;b(s),m({target:{name:a,value:s}}),d(!0)},me=e=>{const s=`${g||"00"}:${e}`;b(s),m({target:{name:a,value:s}}),d(!0)},ue=()=>{w(!1)},pe=Array.from({length:24},(e,t)=>t.toString().padStart(2,"0")),ge=Array.from({length:60},(e,t)=>t.toString().padStart(2,"0"));return r.jsxs("div",{ref:E,className:y("relative w-full",se),children:[r.jsx(xe,{name:a,label:N,placeholder:M,type:"text",value:i,onChange:ie,onBlur:ce,maxLength:5,required:re,disabled:x,variant:oe,size:le,touched:ae,error:ne?te:"Hora inválida",iconRight:r.jsx(fe,{onClick:()=>!x&&w(!v),className:y("cursor-pointer transition-colors",x?"text-slate-400 cursor-not-allowed":"text-slate-900 hover:text-slate-600")})}),v&&!x&&r.jsxs("div",{className:"absolute z-[9999] bg-white border border-gray-100 shadow-xl rounded-xl mt-2 w-64 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top",children:[r.jsxs("div",{className:"flex bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider",children:[r.jsx("div",{className:"flex-1 text-center py-2 border-r border-gray-100",children:"Horas"}),r.jsx("div",{className:"flex-1 text-center py-2",children:"Minutos"})]}),r.jsxs("div",{className:"flex h-56 relative bg-white",children:[r.jsx("div",{ref:u,className:"flex-1 overflow-y-auto no-scrollbar border-r border-gray-50 scroll-smooth relative",children:r.jsx("div",{className:"py-2",children:pe.map(e=>{const t=g===e;return r.jsx("div",{"data-value":e,className:y("text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",t?"text-slate-900 shadow-sm":"text-slate-600 hover:text-slate-900"),style:{backgroundColor:t?W:void 0},onMouseEnter:s=>{t||(s.currentTarget.style.backgroundColor=_)},onMouseLeave:s=>{t||(s.currentTarget.style.backgroundColor="transparent")},onClick:()=>de(e),children:e},e)})})}),r.jsx("div",{ref:p,className:"flex-1 overflow-y-auto no-scrollbar scroll-smooth relative",children:r.jsx("div",{className:"py-2",children:ge.map(e=>{const t=f===e;return r.jsx("div",{"data-value":e,className:y("text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",t?"text-slate-900 shadow-sm":"text-slate-600 hover:text-slate-900"),style:{backgroundColor:t?W:void 0},onMouseEnter:s=>{t||(s.currentTarget.style.backgroundColor=_)},onMouseLeave:s=>{t||(s.currentTarget.style.backgroundColor="transparent")},onClick:()=>me(e),children:e},e)})})}),r.jsx("div",{className:"absolute top-1/2 left-0 right-0 h-10 -mt-5 bg-black/5 pointer-events-none border-y border-black/10 z-10"})]}),r.jsx("div",{className:"p-3 bg-gray-50 border-t border-gray-100 flex justify-end",children:r.jsx(he,{variant:"solid",color:h,size:"small",onClick:ue,children:"Aceptar"})})]})]})}V.__docgenInfo={description:"",methods:[],displayName:"ITTimePicker",props:{placeholder:{defaultValue:{value:'"HH:MM"',computed:!1},required:!1},size:{defaultValue:{value:'"medium"',computed:!1},required:!1},variant:{defaultValue:{value:'"primary"',computed:!1},required:!1},color:{defaultValue:{value:'"primary"',computed:!1},required:!1}}};const Ce={title:"Components/Form Elements/ITTimePicker",component:V,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:"select",options:["primary","secondary","success","danger","warning","info","purple"]},size:{control:"select",options:["small","medium","large"]},variant:{control:"select",options:["primary","secondary"]},disabled:{control:"boolean"},required:{control:"boolean"},error:{control:"text"}},decorators:[a=>r.jsx("div",{className:"w-[300px]",children:r.jsx(a,{})})]},o=a=>{const[c,N]=l.useState(a.value||""),[M,m]=l.useState(!1);return r.jsx(V,{...a,value:c,touched:M,onChange:n=>{N(n.target.value),a.onChange&&a.onChange(n)},onBlur:n=>{m(!0),a.onBlur&&a.onBlur(n)}})},j={render:a=>r.jsx(o,{...a}),args:{name:"default_time",label:"Select Time",placeholder:"HH:MM",color:"primary"}},k={render:a=>r.jsx(o,{...a}),args:{name:"predefined_time",label:"Meeting Time",value:"14:30",color:"success"}},S={render:a=>r.jsx(o,{...a}),args:{name:"disabled_time",label:"Unavailable Time",value:"09:00",disabled:!0}},P={render:a=>r.jsx(o,{...a}),args:{name:"validation_time",label:"End Time",value:"25:99",touched:!0,error:"Custom error message if passed explicitly"}},C={render:a=>r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsx(o,{...a,size:"small",label:"Small TimePicker",name:"sm"}),r.jsx(o,{...a,size:"medium",label:"Medium TimePicker",name:"md"}),r.jsx(o,{...a,size:"large",label:"Large TimePicker",name:"lg"})]}),args:{value:"10:15"}},H={render:a=>r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsx(o,{...a,color:"primary",label:"Primary Theme Highlight",name:"c1",value:"12:00"}),r.jsx(o,{...a,color:"danger",label:"Danger Theme Highlight",name:"c2",value:"13:15"}),r.jsx(o,{...a,color:"purple",label:"Purple Theme Highlight",name:"c3",value:"14:45"})]})};var L,$,R;j.parameters={...j.parameters,docs:{...(L=j.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "default_time",
    label: "Select Time",
    placeholder: "HH:MM",
    color: "primary"
  }
}`,...(R=($=j.parameters)==null?void 0:$.docs)==null?void 0:R.source}}};var q,D,B;k.parameters={...k.parameters,docs:{...(q=k.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "predefined_time",
    label: "Meeting Time",
    value: "14:30",
    color: "success"
  }
}`,...(B=(D=k.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var O,A,F;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "disabled_time",
    label: "Unavailable Time",
    value: "09:00",
    disabled: true
  }
}`,...(F=(A=S.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var U,G,J;P.parameters={...P.parameters,docs:{...(U=P.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => <TimePickerWrapper {...args} />,
  args: {
    name: "validation_time",
    label: "End Time",
    value: "25:99",
    // Invalid time string to trigger intrinsic validation
    touched: true,
    // Force validation display
    error: "Custom error message if passed explicitly"
  }
}`,...(J=(G=P.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;C.parameters={...C.parameters,docs:{...(K=C.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} size="small" label="Small TimePicker" name="sm" />
      <TimePickerWrapper {...args} size="medium" label="Medium TimePicker" name="md" />
      <TimePickerWrapper {...args} size="large" label="Large TimePicker" name="lg" />
    </div>,
  args: {
    value: "10:15"
  }
}`,...(X=(Q=C.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;H.parameters={...H.parameters,docs:{...(Y=H.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} color="primary" label="Primary Theme Highlight" name="c1" value="12:00" />
      <TimePickerWrapper {...args} color="danger" label="Danger Theme Highlight" name="c2" value="13:15" />
      <TimePickerWrapper {...args} color="purple" label="Purple Theme Highlight" name="c3" value="14:45" />
    </div>
}`,...(ee=(Z=H.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const He=["Default","WithPredefinedValue","Disabled","Validation","Sizes","Colors"];export{H as Colors,j as Default,S as Disabled,C as Sizes,P as Validation,k as WithPredefinedValue,He as __namedExportsOrder,Ce as default};
