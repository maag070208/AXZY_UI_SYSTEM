import type { Meta, StoryObj } from '@storybook/react';
import ITInput from './input';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const meta = {
  title: 'Components/Form Elements/ITInput',
  component: ITInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'textarea'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof ITInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: any = {
  args: {
    name: 'default-input',
    placeholder: 'Type something...',
  },
};

export const WithLabel: any = {
  args: {
    name: 'labeled-input',
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithIcons: any = {
  args: {
    name: 'icon-input',
    label: 'Email',
    type: 'email',
    placeholder: 'example@mail.com',
    iconLeft: <FaEnvelope className="text-gray-400" />,
  },
};

export const ClickableIcons: any = {
  args: {
    name: 'search-input',
    label: 'Search',
    placeholder: 'Search...',
    iconRight: (
      <button 
        onClick={() => alert('Search clicked!')}
        className="text-gray-500 hover:text-blue-500 transition-colors"
      >
        <FaUser />
      </button>
    ),
  },
};

export const Password: any = {
  args: {
    name: 'password-input',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    iconLeft: <FaLock className="text-gray-400" />,
  },
};

export const WithError: any = {
  args: {
    name: 'error-input',
    label: 'Email',
    value: 'invalid-email',
    touched: true,
    error: 'Please enter a valid email address',
    iconLeft: <FaEnvelope className="text-gray-400" />,
  },
};

export const Disabled: any = {
  args: {
    name: 'disabled-input',
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const TextArea: any = {
  args: {
    name: 'textarea',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Write a detailed description...',
    rows: 4,
  },
};

export const NumberInput: any = {
  args: {
    name: 'number-input',
    label: 'Quantity',
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100,
  },
};
