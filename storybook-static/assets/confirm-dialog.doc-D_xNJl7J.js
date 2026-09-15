import{j as e}from"./iframe-B5RMobo9.js";import{u as i,M as r,P as c,C as d,S as l}from"./blocks-DefDVuP9.js";import{S as t}from"./confirm-dialog.stories-5kr-pBRZ.js";import"./preload-helper-C1FmrZbK.js";function s(o){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:t}),`
`,e.jsx(n.h1,{id:"itconfirmdialog",children:"ITConfirmDialog"}),`
`,e.jsx(n.p,{children:"Confirmation modal dialog for destructive or critical actions. Renders a centered overlay with a warning icon, title, message body, and confirm/cancel buttons. Supports loading state and configurable button colors."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"isOpen"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Controls whether the confirmation dialog is visible. |
| `,e.jsx(n.code,{children:"onClose"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Callback fired when the user cancels or closes the dialog (overlay click or cancel button). |
| `,e.jsx(n.code,{children:"onConfirm"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Callback fired when the user confirms the action. |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"Confirmar acción"'}),` | Heading text displayed at the top of the dialog. |
| `,e.jsx(n.code,{children:"message"})," | ",e.jsx(n.code,{children:"ReactNode"})," | ",e.jsx(n.code,{children:'"¿Estás seguro de que deseas continuar?"'}),` | Body content — accepts plain strings or React nodes. |
| `,e.jsx(n.code,{children:"confirmLabel"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"Confirmar"'}),` | Label for the confirm button. |
| `,e.jsx(n.code,{children:"cancelLabel"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"Cancelar"'}),` | Label for the cancel button. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"ColorsTypes"})," | ",e.jsx(n.code,{children:'"primary"'})," | Color variant applied to the confirm button. Accepts ",e.jsx(n.code,{children:"primary"}),", ",e.jsx(n.code,{children:"danger"}),", ",e.jsx(n.code,{children:"warning"}),", ",e.jsx(n.code,{children:"info"}),`, etc. |
| `,e.jsx(n.code,{children:"loading"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"})," | Disables all buttons and signals a loading state. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITConfirmDialog } from '@axzydev/axzy_ui_system';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<ITButton label="Eliminar" color="danger" onClick={() => setOpen(true)} />

<ITConfirmDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={() => { handleDelete(); setOpen(false); }}
  title="Eliminar usuario"
  message="Esta acción no se puede deshacer. ¿Deseas eliminar este usuario?"
  confirmLabel="Eliminar"
  variant="danger"
  loading={isDeleting}
/>
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The dialog renders ",e.jsx(n.code,{children:"null"})," when ",e.jsx(n.code,{children:"isOpen"})," is ",e.jsx(n.code,{children:"false"}),", so it does not remain in the DOM."]}),`
`,e.jsxs(n.li,{children:["A semi-transparent ",e.jsx(n.strong,{children:"backdrop"})," (",e.jsx(n.code,{children:"bg-black/40 backdrop-blur-sm"}),") covers the screen; clicking it triggers ",e.jsx(n.code,{children:"onClose"}),"."]}),`
`,e.jsxs(n.li,{children:["The dialog card has rounded corners (",e.jsx(n.code,{children:"rounded-2xl"}),"), a light border, and a subtle shadow."]}),`
`,e.jsxs(n.li,{children:["A warning icon (",e.jsx(n.code,{children:"FaExclamationTriangle"})," in amber) is always displayed alongside the title and message."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"variant"})," controls the confirm button color via the ",e.jsx(n.code,{children:"color"})," prop on ",e.jsx(n.code,{children:"ITButton"}),"; the cancel button always uses the ",e.jsx(n.code,{children:"outlined"})," variant."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"loading"})," disables both buttons to prevent double-submission during async operations."]}),`
`,e.jsxs(n.li,{children:["By default, spans and text use dark mode–aware colors (",e.jsx(n.code,{children:"dark:text-white"}),", ",e.jsx(n.code,{children:"dark:text-slate-400"}),")."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(c,{}),`
`,e.jsx(d,{}),`
`,e.jsx(l,{})]})}function u(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{u as default};
