import type { Meta, StoryObj } from "@storybook/react";
import ITField from "@/components/molecules/field/field";
import ITInput from "@/components/atoms/input/input";

const meta: Meta<typeof ITField> = {
  title: "Components/Form Elements/ITField",
  component: ITField,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ITField>;

export const Default: Story = {
  render: () => (
    <div className="w-[360px]">
      <ITField label="Nombre completo" htmlFor="name" required helpText="Como aparece en tu identificación.">
        <ITInput name="name" value="" onChange={() => {}} onBlur={() => {}} />
      </ITField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-[360px]">
      <ITField label="Correo" htmlFor="email" required error="Ingresa un correo válido.">
        <ITInput name="email" value="correo-malo" onChange={() => {}} onBlur={() => {}} />
      </ITField>
    </div>
  ),
};

export const GenericError: Story = {
  render: () => (
    <div className="w-[360px]">
      <ITField label="RFC" htmlFor="rfc" required error>
        <ITInput name="rfc" value="" onChange={() => {}} onBlur={() => {}} />
      </ITField>
    </div>
  ),
};
