import type { Meta, StoryObj } from '@storybook/react';
import ITThemeProvider from './themeProvider';
import ITCard from '../card/card';
import ITButton from '../button/button';
import ITText from '../text/text';

const meta = {
  title: 'Components/System/ITThemeProvider',
  component: ITThemeProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    theme: { control: false, description: 'Custom theme palette to override defaults' },
    children: { control: false, description: 'App content wrapped by the theme context' },
    showFab: { control: 'boolean', description: 'Show the floating action button to open the theme designer' },
  },
} satisfies Meta<typeof ITThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ThemedContent = () => (
  <div className="p-8 space-y-4">
    <ITCard title="Theme Demo" className="max-w-sm">
      <div className="space-y-3">
        <ITText as="p" className="text-sm text-slate-600 dark:text-slate-300">
          This content is wrapped in ITThemeProvider and uses the current theme.
        </ITText>
        <div className="flex gap-2">
          <ITButton label="Primary" color="primary" />
          <ITButton label="Success" color="success" />
          <ITButton label="Danger" color="danger" />
        </div>
      </div>
    </ITCard>
  </div>
);

export const Default: Story = {
  args: {
    children: <ThemedContent />,
    showFab: false,
  },
};

export const CustomPrimaryColor: Story = {
  args: {
    theme: { primary: '#8b5cf6', success: '#22c55e' },
    children: <ThemedContent />,
    showFab: false,
  },
};

export const WithThemeFab: Story = {
  args: {
    children: <ThemedContent />,
    showFab: true,
  },
};
