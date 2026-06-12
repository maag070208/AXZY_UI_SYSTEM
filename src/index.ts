import "./index.css";

// HOOKS
import useClickOutside from "./hooks/useClickOutside";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch";
import { useEditableRow } from "./hooks/useEditableRow";
import { useTableState, UseTableStateOptions, UseTableStateResult } from "./hooks/useTableState";

// COMPONENTES
import ITAlert from "./components/alert/alert";
import ITAvatar from "./components/avatar/avatar";
import ITBadget from "./components/badget/badget";
import ITBreadcrumbs from "./components/breadcrumbs/breadcrumbs";
import ITButton from "./components/button/button";
import ITCalendar from "./components/calendar/calendar";
import ITCard from "./components/card/card";
import ITCheckbox from "./components/checkbox/checkbox";
import ITConfirmDialog from "./components/confirm-dialog/confirm-dialog";
import ITDataTable from "./components/data-table/dataTable";
import ITDatePicker from "./components/date-picker/datePicker";
import ITDialog from "./components/dialog/dialog";
import ITDivider from "./components/divider/divider";
import ITDrawer from "./components/drawer/drawer";
import ITEmptyState from "./components/empty-state/empty-state";
import ITFlex from "./components/flex/flex";
import ITFormBuilder from "./components/form-builder/formBuilder";
import ITFormHeader from "./components/form-header/form-header";
import ITGrid from "./components/grid/grid";
import ITImage from "./components/image/image";
import ITInput from "./components/input/input";
import ITNavbar from "./components/navbar/navbar";
import ITPagination from "./components/pagination/pagination";
import ITPopover from "./components/popover/popover";
import ITProgress from "./components/progress/progress";
import ITRadioGroup from "./components/radio/radio";
import ITSearchSelect from "./components/search-select/search-select";
import ITSelect from "./components/select/select";
import ITSearchTable from "./components/searchTable/searchTable";
import ITSegmentedControl from "./components/segmented-control/segmented-control";
import ITSidebar from "./components/sidebar/sidebar";
import ITSkeleton from "./components/skeleton/skeleton";
import ITSlideToggle from "./components/slide/slide";
import ITSlider from "./components/slider/slider";
import ITStack from "./components/stack/stack";
import ITStatCard from "./components/stat-card/stat-card";
import ITTable from "./components/table/table";
import ITText from "./components/text/text";
import ITTextarea from "./components/textarea/textarea";
import ITTabs from "./components/tabs/tabs";
import ITTripleFilter from "./components/triple-filter/tripleFilter";
import ITToast from "./components/toast/toast";

// PROPS
import type { ITAlertProps } from "./components/alert/alert.props";
import type { ITAvatarProps } from "./components/avatar/avatar.props";
import type { ITBadgetProps } from "./components/badget/badget.props";
import type { ITBreadcrumbsProps, ITBreadcrumbItem } from "./components/breadcrumbs/breadcrumbs.props";
import type { ITButtonProps } from "./components/button/button.props";
import type { ITCalendarProps } from "./components/calendar/calendar.props";
import type { ITCardProps } from "./components/card/card.props";
import type { ITCheckboxProps } from "./components/checkbox/checkbox.props";
import type { ITConfirmDialogProps } from "./components/confirm-dialog/confirm-dialog.props";
import type { ITDataTableFetchParams, ITDataTableProps, ITDataTableResponse } from "./components/data-table/dataTable.props";
import type { ITDatePickerProps } from "./components/date-picker/date-picker.props";
import type { ITDialogProps } from "./components/dialog/dialog.props";
import type { ITDividerProps } from "./components/divider/divider.props";
import type { ITDrawerProps } from "./components/drawer/drawer.props";
import type { ITEmptyStateProps } from "./components/empty-state/empty-state.props";
import type { ITFlexProps } from "./components/flex/flex.props";
import type { ITFormBuilderProps } from "./components/form-builder/formBuilder.props";
import type { ITFormHeaderProps } from "./components/form-header/form-header.props";
import type { ITGridProps } from "./components/grid/grid.props";
import type { ITImageProps } from "./components/image/image.props";
import type { ITInputProps } from "./components/input/input.props";
import type { ITNavbarProps } from "./components/navbar/navbar.props";
import type { ITPaginationProps } from "./components/pagination/pagination.props";
import type { ITPopoverProps } from "./components/popover/popover.props";
import type { ITProgressProps } from "./components/progress/progress.props";
import type { ITRadioGroupProps, ITRadioOption } from "./components/radio/radio.props";
import type { ITSearchSelectProps } from "./components/search-select/search-select.props";
import type { ITSelectProps } from "./components/select/select.props";
import type { ITSearchTableProps } from "./components/searchTable/searchTable.props";
import type { ITSegmentedControlProps } from "./components/segmented-control/segmented-control.props";
import type { ITSidebarProps, ITNavigationItem, ITNavigationSubItem } from "./components/sidebar/sidebar.props";
import type { ITSkeletonProps } from "./components/skeleton/skeleton.props";
import type { ITSlideToggleProps } from "./components/slide/slide.props";
import type { ITSliderProps } from "./components/slider/slider.props";
import type { ITStackProps } from "./components/stack/stack.props";
import type { ITStatCardProps } from "./components/stat-card/stat-card.props";
import type { ITTableProps, Column } from "./components/table/table.props";
import type { ITTextProps } from "./components/text/text.props";
import type { ITTextareaProps } from "./components/textarea/textarea.props";
import type { ITTabsProps, ITTabItem } from "./components/tabs/tabs.props";
import type { ITTripleFilterProps, ITTripleFilterOption } from "./components/triple-filter/tripleFilter.props";
import type { ITToastProps } from "./components/toast/toast.props";
import type { FieldConfig, FieldConfigV2 } from "./types/field.types";

