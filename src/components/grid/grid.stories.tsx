import type { Meta, StoryObj } from "@storybook/react";
import ITGrid from "./grid";

const meta: Meta<typeof ITGrid> = {
  title: "Layout/ITGrid",
  component: ITGrid,
  tags: ["autodocs"],
  argTypes: {
    spacing: { control: { type: "range", min: 0, max: 8, step: 1 } },
    columns: { control: { type: "number", min: 1, max: 12 } },
  },
};

export default meta;
type Story = StoryObj<typeof ITGrid>;

const Cell = ({ children }: { children: string }) => (
  <div className="bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium h-full flex items-center justify-center">
    {children}
  </div>
);

export const ThreeColumns: Story = {
  args: { container: true, spacing: 2 },
  render: (args) => (
    <ITGrid {...args}>
      <ITGrid item xs={4}>
        <Cell>1/3</Cell>
      </ITGrid>
      <ITGrid item xs={4}>
        <Cell>1/3</Cell>
      </ITGrid>
      <ITGrid item xs={4}>
        <Cell>1/3</Cell>
      </ITGrid>
    </ITGrid>
  ),
};

export const Responsive: Story = {
  args: { container: true, spacing: 3 },
  render: (args) => (
    <ITGrid {...args}>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
      <ITGrid item xs={12} sm={6} md={4} lg={3}>
        <Cell>xs=12 sm=6 md=4 lg=3</Cell>
      </ITGrid>
    </ITGrid>
  ),
};

export const SidebarContent: Story = {
  args: { container: true, spacing: 4, columns: 12 },
  render: (args) => (
    <ITGrid {...args}>
      <ITGrid item xs={12} md={3}>
        <Cell>Sidebar (md: 3/12)</Cell>
      </ITGrid>
      <ITGrid item xs={12} md={9}>
        <Cell>Main Content (md: 9/12)</Cell>
      </ITGrid>
    </ITGrid>
  ),
};
