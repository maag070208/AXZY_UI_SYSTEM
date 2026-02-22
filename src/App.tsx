import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { FieldConfigV2, ITFormBuilder, ITButton, ITCard } from './index';
import { FaUser, FaEnvelope, FaSearch, FaLock, FaCalculator, FaCommentDots } from 'react-icons/fa';
import "./index.css";

function App() {
  const formConfig: FieldConfigV2[] = [
    // --- ICONOS E INPUT BÁSICO ---
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      required: true,
      placeholder: "••••••••",
      leftIcon: <FaLock className="text-gray-400" />,
      column: { sm: 12, md: 6 },
    },
    {
      name: "username",
      label: "Usuario (Icono Izquierdo Fijo)",
      type: "text",
      placeholder: "Ej. dev123",
      required: true,
      leftIcon: <FaUser className="text-gray-400" />,
      column: { sm: 12, md: 6 },
    },
    {
      name: "promoCode",
      label: "Código Promo (Icono Derecho Click)",
      type: "text",
      placeholder: "Ingresa código...",
      rightIcon: (
        <button 
          type="button" 
          onClick={() => alert("¡Disparando búsqueda de código promocional!")}
          className="text-primary-600 hover:text-primary-800 transition px-2"
        >
          <FaSearch />
        </button>
      ),
      column: { sm: 12, md: 6 },
    },

    // --- CORREO Y PASSWORD (Password tiene su propio toggle de ojo) ---
    {
      name: "email",
      label: "Correo (Validación estricta YUP)",
      type: "email",
      placeholder: "ejemplo@correo.com",
      required: true,
      leftIcon: <FaEnvelope className="text-gray-400" />,
      column: { sm: 12, md: 6 },
    },
    

    // --- EVENTOS AL ESCRIBIR & ESTADOS BLOQUEADOS ---
    {
       name: "subtotal",
       label: "Subtotal (Dispara OnChange)",
       type: "number",
       required: true,
       currencyFormat: true,
       leftIcon: <FaCalculator className="text-gray-400" />,
       column: { sm: 12, md: 4 },
       onChangeAction: (val, { setFieldValue }) => {
          const num = parseFloat(val) || 0;
          setFieldValue("iva", (num * 0.16).toFixed(2));
          setFieldValue("total", (num * 1.16).toFixed(2));
       }
    },
    {
       name: "iva",
       label: "IVA (Read-Only)",
       type: "number",
       currencyFormat: true,
       readOnly: true, // Bloqueado, pero con color de texto normal y se envía
       column: { sm: 12, md: 4 },
    },
    {
       name: "total",
       label: "Total (Disabled)",
       type: "number",
       currencyFormat: true,
       disabled: true, // Completamente bloqueado e ignora focus, con estilo gris
       column: { sm: 12, md: 4 },
    },

    // --- DEPENDENCIA DINÁMICA DE RENDERIZADO ---
    {
      name: "country",
      label: "País (Muestra RFC si es MX)",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Selecciona país..." },
        { value: "MX", label: "México" },
        { value: "US", label: "Estados Unidos" },
        { value: "OTHER", label: "Otro" }
      ],
      column: { sm: 12, md: 6 },
    },
    {
      name: "rfc",
      label: "RFC de México (Renderización Condicional)",
      type: "text",
      dependsOn: ["country"], // Escucha cambios en 'country'
      renderWhen: (vals) => vals.country === "MX", // Sólo insertarlo en el DOM si es MX
      required: true,
      showHintLength: true,
      maxLength: 13,
      column: { sm: 12, md: 6 },
    },

    // --- COMPONENTES EXPERTOS ---
    {
      name: "date",
      label: "Selector de Fecha",
      type: "date",
      required: true,
      column: { sm: 12, md: 4 },
    },
    {
      name: "time",
      label: "Selector de Hora",
      type: "time" as any, 
      required: true,
      column: { sm: 12, md: 4 },
    },
    {
      name: "comments",
      label: "Comentarios (Textarea + Límite)",
      type: "textarea" as any, // Cast para forzar a FormBuilder enviarle esto al Input
      rows: 3,
      showHintLength: true,
      maxLength: 200,
      leftIcon: <FaCommentDots className="text-gray-400" />,
      column: { sm: 12, md: 4 },
    }
  ];

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es requerido"),
    promoCode: Yup.string(),
    email: Yup.string().email("Formato de correo inválido").required("El correo es requerido"),
    password: Yup.string().min(8, "Mínimo 8 caracteres").required("La contraseña es requerida"),
    subtotal: Yup.number().typeError("Debe ser un número").required("Requerido").min(1, "Mayor a 0"),
    country: Yup.string().required("Selecciona un país"),
    rfc: Yup.string().when('country', {
       is: 'MX',
       then: (schema) => schema.length(13, "Debe tener 13 caracteres exactos").required("El RFC es obligatorio para MX"),
       otherwise: (schema) => schema.notRequired()
    }),
    date: Yup.date().required("Fecha requerida"),
    time: Yup.string().required("Hora requerida"),
    comments: Yup.string().max(200, "Máximo 200 caracteres")
  });

  return (
   <div className='flex justify-center items-center h-screen bg-gray-50'>
     <ITCard className="flex flex-col gap-4 p-8 w-full max-w-6xl shadow-xl border border-gray-100 overflow-y-auto max-h-[90vh]">
      
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">ITFormBuilder V2: Showcase Completo</h2>
        <p className="text-gray-500 mt-1">Demostrando estados de validación, renderizado condicional, `disabled`, `readOnly`, componentes de hora/fecha, y acciones `onChange` todo bajo el diseño limpio de cuadrícula V1.</p>
      </div>

      <Formik 
        initialValues={{
          username: '',
          promoCode: '',
          email: '',
          password: '',
          subtotal: '',
          iva: '',
          total: '',
          country: '',
          rfc: '',
          date: null,
          time: '',
          comments: ''
        }} 
        validationSchema={validationSchema} 
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Valores Formulario:", values);
            alert("Exito! Revisa la consola para el JSON de datos.");
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({values, handleChange, handleBlur, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit}) => (
          <Form onSubmit={handleSubmit} className="w-full">
            <ITFormBuilder
              config={formConfig}
              columns={12}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              setFieldError={setFieldError}
              isSubmitting={isSubmitting}
            />

            <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
               <ITButton
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 font-semibold"
               >
                  Enviar Formulario
               </ITButton>
            </div>
          </Form>
        )}
      </Formik>
    </ITCard>
   </div>
  );
}

export default App;
