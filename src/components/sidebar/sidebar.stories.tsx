import type { Meta, StoryObj } from '@storybook/react';
import ITSidebar from './sidebar';
import { FaHome, FaUsers, FaCog, FaChartBar, FaShieldAlt } from 'react-icons/fa';

const meta: Meta<typeof ITSidebar> = {
  title: 'Components/Layout & Navigation/ITSidebar',
  component: ITSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Un sidebar moderno, verdaderamente minimalista, hermoso y personalizable con estados colapsables y submenús. Soporta theming global con hover states y glassmorphism elegantes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ITSidebar>;

const baseNavigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <FaHome />,
    action: () => console.log('Dashboard clicked'),
    isActive: true,
  },
  {
    id: 'users',
    label: 'Gestión de Usuarios',
    icon: <FaUsers />,
    badge: '3',
    subitems: [
      { id: 'users-list', label: 'Lista de Usuarios', action: () => console.log('Users list'), isActive: false },
      { id: 'users-roles', label: 'Roles y Permisos', action: () => console.log('Roles'), isActive: false },
    ],
  },
  {
    id: 'analytics',
    label: 'Analíticas',
    icon: <FaChartBar />,
    action: () => console.log('Analytics clicked'),
    isActive: false,
  },
  {
    id: 'security',
    label: 'Seguridad',
    icon: <FaShieldAlt />,
    badge: '!',
    action: () => console.log('Security clicked'),
    isActive: false,
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: <FaCog />,
    subitems: [
      { id: 'settings-general', label: 'General', action: () => console.log('General'), isActive: false },
      { id: 'settings-theme', label: 'Apariencia', action: () => console.log('Theme'), isActive: false },
    ],
  },
];

export const Default: Story = {
  args: {
    navigationItems: baseNavigationItems,
    isCollapsed: false,
    visibleOnMobile: true,
  },
  render: (args) => (
    <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">Contenido principal simulado. Juega con el botón de colapsar para ver las transiciones suaves.</div>
    </div>
  ),
};

export const Collapsed: Story = {
  args: {
    navigationItems: baseNavigationItems,
    isCollapsed: true,
    visibleOnMobile: true,
  },
  render: (args) => (
    <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">Contenido principal... ¡Pasa el cursor sobre los íconos del sidebar para ver el efecto de glassmorphism en los tooltips flotantes!</div>
    </div>
  ),
};

export const WithActiveSubmenu: Story = {
  args: {
    navigationItems: [
      ...baseNavigationItems.slice(0, 1).map(i => ({...i, isActive: false})),
      {
        ...baseNavigationItems[1],
        isActive: true,
        subitems: [
          { id: 'users-list', label: 'Lista de Usuarios', action: () => console.log('Users list'), isActive: true },
          { id: 'users-roles', label: 'Roles y Permisos', action: () => console.log('Roles'), isActive: false },
        ]
      },
      ...baseNavigationItems.slice(2),
    ],
    isCollapsed: false,
    visibleOnMobile: true,
  },
  render: (args) => (
    <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">El menú de usuarios está expandido y activo, mostrando el conector visual sutil.</div>
    </div>
  ),
};
