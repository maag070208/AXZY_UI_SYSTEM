import type { Meta, StoryObj } from "@storybook/react";
import ITBreadcrumbs from "./breadcrumbs";

const meta: Meta<typeof ITBreadcrumbs> = {
  title: "Components/Navigation/ITBreadcrumbs",
  component: ITBreadcrumbs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITBreadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: "Inicio", href: "#" },
      { label: "Usuarios", href: "#" },
      { label: "Editar Perfil" },
    ],
  },
};
