import type { Meta, StoryObj } from '@storybook/react';
import ITSidebar from '@/components/organisms/sidebar/sidebar';
import { FaHome, FaUsers, FaCog, FaChartBar, FaShieldAlt, FaShoppingCart, FaRegBell } from 'react-icons/fa';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

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
      <div className="flex-1 p-8 text-zinc-500 font-medium">Contenido principal simulado. Pasa el cursor por los íconos para ver el efecto de glassmorphism en los tooltips flotantes.</div>
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

const groupedSubItemActionSpy = fn();

export const Grouped: Story = {
  args: {
    navigationItems: [
      { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, isActive: false },
      {
        id: 'ventas',
        label: 'Ventas',
        icon: <FaShoppingCart />,
        subitems: [
          { id: 'ventas-resumen', label: 'Resumen', action: fn() },
          {
            id: 'gestion',
            label: 'Gestión',
            items: [
              { id: 'ordenes', label: 'Órdenes', action: groupedSubItemActionSpy },
              { id: 'facturas', label: 'Facturas', action: fn() },
            ],
          },
          {
            id: 'catalogo',
            label: 'Catálogo',
            items: [
              { id: 'productos', label: 'Productos', action: fn() },
              { id: 'cotizaciones', label: 'Cotizaciones', action: fn() },
            ],
          },
        ],
      },
      { id: 'settings', label: 'Configuración', icon: <FaCog />, action: fn() },
    ],
    isCollapsed: false,
    visibleOnMobile: true,
  },
  render: (args) => (
    <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">Los subítems de Ventas se agrupan bajo los títulos “Gestión” y “Catálogo”; los títulos no son interactivos.</div>
    </div>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Ventas' }));

    const heading = canvas.getByText('Gestión');
    // Wait out the 400ms expand transition before asserting visibility.
    await waitFor(() => expect(heading).toBeVisible());

    // The group <ul> is named by its heading via aria-labelledby.
    await expect(canvas.getByRole('list', { name: 'Gestión' })).toBeInTheDocument();

    // The heading is not focusable and is not inside anything with a tabindex.
    await expect(heading.closest('[tabindex]')).toBeNull();

    await userEvent.click(canvas.getByRole('button', { name: 'Órdenes' }));
    await expect(groupedSubItemActionSpy).toHaveBeenCalled();
  },
};

export const WithNotificationBadges: Story = {
  args: {
    navigationItems: [
      { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, isActive: true },
      { id: 'inbox', label: 'Bandeja', icon: <FaUsers />, badge: 12 },
      {
        id: 'alerts',
        label: 'Alertas',
        icon: <FaShieldAlt />,
        badge: 3,
        badgeProps: { color: 'warning', variant: 'outlined' },
      },
      { id: 'settings', label: 'Configuración', icon: <FaCog />, action: fn() },
    ],
    notification: {
      count: 5,
      icon: <FaRegBell />,
      label: 'Notificaciones',
      onClick: fn(),
    },
    isCollapsed: false,
    visibleOnMobile: true,
  },
  render: (args) => (
    <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">
        Cada ítem puede llevar un ITBadget con número (`badge` + `badgeProps`) y el sidebar admite una fila de notificación con contador (`notification`).
      </div>
    </div>
  ),
};

export const CollapsedNotifications: Story = {
  args: {
    navigationItems: [
      { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, isActive: true },
      { id: 'inbox', label: 'Bandeja', icon: <FaUsers />, badge: 12 },
      { id: 'settings', label: 'Configuración', icon: <FaCog /> },
    ],
    notification: {
      count: 9,
      icon: <FaRegBell />,
      label: 'Notificaciones',
    },
    isCollapsed: true,
    visibleOnMobile: true,
  },
  render: (args) => (
    <div className="h-screen bg-gray-50 flex">
      <ITSidebar {...args} />
      <div className="flex-1 p-8 text-zinc-500 font-medium">
        Al colapsar, la fila de notificación queda como icono + contador, y los badges de cada ítem siguen visibles como píldoras con número.
      </div>
    </div>
  ),
};
