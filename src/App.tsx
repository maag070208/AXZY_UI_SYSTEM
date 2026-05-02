import React, { useState, useCallback, useMemo } from "react";
import {
  ITButton,
  ITCard,
  ITLayout,
  ITThemeProvider,
  ITDialog,
  ITDataTable,
  ITDataTableFetchParams,
  ITDataTableResponse,
  ITDatePicker
} from "./index";
import {
  FaHome,
  FaBell,
} from "react-icons/fa";
import "./index.css";

function App() {
  const [activeNav] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // States for external filters
  const [singleDate, setSingleDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  // Shared columns for the examples
  const userColumns = useMemo(() => [
    {
      key: "id",
      label: "ID",
      type: "number" as const,
      sortable: true,
    },
    {
      key: "username",
      label: "Usuario",
      type: "string" as const,
      filter: true,
      sortable: true,
    },
    {
      key: "role",
      label: "Rol",
      type: "string" as const,
      filter: "catalog" as const,
      catalogOptions: {
        loading: false,
        data: [
          { id: "ADMIN", name: "Administrador" },
          { id: "CAJERO", name: "Cajero" },
          { id: "TECNICO", name: "Técnico" },
          { id: "SUPERVISOR", name: "Supervisor" },
        ],
      },
    },
    {
      key: "active",
      label: "Activo",
      type: "boolean" as const,
      filter: true,
      sortable: true,
    },
  ], []);

  // --- MOCK API FOR ITDataTable SHOWCASE ---
  const fetchDataTable = useCallback(async (
    params: ITDataTableFetchParams
  ): Promise<ITDataTableResponse<any>> => {
    try {
      const response = await fetch("http://localhost:4444/api/v1/users/datatable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      
      return {
        data: json.data.rows || [],
        total: json.data.total || 0,
      };
    } catch (error) {
      console.error("Fetcher error:", error);
      throw error;
    }
  }, []);

  const topBarProps = {
    logoText: "AXZY ITDataTable Suite",
    userMenu: {
      userName: "Admin User",
      userEmail: "admin@axzy.dev",
      userImage: "https://i.pravatar.cc/150",
      menuItems: [
        { label: "Profile", onClick: () => alert("Profile Clicked") },
        { label: "Logout", onClick: () => alert("Logout Clicked") },
      ],
    },
    navItems: [
        { id: "dialog", label: "Test Dialog", icon: <FaBell />, action: () => setIsDialogOpen(true)}
    ]
  };

  const sidebarProps = {
    navigationItems: [
      {
        id: "home",
        label: "Dashboard",
        icon: <FaHome />,
        isActive: true,
        action: () => {},
      }
    ],
  };

  const customTheme = {
    colors: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554",
      },
    },
  };

  return (
    <ITThemeProvider theme={customTheme}>
      <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
        
        <div className="flex flex-col gap-8 py-10 px-6 w-full max-w-7xl mx-auto">
          
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ITDataTable Showcase</h1>
            <p className="text-gray-500 mt-2 text-lg">Visualización de las diferentes configuraciones del componente ITDataTable con filtros externos.</p>
          </div>

          {/* TABLE 1: STANDARD */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold shadow-md">1</span>
                <h2 className="text-xl font-bold text-gray-800">ITDataTable Estándar</h2>
             </div>
             <ITCard className="p-0 shadow-xl overflow-hidden border-none border-gray-100">
                <ITDataTable
                  columns={userColumns}
                  fetchData={fetchDataTable}
                  defaultItemsPerPage={5}
                />
             </ITCard>
          </section>

          {/* TABLE 2: SINGLE DATE FILTER */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold shadow-md">2</span>
                <h2 className="text-xl font-bold text-gray-800">Con Filtro de Fecha Simple</h2>
             </div>
             
             <div className="flex justify-start items-end mb-2 gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="w-full max-w-xs">
                    <ITDatePicker
                      name="singleFilter"
                      label="Filtrar por Fecha"
                      value={singleDate}
                      range
                      onChange={(e: any) => {
                        console.log(e);
                      }}
                      placeholder="Selecciona una fecha..."
                    />
                </div>
                {singleDate && (
                    <ITButton 
                        variant="text" 
                        color="primary" 
                        onClick={() => setSingleDate(undefined)}
                        className="mb-1"
                    >
                        Limpiar Filtro
                    </ITButton>
                )}
             </div>

             <ITCard className="p-0 shadow-xl overflow-hidden border-none border-gray-100">
                <ITDataTable
                  columns={userColumns}
                  fetchData={fetchDataTable}
                  externalFilters={useMemo(() => ({ date: singleDate }), [singleDate])}
                  defaultItemsPerPage={5}
                />
             </ITCard>
          </section>

          {/* TABLE 3: RANGE DATE FILTER */}
          <section className="space-y-4 pb-20">
             <div className="flex items-center gap-3">
                <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold shadow-md">3</span>
                <h2 className="text-xl font-bold text-gray-800">Con ITDatePicker Range</h2>
             </div>

             <div className="flex justify-start items-end mb-2 gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="w-full max-w-sm">
                    <ITDatePicker
                      range
                      name="rangeFilter"
                      label="Filtrar por Rango de Fechas"
                      value={dateRange}
                      onChange={(e: any) => setDateRange(e.target.value)}
                      placeholder="Selecciona un rango..."
                    />
                </div>
                {(dateRange[0] || dateRange[1]) && (
                    <ITButton 
                        variant="text" 
                        color="primary" 
                        onClick={() => setDateRange([null, null])}
                        className="mb-1"
                    >
                        Limpiar Rango
                    </ITButton>
                )}
             </div>

             <ITCard className="p-0 shadow-xl overflow-hidden border-none border-gray-100">
                <ITDataTable
                  columns={userColumns}
                  fetchData={fetchDataTable}
                  externalFilters={useMemo(() => ({ startDate: dateRange[0], endDate: dateRange[1] }), [dateRange])}
                  defaultItemsPerPage={5}
                />
             </ITCard>
          </section>

        </div>

      </ITLayout>

      <ITDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Prueba de Superposición"
        useFormHeader={true}
      >
        <div className="p-6">
          <p className="text-gray-600 mb-6 font-medium">Esta es una prueba para verificar que el diálogo y sus componentes (como el DatePicker) se rendericen correctamente sobre el layout.</p>
          <ITDatePicker 
            name="dialogDate" 
            label="Fecha en Diálogo" 
            onChange={() => {}} 
          />
          <div className="flex justify-end mt-8">
            <ITButton onClick={() => setIsDialogOpen(false)} color="primary">Entendido</ITButton>
          </div>
        </div>
      </ITDialog>

    </ITThemeProvider>
  );
}

export default App;
