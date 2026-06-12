import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITAlert from "./alert";

const meta: Meta<typeof ITAlert> = {
  title: "Components/Feedback/ITAlert",
  component: ITAlert,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITAlert>;

export const Info: Story = {
  args: { variant: "info", title: "Información", children: "Esto es un mensaje informativo." },
};

export const Success: Story = {
  args: { variant: "success", title: "Operación exitosa", children: "Los cambios se guardaron correctamente." },
};

export const Warning: Story = {
  args: { variant: "warning", title: "Advertencia", children: "Esta acción no se puede deshacer." },
};

export const Error: Story = {
  args: { variant: "error", title: "Error", children: "Ocurrió un error inesperado." },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <ITAlert variant="info" title="Cerrar" dismissible onDismiss={() => setVisible(false)}>
        Puedes cerrar esta alerta.
      </ITAlert>
    ) : (
      <p className="text-xs text-slate-400">Alerta cerrada.</p>
    );
  },
};