// UTILS
import ITDropfile, { UploadStatus, FileTypeEnum } from "./components/dropfile/dropfile";
import ITLayout from "./components/layout/layout";
import { ITLayoutProps } from "./components/layout/layout.props";
import ITLoader from "./components/loader/loader";
import type { LoaderProps as ITLoaderProps } from "./components/loader/loader.props";
import ITStepper from "./components/stepper/stepper";
import type { ITStepperProps } from "./components/stepper/stepper.props";
import ITThemeProvider, { useITTheme, useITThemeSafe } from "./components/theme-provider/themeProvider";
import type { ITThemeProviderProps, ITThemePalette } from "./components/theme-provider/themeProvider.props";
import ITTimePicker from "./components/time-picker/timePicker";
import type { ITTimePickerProps } from "./components/time-picker/timePicker.props";
import type { ITThemeConfig } from "./theme/theme.types";
import { createValidationSchema } from "./types/yup.types";

import { getContrastTextColor, isLightColor, resolveCssColor } from "./utils/color.utils";

export {
  // Hooks
  useClickOutside, useDebouncedSearch, useEditableRow, useTableState,
  createValidationSchema,
  // Components
  ITAlert, ITAvatar, ITBadget, ITBreadcrumbs, ITButton,
  ITCalendar,
  ITCard, ITCheckbox, ITConfirmDialog, ITDataTable, ITDatePicker,
  ITDialog, ITDivider, ITDrawer,
  ITDropfile, ITEmptyState, ITFlex, ITFormBuilder, ITFormHeader, ITGrid, ITImage, ITInput, ITLayout,
  ITLoader, ITNavbar, ITPagination, ITPopover, ITProgress,
  ITRadioGroup, ITSelect, ITSearchSelect,
  ITSearchTable,
  ITSegmentedControl, ITSidebar, ITSkeleton, ITSlideToggle, ITSlider, ITStack, ITStatCard, ITStepper,
  ITTable, ITTabs, ITText, ITTextarea, ITTripleFilter, ITThemeProvider,
  useITTheme, useITThemeSafe, ITTimePicker, ITToast,
  UploadStatus, FileTypeEnum,
  getContrastTextColor, isLightColor, resolveCssColor
};

  export type {
    Column, FieldConfig,
    FieldConfigV2,
    ITAlertProps, ITAvatarProps, ITBadgetProps,
    ITBreadcrumbItem, ITBreadcrumbsProps, ITButtonProps,
    ITCalendarProps,
    ITCardProps, ITCheckboxProps, ITConfirmDialogProps,
    ITDataTableFetchParams, ITDataTableProps, ITDataTableResponse, ITDatePickerProps,
    ITDialogProps, ITDividerProps, ITDrawerProps,
    ITEmptyStateProps, ITFlexProps,
    ITFormBuilderProps, ITFormHeaderProps,
    ITGridProps, ITImageProps, ITInputProps,
    ITLayoutProps, ITLoaderProps, ITNavbarProps,
    ITNavigationItem, ITNavigationSubItem,
    ITPaginationProps, ITPopoverProps, ITProgressProps,
    ITRadioGroupProps, ITRadioOption, ITSelectProps, ITSearchSelectProps,
    ITSearchTableProps,
    ITSegmentedControlProps, ITSidebarProps, ITSkeletonProps, ITSlideToggleProps, ITSliderProps,
    ITStackProps, ITStatCardProps, ITStepperProps,
    ITTableProps, ITTabsProps, ITTabItem, ITTextProps, ITTextareaProps,
    ITTripleFilterProps, ITTripleFilterOption, ITThemeConfig, ITThemeProviderProps, ITThemePalette,
    ITTimePickerProps, ITToastProps,
    UseTableStateOptions, UseTableStateResult
  };


