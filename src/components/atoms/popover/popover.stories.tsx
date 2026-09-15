import type { Meta, StoryObj } from "@storybook/react";
import ITPopover from "./popover";
import ITButton from "../button/button";
import ITStack from "../stack/stack";

const meta: Meta<typeof ITPopover> = {
  title: "Components/Overlay/ITPopover",
  component: ITPopover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITPopover>;

export const Default: Story = {
  render: () => (
    <ITPopover trigger={<ITButton label="Abrir Popover" />}>
      <ITStack spacing={2}>
        <p className="text-sm font-semibold">Opciones</p>
        <button className="text-sm text-left text-slate-600 hover:text-slate-800">Editar</button>
        <button className="text-sm text-left text-slate-600 hover:text-slate-800">Eliminar</button>
      </ITStack>
    </ITPopover>
  ),
};
