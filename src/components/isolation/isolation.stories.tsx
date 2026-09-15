import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITCard from "@/components/molecules/card/card";
import ITDatePicker from "@/components/molecules/date-picker/datePicker";
import ITInput from "@/components/atoms/input/input";
import ITTextarea from "@/components/atoms/textarea/textarea";
import ITSelect from "@/components/molecules/select/select";
import ITButton from "@/components/atoms/button/button";
import ITTable from "@/components/molecules/table/table";
import ITDialog from "@/components/organisms/dialog/dialog";
import ITText from "@/components/atoms/text/text";

/**
 * Stories de validación de AISLAMIENTO CSS.
 *
 * Verifican que anidar componentes (p.ej. ITDatePicker dentro de ITCard) no
 * produzca interferencia de estilos entre padre e hijo. La arquitectura
 * garantiza esto porque cada componente estila SOLO su propio subárbol con
 * clases/utilities propias, nunca con selectores de ancestro genéricos.
 */
const meta = {
  title: "Isolation/CSS Encapsulation",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Validación de aislamiento: un componente hijo (ITDatePicker) dentro de un contenedor (ITCard) no debe heredar ni colisionar estilos del padre, y viceversa.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const DatePickerWrapper = () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <ITDatePicker
      name="inside-card-date"
      label="Fecha"
      value={date}
      onChange={(e: any) => setDate(e.target.value)}
    />
  );
};

const InputWrapper = () => {
  const [value, setValue] = useState("");
  return (
    <ITInput
      name="name"
      label="Nombre"
      placeholder="Escribe tu nombre"
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
};

const TextareaWrapper = () => {
  const [value, setValue] = useState("");
  return (
    <ITTextarea
      name="notes"
      label="Notas"
      placeholder="Detalles..."
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
};

const SelectWrapper = () => {
  const [value, setValue] = useState("");
  return (
    <ITSelect
      name="country"
      label="País"
      placeholder="Selecciona"
      value={value}
      options={[
        { value: "mx", label: "México" },
        { value: "us", label: "Estados Unidos" },
        { value: "es", label: "España" },
      ]}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
};

export const ITDatePickerInsideCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ITCard title="Card A">
        <p className="mb-4 text-secondary-600">
          Un ITDatePicker dentro de un ITCard. Sus estilos son independientes:
          el popover del calendario, el input y el label no se ven afectados por
          la tipografía/color del card.
        </p>
        <DatePickerWrapper />
      </ITCard>
      <ITCard title="Card B" onClick={() => {}}>
        <p className="mb-4 text-secondary-600">
          Card interactivo (hover). El date picker hermano debe seguir
          comportándose igual, sin contaminación visual entre ambos cards.
        </p>
        <DatePickerWrapper />
      </ITCard>
    </div>
  ),
};

export const FormControlsInsideCard: Story = {
  render: () => (
    <ITCard title="Formulario en Card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper />
        <SelectWrapper />
        <DatePickerWrapper />
        <TextareaWrapper />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <ITButton variant="outlined" color="secondary" label="Cancelar" />
        <ITButton variant="filled" color="primary" label="Guardar" />
      </div>
    </ITCard>
  ),
};

export const ITDialogInsideCard: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <ITCard title="Card con Diálogo">
        <p className="mb-4 text-secondary-600">
          Un ITDialog (fixed overlay) lanzado desde un ITCard. El overlay y su
          contenido usan su propio stacking context y estilos.
        </p>
        <ITButton
          variant="filled"
          color="primary"
          label="Abrir diálogo"
          onClick={() => setOpen(true)}
        />
        <ITDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Diálogo desde Card"
        >
          <p className="text-secondary-700">
            Contenido del diálogo. Estilos propios, sin interferencia del card.
          </p>
          <div className="mt-4 flex justify-end">
            <ITButton
              variant="outlined"
              color="secondary"
              label="Cerrar"
              onClick={() => setOpen(false)}
            />
          </div>
        </ITDialog>
      </ITCard>
    );
  },
};

export const ITTableInsideCard: Story = {
  render: () => (
    <ITCard title="Tabla en Card">
      <ITTable
        data={[
          { id: 1, name: "Juan Pérez", city: "CDMX" },
          { id: 2, name: "Ana García", city: "Guadalajara" },
          { id: 3, name: "Luis Martínez", city: "Monterrey" },
        ]}
        columns={[
          { key: "id", label: "ID", type: "number" },
          { key: "name", label: "Nombre", type: "string" },
          { key: "city", label: "Ciudad", type: "string" },
        ]}
      />
      <ITText as="p" className="mt-3 text-sm text-secondary-500">
        La tabla ocupa todo el ancho del card y conserva su propio estilo.
      </ITText>
    </ITCard>
  ),
};

export const NestedCards: Story = {
  render: () => (
    <ITCard title="Card externo">
      <p className="mb-4 text-secondary-600">
        Cards anidados: el interno (interactivo) no altera el externo.
      </p>
      <ITCard title="Card interno" onClick={() => {}}>
        <DatePickerWrapper />
      </ITCard>
    </ITCard>
  ),
};