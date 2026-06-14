import{j as o,I as i}from"./iframe-BUyFEAH8.js";import{I as C}from"./card-BjNAcQuu.js";import"./preload-helper-C1FmrZbK.js";const I={title:"Components/Layout & Navigation/ITCard",component:C,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onClick:{action:"clicked"}}},a={args:{title:"Card Title",children:"This is the body of the card. It has padding defined by the theme.",onClick:void 0}},e={args:{title:"Card with Image",image:"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",children:"A nice gradient image above.",onClick:void 0}},t={args:{title:"Card with Actions",children:"This card has a button action at the bottom.",actions:o.jsxs("div",{className:"flex justify-end gap-2",children:[o.jsx(i,{variant:"text",color:"secondary",label:"Cancel"}),o.jsx(i,{variant:"filled",color:"primary",label:"Save"})]}),onClick:void 0}},r={args:{title:"Clickable Card",children:"Hover over me! I should have a stronger shadow and a pointer cursor.",onClick:()=>alert("Card clicked!"),image:"https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}};var s,n,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    title: 'Card Title',
    children: 'This is the body of the card. It has padding defined by the theme.',
    onClick: undefined
  }
}`,...(c=(n=a.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var l,d,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    title: 'Card with Image',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    children: 'A nice gradient image above.',
    onClick: undefined
  }
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var h,p,u;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Card with Actions',
    children: 'This card has a button action at the bottom.',
    actions: <div className="flex justify-end gap-2">
         <ITButton variant="text" color="secondary" label="Cancel" />
         <ITButton variant="filled" color="primary" label="Save" />
      </div>,
    onClick: undefined
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,f,b;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: 'Clickable Card',
    children: 'Hover over me! I should have a stronger shadow and a pointer cursor.',
    onClick: () => alert('Card clicked!'),
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
}`,...(b=(f=r.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const y=["Default","WithImage","WithActions","Clickable"];export{r as Clickable,a as Default,t as WithActions,e as WithImage,y as __namedExportsOrder,I as default};
