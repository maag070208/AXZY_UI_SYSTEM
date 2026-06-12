import type { Meta, StoryObj } from "@storybook/react";
import ITStatCard from "./stat-card";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const meta: Meta<typeof ITStatCard> = {
  title: "Components/Data Display/ITStatCard",
  component: ITStatCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITStatCard>;

export const Default: Story = {
  args: {
    label: "Usuarios Activos",
    value: "1,245",
    trend: "+12.5%",
    trendDirection: "up",
  },
};

export const Negative: Story = {
  args: {
    label: "Tickets Abiertos",
    value: "23",
    trend: "-8.2%",
    trendDirection: "down",
    color: "bg-rose-50 dark:bg-rose-950/20",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Ventas Hoy",
    value: "$4,320",
    trend: "+5.4%",
    trendDirection: "up",
    icon: <FaArrowUp size={12} />,
  },
};
