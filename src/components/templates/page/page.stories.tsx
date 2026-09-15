import type { Meta, StoryObj } from "@storybook/react-vite";
import ITPage from "@/components/templates/page/page";
import ITButton from "@/components/atoms/button/button";
import ITCard from "@/components/molecules/card/card";

const meta: Meta<typeof ITPage> = {
  title: "Components/Layout/ITPage",
  component: ITPage,
};

export default meta;
type Story = StoryObj<typeof ITPage>;

export const Default: Story = {
  args: {
    title: "Usuarios",
    description: "Gestión de usuarios del sistema",
    children: (
      <ITCard title="Contenido">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Aquí va el contenido de la página.
        </p>
      </ITCard>
    ),
  },
};

export const WithBreadcrumbsAndActions: Story = {
  args: {
    title: "Editar Producto",
    description: "Modifica los datos del producto",
    breadcrumbs: [
      { label: "Productos", href: "#" },
      { label: "Editar Producto" },
    ],
    actions: (
      <>
        <ITButton label="Cancelar" variant="outlined" size="sm" />
        <ITButton label="Guardar" size="sm" />
      </>
    ),
    children: (
      <ITCard title="Información General">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Contenido del formulario aquí.
        </p>
      </ITCard>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: "Dashboard",
    loading: true,
    children: null,
  },
};

export const WithError: Story = {
  args: {
    title: "Órdenes",
    error: "No se pudieron cargar las órdenes. Verifica tu conexión.",
    onRetry: () => alert("Retry clicked"),
    children: null,
  },
};

export const Empty: Story = {
  args: {
    title: "Notificaciones",
    empty: true,
    emptyTitle: "Sin notificaciones",
    emptyDescription: "No tienes notificaciones pendientes.",
    emptyAction: <ITButton label="Recargar" size="sm" onClick={() => alert("Refresh")} />,
    children: null,
  },
};

export const WithBackAction: Story = {
  args: {
    title: "Detalle del Usuario",
    description: "Información completa del usuario",
    backAction: () => alert("Back"),
    breadcrumbs: [
      { label: "Usuarios", href: "#" },
      { label: "Detalle" },
    ],
    children: (
      <ITCard title="Perfil">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Contenido del detalle aquí.
        </p>
      </ITCard>
    ),
  },
};
