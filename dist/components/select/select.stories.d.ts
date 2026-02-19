import { Meta, StoryObj } from '@storybook/react';
import { default as ITSelect } from './select';
declare const meta: Meta<typeof ITSelect>;
export default meta;
type Story = StoryObj<typeof ITSelect>;
export declare const Default: Story;
export declare const WithLabel: Story;
export declare const WithError: Story;
export declare const Disabled: Story;
