import type { Meta, StoryObj } from '@storybook/react';
import ITSearchTable from './searchTable';
import { SearchColumn } from './searchTable.props';

interface SampleRow {
  id: number;
  name: string;
  email: string;
  status: string;
}

const sampleColumns: SearchColumn<SampleRow>[] = [
  { key: 'id', label: 'ID', type: 'number', sortable: true },
  { key: 'name', label: 'Name', type: 'string', sortable: true, filter: true },
  { key: 'email', label: 'Email', type: 'string', sortable: true },
  { key: 'status', label: 'Status', type: 'catalog', filter: 'catalog', sortable: true },
];

const sampleData: SampleRow[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
];

const meta = {
  title: 'Components/Data Display/ITSearchTable',
  component: ITSearchTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: false, description: 'Column definitions' },
    data: { control: false, description: 'Row data array' },
    title: { control: 'text', description: 'Table header title' },
    searchInputPlaceholder: { control: 'text', description: 'Placeholder for the search input' },
    variant: { control: 'select', options: ['default', 'striped', 'bordered'], description: 'Visual variant' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Row size' },
    pageIndex: { control: 'number', description: 'Current page index (0-based)' },
    totalCount: { control: 'number', description: 'Total number of rows across all pages' },
    totalPages: { control: 'number', description: 'Total number of pages' },
    hasPreviousPage: { control: 'boolean', description: 'Whether there is a previous page' },
    hasNextPage: { control: 'boolean', description: 'Whether there is a next page' },
  },
} satisfies Meta<typeof ITSearchTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    title: 'Users',
    searchInputPlaceholder: 'Search users...',
    pageIndex: 0,
    totalCount: 3,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  } as any,
};

export const EmptyState: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    title: 'Users',
    searchInputPlaceholder: 'Search users...',
    pageIndex: 0,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  } as any,
};
