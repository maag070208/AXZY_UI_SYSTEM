import { ITFormBuilderProps } from './form.props';
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
export default function ITFormBuilder({ fields, columns, values, handleChange, handleBlur, touched, errors, setFieldValue, }: ITFormBuilderProps): import("react/jsx-runtime").JSX.Element;
