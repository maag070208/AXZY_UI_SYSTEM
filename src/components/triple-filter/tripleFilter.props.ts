import React from 'react';
import { ColorsTypes } from "@/types/colors.types";

export interface ITTripleFilterOption<T> {
  /** Display label for the filter button. */
  label: string;
  /** The value associated with this option (string or boolean). */
  value: T;
}

export interface ITTripleFilterProps<T> {
  /** Currently selected value. Must match one of the option values. */
  value: T;
  /** Called when the user selects a different option. Receives the new value. */
  onChange: (value: T) => void;
  /** Array of filter options to render (typically 2-4 items, e.g. All / Active / Inactive). */
  options: ITTripleFilterOption<T>[];
  /** Color theme for the active indicator. One of "primary", "secondary", "success", "danger", "warning", "info", "purple", "error", "gray". @default "primary" */
  color?: ColorsTypes;
  /** Additional CSS classes applied to the outermost container. */
  className?: string;
}
