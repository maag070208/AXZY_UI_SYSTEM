import { Meta, StoryObj } from '@storybook/react';
import { default as ITToast } from './toast';
declare const meta: Meta<typeof ITToast>;
export default meta;
type Story = StoryObj<typeof ITToast>;
export declare const Default: Story;
export declare const Success: Story;
export declare const Error: Story;
export declare const Warning: Story;
/**
 * Multiple Toasts Preview
 * Note: A real implementation would manage multiple toasts via a Toast Provider Context.
 * This just shows how the colors resolve visually.
 */
export declare const AllTypesPreview: () => import("react/jsx-runtime").JSX.Element;
