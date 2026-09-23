import "./index.css";

// HOOKS
import useClickOutside from "./hooks/useClickOutside";
import { useDebouncedSearch } from "./hooks/useDebouncedSearch";
import { useEditableRow } from "./hooks/useEditableRow";
import { useFloatingPanel } from "./hooks/useFloatingPanel";
import { useTableState, UseTableStateOptions, UseTableStateResult } from "./hooks/useTableState";

// COMPONENTES
import ITAccordion from "./components/molecules/accordion/accordion";
import ITAlert from "./components/molecules/alert/alert";
import ITAvatar from "./components/atoms/avatar/avatar";
import ITBadget from "./components/atoms/badget/badget";
import ITBreadcrumbs from "./components/molecules/breadcrumbs/breadcrumbs";
import ITButton from "./components/atoms/button/button";
import ITCalendar from "./components/molecules/calendar/calendar";
import ITCard from "./components/molecules/card/card";
import ITCheckbox from "./components/atoms/checkbox/checkbox";
import ITChip from "./components/atoms/chip/chip";
import ITChipInput from "./components/molecules/chip-input/chip-input";
import ITDropdownMenu from "./components/molecules/dropdown-menu/dropdown-menu";
import ITField from "./components/molecules/field/field";
import ITMaskedInput from "./components/molecules/masked-input/masked-input";
import ITMultiSelect from "./components/molecules/multi-select/multi-select";
import ITConfirmDialog from "./components/organisms/confirm-dialog/confirm-dialog";
import ITDataTable from "./components/organisms/data-table/dataTable";
import ITDatePicker from "./components/molecules/date-picker/datePicker";
import ITDialog from "./components/organisms/dialog/dialog";
import ITDivider from "./components/atoms/divider/divider";
import ITDrawer from "./components/organisms/drawer/drawer";
import ITEmptyState from "./components/molecules/empty-state/empty-state";
import ITFlex from "./components/atoms/flex/flex";
import ITFormBuilder from "./components/organisms/form-builder/formBuilder";
import ITFormHeader from "./components/molecules/form-header/form-header";
import ITGrid from "./components/atoms/grid/grid";
import ITImage from "./components/atoms/image/image";
import ITInput from "./components/atoms/input/input";
import ITNavbar from "./components/organisms/navbar/navbar";
import ITPage from "./components/templates/page/page";
import ITPageHeader from "./components/organisms/page-header/page-header";
import ITPagination from "./components/molecules/pagination/pagination";
import ITPopover from "./components/atoms/popover/popover";
import ITProgress from "./components/atoms/progress/progress";
import ITRadioGroup from "./components/atoms/radio/radio";
import ITSearchSelect from "./components/molecules/search-select/search-select";
import ITSelect from "./components/molecules/select/select";
import ITSearchTable from "./components/organisms/searchTable/searchTable";
import ITSegmentedControl from "./components/atoms/segmented-control/segmented-control";
import ITSidebar from "./components/organisms/sidebar/sidebar";
import ITSkeleton from "./components/atoms/skeleton/skeleton";
import ITSlideToggle from "./components/atoms/slide/slide";
import ITSlider from "./components/atoms/slider/slider";
import ITStack from "./components/atoms/stack/stack";
import ITStatCard from "./components/molecules/stat-card/stat-card";
import ITTable from "./components/molecules/table/table";
import ITText from "./components/atoms/text/text";
import ITTextarea from "./components/atoms/textarea/textarea";
import ITTabs from "./components/molecules/tabs/tabs";
import ITTripleFilter from "./components/organisms/triple-filter/tripleFilter";
import ITToast from "./components/organisms/toast/toast";
import ITWysiwyg from "./components/molecules/wysiwyg/wysiwyg";

