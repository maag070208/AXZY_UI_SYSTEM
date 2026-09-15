import type { Meta, StoryObj } from "@storybook/react";
import ITPopover from "@/components/atoms/popover/popover";
import ITButton from "@/components/atoms/button/button";
import ITStack from "@/components/atoms/stack/stack";

const meta: Meta<typeof ITPopover> = {
  title: "Components/Overlay/ITPopover",
  component: ITPopover,
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
