import { ColorsTypes } from "@/types/colors.types";

export interface CalendarEvent {
  /** Unique identifier for the event. */
  id: string;
  /** Event display title. */
  title: string;
  /** Event start date/time. Accepts a `Date` object or ISO 8601 string. */
  start: Date | string;
  /** Event end date/time. Accepts a `Date` object or ISO 8601 string. */
  end: Date | string;
  /** Event indicator color. Accepts a hex code or CSS color value. */
  color?: string;
  /** Arbitrary extra data passed through to event callbacks. */
  data?: any;
}

export interface ITCalendarProps {
  /** Array of calendar events to display in the scheduler view. */
  events?: CalendarEvent[];
  /** Display mode. Valid values: `"week"`, `"day"`, `"month"`. Auto-detected as `"month"` when `onChange` is provided. */
  mode?: 'week' | 'day' | 'month';
  /** Callback fired when an event is clicked. */
  onEventClick?: (event: CalendarEvent) => void;
  /** Callback fired when an empty time slot is clicked. */
  onSlotClick?: (date: Date) => void;
  /** Callback fired when the mouse enters a time slot. */
  onSlotHover?: (date: Date) => void;
  /** Callback fired when a time range is selected via drag. */
  onSelectRange?: (start: Date, end: Date) => void;

  /** Currently selected date (date picker mode). */
  value?: Date;
  /** Callback fired when a date is selected in picker mode. */
  onChange?: (date: Date) => void;
  /** Selection mode for the date picker. Valid values: `"single"`, `"range"`. @default "single" */
  selectionMode?: 'single' | 'range';
  /** Start date for range selection. */
  startDate?: Date;
  /** End date for range selection. */
  endDate?: Date;
  /** Minimum selectable date (dates before this are disabled). */
  minDate?: Date;
  /** Maximum selectable date (dates after this are disabled). */
  maxDate?: Date;

  /** Additional CSS class names for the calendar container. */
  className?: string;
  /** Whether the calendar is in a disabled state. @default false */
  disabled?: boolean;
  /** Accent color theme for selection highlights. Uses semantic color keys. @default "primary" */
  variant?: ColorsTypes;
}
