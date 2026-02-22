import type { Meta, StoryObj } from "@storybook/react";
import ITFormBuilder from "./formBuilder";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FieldConfig, FieldConfigV2 } from "@/types/field.types";
import { FaUser, FaEnvelope, FaSearch, FaLock, FaCalculator, FaCommentDots } from 'react-icons/fa';

const meta: Meta<typeof ITFormBuilder> = {
  title: "Components/Form Elements/ITFormBuilder",
  component: ITFormBuilder,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Dynamic form builder using Formik and Yup configuration. Supports Legacy V1 and the powerful Enterprise V2 Grid mapping, validating, calculating, and conditional logic.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITFormBuilder>;

// Wrapper for Formik context
const FormWrapper = ({ 
  children, 
  initialValues = {}, 
  validationSchema,
  widthClass = "w-[800px]"
}: { 
  children: (props: any) => React.ReactNode, 
  initialValues?: any,
  validationSchema?: any,
  widthClass?: string
}) => {
  const [submittedValues, setSubmittedValues] = useState<any>(null);

  return (
    <div className={`p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-full ${widthClass}`}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setSubmittedValues(values);
          console.log("Form submitted:", values);
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            {children(formikProps)}
            
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => formikProps.resetForm()}
              >
                Limpiar Formulario
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
              >
                Enviar Datos
              </button>
            </div>

            {submittedValues && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs font-mono overflow-auto max-h-40">
                <p className="font-semibold text-gray-500 mb-1">Payload Generado:</p>
                <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};


// --- Enterprise V2 Showcase ---

const showcaseConfig: FieldConfigV2[] = [
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
  {
    name: "email",
    label: "Correo (Validación estricta YUP)",
    type: "email",
    placeholder: "ejemplo@correo.com",
    required: true,
    leftIcon: <FaEnvelope className="text-gray-400" />,
    column: { sm: 12, md: 6 },
  },
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
     readOnly: true, 
     column: { sm: 12, md: 4 },
  },
  {
     name: "total",
     label: "Total (Disabled)",
     type: "number",
     currencyFormat: true,
     disabled: true, 
     column: { sm: 12, md: 4 },
  },
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
    dependsOn: ["country"], 
    renderWhen: (vals) => vals.country === "MX", 
    required: true,
    showHintLength: true,
    maxLength: 13,
    column: { sm: 12, md: 6 },
  },
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
    type: "textarea" as any, 
    rows: 3,
    showHintLength: true,
    maxLength: 200,
    leftIcon: <FaCommentDots className="text-gray-400" />,
    column: { sm: 12, md: 4 },
  }
];

const showcaseSchema = Yup.object().shape({
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

export const FullFeaturesShowcaseV2: Story = {
  render: () => (
    <FormWrapper 
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
      validationSchema={showcaseSchema}
      widthClass="w-[1024px]"
    >
      {(formikProps) => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">ITFormBuilder V2 Completo</h3>
            <p className="text-sm text-gray-500 mb-6">Prueba los cálculos en tiempo real en "Subtotal", mira el comportamiento `disabled` vs `readonly`, interactúa con íconos e ingresa el país "México" para renderizar dinámicamente un campo.</p>
            <ITFormBuilder
              config={showcaseConfig as any}
              columns={12}
              values={formikProps.values}
              handleChange={formikProps.handleChange}
              handleBlur={formikProps.handleBlur}
              touched={formikProps.touched}
              errors={formikProps.errors}
              setFieldValue={formikProps.setFieldValue}
            />
        </div>
      )}
    </FormWrapper>
  ),
};

// --- Legacy V1 Login Example ---

const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "Email Address",
    type: "text",
    placeholder: "john@example.com",
    required: true,
    column: 12,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    column: 12,
  },
];

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const LegacyV1LoginExample: Story = {
  render: () => (
    <FormWrapper 
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      widthClass="w-[500px]"
    >
      {(formikProps) => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Legacy Login (V1 Config Backward Compatibility)</h3>
            <ITFormBuilder
              fields={loginFields}
              columns={12}
              values={formikProps.values}
              handleChange={formikProps.handleChange}
              handleBlur={formikProps.handleBlur}
              touched={formikProps.touched}
              errors={formikProps.errors}
            />
        </div>
      )}
    </FormWrapper>
  ),
};

