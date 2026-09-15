import{y as s,j as e}from"./iframe-B5RMobo9.js";const I={title:"Components/Layout & Navigation/ITText",component:s,parameters:{layout:"centered"},argTypes:{as:{control:"select",options:["p","span","div","h1","h2","h3","h4","h5","h6","small","strong","em","label"],description:"HTML element to render"},children:{control:"text",description:"Text content"},muted:{control:"boolean",description:"Apply muted text color"},className:{control:"text",description:"Additional CSS classes"}}},a={args:{as:"p",children:"This is a paragraph of text rendered via ITText.",className:"text-base"}},t={render:()=>e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{as:"h1",className:"text-4xl font-bold",children:"Heading 1"}),e.jsx(s,{as:"h2",className:"text-3xl font-bold",children:"Heading 2"}),e.jsx(s,{as:"h3",className:"text-2xl font-semibold",children:"Heading 3"}),e.jsx(s,{as:"h4",className:"text-xl font-semibold",children:"Heading 4"}),e.jsx(s,{as:"h5",className:"text-lg font-medium",children:"Heading 5"}),e.jsx(s,{as:"h6",className:"text-base font-medium",children:"Heading 6"})]})},n={args:{as:"p",children:"This text appears muted / secondary.",muted:!0,className:"text-sm"}},r={render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{as:"p",children:["This is ",e.jsx(s,{as:"strong",className:"font-bold",children:"bold"}),","," ",e.jsx(s,{as:"em",className:"italic",children:"italic"}),", and"," ",e.jsx(s,{as:"small",className:"text-xs",children:"small"})," text."]}),e.jsxs(s,{as:"p",children:["A ",e.jsx(s,{as:"span",className:"text-primary-600 font-mono",children:"span"})," can be used for inline styling."]})]})};var l,o,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    as: 'p',
    children: 'This is a paragraph of text rendered via ITText.',
    className: 'text-base'
  }
}`,...(c=(o=a.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var i,d,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">
      <ITText as="h1" className="text-4xl font-bold">Heading 1</ITText>
      <ITText as="h2" className="text-3xl font-bold">Heading 2</ITText>
      <ITText as="h3" className="text-2xl font-semibold">Heading 3</ITText>
      <ITText as="h4" className="text-xl font-semibold">Heading 4</ITText>
      <ITText as="h5" className="text-lg font-medium">Heading 5</ITText>
      <ITText as="h6" className="text-base font-medium">Heading 6</ITText>
    </div>
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var x,T,p;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    as: 'p',
    children: 'This text appears muted / secondary.',
    muted: true,
    className: 'text-sm'
  }
}`,...(p=(T=n.parameters)==null?void 0:T.docs)==null?void 0:p.source}}};var h,g,u;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <ITText as="p">
        This is <ITText as="strong" className="font-bold">bold</ITText>,{' '}
        <ITText as="em" className="italic">italic</ITText>, and{' '}
        <ITText as="small" className="text-xs">small</ITText> text.
      </ITText>
      <ITText as="p">
        A <ITText as="span" className="text-primary-600 font-mono">span</ITText> can be used for inline styling.
      </ITText>
    </div>
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const N=["Paragraph","Headings","Muted","InlineElements"],b=Object.freeze(Object.defineProperty({__proto__:null,Headings:t,InlineElements:r,Muted:n,Paragraph:a,__namedExportsOrder:N,default:I},Symbol.toStringTag,{value:"Module"}));export{b as S};
