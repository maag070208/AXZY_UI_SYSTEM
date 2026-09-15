import type { Meta, StoryObj } from "@storybook/react";
import ITSkeleton from "@/components/atoms/skeleton/skeleton";
import ITStack from "@/components/atoms/stack/stack";

const meta: Meta<typeof ITSkeleton> = {
  title: "Components/Feedback/ITSkeleton",
  component: ITSkeleton,
};

export default meta;
type Story = StoryObj<typeof ITSkeleton>;

export const Text: Story = {
  render: () => (
    <ITStack spacing={2}>
      <ITSkeleton variant="text" width="60%" />
      <ITSkeleton variant="text" />
      <ITSkeleton variant="text" width="80%" />
    </ITStack>
  ),
};

export const Circular: Story = {
  args: { variant: "circular", width: 48, height: 48 },
};

export const Rectangular: Story = {
  args: { variant: "rectangular", width: "100%", height: 160 },
};
