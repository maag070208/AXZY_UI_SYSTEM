import{a as h,j as e,I as v,r as q}from"./iframe-BUyFEAH8.js";import"./preload-helper-C1FmrZbK.js";const y={title:"Components/Feedback/ITDialog",component:h,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{isOpen:{control:"boolean"},onClose:{action:"closed"},title:{control:"text"},useFormHeader:{control:"boolean"}}},i=a=>{const[f,o]=q.useState(!1);return e.jsxs("div",{children:[e.jsx(v,{onClick:()=>o(!0),children:"Open Dialog"}),e.jsx(h,{...a,isOpen:f,onClose:()=>o(!1),children:a.children})]})},s={render:a=>e.jsx(i,{...a}),args:{title:"Basic Dialog",children:e.jsx("p",{className:"text-gray-600",children:"This is a simple dialog usage standard headers."}),useFormHeader:!1,className:"w-96"}},t={render:a=>e.jsx(i,{...a}),args:{title:"Form Header Dialog",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-gray-600",children:"This dialog uses the standard form header styling."}),e.jsx("div",{className:"flex justify-end",children:e.jsx(v,{variant:"primary",children:"Confirm"})})]}),useFormHeader:!0,className:"w-[500px]"}},r={render:a=>e.jsx(i,{...a}),args:{title:"Terms of Service",children:e.jsxs("div",{className:"h-64 overflow-y-auto text-sm text-gray-600",children:[e.jsx("p",{className:"mb-4",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{className:"mb-4",children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{className:"mb-4",children:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}),e.jsx("p",{className:"mb-4",children:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."})]}),useFormHeader:!0,className:"w-[600px]"}};var n,l,u;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: args => <DialogWrapper {...args} />,
  args: {
    title: 'Basic Dialog',
    children: <p className="text-gray-600">This is a simple dialog usage standard headers.</p>,
    useFormHeader: false,
    className: 'w-96'
  } as any
}`,...(u=(l=s.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var m,c,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <DialogWrapper {...args} />,
  args: {
    title: 'Form Header Dialog',
    children: <div className="space-y-4">
            <p className="text-gray-600">This dialog uses the standard form header styling.</p>
            <div className="flex justify-end">
                <ITButton variant="primary">Confirm</ITButton>
            </div>
        </div>,
    useFormHeader: true,
    className: 'w-[500px]'
  } as any
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,g,x;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <DialogWrapper {...args} />,
  args: {
    title: 'Terms of Service',
    children: <div className="h-64 overflow-y-auto text-sm text-gray-600">
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p className="mb-4">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        </div>,
    useFormHeader: true,
    className: 'w-[600px]'
  } as any
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const j=["Default","WithFormHeader","LongContent"];export{s as Default,r as LongContent,t as WithFormHeader,j as __namedExportsOrder,y as default};
