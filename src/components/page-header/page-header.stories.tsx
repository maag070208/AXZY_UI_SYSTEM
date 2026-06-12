import type { Meta, StoryObj } from "@storybook/react-vite";
import ITPageHeader from "./page-header";
import ITButton from "../button/button";

const meta: Meta<typeof ITPageHeader> = {
  title: "Components/Layout/ITPageHeader",
  component: ITPageHeader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITPageHeader>;

export const Default: Story = {
  args: {
    title: "Usuarios",
    description: "Gestiona los usuarios del sistema",
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: "Editar Usuario",
    description: "Modifica los datos del usuario seleccionado",
    breadcrumbs: [
      { label: "Inicio", href: "#" },
      { label: "Usuarios", href: "#" },
      { label: "Editar Usuario" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: "Órdenes de Compra",
    description: "Listado de órdenes activas",
    breadcrumbs: [
      { label: "Dashboard", href: "#" },
      { label: "Órdenes" },
    ],
    actions: (
      <>
        <ITButton label="Exportar" variant="outlined" size="small" />
        <ITButton label="Nueva Orden" size="small" />
      </>
    ),
  },
};

export const WithBackAction: Story = {
  args: {
    title: "Detalle del Producto",
    description: "Información completa del producto",
    backAction: () => alert("Back clicked"),
    breadcrumbs: [
      { label: "Productos", href: "#" },
      { label: "Detalle" },
    ],
    actions: <ITButton label="Editar" size="small" />,
  },
};
