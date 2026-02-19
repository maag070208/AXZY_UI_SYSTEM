import type { Meta, StoryObj } from "@storybook/react";
import ITFormBuilder from "./form";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FieldConfig } from "@/types/field.types";

const meta: Meta<typeof ITFormBuilder> = {
  title: "Form/FormBuilder",
  component: ITFormBuilder,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Dynamic form builder using Formik and Yup configuration.",
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
  validationSchema 
}: { 
  children: (props: any) => React.ReactNode, 
  initialValues?: any,
  validationSchema?: any 
}) => {
  const [submittedValues, setSubmittedValues] = useState<any>(null);

  return (
    <div className="w-[600px] p-6 bg-white rounded-xl shadow-sm border border-gray-100">
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
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
              >
                Submit
              </button>
            </div>

            {submittedValues && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs font-mono">
                <p className="font-semibold text-gray-500 mb-1">Submitted Values:</p>
                <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

// --- Login Example ---

const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "Email Address",
    type: "text",
    placeholder: "john@example.com",
    required: true,
    column: 12,
    onChangeAction: (e) => {
      console.log(e.target.value);
    },
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

export const LoginExample: Story = {
  render: () => (
    <FormWrapper 
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
    >
      {(formikProps) => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Login</h3>
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

// --- Registration Example ---

const registerFields: FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
    required: true,
    column: 6,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    required: true,
    column: 6,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    column: 12,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    column: 6,
    options: [
      { value: "admin", label: "Administrator" },
      { value: "user", label: "User" },
      { value: "guest", label: "Guest" },
    ],
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    column: 6,
  },
  {
      name: "birthDate",
      label: "Birth Date",
      type: "date",
      column: 12,
  }
];

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  role: Yup.string().required("Required"),
  age: Yup.number().min(18, "Must be 18+").required("Required"),
  birthDate: Yup.date().nullable().required("Required"),
});

export const RegistrationExample: Story = {
  render: () => (
    <FormWrapper
      initialValues={{ 
          firstName: "", 
          lastName: "", 
          email: "", 
          role: "",
          age: "",
          birthDate: null 
      }}
      validationSchema={registerSchema}
    >
      {(formikProps) => (
        <div className="space-y-4">
           <h3 className="text-lg font-semibold text-gray-900 mb-2">User Registration</h3>
            <ITFormBuilder
            fields={registerFields}
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

// --- Grid System Example ---

const gridFields: FieldConfig[] = [
  { name: "col_12", label: "Full Width (col-12)", type: "text", column: 12 },
  { name: "col_6_a", label: "Half Width (col-6)", type: "text", column: 6 },
  { name: "col_6_b", label: "Half Width (col-6)", type: "text", column: 6 },
  { name: "col_4_a", label: "Third (col-4)", type: "text", column: 4 },
  { name: "col_4_b", label: "Third (col-4)", type: "text", column: 4 },
  { name: "col_4_c", label: "Third (col-4)", type: "text", column: 4 },
  { name: "col_3_a", label: "Quarter (col-3)", type: "text", column: 3 },
  { name: "col_3_b", label: "Quarter (col-3)", type: "text", column: 3 },
  { name: "col_3_c", label: "Quarter (col-3)", type: "text", column: 3 },
  { name: "col_3_d", label: "Quarter (col-3)", type: "text", column: 3 },
];

export const GridSystem: Story = {
  render: () => (
    <FormWrapper initialValues={{}}>
      {(formikProps) => (
         <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Grid Layout System</h3>
            <ITFormBuilder
            fields={gridFields}
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
