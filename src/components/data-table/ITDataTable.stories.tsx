import React, { useState, useCallback, useMemo } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ITDataTable from './dataTable';
import { ITDataTableFetchParams, ITDataTableResponse } from './dataTable.props';
import ITCard from '../card/card';
import ITBadget from '../badget/badget';
import ITDatePicker from '../date-picker/datePicker';

const meta: Meta<typeof ITDataTable> = {
  title: 'Data Display/ITDataTable',
  component: ITDataTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ITDataTable>;

// --- MOCK CONSTANTS ---
const ROLES = ['ADMIN', 'CAJERO', 'TECNICO', 'SUPERVISOR'];
const MOCK_DATA = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  username: `user_${i + 1}`,
  name: `Nombre ${i + 1}`,
  role: ROLES[i % ROLES.length],
  active: i % 3 !== 0,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

// --- MOCK FETCH FUNCTION ---
const mockFetchItems = async (
  params: ITDataTableFetchParams
): Promise<ITDataTableResponse<any>> => {
  console.log('Fetching with params:', params);
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filtered = [...MOCK_DATA];

  // Apply filters
  Object.entries(params.filters).forEach(([key, value]) => {
    if (value === undefined || value === '') return;
    
    if (key === 'username') {
      filtered = filtered.filter(item => 
        item.username.toLowerCase().includes(String(value).toLowerCase())
      );
    } else if (key === 'role') {
      filtered = filtered.filter(item => item.role === value);
    } else if (key === 'active') {
      filtered = filtered.filter(item => item.active === value);
    }
  });

  // Apply sorting
  if (params.sort) {
    const { key, direction } = params.sort;
    filtered.sort((a: any, b: any) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Apply pagination
  const start = (params.page - 1) * params.limit;
  const end = start + params.limit;
  const data = filtered.slice(start, end);

  return {
    data,
    total: filtered.length,
  };
};

const columns = [
  {
    key: 'id',
    label: 'ID',
    type: 'number' as const,
    sortable: true,
  },
  {
    key: 'username',
    label: 'Usuario',
    type: 'string' as const,
    filter: true,
    sortable: true,
  },
  {
    key: 'name',
    label: 'Nombre Completo',
    type: 'string' as const,
    filter: true,
  },
  {
    key: 'role',
    label: 'Rol',
    type: 'string' as const,
    filter: 'catalog' as const,
    catalogOptions: {
      loading: false,
      data: [
        { id: 'ADMIN', name: 'Administrador' },
        { id: 'CAJERO', name: 'Cajero' },
        { id: 'TECNICO', name: 'Técnico' },
        { id: 'SUPERVISOR', name: 'Supervisor' },
      ],
    },
    render: (row: any) => (
      <ITBadget 
        label={row.role} 
        color={
          row.role === 'ADMIN' ? 'primary' : 
          row.role === 'CAJERO' ? 'success' : 
          row.role === 'TECNICO' ? 'warning' : 'secondary'
        } 
      />
    )
  },
  {
    key: 'active',
    label: 'Estado',
    type: 'boolean' as const,
    filter: true,
    sortable: true,
  },
];

export const Default: Story = {
  args: {
    title: 'Gestión de Usuarios',
    columns,
    fetchData: mockFetchItems,
    defaultItemsPerPage: 10,
  },
};

export const RemoteWithExternalFilters: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    // Stable references for ITDataTable
    const memoizedFetch = useCallback(mockFetchItems, []);
    const memoizedColumns = useMemo(() => columns, []);
    const externalFilters = useMemo(() => ({
      date: selectedDate,
      startDate: dateRange[0],
      endDate: dateRange[1]
    }), [selectedDate, dateRange]);

    return (
      <div className="space-y-6">
        <ITCard title="Filtros Globales de Negocio" className="bg-white">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="w-64">
              <ITDatePicker
                name="single"
                label="Fecha Específica"
                value={selectedDate}
                onChange={(e: any) => setSelectedDate(e.target.value)}
                placeholder="Seleccionar..."
              />
            </div>
            <div className="w-80">
              <ITDatePicker
                range
                name="range"
                label="Rango de Auditoría"
                value={dateRange}
                onChange={(e: any) => setDateRange(e.target.value)}
                placeholder="Seleccionar rango..."
              />
            </div>
            <button 
              onClick={() => { setSelectedDate(undefined); setDateRange([null, null]); }}
              className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Resetear Filtros
            </button>
          </div>
        </ITCard>

        <ITDataTable
          title="Resultados Filtrados"
          columns={memoizedColumns}
          fetchData={memoizedFetch}
          externalFilters={externalFilters}
          defaultItemsPerPage={5}
        />
      </div>
    );
  }
};

export const SkeletonLoading: Story = {
  args: {
    title: 'Cargando Datos...',
    columns,
    fetchData: async () => {
        await new Promise(r => setTimeout(r, 10000));
        return { data: [], total: 0 };
    },
  },
};
