import React from 'react';

export interface ITTripleFilterOption<T> {
  label: string;
  value: T;
}

export interface ITTripleFilterProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: ITTripleFilterOption<T>[];
  className?: string;
}
