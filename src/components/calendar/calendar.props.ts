export interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string; // Date object or ISO string
  end: Date | string;
  color?: string; // Hex or tailwind class
  data?: any; // Extra data for callbacks
}

export interface ITCalendarProps {
  // Scheduler Props
  events?: CalendarEvent[];
  mode?: 'week' | 'day' | 'month'; // 'month' for picker
  onEventClick?: (event: CalendarEvent) => void;
  onSlotClick?: (date: Date) => void;
  onSlotHover?: (date: Date) => void;
  onSelectRange?: (start: Date, end: Date) => void;
  
  // Picker Props (Legacy/DatePicker support)
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;

  className?: string;
  disabled?: boolean;
}
