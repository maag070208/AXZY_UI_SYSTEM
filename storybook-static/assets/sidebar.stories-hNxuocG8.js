import{a7 as t,j as e,a1 as p,a3 as f,a2 as x,a8 as h,a4 as y}from"./iframe-B5RMobo9.js";const A={title:"Components/Layout & Navigation/ITSidebar",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"Un sidebar moderno, verdaderamente minimalista, hermoso y personalizable con estados colapsables y submenús. Soporta theming global con hover states y glassmorphism elegantes."}}}},l=[{id:"dashboard",label:"Dashboard",icon:e.jsx(p,{}),action:()=>console.log("Dashboard clicked"),isActive:!0},{id:"users",label:"Gestión de Usuarios",icon:e.jsx(f,{}),badge:"3",subitems:[{id:"users-list",label:"Lista de Usuarios",action:()=>console.log("Users list"),isActive:!1},{id:"users-roles",label:"Roles y Permisos",action:()=>console.log("Roles"),isActive:!1}]},{id:"analytics",label:"Analíticas",icon:e.jsx(x,{}),action:()=>console.log("Analytics clicked"),isActive:!1},{id:"security",label:"Seguridad",icon:e.jsx(h,{}),badge:"!",action:()=>console.log("Security clicked"),isActive:!1},{id:"settings",label:"Configuración",icon:e.jsx(y,{}),subitems:[{id:"settings-general",label:"General",action:()=>console.log("General"),isActive:!1},{id:"settings-theme",label:"Apariencia",action:()=>console.log("Theme"),isActive:!1}]}],a={args:{navigationItems:l,isCollapsed:!1,visibleOnMobile:!0},render:s=>e.jsxs("div",{className:"h-screen bg-gray-50 flex",children:[e.jsx(t,{...s}),e.jsx("div",{className:"flex-1 p-8 text-zinc-500 font-medium",children:"Contenido principal simulado. Juega con el botón de colapsar para ver las transiciones suaves."})]})},i={args:{navigationItems:l,isCollapsed:!0,visibleOnMobile:!0},render:s=>e.jsxs("div",{className:"h-screen bg-gray-50 flex",children:[e.jsx(t,{...s}),e.jsx("div",{className:"flex-1 p-8 text-zinc-500 font-medium",children:"Contenido principal... ¡Pasa el cursor sobre los íconos del sidebar para ver el efecto de glassmorphism en los tooltips flotantes!"})]})},o={args:{navigationItems:[...l.slice(0,1).map(s=>({...s,isActive:!1})),{...l[1],isActive:!0,subitems:[{id:"users-list",label:"Lista de Usuarios",action:()=>console.log("Users list"),isActive:!0},{id:"users-roles",label:"Roles y Permisos",action:()=>console.log("Roles"),isActive:!1}]},...l.slice(2)],isCollapsed:!1,visibleOnMobile:!0},render:s=>e.jsxs("div",{className:"h-screen bg-gray-50 flex",children:[e.jsx(t,{...s}),e.jsx("div",{className:"flex-1 p-8 text-zinc-500 font-medium",children:"El menú de usuarios está expandido y activo, mostrando el conector visual sutil."})]})};var r,n,c;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    navigationItems: baseNavigationItems,
    isCollapsed: false,
    visibleOnMobile: true
  },
  render: args => <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">Contenido principal simulado. Juega con el botón de colapsar para ver las transiciones suaves.</div>
    </div>
}`,...(c=(n=a.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var d,m,u;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    navigationItems: baseNavigationItems,
    isCollapsed: true,
    visibleOnMobile: true
  },
  render: args => <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">Contenido principal... ¡Pasa el cursor sobre los íconos del sidebar para ver el efecto de glassmorphism en los tooltips flotantes!</div>
    </div>
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,b,v;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    navigationItems: [...baseNavigationItems.slice(0, 1).map(i => ({
      ...i,
      isActive: false
    })), {
      ...baseNavigationItems[1],
      isActive: true,
      subitems: [{
        id: 'users-list',
        label: 'Lista de Usuarios',
        action: () => console.log('Users list'),
        isActive: true
      }, {
        id: 'users-roles',
        label: 'Roles y Permisos',
        action: () => console.log('Roles'),
        isActive: false
      }]
    }, ...baseNavigationItems.slice(2)],
    isCollapsed: false,
    visibleOnMobile: true
  },
  render: args => <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">El menú de usuarios está expandido y activo, mostrando el conector visual sutil.</div>
    </div>
}`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const N=["Default","Collapsed","WithActiveSubmenu"],S=Object.freeze(Object.defineProperty({__proto__:null,Collapsed:i,Default:a,WithActiveSubmenu:o,__namedExportsOrder:N,default:A},Symbol.toStringTag,{value:"Module"}));export{S};
