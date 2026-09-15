import type { Meta, StoryObj } from "@storybook/react";
import ITEmptyState from "@/components/molecules/empty-state/empty-state";
import ITButton from "@/components/atoms/button/button";

const meta: Meta<typeof ITEmptyState> = {
  title: "Components/Data Display/ITEmptyState",
  component: ITEmptyState,
};

export default meta;
type Story = StoryObj<typeof ITEmptyState>;

export const Default: Story = {
  args: {
    title: "Sin resultados",
    description: "No se encontraron datos para los filtros seleccionados.",
    action: <ITButton label="Limpiar filtros" variant="outlined" size="sm" />,
  },
};
