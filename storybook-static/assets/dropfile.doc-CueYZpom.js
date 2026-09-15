import{j as e}from"./iframe-B5RMobo9.js";import{u as o,M as l,P as d,C as c,S as t}from"./blocks-DefDVuP9.js";import{S as r}from"./dropfile.stories-BGi0RsFV.js";import"./preload-helper-C1FmrZbK.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:r}),`
`,e.jsx(n.h1,{id:"itdropfile",children:"ITDropfile"}),`
`,e.jsx(n.p,{children:"A drag-and-drop file upload zone with preview support for images. Tracks upload lifecycle with status enumeration and provides confirm/cancel actions. Configurable accepted file types limit which formats are allowed."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"onFileSelect"})," | ",e.jsx(n.code,{children:"(file: File \\| null) => void"}),` | — | Called when a file is selected or cleared. |
| `,e.jsx(n.code,{children:"onCancel"})," | ",e.jsx(n.code,{children:"() => void"}),` | — | Called when the user cancels the current selection. |
| `,e.jsx(n.code,{children:"onSubmit"})," | ",e.jsx(n.code,{children:"(file: File) => void"}),` | — | Called when the user confirms and submits the file. |
| `,e.jsx(n.code,{children:"acceptedFileTypes"})," | ",e.jsx(n.code,{children:"FileTypeEnum[]"}),` | — | List of accepted MIME types (PDF, XLS, CSV, PNG, JPG, etc.). |
| `,e.jsx(n.code,{children:"contentClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | CSS classes for the preview/content area. |
| `,e.jsx(n.code,{children:"containerClassName"})," | ",e.jsx(n.code,{children:"string"}),` | — | CSS classes for the outermost container. |
| `,e.jsx(n.code,{children:"showStatusBadge"})," | ",e.jsx(n.code,{children:"boolean"}),` | — | Whether to show the status badge (pending/uploading/uploaded/error). |
| `,e.jsx(n.code,{children:"uploadStatus"})," | ",e.jsx(n.code,{children:"UploadStatus"}),` | — | Externally controlled upload status. |
| `,e.jsx(n.code,{children:"onStatusChange"})," | ",e.jsx(n.code,{children:"(status: UploadStatus) => void"}),` | — | Callback when upload status changes. |
| `,e.jsx(n.code,{children:"initialPreviewUrl"})," | ",e.jsx(n.code,{children:"string \\| null"}),` | — | Initial preview URL shown before any file is selected (e.g., editing an existing entry). |
| `,e.jsx(n.code,{children:"view"})," | ",e.jsx(n.code,{children:'"drop" \\| "button"'})," | ",e.jsx(n.code,{children:'"drop"'})," | ",e.jsx(n.code,{children:'"drop"'})," renders the dropzone/preview inline. ",e.jsx(n.code,{children:'"button"'})," renders a compact trigger button that opens the same UI inside an ",e.jsx(n.code,{children:"ITDialog"}),` modal. |
| `,e.jsx(n.code,{children:"buttonLabel"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:'"Subir archivo"'})," | Label for the trigger button when ",e.jsx(n.code,{children:'view="button"'}),` and no file is selected yet. |
| `,e.jsx(n.code,{children:"modalTitle"})," | ",e.jsx(n.code,{children:"string"})," | ",e.jsx(n.code,{children:"buttonLabel"})," | Title of the modal opened when ",e.jsx(n.code,{children:'view="button"'}),". |"]}),`
`,e.jsx(n.h3,{id:"enums",children:"Enums"}),`
`,e.jsxs(n.p,{children:[`| Enum | Values |
|------|--------|
| `,e.jsx(n.code,{children:"UploadStatus"})," | ",e.jsx(n.code,{children:"PENDING"})," (",e.jsx(n.code,{children:'"pendiente"'}),"), ",e.jsx(n.code,{children:"UPLOADING"})," (",e.jsx(n.code,{children:'"subiendo"'}),"), ",e.jsx(n.code,{children:"UPLOADED"})," (",e.jsx(n.code,{children:'"subido"'}),"), ",e.jsx(n.code,{children:"ERROR"})," (",e.jsx(n.code,{children:'"error"'}),`) |
| `,e.jsx(n.code,{children:"FileTypeEnum"})," | ",e.jsx(n.code,{children:"PDF"}),", ",e.jsx(n.code,{children:"XLS"}),", ",e.jsx(n.code,{children:"XLSX"}),", ",e.jsx(n.code,{children:"CSV"}),", ",e.jsx(n.code,{children:"PNG"}),", ",e.jsx(n.code,{children:"JPG"}),", ",e.jsx(n.code,{children:"JPEG"})," |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITDropfile, UploadStatus, FileTypeEnum } from '@axzydev/axzy_ui_system';

<ITDropfile
  onFileSelect={(file) => setSelectedFile(file)}
  onSubmit={(file) => uploadFile(file)}
  onCancel={() => clearFile()}
  acceptedFileTypes={[FileTypeEnum.PNG, FileTypeEnum.JPG, FileTypeEnum.PDF]}
  uploadStatus={UploadStatus.PENDING}
  showStatusBadge
/>
`})}),`
`,e.jsx(n.h3,{id:"viewbutton",children:e.jsx(n.code,{children:'view="button"'})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<ITDropfile
  view="button"
  buttonLabel="Subir archivos"
  onFileSelect={(file) => setSelectedFile(file)}
/>
`})}),`
`,e.jsxs(n.p,{children:["Use this when you'd otherwise write your own button + modal wrapper around ",e.jsx(n.code,{children:"ITDropfile"})," — it's built in. The button shows the picked file's name (and status badge, if ",e.jsx(n.code,{children:"showStatusBadge"}),") once one is selected, and reopens the same dropzone/preview to change it. ~900ms after a successful confirm the modal closes ",e.jsx(n.strong,{children:"and the selection resets"}),", so the button goes back to ",e.jsx(n.code,{children:"buttonLabel"}),", ready to upload another file — this mode is built for repeated uploads (e.g. an attachments list), replacing the old pattern of remounting ",e.jsx(n.code,{children:"ITDropfile"})," with a changing ",e.jsx(n.code,{children:"key"})," after each upload."]}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Displays image preview for image file types; shows a file icon for non-image types."}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"uploadStatus"})," and ",e.jsx(n.code,{children:"showStatusBadge"})," props enable external lifecycle control and visual feedback."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"initialPreviewUrl"})," is useful for edit forms where an existing file is already associated."]}),`
`,e.jsx(n.li,{children:"Only one file at a time is supported — selecting a new file replaces the current one."}),`
`,e.jsx(n.li,{children:"The confirm/cancel flow gives users a chance to review their selection before submission."}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(d,{}),`
`,e.jsx(c,{}),`
`,e.jsx(t,{})]})}function p(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{p as default};
