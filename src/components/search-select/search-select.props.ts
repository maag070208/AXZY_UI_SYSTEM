import { FocusEvent } from "react";

export interface ITSearchSelectOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface ITSearchSelectProps {
  /** Nombre del campo para integraciones con formularios */
  name?: string;
  /** Etiqueta que se muestra arriba del select */
  label?: string;
  /** Texto que se muestra cuando no hay nada seleccionado */
  placeholder?: string;
  /** Valor seleccionado */
  value?: string | number;
  /** Arreglo de opciones (Modo 1: Lista estática) */
  options?: ITSearchSelectOption[];
  /** Campo que se usará como valor (por defecto "value") */
  valueField?: string;
  /** Campo que se usará como etiqueta (por defecto "label") */
  labelField?: string;
  /** Callback cuando cambia el valor */
  onChange?: (value: string | number, option?: ITSearchSelectOption) => void;
  /** Callback cuando pierde el foco */
  onBlur?: (e: FocusEvent<any>) => void;
  /** Indica si el componente está deshabilitado */
  disabled?: boolean;
  /** Clase CSS adicional para el contenedor */
  className?: string;
  /** Indica si el campo ha sido tocado (para validaciones) */
  touched?: boolean;
  /** Indica si el campo es requerido */
  required?: boolean;
  /** Mensaje de error */
  error?: string;
  /** Indica si el campo es de solo lectura */
  readOnly?: boolean;
  /** Callback para búsqueda en servidor (Modo 2: Conexión con API) */
  onSearch?: (query: string) => void;
  /** Indica si se está cargando información desde la API */
  isLoading?: boolean;
  /** Mensaje cuando no hay resultados */
  noResultsMessage?: string;
}
