import { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import('react').FC<import('./calendar.props').ITCalendarProps>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        mode: {
            control: "select";
            options: string[];
            description: string;
        };
        value: {
            control: "date";
        };
        onEventClick: {
            action: string;
        };
        onSlotClick: {
            action: string;
        };
        onSelectRange: {
            action: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const WeekView: Story;
export declare const DayView: Story;
export declare const MonthView: Story;
export declare const WithInteractiveSelection: Story;
