import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITCheckbox from "./checkbox";
import ITStack from "../stack/stack";

const meta: Meta<typeof ITCheckbox> = {
  title: "Components/Inputs/ITCheckbox",
  component: ITCheckbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITCheckbox>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(false);
    return <ITCheckbox checked={val} onChange={setVal} label="Acepto términos" />;
  },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Selección parcial" },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true, label: "Opción bloqueada" },
};

export const Group: Story = {
  render: () => {
    const [vals, setVals] = useState<Record<string, boolean>>({ a: true, b: false, c: false });
    const all = Object.values(vals).every(Boolean);
    const some = Object.values(vals).some(Boolean) && !all;
    return (
      <ITStack spacing={2}>
        <ITCheckbox
          checked={all}
          indeterminate={some}
          onChange={(v) => setVals({ a: v, b: v, c: v })}
          label="Seleccionar todo"
        />
        {Object.entries(vals).map(([k, v]) => (
          <ITCheckbox
            key={k}
            checked={v}
            onChange={(val) => setVals(p => ({ ...p, [k]: val }))}
            label={`Opción ${k.toUpperCase()}`}
          />
        ))}
      </ITStack>
    );
  },
};
