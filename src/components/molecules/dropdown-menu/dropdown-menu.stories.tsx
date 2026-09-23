import type { Meta, StoryObj } from "@storybook/react";
import { FaEdit, FaCopy, FaTrash, FaDownload } from "react-icons/fa";
import ITDropdownMenu from "@/components/molecules/dropdown-menu/dropdown-menu";
import ITButton from "@/components/atoms/button/button";

const meta: Meta<typeof ITDropdownMenu> = {
  title: "Components/Navigation/ITDropdownMenu",
  component: ITDropdownMenu,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ITDropdownMenu>;

const items = [
  { id: "edit", label: "Editar", icon: <FaEdit />, onClick: () => alert("Editar") },
  { id: "copy", label: "Duplicar", icon: <FaCopy />, shortcut: "⌘D", onClick: () => alert("Duplicar") },
  { id: "download", label: "Descargar", icon: <FaDownload />, disabled: true },
  { id: "delete", label: "Eliminar", icon: <FaTrash />, danger: true, divider: true, onClick: () => alert("Eliminar") },
];

export const Default: Story = {
  args: { items },
};

export const CustomTrigger: Story = {
  args: {
    items,
    trigger: <span className="text-sm font-semibold px-1">Acciones</span>,
    triggerLabel: "Acciones",
  },
};

export const WithLabelButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ITButton label="Guardar" variant="filled" color="primary" size="sm" />
      <ITDropdownMenu items={items} />
    </div>
  ),
};