// PROPS
import type { ITAlertProps } from "./components/molecules/alert/alert.props";
import type { ITAvatarProps } from "./components/atoms/avatar/avatar.props";
import type { ITBadgetProps } from "./components/atoms/badget/badget.props";
import type { ITBreadcrumbsProps, ITBreadcrumbItem } from "./components/molecules/breadcrumbs/breadcrumbs.props";
import type { ITButtonProps } from "./components/atoms/button/button.props";
import type { ITCalendarProps } from "./components/molecules/calendar/calendar.props";
import type { ITCardProps } from "./components/molecules/card/card.props";
import type { ITCheckboxProps } from "./components/atoms/checkbox/checkbox.props";
import type { ITChipProps } from "./components/atoms/chip/chip.props";
import type { ITChipInputProps } from "./components/molecules/chip-input/chip-input.props";
import type { ITConfirmDialogProps } from "./components/organisms/confirm-dialog/confirm-dialog.props";
import type { ITAccordionProps, ITAccordionItem } from "./components/molecules/accordion/accordion.props";
import type { ITDropdownMenuProps, ITDropdownMenuItem } from "./components/molecules/dropdown-menu/dropdown-menu.props";
import type { ITFieldProps } from "./components/molecules/field/field.props";
import type { ITMaskedInputProps } from "./components/molecules/masked-input/masked-input.props";
import type { ITMultiSelectProps, ITMultiSelectOption } from "./components/molecules/multi-select/multi-select.props";
import type { ITDataTableFetchParams, ITDataTableProps, ITDataTableResponse } from "./components/organisms/data-table/dataTable.props";
import type { ITDatePickerProps } from "./components/molecules/date-picker/date-picker.props";
import type { ITDialogProps } from "./components/organisms/dialog/dialog.props";
import type { ITDividerProps } from "./components/atoms/divider/divider.props";
import type { ITDrawerProps } from "./components/organisms/drawer/drawer.props";
import type { ITEmptyStateProps } from "./components/molecules/empty-state/empty-state.props";
import type { ITFlexProps } from "./components/atoms/flex/flex.props";
import type { ITFormBuilderProps } from "./components/organisms/form-builder/formBuilder.props";
import type { ITFormHeaderProps } from "./components/molecules/form-header/form-header.props";
import type { ITGridProps } from "./components/atoms/grid/grid.props";
import type { ITImageProps } from "./components/atoms/image/image.props";
import type { ITInputProps } from "./components/atoms/input/input.props";
import type { ITNavbarProps } from "./components/organisms/navbar/navbar.props";
import type { ITPageProps } from "./components/templates/page/page.props";
import type { ITPageHeaderProps } from "./components/organisms/page-header/page-header.props";
import type { ITPaginationProps } from "./components/molecules/pagination/pagination.props";
import type { ITPopoverProps } from "./components/atoms/popover/popover.props";
import type { ITProgressProps } from "./components/atoms/progress/progress.props";
import type { ITRadioGroupProps, ITRadioOption } from "./components/atoms/radio/radio.props";
import type { ITSearchSelectProps } from "./components/molecules/search-select/search-select.props";
import type { ITSelectProps } from "./components/molecules/select/select.props";
import type { ITSearchTableProps } from "./components/organisms/searchTable/searchTable.props";
import type { ITSegmentedControlProps } from "./components/atoms/segmented-control/segmented-control.props";
import type { ITSidebarProps, ITNavigationItem, ITNavigationSubItem } from "./components/organisms/sidebar/sidebar.props";
import type { ITSkeletonProps } from "./components/atoms/skeleton/skeleton.props";
import type { ITSlideToggleProps } from "./components/atoms/slide/slide.props";
import type { ITSliderProps } from "./components/atoms/slider/slider.props";
import type { ITStackProps } from "./components/atoms/stack/stack.props";
import type { ITStatCardProps } from "./components/molecules/stat-card/stat-card.props";
import type { ITTableProps, Column } from "./components/molecules/table/table.props";
import type { ITTextProps } from "./components/atoms/text/text.props";
import type { ITTextareaProps } from "./components/atoms/textarea/textarea.props";
import type { ITTabsProps, ITTabItem } from "./components/molecules/tabs/tabs.props";
import type { ITTripleFilterProps, ITTripleFilterOption } from "./components/organisms/triple-filter/tripleFilter.props";
import type { ITToastProps } from "./components/organisms/toast/toast.props";
import type { ITWysiwygProps } from "./components/molecules/wysiwyg/wysiwyg.props";
import type { FieldConfig, FieldConfigV2 } from "./types/field.types";

