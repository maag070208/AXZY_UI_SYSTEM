import{r,j as e,A as v,x as g,y as N,z as w,B as j}from"./iframe-BUyFEAH8.js";import{I as y}from"./topbar-DbMKW4Tl.js";import{I as n}from"./sidebar-BN5GnOIW.js";import"./preload-helper-C1FmrZbK.js";function i({topBar:o,sidebar:a,children:d,className:x="",contentClassName:p=""}){const[h,b]=r.useState(!0),[f,s]=r.useState(!1);return e.jsxs("div",{className:`flex flex-col h-screen overflow-hidden w-full ${x}`,children:[e.jsx(y,{...o,showMobileMenuButton:!0,onToggleMobileMenu:()=>s(l=>!l)}),e.jsxs("div",{className:"flex flex-1 overflow-hidden relative",style:{backgroundColor:"var(--layout-bg, #f8fafc)"},children:[e.jsxs("div",{className:"hidden lg:block relative z-40 h-full",children:[e.jsx("div",{className:"w-[88px] h-full flex-shrink-0"}),e.jsx("div",{className:"absolute top-0 left-0 h-full",children:e.jsx(n,{...a,isCollapsed:h,onToggleCollapse:()=>b(l=>!l),visibleOnMobile:!1,className:"h-full drop-shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] flex-shrink-0"})})]}),f&&e.jsx("div",{className:"lg:hidden fixed inset-0 z-50 transition-opacity duration-300 backdrop-blur-sm bg-black/40",onClick:()=>s(!1),children:e.jsx("div",{className:"h-full w-fit flex transform transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]",onClick:l=>l.stopPropagation(),children:e.jsx(n,{...a,isCollapsed:!1,visibleOnMobile:!0,className:"h-full shadow-2xl relative z-[60]",onToggleCollapse:()=>s(!1),onItemClick:()=>s(!1),onSubItemClick:()=>s(!1)})})}),e.jsx("main",{className:"flex-1 overflow-y-auto w-full custom-scrollbar relative z-0",children:e.jsx("div",{className:`mx-auto w-full h-full ${p}`,children:d})})]})]})}i.__docgenInfo={description:"",methods:[],displayName:"ITLayout",props:{topBar:{required:!0,tsType:{name:"ITTopBarProps"},description:""},sidebar:{required:!0,tsType:{name:"ITSidebarProps"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},contentClassName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const A={title:"Components/Layout & Navigation/ITLayout",component:i,parameters:{layout:"fullscreen",docs:{story:{inline:!1,iframeHeight:700},description:{component:'El contenedor principal ("Shell") de la interfaz. El Topbar abarca el ancho completo en la parte superior. El Sidebar está debajo del Topbar a la izquierda, y flota sobre el contenido cuando se expande (por hover) para no desplazar el diseño principal.'}}},tags:["autodocs"]},k={userName:"Alejandro G.",userEmail:"alejandro@axzy.io",userImage:"https://i.pravatar.cc/150?u=a042581f4e29026024d",menuItems:[{label:"Mi Perfil",onClick:()=>console.log("Perfil clicked")},{label:"Cerrar Sesión",onClick:()=>console.log("Logout clicked")}]},T=[{id:"dashboard",label:"Dashboard",icon:e.jsx(g,{}),action:()=>{},isActive:!0},{id:"users",label:"Usuarios",icon:e.jsx(N,{}),subitems:[{id:"list",label:"Listado",action:()=>{}},{id:"roles",label:"Roles",action:()=>{}}]},{id:"analytics",label:"Reportes",icon:e.jsx(w,{}),action:()=>{}},{id:"settings",label:"Ajustes",icon:e.jsx(j,{}),action:()=>{}}],t={args:{sidebar:{navigationItems:T},topBar:{logoText:"AXZY SYSTEM",userMenu:k,navItems:[{id:"sec",label:"Seguridad",icon:e.jsx(v,{}),action:()=>{}}]}},render:o=>e.jsx("div",{className:"h-[700px] w-full border border-gray-200 overflow-hidden rounded-xl shadow-lg my-8 mx-auto xl:max-w-6xl",children:e.jsx(i,{...o,children:e.jsxs("div",{className:"max-w-4xl mx-auto space-y-6 pb-20",children:[e.jsxs("header",{className:"mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold tracking-tight text-slate-900",children:"Bienvenido de vuelta, Alejandro"}),e.jsx("p",{className:"mt-2 text-slate-500 text-sm",children:"A continuación un resumen de la actividad de tu plataforma."})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[{title:"Usuarios Activos",value:"1,245",trend:"+12% este mes"},{title:"Reportes Hoy",value:"45",trend:"-2% este mes"},{title:"Ventas USD",value:"$12,400",trend:"+5.4% este mes"}].map((a,d)=>e.jsxs("div",{className:"bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow",children:[e.jsx("span",{className:"text-sm font-medium text-slate-500",children:a.title}),e.jsx("span",{className:"text-3xl font-bold text-slate-800 mt-2",children:a.value}),e.jsx("span",{className:"text-xs font-semibold text-emerald-500 mt-4 bg-emerald-50 w-fit px-2 py-1 rounded-md",children:a.trend})]},d))}),e.jsxs("div",{className:"bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 overflow-hidden hover:shadow-md transition-shadow",children:[e.jsxs("div",{className:"p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50",children:[e.jsx("h3",{className:"text-base font-semibold text-slate-800",children:"Actividad Reciente"}),e.jsx("button",{className:"text-sm font-medium text-emerald-600 hover:text-emerald-700",children:"Ver todo →"})]}),e.jsx("div",{className:"p-6",children:e.jsx("div",{className:"animate-pulse space-y-4",children:[1,2,3,4].map(a=>e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-slate-100"}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx("div",{className:"h-3 bg-slate-100 rounded-full w-1/4"}),e.jsx("div",{className:"h-2 bg-slate-50 rounded-full w-1/3"})]}),e.jsx("div",{className:"w-20 h-6 bg-slate-100 rounded-full"})]},a))})})]})]})})})};var c,m,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    sidebar: {
      navigationItems: mockNavigationItems
    },
    topBar: {
      logoText: 'AXZY SYSTEM',
      userMenu: mockUserMenu,
      navItems: [{
        id: 'sec',
        label: 'Seguridad',
        icon: <FaShieldAlt />,
        action: () => {}
      }]
    }
  },
  render: args => <div className="h-[700px] w-full border border-gray-200 overflow-hidden rounded-xl shadow-lg my-8 mx-auto xl:max-w-6xl">
       <ITLayout {...args}>
          {/* Mocked Page Content */}
          <div className="max-w-4xl mx-auto space-y-6 pb-20">
             <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bienvenido de vuelta, Alejandro</h1>
                <p className="mt-2 text-slate-500 text-sm">A continuación un resumen de la actividad de tu plataforma.</p>
             </header>

             {/* Metric Cards Mock */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[{
            title: 'Usuarios Activos',
            value: '1,245',
            trend: '+12% este mes'
          }, {
            title: 'Reportes Hoy',
            value: '45',
            trend: '-2% este mes'
          }, {
            title: 'Ventas USD',
            value: '$12,400',
            trend: '+5.4% este mes'
          }].map((stat, i) => <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                        <span className="text-sm font-medium text-slate-500">{stat.title}</span>
                        <span className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</span>
                        <span className="text-xs font-semibold text-emerald-500 mt-4 bg-emerald-50 w-fit px-2 py-1 rounded-md">{stat.trend}</span>
                    </div>)}
             </div>

             {/* Table Mock */}
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 overflow-hidden hover:shadow-md transition-shadow">
                 <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-base font-semibold text-slate-800">Actividad Reciente</h3>
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Ver todo →</button>
                 </div>
                 <div className="p-6">
                    <div className="animate-pulse space-y-4">
                       {[1, 2, 3, 4].map(i => <div key={i} className="flex gap-4 items-center">
                             <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-3 bg-slate-100 rounded-full w-1/4"></div>
                                <div className="h-2 bg-slate-50 rounded-full w-1/3"></div>
                             </div>
                             <div className="w-20 h-6 bg-slate-100 rounded-full"></div>
                          </div>)}
                    </div>
                 </div>
             </div>
          </div>
       </ITLayout>
    </div>
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const z=["DefaultShell"];export{t as DefaultShell,z as __namedExportsOrder,A as default};
