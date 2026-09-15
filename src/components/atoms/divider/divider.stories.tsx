import type { Meta, StoryObj } from "@storybook/react";
import ITDivider from "@/components/atoms/divider/divider";
import ITStack from "@/components/atoms/stack/stack";
import ITFlex from "@/components/atoms/flex/flex";

const meta: Meta<typeof ITDivider> = {
  title: "Components/Layout/ITDivider",
  component: ITDivider,
};

export default meta;
type Story = StoryObj<typeof ITDivider>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const Vertical: Story = {
  decorators: [(Story) => <ITFlex gap={3} className="h-12"><span>Left</span><Story /><span>Right</span></ITFlex>],
  args: { orientation: "vertical" },
};

export const InStack: Story = {
  render: () => (
    <ITStack spacing={3}>
      <div className="p-3 bg-slate-50 rounded-lg text-sm">Sección 1</div>
      <ITDivider />
      <div className="p-3 bg-slate-50 rounded-lg text-sm">Sección 2</div>
      <ITDivider />
      <div className="p-3 bg-slate-50 rounded-lg text-sm">Sección 3</div>
    </ITStack>
  ),
};