// UTILS
import ITDropfile, { UploadStatus, FileTypeEnum } from "./components/organisms/dropfile/dropfile";
import ITLayout from "./components/templates/layout/layout";
import { ITLayoutProps } from "./components/templates/layout/layout.props";
import ITLoader from "./components/atoms/loader/loader";
import type { LoaderProps as ITLoaderProps } from "./components/atoms/loader/loader.props";
import ITStepper from "./components/molecules/stepper/stepper";
import type { ITStepperProps } from "./components/molecules/stepper/stepper.props";
import ITThemeProvider, { useITTheme, useITThemeSafe } from "./components/theme-provider/themeProvider";
import type { ITThemeProviderProps, ITThemePalette } from "./components/theme-provider/themeProvider.props";
import ITTimePicker from "./components/molecules/time-picker/timePicker";
import type { ITTimePickerProps } from "./components/molecules/time-picker/timePicker.props";
import type { ITThemeConfig } from "./theme/theme.types";
import { createValidationSchema } from "./types/yup.types";

import { getContrastTextColor, isLightColor, resolveCssColor } from "./utils/color.utils";

export {
  // Hooks
  useClickOutside, useDebouncedSearch, useEditableRow, useFloatingPanel, useTableState,
  createValidationSchema,
  // Components
  ITAccordion,
  ITAlert, ITAvatar, ITBadget, ITBreadcrumbs, ITButton,
  ITCalendar,
  ITCard, ITCheckbox, ITChip, ITChipInput, ITConfirmDialog, ITDataTable, ITDatePicker,
  ITDropdownMenu, ITField, ITMaskedInput, ITMultiSelect,
  ITDialog, ITDivider, ITDrawer,
  ITDropfile, ITEmptyState, ITFlex, ITFormBuilder, ITFormHeader, ITGrid, ITImage, ITInput, ITLayout,
  ITLoader,   ITNavbar, ITPage, ITPageHeader, ITPagination, ITPopover, ITProgress,
  ITRadioGroup, ITSelect, ITSearchSelect,
  ITSearchTable,
  ITSegmentedControl, ITSidebar, ITSkeleton, ITSlideToggle, ITSlider, ITStack, ITStatCard, ITStepper,
  ITTable, ITTabs, ITText, ITTextarea, ITTripleFilter, ITThemeProvider,
  useITTheme, useITThemeSafe, ITTimePicker, ITToast, ITWysiwyg,
  UploadStatus, FileTypeEnum,
  getContrastTextColor, isLightColor, resolveCssColor
};

  export type {
    Column, FieldConfig,
    FieldConfigV2,
    ITAccordionItem, ITAccordionProps,
    ITAlertProps, ITAvatarProps, ITBadgetProps,
    ITBreadcrumbItem, ITBreadcrumbsProps, ITButtonProps,
    ITCalendarProps,
    ITCardProps, ITCheckboxProps, ITChipProps, ITChipInputProps, ITConfirmDialogProps,
    ITDropdownMenuItem, ITDropdownMenuProps, ITFieldProps, ITMaskedInputProps, ITMultiSelectOption, ITMultiSelectProps,
    ITDataTableFetchParams, ITDataTableProps, ITDataTableResponse, ITDatePickerProps,
    ITDialogProps, ITDividerProps, ITDrawerProps,
    ITEmptyStateProps, ITFlexProps,
    ITFormBuilderProps, ITFormHeaderProps,
    ITGridProps, ITImageProps, ITInputProps,
    ITLayoutProps, ITLoaderProps, ITNavbarProps,
    ITPageProps, ITPageHeaderProps,
    ITNavigationItem, ITNavigationSubItem,
    ITPaginationProps, ITPopoverProps, ITProgressProps,
    ITRadioGroupProps, ITRadioOption, ITSelectProps, ITSearchSelectProps,
    ITSearchTableProps,
    ITSegmentedControlProps, ITSidebarProps, ITSkeletonProps, ITSlideToggleProps, ITSliderProps,
    ITStackProps, ITStatCardProps, ITStepperProps,
    ITTableProps, ITTabsProps, ITTabItem, ITTextProps, ITTextareaProps,
    ITTripleFilterProps, ITTripleFilterOption, ITThemeConfig, ITThemeProviderProps, ITThemePalette,
    ITTimePickerProps, ITToastProps,
    ITWysiwygProps,
    UseTableStateOptions, UseTableStateResult
  };


