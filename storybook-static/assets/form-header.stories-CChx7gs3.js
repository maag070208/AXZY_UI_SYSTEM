import{G as d,j as e}from"./iframe-B5RMobo9.js";const h={title:"Components/Feedback/ITFormHeader",component:d,parameters:{layout:"centered"},argTypes:{title:{control:"text",description:"The title displayed in the header"},onClose:{control:!1,description:"Optional close button handler"},className:{control:"text",description:"Additional CSS classes"}}},s={args:{title:"Form Header"},render:r=>e.jsx("div",{className:"w-80",children:e.jsx(d,{...r})})},a={args:{title:"Editable Form"},render:r=>e.jsx("div",{className:"w-80",children:e.jsx(d,{...r,onClose:()=>alert("Close clicked")})})},t={args:{title:"Confirmación de Auditoría de Expediente Clínico"},render:r=>e.jsx("div",{className:"w-80",children:e.jsx(d,{...r})})},o={args:{title:"Edit"},render:r=>e.jsx("div",{className:"w-80",children:e.jsx(d,{...r})})};var i,l,c;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    title: 'Form Header'
  },
  render: args => <div className="w-80">
      <ITFormHeader {...args} />
    </div>
}`,...(c=(l=s.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var n,m,p;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    title: 'Editable Form'
  },
  render: args => <div className="w-80">
      <ITFormHeader {...args} onClose={() => alert('Close clicked')} />
    </div>
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,u,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: 'Confirmación de Auditoría de Expediente Clínico'
  },
  render: args => <div className="w-80">
      <ITFormHeader {...args} />
    </div>
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var v,C,T;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: 'Edit'
  },
  render: args => <div className="w-80">
      <ITFormHeader {...args} />
    </div>
}`,...(T=(C=o.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};const j=["Default","WithClose","LongTitle","ShortTitle"],F=Object.freeze(Object.defineProperty({__proto__:null,Default:s,LongTitle:t,ShortTitle:o,WithClose:a,__namedExportsOrder:j,default:h},Symbol.toStringTag,{value:"Module"}));export{F as S};
