import "./index.css";

// COMPONENTES
import ITButton from "./components/button/button";
import ITCalendar from "./components/calendar/calendar";
import ITCard from "./components/card/card";
import ITDatePicker from "./components/date-picker/datePicker";
import ITDialog from "./components/dialog/dialog";
import ITFormBuilder from "./components/form/form";
import ITInput from "./components/input/input";
import ITSelect from "./components/select/select";
import ITSlideToggle from "./components/slide/slide";
import ITTable from "./components/table/table";
import ITToast from "./components/toast/toast";
import ITNavbar from "./components/navbar/navbar";
import ITText from "./components/text/text";
import ITImage from "./components/image/image";
import ITBadget from "./components/badget/badget";
import ITPagination from "./components/pagination/pagination";

// PROPS
import type { ITButtonProps } from "./components/button/button.props";
import type { ITCalendarProps } from "./components/calendar/calendar.props";
import type { ITCardProps } from "./components/card/card.props";
import type { ITDatePickerProps } from "./components/date-picker/date-picker.props";
import type { ITDialogProps } from "./components/dialog/dialog.props";
import type { ITFormBuilderProps } from "./components/form/form.props";
import type { ITInputProps } from "./components/input/input.props";
import type { ITSelectProps } from "./components/select/select.props";
import type { ITSlideToggleProps } from "./components/slide/slide.props";
import type { FieldConfig } from "./types/field.types";
import type { ITToastProps } from "./components/toast/toast.props";
import type { ITNavbarProps } from "./components/navbar/navbar.props";
import type { ITTableProps, Column } from "./components/table/table.props";
import type { ITBadgetProps } from "./components/badget/badget.props";
import type { ITPaginationProps } from "./components/pagination/pagination.props";

// UTILS
import { createValidationSchema } from "./types/yup.types";
import ITLoader from "./components/loader/loader";
import ITLayout from "./components/layout/layout";
import { ITLayoutProps } from "./components/layout/layout.props";
import ITTimePicker, {
  ITTimePickerProps,
} from "./components/time-picker/timePicker";
import ITDropfile from "./components/dropfile/dropfile";
import ITStepper from "./components/stepper/stepper";

export {
  ITButton,
  ITCalendar,
  ITCard,
  ITDatePicker,
  ITDialog,
  ITFormBuilder,
  ITInput,
  ITSelect,
  ITSlideToggle,
  ITTable,
  ITToast,
  ITNavbar,
  ITText,
  ITImage,
  ITBadget,
  ITLayout,
  ITLoader,
  ITTimePicker,
  ITDropfile,
  ITStepper,
  ITPagination,
  createValidationSchema,
};

export type {
  Column,
  ITBadgetProps,
  ITToastProps,
  ITButtonProps,
  ITCalendarProps,
  ITCardProps,
  ITDatePickerProps,
  ITDialogProps,
  ITFormBuilderProps,
  ITInputProps,
  ITSelectProps,
  ITSlideToggleProps,
  ITTableProps,
  ITNavbarProps,
  ITLayoutProps,
  ITTimePickerProps,
  FieldConfig,
};
