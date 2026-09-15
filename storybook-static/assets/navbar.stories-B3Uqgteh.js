import{a0 as m,j as e,a1 as d,a2 as x,a3 as u,a4 as p}from"./iframe-B5RMobo9.js";const g={title:"Components/Layout & Navigation/ITNavbar",component:m,parameters:{layout:"fullscreen"},argTypes:{logoText:{control:"text",description:"Text displayed next to the logo"},navigationItems:{control:!1,description:"Navigation items with optional sub-items"},userMenu:{control:!1,description:"User menu configuration"},children:{control:!1,description:"Main content area"}}},c=[{id:"home",label:"Dashboard",icon:e.jsx(d,{}),action:()=>{},isActive:!0},{id:"analytics",label:"Analytics",icon:e.jsx(x,{}),action:()=>{},subitems:[{id:"reports",label:"Reports",action:()=>{}},{id:"metrics",label:"Metrics",action:()=>{}}]},{id:"users",label:"Users",icon:e.jsx(u,{}),action:()=>{}},{id:"settings",label:"Settings",icon:e.jsx(p,{}),action:()=>{}}],t={args:{logoText:"AXZY",navigationItems:c,userMenu:{userName:"John Doe",userEmail:"john@axzy.dev",menuItems:[{label:"Profile",onClick:()=>alert("Profile")},{label:"Logout",onClick:()=>alert("Logout")}]},children:e.jsxs("div",{className:"p-8",children:[e.jsx("h1",{className:"text-2xl font-bold text-slate-800 dark:text-white",children:"Welcome to AXZY"}),e.jsx("p",{className:"text-slate-500 dark:text-slate-400 mt-2",children:"Main content area goes here."})]})}},a={args:{logoText:"AXZY",navigationItems:c,children:e.jsx("div",{className:"p-8",children:e.jsx("h1",{className:"text-2xl font-bold text-slate-800 dark:text-white",children:"Public View"})})}};var s,o,l;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    logoText: 'AXZY',
    navigationItems: sampleNavigationItems,
    userMenu: {
      userName: 'John Doe',
      userEmail: 'john@axzy.dev',
      menuItems: [{
        label: 'Profile',
        onClick: () => alert('Profile')
      }, {
        label: 'Logout',
        onClick: () => alert('Logout')
      }]
    },
    children: <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome to AXZY</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Main content area goes here.</p>
      </div>
  }
}`,...(l=(o=t.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var i,r,n;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    logoText: 'AXZY',
    navigationItems: sampleNavigationItems,
    children: <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Public View</h1>
      </div>
  }
}`,...(n=(r=a.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const h=["Default","NoUserMenu"],v=Object.freeze(Object.defineProperty({__proto__:null,Default:t,NoUserMenu:a,__namedExportsOrder:h,default:g},Symbol.toStringTag,{value:"Module"}));export{v as S};
