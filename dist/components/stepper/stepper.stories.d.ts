import { Meta, StoryObj } from '@storybook/react';
import { default as ITStepper } from './stepper';
declare const meta: Meta<typeof ITStepper>;
export default meta;
type Story = StoryObj<typeof ITStepper>;
export declare const Default: Story;
export declare const WithIcons: Story;
export declare const StrictSequential: Story;
export declare const ScrollableContent: Story;
