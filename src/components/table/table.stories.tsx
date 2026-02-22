import type { Meta, StoryObj } from "@storybook/react";
import ITTable from "./table";
import { Column } from "./table.props";
import ITBadget from "../badget/badget";
import ITButton from "../button/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const meta: Meta<typeof ITTable> = {
  title: "Components/Data Display/ITTable",
  component: ITTable,
  parameters: {
    layout: "padded", // Tables need more space
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "bordered"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
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

const actionsColumn: Column<User> = {
  key: "actions",
  label: "Actions",
  type: "actions",
  actions: (row) => (
    <>
      <ITButton size="small" variant="text" color="info" ariaLabel="Edit" onClick={() => alert(`Edit ${row.name}`)}>
        <FaEdit />
      </ITButton>
      <ITButton size="small" variant="text" color="danger" ariaLabel="Delete" onClick={() => alert(`Delete ${row.name}`)}>
        <FaTrash />
      </ITButton>
    </>
  ),
};


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
            <ITButton size="small" variant="text" color="danger" ariaLabel="Delete" onClick={() => setData(d => d.filter(item => item.id !== row.id))}>
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
