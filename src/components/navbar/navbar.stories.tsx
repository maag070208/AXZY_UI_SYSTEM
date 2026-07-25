import type { Meta, StoryObj } from '@storybook/react';
import ITNavbar from './navbar';
import { FaHome, FaChartBar, FaCog, FaUsers } from 'react-icons/fa';

const meta = {
  title: 'Components/Layout & Navigation/ITNavbar',
  component: ITNavbar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    logoText: { control: 'text', description: 'Text displayed next to the logo' },
    navigationItems: { control: false, description: 'Navigation items with optional sub-items' },
    userMenu: { control: false, description: 'User menu configuration' },
    children: { control: false, description: 'Main content area' },
  },
} satisfies Meta<typeof ITNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNavigationItems = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: <FaHome />,
    action: () => {},
    isActive: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <FaChartBar />,
    action: () => {},
    subitems: [
      { id: 'reports', label: 'Reports', action: () => {} },
      { id: 'metrics', label: 'Metrics', action: () => {} },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: <FaUsers />,
    action: () => {},
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <FaCog />,
    action: () => {},
  },
];

export const Default: Story = {
  args: {
    logoText: 'AXZY',
    navigationItems: sampleNavigationItems,
    userMenu: {
      userName: 'John Doe',
      userEmail: 'john@axzy.dev',
      menuItems: [
        { label: 'Profile', onClick: () => alert('Profile') },
        { label: 'Logout', onClick: () => alert('Logout') },
      ],
    },
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome to AXZY</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Main content area goes here.</p>
      </div>
    ),
  },
};

export const NoUserMenu: Story = {
  args: {
    logoText: 'AXZY',
    navigationItems: sampleNavigationItems,
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Public View</h1>
      </div>
    ),
  },
};
