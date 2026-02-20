import type { Meta, StoryObj } from '@storybook/react';
import ITLayout from './layout';
import { FaHome, FaUsers, FaChartBar, FaCog, FaShieldAlt } from 'react-icons/fa';

const meta: Meta<typeof ITLayout> = {
  title: 'Components/Layout & Navigation/ITLayout',
  component: ITLayout,
  parameters: {
    layout: 'fullscreen', // Ver en fullscreen por defecto
    docs: {
      story: {
        inline: false, // Forzar iframe para ver responsividad
        iframeHeight: 700,
      },
      description: {
        component: 'El contenedor principal ("Shell") de la interfaz. El Topbar abarca el ancho completo en la parte superior. El Sidebar está debajo del Topbar a la izquierda, y flota sobre el contenido cuando se expande (por hover) para no desplazar el diseño principal.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ITLayout>;

const mockUserMenu = {
  userName: 'Alejandro G.',
  userEmail: 'alejandro@axzy.io',
  userImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  menuItems: [
    { label: 'Mi Perfil', onClick: () => console.log('Perfil clicked') },
    { label: 'Cerrar Sesión', onClick: () => console.log('Logout clicked') },
  ],
};

const mockNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, action: () => {}, isActive: true },
  { 
    id: 'users', 
    label: 'Usuarios', 
    icon: <FaUsers />,
    subitems: [
      { id: 'list', label: 'Listado', action: () => {} },
      { id: 'roles', label: 'Roles', action: () => {} }
    ]
  },
  { id: 'analytics', label: 'Reportes', icon: <FaChartBar />, action: () => {} },
  { id: 'settings', label: 'Ajustes', icon: <FaCog />, action: () => {} },
];

export const DefaultShell: Story = {
  args: {
    sidebar: {
      navigationItems: mockNavigationItems,
    },
    topBar: {
      logoText: 'AXZY SYSTEM',
      userMenu: mockUserMenu,
      navItems: [
        { id: 'sec', label: 'Seguridad', icon: <FaShieldAlt />, action: () => {} }
      ]
    },
  },
  render: (args) => (
    <div className="h-[700px] w-full border border-gray-200 overflow-hidden rounded-xl shadow-lg my-8 mx-auto xl:max-w-6xl">
       <ITLayout {...args}>
          {/* Mocked Page Content */}
          <div className="max-w-4xl mx-auto space-y-6 pb-20">
             <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bienvenido de vuelta, Alejandro</h1>
                <p className="mt-2 text-slate-500 text-sm">A continuación un resumen de la actividad de tu plataforma.</p>
             </header>

             {/* Metric Cards Mock */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { title: 'Usuarios Activos', value: '1,245', trend: '+12% este mes' },
                   { title: 'Reportes Hoy', value: '45', trend: '-2% este mes' },
                   { title: 'Ventas USD', value: '$12,400', trend: '+5.4% este mes' }
                 ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                        <span className="text-sm font-medium text-slate-500">{stat.title}</span>
                        <span className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</span>
                        <span className="text-xs font-semibold text-emerald-500 mt-4 bg-emerald-50 w-fit px-2 py-1 rounded-md">{stat.trend}</span>
                    </div>
                 ))}
             </div>

             {/* Table Mock */}
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 overflow-hidden hover:shadow-md transition-shadow">
                 <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-base font-semibold text-slate-800">Actividad Reciente</h3>
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Ver todo →</button>
                 </div>
                 <div className="p-6">
                    <div className="animate-pulse space-y-4">
                       {[1,2,3,4].map(i => (
                          <div key={i} className="flex gap-4 items-center">
                             <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-3 bg-slate-100 rounded-full w-1/4"></div>
                                <div className="h-2 bg-slate-50 rounded-full w-1/3"></div>
                             </div>
                             <div className="w-20 h-6 bg-slate-100 rounded-full"></div>
                          </div>
                       ))}
                    </div>
                 </div>
             </div>
          </div>
       </ITLayout>
    </div>
  )
};
