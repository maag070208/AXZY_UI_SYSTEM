import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as o,P as a,C as l,S as t}from"./blocks-DefDVuP9.js";import{S as c}from"./avatar.stories-C7nknR7z.js";import"./preload-helper-C1FmrZbK.js";function n(i){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
`,e.jsx(s.h1,{id:"itavatar",children:"ITAvatar"}),`
`,e.jsx(s.p,{children:"Circular avatar component for displaying user profile pictures, initials, or generic placeholder content. Falls back to displaying initials when the image fails to load or is not provided. Supports five sizes and an optional badge overlay for status indicators."}),`
`,e.jsx(s.h2,{id:"props",children:"Props"}),`
`,e.jsxs(s.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(s.code,{children:"src"})," | ",e.jsx(s.code,{children:"string"}),` | — | Image source URL for the avatar. |
| `,e.jsx(s.code,{children:"alt"})," | ",e.jsx(s.code,{children:"string"})," | — | Alt text for the image. Also used as fallback initial when no ",e.jsx(s.code,{children:"initials"})," or ",e.jsx(s.code,{children:"src"}),` is provided. |
| `,e.jsx(s.code,{children:"initials"})," | ",e.jsx(s.code,{children:"string"}),` | — | Initials to display when no image is available (max 2 characters recommended). |
| `,e.jsx(s.code,{children:"size"})," | ",e.jsx(s.code,{children:'"xs" \\| "sm" \\| "md" \\| "lg" \\| "xl"'})," | ",e.jsx(s.code,{children:'"md"'}),` | Avatar dimensions. |
| `,e.jsx(s.code,{children:"color"})," | ",e.jsx(s.code,{children:"string"})," | ",e.jsx(s.code,{children:'"bg-primary-500"'}),` | Background color class for the initials fallback. |
| `,e.jsx(s.code,{children:"className"})," | ",e.jsx(s.code,{children:"string"}),` | — | Additional CSS class names for the avatar container. |
| `,e.jsx(s.code,{children:"badge"})," | ",e.jsx(s.code,{children:"ReactNode"}),` | — | React node rendered as a badge overlay at the bottom-right corner. |
| `,e.jsx(s.code,{children:"onClick"})," | ",e.jsx(s.code,{children:"() => void"})," | — | Click handler. When provided, the avatar becomes interactive (",e.jsx(s.code,{children:'role="button"'}),"). |"]}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { ITAvatar } from '@axzydev/axzy_ui_system';

<ITAvatar src="https://i.pravatar.cc/150" alt="User" size="md" />

<ITAvatar initials="JD" size="lg" badge={<FaCircle className="text-emerald-500" />} />
`})}),`
`,e.jsx(s.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"xs"})," — Extra small (ideal for inline lists or compact UIs)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"sm"})," — Small (useful in table rows or sidebars)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"md"})," — Medium, the default size suitable for most use cases."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"lg"})," — Large (prominent display or profile pages)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"xl"})," — Extra large (hero sections or standalone profile views)."]}),`
`,e.jsxs(s.li,{children:["Shows initials text fallback when ",e.jsx(s.code,{children:"src"})," is missing or the image fails (",e.jsx(s.code,{children:"onError"}),")."]}),`
`,e.jsx(s.li,{children:"Badge slot positioned at bottom-right using absolute positioning."}),`
`,e.jsxs(s.li,{children:["Becomes interactive with click handler and hover cursor when ",e.jsx(s.code,{children:"onClick"})," is provided."]}),`
`]}),`
`,e.jsx(s.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(a,{}),`
`,e.jsx(l,{}),`
`,e.jsx(t,{})]})}function m(i={}){const{wrapper:s}={...r(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(n,{...i})}):n(i)}export{m as default};
