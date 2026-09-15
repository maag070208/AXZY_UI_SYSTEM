import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as o,P as c,C as l,S as a}from"./blocks-DefDVuP9.js";import{S as t}from"./image.stories-bHY9rQ0n.js";import"./preload-helper-C1FmrZbK.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:t}),`
`,e.jsx(n.h1,{id:"itimage",children:"ITImage"}),`
`,e.jsxs(n.p,{children:["An image component with automatic fallback on load error. Uses a native ",e.jsx(n.code,{children:"<img>"})," element with an error boundary that swaps the source to a fallback URL when the primary image fails to load."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"src"})," | ",e.jsx(n.code,{children:"string"}),` | required | Source URL of the image. |
| `,e.jsx(n.code,{children:"alt"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Alt text for accessibility. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"}),` | Additional CSS classes for the wrapper. |
| `,e.jsx(n.code,{children:"fallback"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"undefined"})," | Fallback image URL shown when ",e.jsx(n.code,{children:"src"}),` fails to load. |
| `,e.jsx(n.code,{children:"onClick"})," | ",e.jsx(n.code,{children:"() => void"})," | ",e.jsx(n.code,{children:"undefined"})," | Click handler on the image. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITImage } from '@axzydev/axzy_ui_system';

<ITImage
  src="https://example.com/photo.jpg"
  alt="Profile photo"
  fallback="https://example.com/default-avatar.jpg"
/>
<ITImage src="https://example.com/logo.png" />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Handles ",e.jsx(n.code,{children:"onerror"})," internally to swap to the ",e.jsx(n.code,{children:"fallback"})," URL."]}),`
`,e.jsxs(n.li,{children:["The wrapper is an inline-block ",e.jsx(n.code,{children:"div"})," with full width/height for responsive sizing within a sized parent."]}),`
`,e.jsxs(n.li,{children:["If no ",e.jsx(n.code,{children:"fallback"})," is provided and the image errors, the broken image icon is shown."]}),`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:"object-cover"})," to fill the container while maintaining aspect ratio."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(l,{}),`
`,e.jsx(a,{})]})}function m(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{m as default};
