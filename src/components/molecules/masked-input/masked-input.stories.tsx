import type { Meta } from '@storybook/react';
import { useState } from 'react';
import ITMaskedInput from './masked-input';

const meta = {
  title: 'Components/Form Elements/ITMaskedInput',
  component: ITMaskedInput,
  parameters: { layout: 'padded' },
  argTypes: {
    mask: { control: 'text' },
    placeholderChar: { control: 'text' },
    onChange: { action: 'changed' },
    onComplete: { action: 'completed' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple', 'gray'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof ITMaskedInput>;

export default meta;

function CodeMaskedWrapper(args: any) {
  const [value, setValue] = useState<string>('');
  return (
    <div className="w-full max-w-xs">
      <ITMaskedInput
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange(e);
        }}
      />
      <p className="mt-2 text-xs font-mono text-slate-500">
        raw: {value || '(vacío)'}
      </p>
    </div>
  );
}

export const Alphanumeric: any = {
  render: CodeMaskedWrapper,
  args: {
    name: 'code',
    label: 'Código único',
    mask: 'xxxx-xxxx-xxxx',
  },
};

export const Phone: any = {
  render: CodeMaskedWrapper,
  args: {
    name: 'phone',
    label: 'Teléfono',
    mask: '(999) 999-9999',
  },
};

export const CreditCard: any = {
  render: CodeMaskedWrapper,
  args: {
    name: 'card',
    label: 'Número de tarjeta',
    mask: '9999-9999-9999-9999',
    onComplete: undefined,
  },
};

const PhoneValidatedWrapper = (args: any) => {
  const [value, setValue] = useState<string>('5512345678');
  const [complete, setComplete] = useState<string | null>(null);
  return (
    <div className="w-full max-w-xs">
      <ITMaskedInput
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange(e);
          setComplete(null);
        }}
        onComplete={(v) => setComplete(v)}
      />
      {complete && (
        <p className="mt-2 text-xs font-mono text-emerald-600">
          ¡Completo! raw: {complete}
        </p>
      )}
    </div>
  );
};

export const WithPattern: any = {
  render: PhoneValidatedWrapper,
  args: {
    name: 'validated_phone',
    label: 'Teléfono válido (regex)',
    mask: '999-999-9999',
    pattern: /^\d{9}$/,
  },
};

export const Sizes: any = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <ITMaskedInput name="sz_sm" label="Small" mask="xxxx-xxxx" size="sm" onChange={() => {}} />
      <ITMaskedInput name="sz_md" label="Medium" mask="xxxx-xxxx" size="md" onChange={() => {}} />
      <ITMaskedInput name="sz_lg" label="Large" mask="xxxx-xxxx" size="lg" onChange={() => {}} />
    </div>
  ),
};

export const Disabled: any = {
  args: {
    name: 'disabled_code',
    label: 'Deshabilitado',
    mask: 'xxxx-xxxx',
    value: 'abcd',
    disabled: true,
    onChange: () => {},
  },
};