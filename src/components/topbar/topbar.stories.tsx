import type { Meta, StoryObj } from '@storybook/react';
import ITTopBar from './topbar';
import { FaShieldAlt, FaChartBar, FaUserCog } from 'react-icons/fa';

const meta: Meta<typeof ITTopBar> = {
  title: 'Components/Layout & Navigation/ITTopBar',
  component: ITTopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Un Header moderno, con efecto glassmorphism, sombras suaves y un submenú de usuario flotante con diseño premium. Totalmente integrado a theme.ts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ITTopBar>;

const mockUserMenu = {
  userName: 'Alejandro G.',
  userEmail: 'alejandro@axzy.io',
  userImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  menuItems: [
    { label: 'Mi Perfil', onClick: () => console.log('Perfil clicked') },
    { label: 'Configuración de Cuenta', onClick: () => console.log('Config clicked') },
    { label: 'Preferencias', onClick: () => console.log('Preferencias clicked') },
    { label: 'Cerrar Sesión', onClick: () => console.log('Logout clicked') },
  ],
};

const mockNavItems = [
  { id: '1', label: 'Monitor', icon: <FaChartBar />, action: () => console.log('Monitor') },
  { id: '2', label: 'Seguridad', icon: <FaShieldAlt />, action: () => console.log('Seguridad') },
  { id: '3', label: 'Admin', icon: <FaUserCog />, action: () => console.log('Admin') },
];

export const Default: Story = {
  args: {
    logoText: 'AXZY SYSTEM',
    showMobileMenuButton: true,
    userMenu: mockUserMenu,
    navItems: mockNavItems,
    onToggleMobileMenu: () => console.log('Toggle Mobile Menu'),
  },
  render: (args) => (
    <div className="h-[400px] w-full bg-slate-50 overflow-y-auto">
      <ITTopBar {...args} />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Contenido de ejemplo</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed mb-6">
          Haz scroll hacia abajo para ver cómo el ITTopBar mantiene su efecto glassmorphism 
          (fondo desenfocado) mientras se superpone al contenido. Prueba también a hacer clic 
          en el avatar del usuario a la derecha para ver el nuevo menú desplegable flotante.
        </p>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-24 bg-white rounded-xl border border-slate-200 shadow-sm mb-4"></div>
        ))}
      </div>
    </div>
  )
};

export const WithoutNavigation: Story = {
  args: {
    logoText: 'AXZY Simple',
    showMobileMenuButton: true,
    userMenu: {
      ...mockUserMenu,
      userImage: undefined, // Test without avatar image
    },
  },
  render: (args) => (
    <div className="h-[250px] w-full bg-slate-50">
      <ITTopBar {...args} />
    </div>
  )
};
