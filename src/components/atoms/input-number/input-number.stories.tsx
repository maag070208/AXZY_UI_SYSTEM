import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FaDollarSign } from 'react-icons/fa';
import ITInputNumber from '@/components/atoms/input-number/input-number';
import { ITInputNumberProps } from './input-number.props';

const meta: Meta<typeof ITInputNumber> = {
  title: 'Components/Form Elements/ITInputNumber',
  component: ITInputNumber,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    decimals: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof ITInputNumber>;

/** Wrapper that keeps the value in state so the story reflects real usage. */
const Interactive = (props: Partial<ITInputNumberProps> & Pick<ITInputNumberProps, 'name'>) => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <div className="w-80">
      <ITInputNumber
        label="Monto"
        placeholder="0.00"
        {...props}
        value={value}
        onChange={(next) => setValue(next ?? null)}
      />
      <p className="mt-2 text-xs font-mono text-slate-500">
        value: {value === null ? 'null' : `${value} (${typeof value})`}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <Interactive name="amount" />,
};

export const WithPrefix: Story = {
  render: () => <Interactive name="amount-prefix" prefix="$" />,
};

export const WithIcon: Story = {
  render: () => (
    <Interactive name="amount-icon" iconLeft={<FaDollarSign className="text-slate-400" />} />
  ),
};

export const InitialValue: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(1234.5);
    return (
      <div className="w-80">
        <ITInputNumber
          name="amount-initial"
          label="Monto inicial"
          prefix="$"
          value={value}
          onChange={(next) => setValue(next ?? null)}
        />
        <p className="mt-2 text-xs font-mono text-slate-500">value: {value === null ? 'null' : value}</p>
      </div>
    );
  },
};

export const IntegersOnly: Story = {
  render: () => <Interactive name="quantity" label="Cantidad" decimals={0} />,
};

export const WithBounds: Story = {
  render: () => <Interactive name="bounded" label="Entre 10 y 500" min={10} max={500} />,
};

export const WithError: Story = {
  render: () => (
    <Interactive
      name="amount-error"
      label="Monto"
      prefix="$"
      touched
      error="El monto es obligatorio"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <ITInputNumber name="amount-disabled" label="Monto" value={1234.5} disabled onChange={() => {}} />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="w-80">
      <ITInputNumber name="amount-readonly" label="Monto" prefix="$" value={98765.43} readOnly onChange={() => {}} />
    </div>
  ),
};
