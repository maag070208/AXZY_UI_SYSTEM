import * as Yup from "yup";
import { FieldConfig } from "./field.types";
export const createValidationSchema = (fields: FieldConfig[]) =>
  Yup.object().shape(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {} as Record<string, Yup.AnySchema>)
  );
