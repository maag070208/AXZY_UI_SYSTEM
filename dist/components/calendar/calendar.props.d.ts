export interface CalendarEvent {
    id: string;
    title: string;
    start: Date | string;
    end: Date | string;
    color?: string;
    data?: any;
}
export interface ITCalendarProps {
    events?: CalendarEvent[];
    mode?: 'week' | 'day' | 'month';
    onEventClick?: (event: CalendarEvent) => void;
    onSlotClick?: (date: Date) => void;
    onSlotHover?: (date: Date) => void;
    onSelectRange?: (start: Date, end: Date) => void;
    value?: Date;
    onChange?: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    disabled?: boolean;
}
