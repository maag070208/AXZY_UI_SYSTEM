import{_ as p,$ as B,j as a}from"./iframe-B5RMobo9.js";const y={title:"Components/Actions/ITDropfile",component:B,parameters:{layout:"centered"},argTypes:{onFileSelect:{action:"file selected"},onCancel:{action:"cancelled"},onSubmit:{action:"submitted"},showStatusBadge:{control:"boolean"},uploadStatus:{control:"select",options:Object.values(p)},view:{control:"radio",options:["drop","button"]}}},i=e=>a.jsx(B,{...e,className:"w-[500px]"}),r={render:e=>a.jsx(i,{...e}),args:{showStatusBadge:!0,containerClassName:"w-[400px]"}},t={render:e=>a.jsx(i,{...e}),args:{showStatusBadge:!0,initialPreviewUrl:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",uploadStatus:p.UPLOADED,containerClassName:"w-[400px]"},parameters:{docs:{description:{story:"Simulates a pre-loaded image (e.g., editing an existing entry)."}}}},o={render:e=>a.jsx(i,{...e}),args:{showStatusBadge:!0,initialPreviewUrl:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",uploadStatus:p.UPLOADING,containerClassName:"w-[400px]"}},s={render:e=>a.jsx(i,{...e}),args:{view:"button",buttonLabel:"Subir archivos",showStatusBadge:!0},parameters:{docs:{description:{story:'Compact trigger button that opens the dropzone/preview inside a modal (`ITDialog`) — use this instead of wrapping `ITDropfile` in your own "open a modal" button.'}}}},n={render:e=>a.jsx(i,{...e}),args:{showStatusBadge:!0,initialPreviewUrl:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",uploadStatus:p.ERROR,containerClassName:"w-[400px]"}};var c,u,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    containerClassName: 'w-[400px]'
  }
}`,...(l=(u=r.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var d,m,g;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.UPLOADED,
    containerClassName: 'w-[400px]'
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulates a pre-loaded image (e.g., editing an existing entry).'
      }
    }
  }
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var w,h,S;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.UPLOADING,
    containerClassName: 'w-[400px]'
  }
}`,...(S=(h=o.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var b,f,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <DropfileWrapper {...args} />,
  args: {
    view: 'button',
    buttonLabel: 'Subir archivos',
    showStatusBadge: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact trigger button that opens the dropzone/preview inside a modal (\`ITDialog\`) — use this instead of wrapping \`ITDropfile\` in your own "open a modal" button.'
      }
    }
  }
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var D,U,v;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.ERROR,
    containerClassName: 'w-[400px]'
  }
}`,...(v=(U=n.parameters)==null?void 0:U.docs)==null?void 0:v.source}}};const C=["Default","WithImage","Uploading","ButtonView","ErrorState"],N=Object.freeze(Object.defineProperty({__proto__:null,ButtonView:s,Default:r,ErrorState:n,Uploading:o,WithImage:t,__namedExportsOrder:C,default:y},Symbol.toStringTag,{value:"Module"}));export{N as S};
