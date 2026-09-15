import{I as n,j as t,F as y}from"./iframe-B5RMobo9.js";const C={title:"Components/Data Display/ITAvatar",component:n},a={args:{src:"https://i.pravatar.cc/150?u=test",alt:"User",size:"md"}},s={args:{initials:"JD",size:"md",color:"bg-primary-500"}},r={args:{initials:"AG",size:"lg",badge:t.jsx(y,{className:"text-emerald-500 text-[10px]"})}},i={render:()=>t.jsx("div",{className:"flex items-end gap-4",children:["xs","sm","md","lg","xl"].map(e=>t.jsx(n,{initials:"A",size:e},e))})},o={name:"Con color calculado en runtime",parameters:{docs:{description:{story:"Cuando el color se calcula dinámicamente (por ejemplo, un hash por usuario o etiqueta), pasa un valor de color real en vez de una clase de Tailwind. Una clase de Tailwind arbitraria solo se ve si ya existe en el CSS pre-compilado de esta librería; un color inline siempre se aplica."}}},render:()=>t.jsx("div",{className:"flex items-center gap-4",children:["#3b82f6","#a855f7","#059669","#f59e0b","#ec4899"].map(e=>t.jsx(n,{initials:"JD",size:"md",color:e},e))})};var l,c,d;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    src: "https://i.pravatar.cc/150?u=test",
    alt: "User",
    size: "md"
  }
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,p,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    initials: "JD",
    size: "md",
    color: "bg-primary-500"
  }
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,x,v;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    initials: "AG",
    size: "lg",
    badge: <FaCircle className="text-emerald-500 text-[10px]" />
  }
}`,...(v=(x=r.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var h,b,z;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(s => <ITAvatar key={s} initials="A" size={s} />)}
    </div>
}`,...(z=(b=i.parameters)==null?void 0:b.docs)==null?void 0:z.source}}};var S,f,j;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Con color calculado en runtime",
  parameters: {
    docs: {
      description: {
        story: "Cuando el color se calcula dinámicamente (por ejemplo, un hash por usuario o etiqueta), pasa un valor de color real en vez de una clase de Tailwind. Una clase de Tailwind arbitraria solo se ve si ya existe en el CSS pre-compilado de esta librería; un color inline siempre se aplica."
      }
    }
  },
  render: () => <div className="flex items-center gap-4">
      {["#3b82f6", "#a855f7", "#059669", "#f59e0b", "#ec4899"].map(hex => <ITAvatar key={hex} initials="JD" size="md" color={hex} />)}
    </div>
}`,...(j=(f=o.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};const I=["WithImage","WithInitials","WithBadge","Sizes","WithRawColor"],A=Object.freeze(Object.defineProperty({__proto__:null,Sizes:i,WithBadge:r,WithImage:a,WithInitials:s,WithRawColor:o,__namedExportsOrder:I,default:C},Symbol.toStringTag,{value:"Module"}));export{A as S};
