import{i as R,j as i,k as A,l as Q,m as O}from"./iframe-B5RMobo9.js";const z={title:"Components/Form Elements/ITInput",component:R,parameters:{layout:"centered"},argTypes:{type:{control:"select",options:["text","password","number","email","textarea"]},disabled:{control:"boolean"},error:{control:"text"}}},e={args:{name:"default-input",placeholder:"Type something..."}},a={args:{name:"labeled-input",label:"Username",placeholder:"Enter your username"}},r={args:{name:"icon-input",label:"Email",type:"email",placeholder:"example@mail.com",iconLeft:i.jsx(O,{className:"text-gray-400"})}},s={args:{name:"search-input",label:"Search",placeholder:"Search...",iconRight:i.jsx("button",{onClick:()=>alert("Search clicked!"),className:"text-gray-500 hover:text-blue-500 transition-colors",children:i.jsx(A,{})})}},t={args:{name:"password-input",label:"Password",type:"password",placeholder:"••••••••",iconLeft:i.jsx(Q,{className:"text-gray-400"})}},o={args:{name:"error-input",label:"Email",value:"invalid-email",touched:!0,error:"Please enter a valid email address",iconLeft:i.jsx(O,{className:"text-gray-400"})}},n={args:{name:"disabled-input",label:"Disabled Input",value:"Cannot edit this",disabled:!0}},l={args:{name:"textarea",label:"Description",type:"textarea",placeholder:"Write a detailed description...",rows:4}},c={args:{name:"number-input",label:"Quantity",type:"number",placeholder:"0",min:0,max:100}};var m,p,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    name: 'default-input',
    placeholder: 'Type something...'
  }
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,b,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    name: 'labeled-input',
    label: 'Username',
    placeholder: 'Enter your username'
  }
}`,...(g=(b=a.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var h,x,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    name: 'icon-input',
    label: 'Email',
    type: 'email',
    placeholder: 'example@mail.com',
    iconLeft: <FaEnvelope className="text-gray-400" />
  }
}`,...(y=(x=r.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var S,f,v;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    name: 'search-input',
    label: 'Search',
    placeholder: 'Search...',
    iconRight: <button onClick={() => alert('Search clicked!')} className="text-gray-500 hover:text-blue-500 transition-colors">
        <FaUser />
      </button>
  }
}`,...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var E,I,w;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    name: 'password-input',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    iconLeft: <FaLock className="text-gray-400" />
  }
}`,...(w=(I=t.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var L,N,j;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    name: 'error-input',
    label: 'Email',
    value: 'invalid-email',
    touched: true,
    error: 'Please enter a valid email address',
    iconLeft: <FaEnvelope className="text-gray-400" />
  }
}`,...(j=(N=o.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var k,D,F;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    name: 'disabled-input',
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true
  }
}`,...(F=(D=n.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var T,W,C;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    name: 'textarea',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Write a detailed description...',
    rows: 4
  }
}`,...(C=(W=l.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var P,_,U;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    name: 'number-input',
    label: 'Quantity',
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100
  }
}`,...(U=(_=c.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};const M=["Default","WithLabel","WithIcons","ClickableIcons","Password","WithError","Disabled","TextArea","NumberInput"],B=Object.freeze(Object.defineProperty({__proto__:null,ClickableIcons:s,Default:e,Disabled:n,NumberInput:c,Password:t,TextArea:l,WithError:o,WithIcons:r,WithLabel:a,__namedExportsOrder:M,default:z},Symbol.toStringTag,{value:"Module"}));export{B as S};
