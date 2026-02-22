import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as t}from"./sidebar-fii6lnW-.js";import{i as b,j as f,k as x,h,l as A}from"./index-CJju9sOb.js";import"./iframe-Dr0sZusW.js";import"./preload-helper-C1FmrZbK.js";import"./theme-CuplGK4O.js";const U={title:"Components/Layout & Navigation/ITSidebar",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"Un sidebar moderno, verdaderamente minimalista, hermoso y personalizable con estados colapsables y submenús. Soporta theming global con hover states y glassmorphism elegantes."}}},tags:["autodocs"]},a=[{id:"dashboard",label:"Dashboard",icon:e.jsx(b,{}),action:()=>console.log("Dashboard clicked"),isActive:!0},{id:"users",label:"Gestión de Usuarios",icon:e.jsx(f,{}),badge:"3",subitems:[{id:"users-list",label:"Lista de Usuarios",action:()=>console.log("Users list"),isActive:!1},{id:"users-roles",label:"Roles y Permisos",action:()=>console.log("Roles"),isActive:!1}]},{id:"analytics",label:"Analíticas",icon:e.jsx(x,{}),action:()=>console.log("Analytics clicked"),isActive:!1},{id:"security",label:"Seguridad",icon:e.jsx(h,{}),badge:"!",action:()=>console.log("Security clicked"),isActive:!1},{id:"settings",label:"Configuración",icon:e.jsx(A,{}),subitems:[{id:"settings-general",label:"General",action:()=>console.log("General"),isActive:!1},{id:"settings-theme",label:"Apariencia",action:()=>console.log("Theme"),isActive:!1}]}],i={args:{navigationItems:a,isCollapsed:!1,visibleOnMobile:!0},render:s=>e.jsxs("div",{className:"h-screen bg-gray-50 flex",children:[e.jsx(t,{...s}),e.jsx("div",{className:"flex-1 p-8 text-zinc-500 font-medium",children:"Contenido principal simulado. Juega con el botón de colapsar para ver las transiciones suaves."})]})},o={args:{navigationItems:a,isCollapsed:!0,visibleOnMobile:!0},render:s=>e.jsxs("div",{className:"h-screen bg-gray-50 flex",children:[e.jsx(t,{...s}),e.jsx("div",{className:"flex-1 p-8 text-zinc-500 font-medium",children:"Contenido principal... ¡Pasa el cursor sobre los íconos del sidebar para ver el efecto de glassmorphism en los tooltips flotantes!"})]})},l={args:{navigationItems:[...a.slice(0,1).map(s=>({...s,isActive:!1})),{...a[1],isActive:!0,subitems:[{id:"users-list",label:"Lista de Usuarios",action:()=>console.log("Users list"),isActive:!0},{id:"users-roles",label:"Roles y Permisos",action:()=>console.log("Roles"),isActive:!1}]},...a.slice(2)],isCollapsed:!1,visibleOnMobile:!0},render:s=>e.jsxs("div",{className:"h-screen bg-gray-50 flex",children:[e.jsx(t,{...s}),e.jsx("div",{className:"flex-1 p-8 text-zinc-500 font-medium",children:"El menú de usuarios está expandido y activo, mostrando el conector visual sutil."})]})};var r,n,c;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    navigationItems: baseNavigationItems,
    isCollapsed: false,
    visibleOnMobile: true
  },
  render: args => <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">Contenido principal simulado. Juega con el botón de colapsar para ver las transiciones suaves.</div>
    </div>
}`,...(c=(n=i.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var d,m,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    navigationItems: baseNavigationItems,
    isCollapsed: true,
    visibleOnMobile: true
  },
  render: args => <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">Contenido principal... ¡Pasa el cursor sobre los íconos del sidebar para ver el efecto de glassmorphism en los tooltips flotantes!</div>
    </div>
}`,...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,p,v;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(p=l.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};const z=["Default","Collapsed","WithActiveSubmenu"];export{o as Collapsed,i as Default,l as WithActiveSubmenu,z as __namedExportsOrder,U as default};
