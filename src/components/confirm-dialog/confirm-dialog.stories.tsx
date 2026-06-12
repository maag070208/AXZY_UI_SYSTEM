import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITConfirmDialog from "./confirm-dialog";
import ITButton from "../button/button";

const meta: Meta<typeof ITConfirmDialog> = {
  title: "Components/Overlay/ITConfirmDialog",
  component: ITConfirmDialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITConfirmDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ITButton label="Eliminar" color="danger" onClick={() => setOpen(true)} />
        <ITConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { alert("Confirmado"); setOpen(false); }}
          title="Eliminar usuario"
          message="Esta acción no se puede deshacer. ¿Deseas eliminar este usuario?"
          confirmLabel="Eliminar"
          variant="danger"
        />
      </>
    );
  },
};
