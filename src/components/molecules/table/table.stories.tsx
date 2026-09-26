import type { Meta, StoryObj } from "@storybook/react";
import ITTable from "@/components/molecules/table/table";
import { Column } from "./table.props";
import ITBadget from "@/components/atoms/badget/badget";
import ITButton from "@/components/atoms/button/button";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const meta: Meta<typeof ITTable> = {
  title: "Components/Data Display/ITTable",
  component: ITTable,
  parameters: {
    layout: "padded", // Tables need more space
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "bordered"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    density: {
      control: "select",
      options: ["compact", "normal", "comfortable"],
    },
    layout: {
      control: "select",
      options: ["auto", "fixed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITTable>;

// --- MOCK DATA & COLUMNS ---

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  balance: number;
  isActive: boolean;
  lastLogin: string;
}

const mockRoles = [
  { id: 1, name: "Administrator" },
  { id: 2, name: "Editor" },
  { id: 3, name: "Viewer" },
];

const generateMockData = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    roleId: (i % 3) + 1,
    balance: Math.random() * 10000,
    isActive: i % 4 !== 0,
    lastLogin: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

const mockData = generateMockData(25);

const basicColumns: Column<User>[] = [
  { key: "id", label: "ID", type: "number" },
  { key: "name", label: "Name", type: "string" },
  { key: "email", label: "Email", type: "string" },
];

const advancedColumns: Column<User>[] = [
  { key: "id", label: "ID", type: "number", sortable: true, filter: true },
  { key: "name", label: "Name", type: "string", sortable: true, filter: true },
  { key: "email", label: "Email", type: "string", sortable: true, filter: true },
  { 
    key: "roleId", 
    label: "Role", 
    type: "catalog", 
    sortable: true, 
    filter: "catalog",
    catalogOptions: { data: mockRoles } 
  },
  { 
    key: "balance", 
    label: "Balance", 
    type: "number", 
    sortable: true, 
    currencyMX: true 
  },
  { 
    key: "isActive", 
    label: "Status", 
    type: "boolean", 
    sortable: true, 
    filter: true,
    render: (row) => (
      <ITBadget 
        label={row.isActive ? "Active" : "Inactive"} 
        color={row.isActive ? "success" : "danger"} 
      />
    )
  },
];


// --- STORIES ---

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: mockData.slice(0, 5), // Just a few
    title: "Basic Users Table",
  } as any,
};

export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    data: mockData,
    title: "Paginated Table",
    defaultItemsPerPage: 5,
    itemsPerPageOptions: [5, 10, 20],
  } as any,
};

export const WithSortingAndFiltering: Story = {
    args: {
      columns: advancedColumns.map(col => ({ ...col, render: undefined })), // Remove custom render to show raw formatting
      data: mockData,
      title: "Data Management (Sort & Filter)",
    } as any,
};

export const CustomRendering: Story = {
    args: {
      columns: advancedColumns,
      data: mockData,
      title: "Custom Rendering (Badges & Catalogs)",
    } as any,
};

// Wrapper for interactive actions
const ActionsTableWrapper = (args: any) => {
    const [data, setData] = useState(mockData.slice(0, 5));
    
    const actions: Column<User> = {
        key: "actions",
        label: "Actions",
        type: "actions",
        actions: (row) => (
          <>
            <ITButton size="sm" variant="text" color="danger" ariaLabel="Delete" onClick={() => setData(d => d.filter(item => item.id !== row.id))}>
              <FaTrash />
            </ITButton>
          </>
        ),
      };

    return <ITTable {...args} data={data} columns={[...basicColumns, actions]} />;
};

export const WithActions: Story = {
    render: (args) => <ActionsTableWrapper {...args} />,
    args: {
      title: "Table with Actions",
    } as any,
};

export const EmptyState: Story = {
    args: {
      columns: basicColumns,
      data: [],
      title: "No Data Available",
    } as any,
};

