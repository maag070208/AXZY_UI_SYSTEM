import { Meta, StoryObj } from '@storybook/react';
import { default as ITSidebar } from './sidebar';
declare const meta: Meta<typeof ITSidebar>;
export default meta;
type Story = StoryObj<typeof ITSidebar>;
export declare const Default: Story;
export declare const Collapsed: Story;
export declare const WithActiveSubmenu: Story;
