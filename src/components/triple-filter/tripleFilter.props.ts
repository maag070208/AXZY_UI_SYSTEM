import React from 'react';
import { ColorsTypes } from "@/types/colors.types";

export interface ITTripleFilterOption<T> {
  label: string;
  value: T;
}

export interface ITTripleFilterProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: ITTripleFilterOption<T>[];
  color?: ColorsTypes;
  className?: string;
}
