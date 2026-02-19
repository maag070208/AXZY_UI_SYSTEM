import clsx from "clsx";
import ITInput from "../input/input";
import ITSelect from "../select/select";
import { ITFormBuilderProps } from "./form.props";
import ITDatePicker from "../date-picker/datePicker";

const gridColsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  8: "grid-cols-8",
  12: "grid-cols-12",
};

const getGridColsClass = (columns: keyof typeof gridColsClasses) =>
  gridColsClasses[columns] || "grid-cols-12";

const getColSpanClass = (span: number | number[], maxCols: number) => {
  if (Array.isArray(span)) {
    const [sm, md, lg] = span;
    return `col-span-${Math.min(sm, maxCols)} md:col-span-${Math.min(
      md,
      maxCols
    )} lg:col-span-${Math.min(lg, maxCols)}`;
  } else {
    return `col-span-${Math.min(span, maxCols)}`;
  }
};
/**
 * Componente que construye un formulario dinámico utilizando Formik y Yup.
 *
 * Este componente toma una configuración de campos y genera un formulario con validación y manejo de estado.
 * El formulario puede ser flexible con tipos de campos como texto, selección y fecha.
 *
 * @param fields - Un arreglo de configuraciones de campos, donde cada campo contiene propiedades como nombre, tipo, etiqueta, opciones y validación.
 * @param columns - El número de columnas que debe tener el grid donde se distribuyen los campos del formulario.
 * @param values - Un objeto con los valores actuales de cada campo en el formulario.
 * @param handleChange - Función que se ejecuta cuando un campo cambia de valor.
 * @param handleBlur - Función que se ejecuta cuando un campo pierde el foco.
 * @param touched - Un objeto que indica qué campos han sido tocados (es decir, han sido visitados por el usuario).
 * @param errors - Un objeto que contiene los errores de validación de los campos, basado en Yup.
 *
 * @returns Un formulario dinámico renderizado que muestra los campos y sus errores de validación.
 *
 * @example
 * ```tsx
 * import ITFormBuilder from './ITFormBuilder';
 *
 * function App() {
 *   const [formValues, setFormValues] = useState({
 *     name: '',
 *     email: '',
 *   });
 *
 *   const handleFormChange = (event) => {
 *     const { name, value } = event.target;
 *     setFormValues((prev) => ({ ...prev, [name]: value }));
 *   };
 *
 *   return (
 *     <Formik
 *       initialValues={formValues}
 *       onSubmit={(values) => {
 *         //console.log(values);
 *       }}
 *     >
 *       {({ handleBlur, touched, errors }) => (
 *         <ITFormBuilder
 *           fields={[
 *             { name: 'name', label: 'Nombre', type: 'text', column: 6 },
 *             { name: 'email', label: 'Email', type: 'text', column: 6 },
 *           ]}
 *           columns={12}
 *           values={formValues}
 *           handleChange={handleFormChange}
 *           handleBlur={handleBlur}
 *           touched={touched}
 *           errors={errors}
 *         />
 *       )}
 *     </Formik>
 *   );
 * }
 * ```
 */

export default function ITFormBuilder({
  fields,
  columns = 12,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
}: ITFormBuilderProps) {
  return (
    <div
      className={clsx(
        "grid gap-4",
        getGridColsClass(columns as keyof typeof gridColsClasses)
      )}
    >
      {fields.map(
        ({
          name,
          label,
          type = "text",
          placeholder,
          required,
          column = 12,
          options,
          valueField,
          disabled = false,
          labelField,
          showHintLength,
          formatNumber = true,
          onChangeAction,
          ...props
        }) => (
          <div key={name} className={clsx(getColSpanClass(column, columns))}>
            {(() => {
              switch (type) {
                case "text":
                case "number":
                case "password":
                  return (
                    <ITInput
                      type={type}
                      name={name}
                      label={label}
                      placeholder={placeholder}
                      disabled={disabled}
                      value={values[name]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        if (onChangeAction && setFieldValue) {
                          onChangeAction(e.target.value, setFieldValue);
                        }
                      }}
                      onBlur={handleBlur}
                      currencyFormat={props.currencyFormat}
                      touched={touched[name]}
                      error={errors[name]}
                      required={required}
                      iconRight={props.rightIcon}
                      iconLeft={props.leftIcon}
                      showHintLength={showHintLength}
                      maxLength={props.maxLength}
                      minLength={props.minLength}
                      rows={props.rows}
                      formatNumber={formatNumber}
                    />
                  );
                case "select":
                  return (
                    <ITSelect
                      options={options || []}
                      name={name}
                      disabled={disabled}
                      label={label}
                      placeholder={placeholder}
                      value={values[name]}
                      valueField={valueField}
                      labelField={labelField}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleChange(e);
                        if (onChangeAction && setFieldValue) {
                          onChangeAction(e.target.value, setFieldValue);
                        }
                      }}
                      onBlur={handleBlur}
                      touched={touched[name]}
                      error={errors[name]}
                      required={required}
                    />
                  );
                case "date":
                  return (
                    <ITDatePicker
                      name={name}
                      disabled={disabled}
                      label={label}
                      value={values[name]}
                      onChange={(
                        e:
                          | React.ChangeEvent<HTMLInputElement>
                          | { target: { name: string; value: Date } }
                      ) => {
                        handleChange(e);
                        if (onChangeAction && setFieldValue) {
                          onChangeAction(e.target.value, setFieldValue);
                        }
                      }}
                      placeholder={placeholder}
                      onBlur={handleBlur}
                      touched={touched[name]}
                      error={errors[name]}
                      required={required}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </div>
        )
      )}
    </div>
  );
}
