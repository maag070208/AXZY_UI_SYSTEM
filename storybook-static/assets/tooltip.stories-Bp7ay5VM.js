import{r as I,j as e,y as w,W as r,b as u}from"./iframe-B5RMobo9.js";const j={top:"bottom-full left-1/2 -translate-x-1/2 mb-2",bottom:"top-full left-1/2 -translate-x-1/2 mt-2",left:"right-full top-1/2 -translate-y-1/2 mr-2",right:"left-full top-1/2 -translate-y-1/2 ml-2"},S={top:"top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800",bottom:"bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800",left:"left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-slate-800",right:"right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-slate-800"};function b({content:f,children:h,position:a="top",delay:T=200,className:g}){const[v,l]=I.useState(!1);let n;const x=()=>{n=setTimeout(()=>l(!0),T)},y=()=>{clearTimeout(n),l(!1)};return e.jsxs("div",{className:r("relative inline-flex",g),onMouseEnter:x,onMouseLeave:y,children:[h,v&&e.jsxs("div",{className:r("absolute z-[70] pointer-events-none",j[a]),children:[e.jsx("div",{className:"bg-slate-800 dark:bg-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg",children:e.jsx(w,{as:"span",children:f})}),e.jsx("div",{className:r("absolute",S[a])})]})]})}b.__docgenInfo={description:`ITTooltip — hover / focus info tooltip with position control and optional arrow indicator.

Wraps a trigger element and displays a small popup with explanatory text
after a configurable delay. Supports "top", "bottom", "left", and "right" placement
with a triangular arrow pointing toward the trigger.

@example
// Basic tooltip
<ITTooltip content="Click to save" position="bottom">
  <button>Save</button>
</ITTooltip>

@example
// Tooltip with custom delay
<ITTooltip content="Delete this item?" position="top" delay={500}>
  <IconButton icon={TrashIcon} />
</ITTooltip>`,methods:[],displayName:"ITTooltip",props:{content:{required:!0,tsType:{name:"ReactNode"},description:"The tooltip content to display on hover / focus. Accepts text or any ReactNode."},children:{required:!0,tsType:{name:"ReactNode"},description:"The trigger element that reveals the tooltip on interaction."},position:{required:!1,tsType:{name:"union",raw:'"top" | "bottom" | "left" | "right"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:'Placement relative to children. One of "top", "bottom", "left", "right". @default "top"',defaultValue:{value:'"top"',computed:!1}},delay:{required:!1,tsType:{name:"number"},description:"Delay in milliseconds before the tooltip becomes visible. @default 200",defaultValue:{value:"200",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS classes applied to the wrapper element."}}};const N={title:"Components/Overlay/ITTooltip",component:b},t={args:{content:"Tooltip arriba",position:"top",children:e.jsx(u,{label:"Hover me"})}},o={args:{content:"Tooltip abajo",position:"bottom",children:e.jsx(u,{label:"Hover me"})}};var s,i,p;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    content: "Tooltip arriba",
    position: "top",
    children: <ITButton label="Hover me" />
  }
}`,...(p=(i=t.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var d,c,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    content: "Tooltip abajo",
    position: "bottom",
    children: <ITButton label="Hover me" />
  }
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const _=["Top","Bottom"],q=Object.freeze(Object.defineProperty({__proto__:null,Bottom:o,Top:t,__namedExportsOrder:_,default:N},Symbol.toStringTag,{value:"Module"}));export{q as S};
