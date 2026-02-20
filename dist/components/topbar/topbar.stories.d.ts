import { Meta, StoryObj } from '@storybook/react';
import { default as ITTopBar } from './topbar';
declare const meta: Meta<typeof ITTopBar>;
export default meta;
type Story = StoryObj<typeof ITTopBar>;
export declare const Default: Story;
export declare const WithoutNavigation: Story;
