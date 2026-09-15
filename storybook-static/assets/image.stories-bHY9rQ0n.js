import{h as o,j as e}from"./iframe-B5RMobo9.js";const f={title:"Components/Data Display/ITImage",component:o,parameters:{layout:"centered"},argTypes:{src:{control:"text",description:"Image source URL"},alt:{control:"text",description:"Alternative text for accessibility"},fallback:{control:"text",description:"Fallback image URL shown when the primary src fails to load"},className:{control:"text",description:"Additional CSS classes for the wrapper"},onClick:{control:!1,description:"Click handler"}}},u={width:256,height:192},s={args:{src:"https://picsum.photos/256/192",alt:"Random image",className:"rounded-lg overflow-hidden"},render:r=>e.jsx("div",{style:u,children:e.jsx(o,{...r})})},a={args:{src:"https://invalid-url/does-not-exist.jpg",alt:"Broken image",fallback:"https://picsum.photos/256/192?grayscale",className:"rounded-lg overflow-hidden"},render:r=>e.jsx("div",{style:u,children:e.jsx(o,{...r})})},t={args:{src:"https://picsum.photos/200/200",alt:"Square image",className:"rounded-full overflow-hidden"},render:r=>e.jsx("div",{style:{width:128,height:128},children:e.jsx(o,{...r})})};var n,l,i;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/256/192',
    alt: 'Random image',
    className: 'rounded-lg overflow-hidden'
  },
  render: args => <div style={containerStyle}><ITImage {...args} /></div>
}`,...(i=(l=s.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var c,d,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    src: 'https://invalid-url/does-not-exist.jpg',
    alt: 'Broken image',
    fallback: 'https://picsum.photos/256/192?grayscale',
    className: 'rounded-lg overflow-hidden'
  },
  render: args => <div style={containerStyle}><ITImage {...args} /></div>
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,g,h;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'Square image',
    className: 'rounded-full overflow-hidden'
  },
  render: args => <div style={{
    width: 128,
    height: 128
  }}><ITImage {...args} /></div>
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const v=["Default","WithFallbackError","SquareAspectRatio"],x=Object.freeze(Object.defineProperty({__proto__:null,Default:s,SquareAspectRatio:t,WithFallbackError:a,__namedExportsOrder:v,default:f},Symbol.toStringTag,{value:"Module"}));export{x as S};