// Wrapper for clickable rows/cards
const RowClickWrapper = (args: any) => {
    const [selected, setSelected] = useState<User | null>(null);

    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-500">
          {selected
            ? `Selected: ${selected.name} (id ${selected.id})`
            : "Click a row/card or press Enter/Space while focused"}
        </p>
        <ITTable
          {...args}
          onRowClick={(row: User) => setSelected(row)}
        />
      </div>
    );
};

export const WithRowClick: Story = {
    render: (args) => <RowClickWrapper {...args} />,
    args: {
      columns: basicColumns,
      data: mockData.slice(0, 5),
      title: "Clickable Rows",
    } as any,
};

export const WithRowClickCards: Story = {
    render: (args) => <RowClickWrapper {...args} />,
    args: {
      columns: basicColumns,
      data: mockData.slice(0, 5),
      title: "Clickable Cards",
      defaultView: "cards",
    } as any,
};

// --- CONFIGURABLE LAYOUT / DENSITY ---

const longCellData: User[] = [
  {
    id: 1,
    name: "Extraordinariamente Largo Nombre de Usuario Que No Cabe",
    email: "usuario.con.un.correo.extremadamente.largo@example-enterprise-domain.com",
    roleId: 1,
    balance: 28400,
    isActive: true,
    lastLogin: "2026-07-18T09:30:00",
  },
  {
    id: 2,
    name: "Otra Persona Con Un Nombre Bastante Extenso Para Probar",
    email: "otra.persona.con.correo.extenso@example-enterprise-domain.com",
    roleId: 2,
    balance: 15200,
    isActive: false,
    lastLogin: "2026-07-17T14:22:00",
  },
];

const fixedColumns: Column<User>[] = [
  { key: "id", label: "ID", type: "number", width: 64, minWidth: 48, align: "center" },
  { key: "name", label: "Name", type: "string", width: "35%", truncate: true },
  { key: "email", label: "Email", type: "string", width: "45%", truncate: true },
];

export const CompactDensity: Story = {
  args: {
    columns: advancedColumns.map(col => ({ ...col, render: undefined })),
    data: mockData,
    title: "Compact Density",
    density: "compact",
    defaultItemsPerPage: 8,
  } as any,
};

export const FixedLayoutWithWidths: Story = {
  render: (args: any) => (
    <div style={{ width: 480 }} className="rounded-lg border border-dashed border-slate-300">
      <ITTable {...args} />
    </div>
  ),
  args: {
    columns: fixedColumns,
    data: longCellData,
    title: "Fixed layout · no horizontal scroll",
    layout: "fixed",
    density: "compact",
    defaultItemsPerPage: 5,
  } as any,
};

export const AutoCardsNarrowContainer: Story = {
  render: (args: any) => (
    <div style={{ width: 420 }} className="rounded-lg border border-dashed border-slate-300">
      <ITTable {...args} />
    </div>
  ),
  args: {
    columns: basicColumns,
    data: mockData.slice(0, 6),
    title: "Auto cards under 640px",
    autoCardBreakpoint: 640,
    defaultItemsPerPage: 6,
  } as any,
};

// --- VIRTUALIZATION ---

const virtualColumns: Column<User>[] = [
  { key: "id", label: "ID", type: "number", width: 72, minWidth: 56, align: "center" },
  { key: "name", label: "Name", type: "string", width: "30%", truncate: true },
  { key: "email", label: "Email", type: "string", width: "40%", truncate: true },
  {
    key: "roleId",
    label: "Role",
    type: "catalog",
    width: "30%",
    truncate: true,
    catalogOptions: { data: mockRoles },
  },
];

export const VirtualizedLargeDataset: Story = {
  render: (args: any) => (
    <div className="space-y-2">
      <p className="text-xs text-slate-500">
        250 rows · only the visible window is mounted (~10–20 &lt;tr&gt; + at most 2 spacer rows)
      </p>
      <ITTable {...args} />
    </div>
  ),
  args: {
    columns: virtualColumns,
    data: generateMockData(250),
    title: "Virtualized · 250 rows",
    virtualized: true,
    stickyHeader: true,
    layout: "fixed",
    density: "compact",
    virtualizedMaxHeight: 360,
    defaultItemsPerPage: 250,
    itemsPerPageOptions: [50, 100, 250],
  } as any,
};
