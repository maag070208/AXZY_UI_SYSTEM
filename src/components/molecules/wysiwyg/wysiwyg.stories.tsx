import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ITWysiwyg from '@/components/molecules/wysiwyg/wysiwyg';

const meta = {
  title: 'Components/Form/ITWysiwyg',
  component: ITWysiwyg,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    toolbar: {
      control: 'select',
      options: [
        ['bold', 'italic', 'underline', 'highlight', 'ul', 'ol', 'clear'],
        ['bold', 'italic', 'underline'],
        ['ul', 'ol'],
      ],
    },
  },
} satisfies Meta<typeof ITWysiwyg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Escribe algo...',
    minHeight: 140,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Descripción',
    placeholder: 'Texto libre...',
  },
};

export const WithValue: Story = {
  args: {
    value: '<div>Texto con <strong>negrita</strong>, <em>itálica</em> y <u>subrayado</u>.</div><div><mark style="background-color:#fde68a">Con marcador</mark> y:</div><ul><li>Elemento uno</li><li>Elemento dos</li></ul>',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '<div>Contenido bloqueado para edición.</div>',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    label: 'Vista previa',
    value: '<div>Solo lectura, sin toolbar activo.</div>',
  },
};

export const WithError: Story = {
  args: {
    label: 'Descripción',
    error: 'Este campo es obligatorio.',
    value: '',
  },
};

export const CustomHighlight: Story = {
  args: {
    highlightColor: '#a7f3d0',
    label: 'Marcador verde',
  },
};

export const LiveValue: Story = {
  render: (args) => {
    const [html, setHtml] = useState<string>(
      '<div>Edita aquí y mira el HTML generado abajo.</div>'
    );
    return (
      <div className="w-96 space-y-4">
        <ITWysiwyg {...args} value={html} onChange={setHtml} />
        <pre className="max-h-40 overflow-auto rounded-lg bg-slate-950 p-3 text-[10px] text-emerald-300">
          <code>{html}</code>
        </pre>
      </div>
    );
  },
  args: {},
};