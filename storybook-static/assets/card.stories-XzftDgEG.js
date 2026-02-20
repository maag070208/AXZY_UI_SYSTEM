import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as t}from"./clsx-B-dksMZM.js";import{t as B}from"./theme-Cu8onXxY.js";import{r as D}from"./iframe-B9rAFiN_.js";import{I as p}from"./button-CjKvNsZ3.js";import"./preload-helper-C1FmrZbK.js";function w({title:d,image:c,alt:j="Card Image",children:q,actions:l,className:k,imageClassName:R,titleClassName:S,contentClassName:A,actionClassName:W,onClick:r}){const[E,m]=D.useState(!1),a=B.card,H={backgroundColor:a.backgroundColor,borderColor:a.borderColor,borderWidth:a.borderWidth,borderRadius:a.borderRadius,boxShadow:r?E?a.hover.shadow:a.shadow:"none",transition:r?"all 0.2s ease-in-out":"none",cursor:r?"pointer":"default"},_={padding:a.body.padding};return e.jsxs("div",{onClick:r,onMouseEnter:()=>r&&m(!0),onMouseLeave:()=>r&&m(!1),className:t("overflow-hidden flex flex-col",k),style:H,children:[c&&e.jsx("img",{src:c,alt:j,className:t("w-full h-48 object-cover",R)}),e.jsxs("div",{className:t(A),style:_,children:[d&&e.jsx("h3",{className:t("text-xl font-semibold mb-2 text-gray-800",S),children:d}),e.jsx("div",{className:"text-gray-600",children:q})]}),l&&e.jsx("div",{className:t("p-4 border-t border-gray-100 mt-auto",W),children:l})]})}w.__docgenInfo={description:"Componente de tarjeta (Card) personalizable.",methods:[],displayName:"ITCard",props:{onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:""},image:{required:!1,tsType:{name:"string"},description:""},alt:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Card Image"',computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},imageClassName:{required:!1,tsType:{name:"string"},description:""},titleClassName:{required:!1,tsType:{name:"string"},description:""},contentClassName:{required:!1,tsType:{name:"string"},description:""},actionClassName:{required:!1,tsType:{name:"string"},description:""}}};const G={title:"Components/Layout & Navigation/ITCard",component:w,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onClick:{action:"clicked"}}},s={args:{title:"Card Title",children:"This is the body of the card. It has padding defined by the theme.",onClick:void 0}},o={args:{title:"Card with Image",image:"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",children:"A nice gradient image above.",onClick:void 0}},i={args:{title:"Card with Actions",children:"This card has a button action at the bottom.",actions:e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(p,{variant:"text",color:"secondary",label:"Cancel"}),e.jsx(p,{variant:"filled",color:"primary",label:"Save"})]}),onClick:void 0}},n={args:{title:"Clickable Card",children:"Hover over me! I should have a stronger shadow and a pointer cursor.",onClick:()=>alert("Card clicked!"),image:"https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}};var u,h,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: 'Card Title',
    children: 'This is the body of the card. It has padding defined by the theme.',
    onClick: undefined
  }
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,b,C;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Card with Image',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    children: 'A nice gradient image above.',
    onClick: undefined
  }
}`,...(C=(b=o.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var y,v,x;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    title: 'Card with Actions',
    children: 'This card has a button action at the bottom.',
    actions: <div className="flex justify-end gap-2">
         <ITButton variant="text" color="secondary" label="Cancel" />
         <ITButton variant="filled" color="primary" label="Save" />
      </div>,
    onClick: undefined
  }
}`,...(x=(v=i.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var T,I,N;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Clickable Card',
    children: 'Hover over me! I should have a stronger shadow and a pointer cursor.',
    onClick: () => alert('Card clicked!'),
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }
}`,...(N=(I=n.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};const J=["Default","WithImage","WithActions","Clickable"];export{n as Clickable,s as Default,i as WithActions,o as WithImage,J as __namedExportsOrder,G as default};
