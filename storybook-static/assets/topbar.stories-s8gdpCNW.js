import{j as e,z as g,A as p,E as b}from"./iframe-BUyFEAH8.js";import{I as l}from"./topbar-DbMKW4Tl.js";import"./preload-helper-C1FmrZbK.js";const M={title:"Components/Layout & Navigation/ITTopBar",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Un Header moderno, con efecto glassmorphism, sombras suaves y un submenú de usuario flotante con diseño premium. Totalmente integrado a theme.ts."}}},tags:["autodocs"]},m={userName:"Alejandro G.",userEmail:"alejandro@axzy.io",userImage:"https://i.pravatar.cc/150?u=a042581f4e29026024d",menuItems:[{label:"Mi Perfil",onClick:()=>console.log("Perfil clicked")},{label:"Configuración de Cuenta",onClick:()=>console.log("Config clicked")},{label:"Preferencias",onClick:()=>console.log("Preferencias clicked")},{label:"Cerrar Sesión",onClick:()=>console.log("Logout clicked")}]},x=[{id:"1",label:"Monitor",icon:e.jsx(g,{}),action:()=>console.log("Monitor")},{id:"2",label:"Seguridad",icon:e.jsx(p,{}),action:()=>console.log("Seguridad")},{id:"3",label:"Admin",icon:e.jsx(b,{}),action:()=>console.log("Admin")}],a={args:{logoText:"AXZY SYSTEM",showMobileMenuButton:!0,userMenu:m,navItems:x,onToggleMobileMenu:()=>console.log("Toggle Mobile Menu")},render:s=>e.jsxs("div",{className:"h-[400px] w-full bg-slate-50 overflow-y-auto",children:[e.jsx(l,{...s}),e.jsxs("div",{className:"p-8",children:[e.jsx("h1",{className:"text-2xl font-bold text-slate-800 mb-4",children:"Contenido de ejemplo"}),e.jsx("p",{className:"text-slate-500 max-w-2xl leading-relaxed mb-6",children:"Haz scroll hacia abajo para ver cómo el ITTopBar mantiene su efecto glassmorphism (fondo desenfocado) mientras se superpone al contenido. Prueba también a hacer clic en el avatar del usuario a la derecha para ver el nuevo menú desplegable flotante."}),[1,2,3,4,5].map(u=>e.jsx("div",{className:"h-24 bg-white rounded-xl border border-slate-200 shadow-sm mb-4"},u))]})]})},o={args:{logoText:"AXZY Simple",showMobileMenuButton:!0,userMenu:{...m,userImage:void 0}},render:s=>e.jsx("div",{className:"h-[250px] w-full bg-slate-50",children:e.jsx(l,{...s})})};var r,t,n;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(n=(t=a.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var i,c,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const T=["Default","WithoutNavigation"];export{a as Default,o as WithoutNavigation,T as __namedExportsOrder,M as default};
