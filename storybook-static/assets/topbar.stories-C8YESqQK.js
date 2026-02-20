import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as r}from"./topbar-C_6xaa38.js";import{k as p,h as g,x as b}from"./index-hWgMQIRJ.js";import"./useClickOutside-Ce9z93gR.js";import"./iframe-B9rAFiN_.js";import"./preload-helper-C1FmrZbK.js";import"./theme-Cu8onXxY.js";const w={title:"Components/Layout & Navigation/ITTopBar",component:r,parameters:{layout:"fullscreen",docs:{description:{component:"Un Header moderno, con efecto glassmorphism, sombras suaves y un submenú de usuario flotante con diseño premium. Totalmente integrado a theme.ts."}}},tags:["autodocs"]},d={userName:"Alejandro G.",userEmail:"alejandro@axzy.io",userImage:"https://i.pravatar.cc/150?u=a042581f4e29026024d",menuItems:[{label:"Mi Perfil",onClick:()=>console.log("Perfil clicked")},{label:"Configuración de Cuenta",onClick:()=>console.log("Config clicked")},{label:"Preferencias",onClick:()=>console.log("Preferencias clicked")},{label:"Cerrar Sesión",onClick:()=>console.log("Logout clicked")}]},x=[{id:"1",label:"Monitor",icon:e.jsx(p,{}),action:()=>console.log("Monitor")},{id:"2",label:"Seguridad",icon:e.jsx(g,{}),action:()=>console.log("Seguridad")},{id:"3",label:"Admin",icon:e.jsx(b,{}),action:()=>console.log("Admin")}],o={args:{logoText:"AXZY SYSTEM",showMobileMenuButton:!0,userMenu:d,navItems:x,onToggleMobileMenu:()=>console.log("Toggle Mobile Menu")},render:s=>e.jsxs("div",{className:"h-[400px] w-full bg-slate-50 overflow-y-auto",children:[e.jsx(r,{...s}),e.jsxs("div",{className:"p-8",children:[e.jsx("h1",{className:"text-2xl font-bold text-slate-800 mb-4",children:"Contenido de ejemplo"}),e.jsx("p",{className:"text-slate-500 max-w-2xl leading-relaxed mb-6",children:"Haz scroll hacia abajo para ver cómo el ITTopBar mantiene su efecto glassmorphism (fondo desenfocado) mientras se superpone al contenido. Prueba también a hacer clic en el avatar del usuario a la derecha para ver el nuevo menú desplegable flotante."}),[1,2,3,4,5].map(u=>e.jsx("div",{className:"h-24 bg-white rounded-xl border border-slate-200 shadow-sm mb-4"},u))]})]})},a={args:{logoText:"AXZY Simple",showMobileMenuButton:!0,userMenu:{...d,userImage:void 0}},render:s=>e.jsx("div",{className:"h-[250px] w-full bg-slate-50",children:e.jsx(r,{...s})})};var l,t,n;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    logoText: 'AXZY SYSTEM',
    showMobileMenuButton: true,
    userMenu: mockUserMenu,
    navItems: mockNavItems,
    onToggleMobileMenu: () => console.log('Toggle Mobile Menu')
  },
  render: args => <div className="h-[400px] w-full bg-slate-50 overflow-y-auto">
      <ITTopBar {...args} />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Contenido de ejemplo</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed mb-6">
          Haz scroll hacia abajo para ver cómo el ITTopBar mantiene su efecto glassmorphism 
          (fondo desenfocado) mientras se superpone al contenido. Prueba también a hacer clic 
          en el avatar del usuario a la derecha para ver el nuevo menú desplegable flotante.
        </p>
        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-slate-200 shadow-sm mb-4"></div>)}
      </div>
    </div>
}`,...(n=(t=o.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var i,c,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    logoText: 'AXZY Simple',
    showMobileMenuButton: true,
    userMenu: {
      ...mockUserMenu,
      userImage: undefined // Test without avatar image
    }
  },
  render: args => <div className="h-[250px] w-full bg-slate-50">
      <ITTopBar {...args} />
    </div>
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const k=["Default","WithoutNavigation"];export{o as Default,a as WithoutNavigation,k as __namedExportsOrder,w as default};
