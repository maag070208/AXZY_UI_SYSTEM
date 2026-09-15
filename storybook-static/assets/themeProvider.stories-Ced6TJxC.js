import{ae as x,j as e,C as b,y as T,b as t}from"./iframe-B5RMobo9.js";const f={title:"Components/System/ITThemeProvider",component:x,parameters:{layout:"centered"},argTypes:{theme:{control:!1,description:"Custom theme palette to override defaults"},children:{control:!1,description:"App content wrapped by the theme context"},showFab:{control:"boolean",description:"Show the floating action button to open the theme designer"}}},o=()=>e.jsx("div",{className:"p-8 space-y-4",children:e.jsx(b,{title:"Theme Demo",className:"max-w-sm",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(T,{as:"p",className:"text-sm text-slate-600 dark:text-slate-300",children:"This content is wrapped in ITThemeProvider and uses the current theme."}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(t,{label:"Primary",color:"primary"}),e.jsx(t,{label:"Success",color:"success"}),e.jsx(t,{label:"Danger",color:"danger"})]})]})})}),s={args:{children:e.jsx(o,{}),showFab:!1}},r={args:{theme:{primary:"#8b5cf6",success:"#22c55e"},children:e.jsx(o,{}),showFab:!1}},a={args:{children:e.jsx(o,{}),showFab:!0}};var n,c,l;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    children: <ThemedContent />,
    showFab: false
  }
}`,...(l=(c=s.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var m,i,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    theme: {
      primary: '#8b5cf6',
      success: '#22c55e'
    },
    children: <ThemedContent />,
    showFab: false
  }
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var h,p,u;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: <ThemedContent />,
    showFab: true
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const g=["Default","CustomPrimaryColor","WithThemeFab"],y=Object.freeze(Object.defineProperty({__proto__:null,CustomPrimaryColor:r,Default:s,WithThemeFab:a,__namedExportsOrder:g,default:f},Symbol.toStringTag,{value:"Module"}));export{y as S};
