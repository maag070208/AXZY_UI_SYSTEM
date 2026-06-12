import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITDrawer from "./drawer";
import ITButton from "../button/button";

const meta: Meta<typeof ITDrawer> = {
  title: "Components/Overlay/ITDrawer",
  component: ITDrawer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITDrawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ITButton label="Abrir Drawer" onClick={() => setOpen(true)} />
        <ITDrawer isOpen={open} onClose={() => setOpen(false)} title="Panel Lateral">
          <p className="text-sm text-slate-600 dark:text-slate-300">Contenido del drawer.</p>
        </ITDrawer>
      </>
    );
  },
};

export const PositionLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ITButton label="Abrir Izquierda" onClick={() => setOpen(true)} />
        <ITDrawer isOpen={open} onClose={() => setOpen(false)} position="left" title="Menú">
          <p className="text-sm text-slate-600">Drawer desde la izquierda.</p>
        </ITDrawer>
      </>
    );
  },
};
