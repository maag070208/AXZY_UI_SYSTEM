import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as Q}from"./input-wneKBxxc.js";import{e as A,f as _,g as O}from"./index-hWgMQIRJ.js";import"./clsx-B-dksMZM.js";import"./iframe-B9rAFiN_.js";import"./preload-helper-C1FmrZbK.js";import"./theme-Cu8onXxY.js";const M={title:"Components/Form Elements/ITInput",component:Q,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:"select",options:["text","password","number","email","textarea"]},disabled:{control:"boolean"},error:{control:"text"}}},a={args:{name:"default-input",placeholder:"Type something..."}},r={args:{name:"labeled-input",label:"Username",placeholder:"Enter your username"}},s={args:{name:"icon-input",label:"Email",type:"email",placeholder:"example@mail.com",iconLeft:e.jsx(A,{className:"text-gray-400"})}},t={args:{name:"search-input",label:"Search",placeholder:"Search...",iconRight:e.jsx("button",{onClick:()=>alert("Search clicked!"),className:"text-gray-500 hover:text-blue-500 transition-colors",children:e.jsx(_,{})})}},o={args:{name:"password-input",label:"Password",type:"password",placeholder:"••••••••",iconLeft:e.jsx(O,{className:"text-gray-400"})}},n={args:{name:"error-input",label:"Email",value:"invalid-email",touched:!0,error:"Please enter a valid email address",iconLeft:e.jsx(A,{className:"text-gray-400"})}},l={args:{name:"disabled-input",label:"Disabled Input",value:"Cannot edit this",disabled:!0}},c={args:{name:"textarea",label:"Description",type:"textarea",placeholder:"Write a detailed description...",rows:4}},i={args:{name:"number-input",label:"Quantity",type:"number",placeholder:"0",min:0,max:100}};var m,p,d;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    name: 'default-input',
    placeholder: 'Type something...'
  }
}`,...(d=(p=a.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,b,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    name: 'labeled-input',
    label: 'Username',
    placeholder: 'Enter your username'
  }
}`,...(g=(b=r.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var h,x,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    name: 'icon-input',
    label: 'Email',
    type: 'email',
    placeholder: 'example@mail.com',
    iconLeft: <FaEnvelope className="text-gray-400" />
  }
}`,...(y=(x=s.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var f,S,E;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    name: 'search-input',
    label: 'Search',
    placeholder: 'Search...',
    iconRight: <button onClick={() => alert('Search clicked!')} className="text-gray-500 hover:text-blue-500 transition-colors">
        <FaUser />
      </button>
  }
}`,...(E=(S=t.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var v,I,w;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    name: 'password-input',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    iconLeft: <FaLock className="text-gray-400" />
  }
}`,...(w=(I=o.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var L,N,k;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    name: 'error-input',
    label: 'Email',
    value: 'invalid-email',
    touched: true,
    error: 'Please enter a valid email address',
    iconLeft: <FaEnvelope className="text-gray-400" />
  }
}`,...(k=(N=n.parameters)==null?void 0:N.docs)==null?void 0:k.source}}};var D,F,W;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    name: 'disabled-input',
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true
  }
}`,...(W=(F=l.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var j,C,T;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    name: 'textarea',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Write a detailed description...',
    rows: 4
  }
}`,...(T=(C=c.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var P,U,R;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    name: 'number-input',
    label: 'Quantity',
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100
  }
}`,...(R=(U=i.parameters)==null?void 0:U.docs)==null?void 0:R.source}}};const V=["Default","WithLabel","WithIcons","ClickableIcons","Password","WithError","Disabled","TextArea","NumberInput"];export{t as ClickableIcons,a as Default,l as Disabled,i as NumberInput,o as Password,c as TextArea,n as WithError,s as WithIcons,r as WithLabel,V as __namedExportsOrder,M as default};
