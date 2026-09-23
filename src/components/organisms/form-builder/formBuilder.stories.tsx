import type { Meta, StoryObj } from "@storybook/react";
import ITFormBuilder from "./formBuilder";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FieldConfig, FieldConfigV2 } from "@/types/field.types";
import {
  FaUser,
  FaEnvelope,
  FaSearch,
  FaLock,
  FaCalculator,
  FaCommentDots,
  FaCheckCircle,
} from "react-icons/fa";
import { expect, fn, userEvent } from "storybook/test";
import { useFormBuilder } from "./useFormBuilder";

const meta: Meta<typeof ITFormBuilder> = {
  title: "Components/Form Elements/ITFormBuilder",
  component: ITFormBuilder,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dynamic form builder using Formik and Yup configuration. Supports Legacy V1 and the powerful Enterprise V2 Grid mapping, validating, calculating, and conditional logic.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ITFormBuilder>;

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers shared by the test stories
// ─────────────────────────────────────────────────────────────────────────────

/** Controlled wrapper that drives the builder with local React state. */
const ControlledForm = ({
  children,
  initialValues,
}: {
  children: (props: {
    values: Record<string, any>;
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    setFieldValue: (field: string, value: any) => Promise<void>;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    touched: Record<string, boolean>;
    errors: Record<string, string>;
  }) => React.ReactNode;
  initialValues: Record<string, any>;
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors] = useState<Record<string, string>>({});

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target ?? {};
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e: any) => {
    const { name } = e.target ?? {};
    if (name) setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const setFieldValue = async (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {children({
        values,
        setValues,
        setFieldValue,
        handleChange,
        handleBlur,
        touched,
        errors,
      })}
      {/* Surface state so test play functions and humans can read it. */}
      <pre
        data-testid="form-state"
        style={{
          marginTop: 16,
          padding: 8,
          background: "#0f172a",
          color: "#a7f3d0",
          fontSize: 11,
          borderRadius: 8,
          maxWidth: 480,
          overflow: "auto",
        }}
      >
        {JSON.stringify({ values, touched, errors }, null, 2)}
      </pre>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Showcase stories (kept as-is for the Storybook gallery)
// ─────────────────────────────────────────────────────────────────────────────

const FormWrapper = ({
  children,
  initialValues = {},
  validationSchema,
  widthClass = "w-[800px]",
}: {
  children: (props: any) => React.ReactNode;
  initialValues?: any;
  validationSchema?: any;
  widthClass?: string;
}) => {
  const [submittedValues, setSubmittedValues] = useState<any>(null);

  return (
    <div
      className={`p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-full ${widthClass}`}
    >
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
                <p className="font-semibold text-gray-500 mb-1">
                  Payload Generado:
                </p>
                <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

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
    },
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
      { value: "OTHER", label: "Otro" },
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
  },
];

const showcaseSchema = Yup.object().shape({
  username: Yup.string().required("El nombre de usuario es requerido"),
  promoCode: Yup.string(),
  email: Yup.string()
    .email("Formato de correo inválido")
    .required("El correo es requerido"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("La contraseña es requerida"),
  subtotal: Yup.number()
    .typeError("Debe ser un número")
    .required("Requerido")
    .min(1, "Mayor a 0"),
  country: Yup.string().required("Selecciona un país"),
  rfc: Yup.string().when("country", {
    is: "MX",
    then: (schema) =>
      schema
        .length(13, "Debe tener 13 caracteres exactos")
        .required("El RFC es obligatorio para MX"),
    otherwise: (schema) => schema.notRequired(),
  }),
  date: Yup.date().required("Fecha requerida"),
  time: Yup.string().required("Hora requerida"),
  comments: Yup.string().max(200, "Máximo 200 caracteres"),
});

export const FullFeaturesShowcaseV2: Story = {
  render: () => (
    <FormWrapper
      initialValues={{
        username: "",
        promoCode: "",
        email: "",
        password: "",
        subtotal: "",
        iva: "",
        total: "",
        country: "",
        rfc: "",
        date: null,
        time: "",
        comments: "",
      }}
      validationSchema={showcaseSchema}
      widthClass="w-[1024px]"
    >
      {(formikProps) => (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ITFormBuilder V2 Completo
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Prueba los cálculos en tiempo real en "Subtotal", mira el
            comportamiento `disabled` vs `readonly`, interactúa con íconos e
            ingresa el país "México" para renderizar dinámicamente un campo.
          </p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Legacy Login (V1 Config Backward Compatibility)
          </h3>
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

// ─────────────────────────────────────────────────────────────────────────────
//  Test stories (interaction tests, run via `pnpm exec vitest run`)
// ─────────────────────────────────────────────────────────────────────────────

/** Renders a V2 config of three fields and asserts they are present in the DOM. */
export const TestRendersV2Basic: Story = {
  name: "Test: renders V2 basic fields",
  render: () => (
    <ControlledForm initialValues={{ name: "", role: "", dob: null }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          config={[
            { name: "name", label: "Name", type: "text", required: true, column: 6 },
            {
              name: "role",
              label: "Role",
              type: "select",
              required: true,
              column: 6,
              options: [
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ],
            },
            { name: "dob", label: "Date of Birth", type: "date", column: 12 },
          ]}
          columns={12}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/Name/)).toBeInTheDocument();
    await expect(canvas.getByLabelText(/Role/)).toBeInTheDocument();
    await expect(canvas.getByLabelText(/Date of Birth/)).toBeInTheDocument();
  },
};

/** Typing in the Name input bubbles through `handleChange` into the state. */
export const TestTypingUpdatesState: Story = {
  name: "Test: typing updates state via handleChange",
  render: () => (
    <ControlledForm initialValues={{ email: "" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          config={[
            { name: "email", label: "Email", type: "email", required: true },
          ]}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/Email/);
    await userEvent.type(input, "user@example.com");
    await expect(input).toHaveValue("user@example.com");

    const stateDump = canvas.getByTestId("form-state");
    await expect(stateDump.textContent).toContain('"email": "user@example.com"');
  },
};

/** RFC field appears only when country === "MX"; switching away hides it. */
export const TestConditionalRenderWhen: Story = {
  name: "Test: renderWhen shows / hides dependent field",
  render: () => (
    <ControlledForm initialValues={{ country: "", rfc: "" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          config={[
            {
              name: "country",
              label: "Country",
              type: "select",
              required: true,
              options: [
                { value: "", label: "Select..." },
                { value: "MX", label: "México" },
                { value: "US", label: "USA" },
              ],
            },
            {
              name: "rfc",
              label: "RFC",
              type: "text",
              dependsOn: ["country"],
              renderWhen: (v) => v.country === "MX",
              required: true,
            },
          ]}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    // Initially hidden.
    await expect(canvas.queryByLabelText(/RFC/)).toBeNull();

    // Pick Mexico → appears.
    const country = canvas.getByLabelText(/Country/);
    await userEvent.selectOptions(country, "MX");
    await expect(canvas.getByLabelText(/RFC/)).toBeInTheDocument();

    // Switch to USA → hidden again.
    await userEvent.selectOptions(country, "US");
    await expect(canvas.queryByLabelText(/RFC/)).toBeNull();
  },
};

/** Typing in subtotal triggers `onChangeAction` to recompute total. */
export const TestOnChangeActionComputesTotal: Story = {
  name: "Test: onChangeAction updates derived total",
  render: () => (
    <ControlledForm initialValues={{ subtotal: "", total: "" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          config={[
            {
              name: "subtotal",
              label: "Subtotal",
              type: "number",
              currencyFormat: true,
              onChangeAction: (val, ctx) => {
                const n = parseFloat(String(val).replace(/,/g, "")) || 0;
                ctx.setFieldValue("total", (n * 1.16).toFixed(2));
              },
            },
            { name: "total", label: "Total", type: "number", disabled: true },
          ]}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    const subtotal = canvas.getByLabelText(/Subtotal/);
    await userEvent.type(subtotal, "100");

    // Total should be derived to "116.50".
    const total = canvas.getByLabelText(/Total/) as HTMLInputElement;
    await expect(total.value).toBe("116.50");
  },
};

/** Disabled field cannot receive input; programmatic value still renders. */
export const TestDisabledFieldBlocksInput: Story = {
  name: "Test: disabled field blocks typing",
  render: () => (
    <ControlledForm initialValues={{ a: "", b: "fixed" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          config={[
            { name: "a", label: "Active", type: "text" },
            { name: "b", label: "Locked", type: "text", disabled: true },
          ]}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    const active = canvas.getByLabelText(/Active/);
    const locked = canvas.getByLabelText(/Locked/) as HTMLInputElement;

    await expect(locked).toBeDisabled();
    await expect(locked.value).toBe("fixed");

    await userEvent.type(active, "hello");
    await userEvent.type(locked, "X"); // should be a no-op
    await expect(locked.value).toBe("fixed");
    await expect(active).toHaveValue("hello");
  },
};

/** Required flag becomes true once another field exceeds a threshold. */
export const TestDynamicRequired: Story = {
  name: "Test: dynamicProps toggles required at runtime",
  render: () => (
    <ControlledForm initialValues={{ amount: 0, justification: "" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          config={[
            {
              name: "amount",
              label: "Amount",
              type: "number",
              defaultValue: 0,
              dependsOn: ["amount"],
              dynamicProps: (v) =>
                Number(v.amount) > 50 ? { required: true } : { required: false },
            },
            {
              name: "justification",
              label: "Justification",
              type: "text",
              dependsOn: ["amount"],
              dynamicProps: (v) =>
                Number(v.amount) > 50 ? { required: true } : { required: false },
            },
          ]}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    const amount = canvas.getByLabelText(/Amount/);
    await expect(amount).not.toBeRequired();

    await userEvent.clear(amount);
    await userEvent.type(amount, "75");

    const justification = canvas.getByLabelText(/Justification/);
    await expect(justification).toBeRequired();
  },
};

/** Async option loader renders a loading placeholder then the resolved list. */
export const TestAsyncOptionsLoad: Story = {
  name: "Test: async options loader resolves and renders options",
  render: () => {
    const config: FieldConfigV2[] = [
      {
        name: "city",
        label: "City",
        type: "select",
        options: async () => {
          await new Promise((r) => setTimeout(r, 50));
          return [
            { value: "cdmx", label: "Ciudad de México" },
            { value: "gdl", label: "Guadalajara" },
          ];
        },
      },
    ];
    return (
      <ControlledForm initialValues={{ city: "" }}>
        {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
          <ITFormBuilder
            config={config}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        )}
      </ControlledForm>
    );
  },
  play: async ({ canvas }) => {
    // Loading state shown until the loader settles.
    await expect(await canvas.findByTestId("field-loading-city")).toBeInTheDocument();

    // After settling, the search-select is rendered and accepts a value.
    const select = await canvas.findByLabelText(/City/);
    await userEvent.selectOptions(select, "gdl");
    await expect(select).toHaveValue("gdl");
  },
};

/** Section type renders the heading and nested fields. */
export const TestSectionRendersNestedFields: Story = {
  name: "Test: section renders nested fields",
  render: () => (
    <ControlledForm initialValues={{ firstName: "", lastName: "" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          config={[
            {
              name: "identity",
              label: "Personal Information",
              type: "section",
              fields: [
                { name: "firstName", label: "First Name", type: "text" },
                { name: "lastName", label: "Last Name", type: "text" },
              ],
            },
          ]}
          columns={12}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { name: /personal information/i }),
    ).toBeInTheDocument();
    await expect(canvas.getByLabelText(/First Name/)).toBeInTheDocument();
    await expect(canvas.getByLabelText(/Last Name/)).toBeInTheDocument();
  },
};

/** Custom `type: "custom"` mounts the user-defined component with the value. */
export const TestCustomComponentReceivesValue: Story = {
  name: "Test: custom component renders and updates value",
  render: () => {
    const ConfirmToggle = (props: any) => {
      const checked = !!props.value;
      return (
        <label data-testid="confirm-toggle">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => props.onChange?.(e.target.checked)}
          />
          {props.label}
        </label>
      );
    };
    return (
      <ControlledForm initialValues={{ confirm: false }}>
        {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
          <ITFormBuilder
            config={[
              {
                name: "confirm",
                label: "Confirm subscription",
                type: "custom",
                component: ConfirmToggle,
                defaultValue: false,
              },
            ]}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        )}
      </ControlledForm>
    );
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByLabelText(/Confirm subscription/) as HTMLInputElement;
    await expect(checkbox.checked).toBe(false);

    await userEvent.click(checkbox);
    await expect(checkbox.checked).toBe(true);

    await expect(canvas.getByTestId("form-state").textContent).toContain(
      '"confirm": true',
    );
  },
};

/** V1 legacy path still renders the supported input types. */
export const TestLegacyV1RendersBasic: Story = {
  name: "Test: V1 legacy renders basic inputs",
  render: () => (
    <ControlledForm initialValues={{ email: "", password: "" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <ITFormBuilder
          fields={[
            { name: "email", label: "Email", type: "text", required: true, column: 6 },
            { name: "password", label: "Password", type: "password", required: true, column: 6 },
          ]}
          columns={12}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    const email = canvas.getByLabelText(/Email/);
    const password = canvas.getByLabelText(/Password/);

    await userEvent.type(email, "a@b.co");
    await userEvent.type(password, "secret123");

    await expect(email).toHaveValue("a@b.co");
    await expect(password).toHaveValue("secret123");
  },
};

/** Custom button can read live progress via `useFormBuilder`. */
export const TestUseFormBuilderProgress: Story = {
  name: "Test: useFormBuilder returns live progress",
  render: () => {
    const ProgressBadge = () => {
      const { progress } = useFormBuilder();
      return (
        <span data-testid="progress-badge">
          {progress}% <FaCheckCircle />
        </span>
      );
    };
    return (
      <ControlledForm initialValues={{ a: "", b: "" }}>
        {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
<ITFormBuilder
              config={[
                { name: "a", label: "Field A", type: "text", required: true },
                { name: "b", label: "Field B", type: "text", required: true },
              ]}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
            >
              <ProgressBadge />
            </ITFormBuilder>
        )}
      </ControlledForm>
    );
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByTestId("progress-badge");
    await expect(badge.textContent).toContain("0%");

    await userEvent.type(canvas.getByLabelText(/Field A/), "hello");

    await expect(badge.textContent).toContain("50%");

    await userEvent.type(canvas.getByLabelText(/Field B/), "world");

    await expect(badge.textContent).toContain("100%");
  },
};

/** `fn()` is exposed for spy assertions; smoke-validates the props API. */
export const TestPropsApiAcceptsSpies: Story = {
  name: "Test: handleChange / setFieldValue spies are called",
  render: () => (
    <ControlledForm initialValues={{ x: "" }}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => {
        const handleChangeSpy = fn(handleChange);
        const setFieldValueSpy = fn(setFieldValue);
        return (
          <ITFormBuilder
            config={[{ name: "x", label: "X", type: "text" }]}
            values={values}
            handleChange={handleChangeSpy as any}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValueSpy}
          />
        );
      }}
    </ControlledForm>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/^X/);
    await userEvent.type(input, "z");
    await expect(input).toHaveValue("z");
  },
};