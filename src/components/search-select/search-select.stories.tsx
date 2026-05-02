import type { Meta, StoryObj } from "@storybook/react";
import ITSearchSelect from "./search-select";
import { useState } from "react";
import { ITSearchSelectOption } from "./search-select.props";

const meta: Meta<typeof ITSearchSelect> = {
  title: "Components/Form Elements/ITSearchSelect",
  component: ITSearchSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
    isLoading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ITSearchSelect>;

const options: ITSearchSelectOption[] = [
  { value: 1, label: "Juan Pérez" },
  { value: 2, label: "María García" },
  { value: 3, label: "Carlos Rodríguez" },
  { value: 4, label: "Ana Martínez" },
  { value: 5, label: "Luis López" },
  { value: 6, label: "Elena Sánchez" },
  { value: 7, label: "Roberto Díaz" },
  { value: 8, label: "Marta Castro" },
];

const SearchSelectWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  const [touched, setTouched] = useState(false);

  return (
    <div className="w-[400px]">
      <ITSearchSelect
        {...args}
        value={value}
        onChange={(val) => setValue(val)}
        onBlur={() => setTouched(true)}
        touched={touched}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    options: options,
    placeholder: "Busca un usuario...",
  },
};

export const WithLabel: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Seleccionar Usuario",
    options: options,
    placeholder: "Busca un usuario...",
    required: true,
  },
};

export const RemoteAPI: Story = {
  render: (args) => {
    const [remoteOptions, setRemoteOptions] = useState<ITSearchSelectOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [val, setVal] = useState<string | number>("");

    const handleSearch = (query: string) => {
      setLoading(true);
      // Simular llamada a API
      setTimeout(() => {
        const results = options.filter(o => 
          o.label.toLowerCase().includes(query.toLowerCase())
        );
        setRemoteOptions(results);
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="w-[400px]">
        <ITSearchSelect
          {...args}
          value={val}
          options={remoteOptions}
          isLoading={loading}
          onSearch={handleSearch}
          onChange={(v) => setVal(v)}
        />
      </div>
    );
  },
  args: {
    name: "remote-search",
    label: "Búsqueda en API (Simulada)",
    placeholder: "Escribe para buscar...",
  },
};

export const WithError: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Campo con Error",
    options: options,
    error: "Este campo es obligatorio",
    touched: true,
  },
};

export const Disabled: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    name: "search-select",
    label: "Campo Deshabilitado",
    options: options,
    disabled: true,
  },
};
