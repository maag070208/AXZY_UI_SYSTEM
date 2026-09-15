import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as r,P as l,C as d,S as a}from"./blocks-DefDVuP9.js";import{S as c}from"./dialog.stories-6xVaYb2H.js";import"./preload-helper-C1FmrZbK.js";function o(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(n.h1,{id:"itdialog",children:"ITDialog"}),`
`,e.jsx(n.p,{children:"Modal dialog rendered via a React portal with a semi-transparent overlay backdrop. Supports optional title bar (plain or ITFormHeader), Escape-key dismissal, and a full-screen variant."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"isOpen"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Controls dialog visibility. |
| `,e.jsx(n.code,{children:"onClose"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Called on overlay click, close button, or Escape key. |
| `,e.jsx(n.code,{children:"children"})," | ",e.jsx(n.code,{children:"ReactNode"}),` | — | Content rendered in the dialog body. |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"})," | — | CSS classes for the dialog panel (e.g., ",e.jsx(n.code,{children:'"w-96"'}),` for width). |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"}),` | — | Optional heading at the top of the dialog. |
| `,e.jsx(n.code,{children:"useFormHeader"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | When true and ",e.jsx(n.code,{children:"title"}),` is set, renders an ITFormHeader with colored styling. |
| `,e.jsx(n.code,{children:"fullScreen"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Makes the dialog fill the entire viewport. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITDialog } from '@axzydev/axzy_ui_system';

<ITDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  title="User Details"
  useFormHeader
  className="w-[500px]"
>
  <UserForm />
</ITDialog>

<ITDialog isOpen={open} onClose={close} fullScreen>
  <FullPageEditor />
</ITDialog>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Content is portaled to ",e.jsx(n.code,{children:"document.body"})," via ",e.jsx(n.code,{children:"createPortal"}),", ensuring it renders above all page layers."]}),`
`,e.jsx(n.li,{children:"Click outside the dialog panel or pressing Escape dismisses it."}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"useFormHeader"})," is true, the header uses the ITFormHeader design pattern with brand coloring."]}),`
`,e.jsxs(n.li,{children:["Control the dialog width via the ",e.jsx(n.code,{children:"className"})," prop (e.g., ",e.jsx(n.code,{children:'"w-96"'}),", ",e.jsx(n.code,{children:'"w-[600px]"'}),")."]}),`
`,e.jsxs(n.li,{children:["The overlay uses ",e.jsx(n.code,{children:"bg-black/50"})," for a darkened backdrop effect."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(l,{}),`
`,e.jsx(d,{}),`
`,e.jsx(a,{})]})}function j(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{j as default};
