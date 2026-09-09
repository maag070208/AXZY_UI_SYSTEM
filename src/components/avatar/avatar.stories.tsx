import type { Meta, StoryObj } from "@storybook/react";
import ITAvatar from "./avatar";
import { FaCircle } from "react-icons/fa";

const meta: Meta<typeof ITAvatar> = {
  title: "Components/Data Display/ITAvatar",
  component: ITAvatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITAvatar>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=test",
    alt: "User",
    size: "md",
  },
};

export const WithInitials: Story = {
  args: {
    initials: "JD",
    size: "md",
    color: "bg-primary-500",
  },
};

export const WithBadge: Story = {
  args: {
    initials: "AG",
    size: "lg",
    badge: <FaCircle className="text-emerald-500 text-[10px]" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <ITAvatar key={s} initials="A" size={s} />
      ))}
    </div>
  ),
};

export const WithRawColor: Story = {
  name: "Con color calculado en runtime",
  parameters: {
    docs: {
      description: {
        story:
          "Cuando el color se calcula dinámicamente (por ejemplo, un hash por usuario o etiqueta), pasa un valor de color real en vez de una clase de Tailwind. Una clase de Tailwind arbitraria solo se ve si ya existe en el CSS pre-compilado de esta librería; un color inline siempre se aplica.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      {["#3b82f6", "#a855f7", "#059669", "#f59e0b", "#ec4899"].map((hex) => (
        <ITAvatar key={hex} initials="JD" size="md" color={hex} />
      ))}
    </div>
  ),
};
