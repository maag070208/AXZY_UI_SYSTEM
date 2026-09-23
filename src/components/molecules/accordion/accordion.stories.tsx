import type { Meta, StoryObj } from "@storybook/react";
import ITAccordion from "@/components/molecules/accordion/accordion";
import ITBadget from "@/components/atoms/badget/badget";

const meta: Meta<typeof ITAccordion> = {
  title: "Components/Structure/ITAccordion",
  component: ITAccordion,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ITAccordion>;

const items = [
  {
    id: "what",
    title: "¿Qué es AXZY UI System?",
    content: "Una librería de componentes React + TypeScript con Tailwind CSS v4.",
  },
  {
    id: "install",
    title: "¿Cómo lo instalo?",
    content: "pnpm add @axzydev/axzy_ui_system",
  },
  {
    id: "theme",
    title: "¿Puedo personalizar el tema?",
    content: "Sí, usa ITThemeProvider para definir la paleta y tokens.",
  },
];

export const Default: Story = {
  render: () => (
    <div className="w-[520px]">
      <ITAccordion items={items} defaultOpenIds={["what"]} />
    </div>
  ),
};

export const AllowMultiple: Story = {
  render: () => (
    <div className="w-[520px]">
      <ITAccordion items={items} allowMultiple defaultOpenIds={["what", "install"]} />
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div className="w-[520px]">
      <ITAccordion items={items} variant="bordered" defaultOpenIds={["install"]} />
    </div>
  ),
};

export const WithIconAndBadge: Story = {
  render: () => (
    <div className="w-[520px]">
      <ITAccordion
        items={[
          { id: "1", title: "Novedades", icon: <span>✨</span>, content: "3 componentes nuevos." },
          { id: "2", title: "Pendientes", content: <ITBadget label="2" color="warning" size="sm" /> },
        ]}
        defaultOpenIds={["1"]}
      />
    </div>
  ),
};
