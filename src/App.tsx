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
  ITTabs,
  ITTripleFilter,
  ITFormBuilder,
  ITInput,
  ITSelect,
  ITBadget,
  ITToast
} from "./index";
import {
  FaHome,
  FaUser,
  FaCog,
  FaTable,
  FaPlus,
  FaFileExport,
  FaChartPie
} from "react-icons/fa";
import "./index.css";

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [filterValue, setFilterValue] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- FORM STATE ---
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    role: "USER",
    status: true,
    birthDate: undefined
  });

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // --- DATATABLE MOCK ---
  const userColumns = useMemo(() => [
    { key: "id", label: "ID", type: "number" as const },
    { key: "name", label: "Nombre", type: "string" as const, filter: true },
    { 
      key: "role", 
      label: "Rol", 
      type: "string" as const, 
      filter: "catalog" as const,
      catalogOptions: {
        data: [
          { id: "ADMIN", name: "Administrador" },
          { id: "USER", name: "Usuario" }
        ]
      }
    },
    { key: "active", label: "Estado", type: "boolean" as const, filter: true }
  ], []);

  const fetchData = useCallback(async (params: ITDataTableFetchParams): Promise<ITDataTableResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: [
        { id: 1, name: "Juan Pérez", role: "ADMIN", active: true },
        { id: 2, name: "María García", role: "USER", active: true },
        { id: 3, name: "Pedro López", role: "USER", active: false }
      ],
      total: 3
    };
  }, []);

  // --- SCREENS ---

  const DashboardScreen = () => {
    const tabItems = [
      { 
        id: "overview", 
        label: "Resumen", 
        icon: <FaHome />, 
        content: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ITCard title="Usuarios Totales" className="bg-emerald-50 border-emerald-100">
              <h3 className="text-4xl font-bold text-emerald-700">1,248</h3>
              <ITBadget label="+12% vs mes anterior" color="success" className="mt-2" />
            </ITCard>
            <ITCard title="Ventas Hoy" className="bg-slate-50 border-slate-100">
              <h3 className="text-4xl font-bold text-slate-700">$45,200</h3>
              <ITBadget label="Estable" color="info" className="mt-2" />
            </ITCard>
            <ITCard title="Alertas" className="bg-red-50 border-red-100">
              <h3 className="text-4xl font-bold text-red-700">3</h3>
              <ITBadget label="Acción Requerida" color="danger" className="mt-2" />
            </ITCard>
          </div>
        )
      },
      {
        id: "reports",
        label: "Reportes",
        icon: <FaChartPie />,
        content: (
          <div className="space-y-6">
            <ITCard title="Rendimiento Mensual">
              <div className="h-48 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                 <span className="text-slate-400 font-medium">Gráfico de Analíticas (Próximamente)</span>
              </div>
            </ITCard>
            <div className="grid grid-cols-2 gap-4">
               <ITCard title="KPI: Retención" className="border-l-4 border-l-purple-500">
                  <p className="text-2xl font-bold">94.2%</p>
               </ITCard>
               <ITCard title="KPI: Conversión" className="border-l-4 border-l-blue-500">
                  <p className="text-2xl font-bold">12.5%</p>
               </ITCard>
            </div>
          </div>
        )
      }
    ];

    return (
      <div className="space-y-8 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500">Vista general de analíticas.</p>
        </div>
        <ITTabs items={tabItems} defaultActiveId="overview" variant="line" />
      </div>
    );
  };

  const TablesScreen = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Usuarios</h1>
          <p className="text-slate-500">Listado completo y filtros avanzados.</p>
        </div>
        <ITButton label="Nuevo Usuario" color="primary" iconLeft={<FaPlus />} onClick={() => setIsDialogOpen(true)} />
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
        <ITTripleFilter
          value={filterValue}
          onChange={setFilterValue}
          options={[
            { label: "Todos", value: "all" },
            { label: "Activos", value: "active" },
            { label: "Inactivos", value: "inactive" }
          ]}
        />
        <ITButton label="Exportar" variant="outline" iconLeft={<FaFileExport />} size="sm" />
      </div>
      <ITCard className="p-0 overflow-hidden border-slate-200 shadow-xl">
        <ITDataTable columns={userColumns} fetchData={fetchData} />
      </ITCard>
    </div>
  );

  const SettingsScreen = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Configuración</h1>
        <p className="text-slate-500">Preferencias del sistema y perfil.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ITCard title="Perfil de Usuario" actions={<ITButton label="Guardar Perfil" color="primary" />}>
           <div className="space-y-4">
             <ITInput name="u" label="Nombre de Usuario" value="Alex Dev" onChange={() => {}} onBlur={() => {}} />
             <ITInput name="e" label="Correo Electrónico" value="alex@axzy.dev" onChange={() => {}} onBlur={() => {}} />
             <ITSelect 
                name="lang" 
                label="Idioma" 
                options={[{ label: "Español", value: "es" }, { label: "English", value: "en" }]} 
                onChange={() => {}} 
              />
           </div>
        </ITCard>
        <ITCard title="Seguridad">
           <div className="p-4 bg-slate-50 rounded-xl mb-4 border border-slate-200">
             <p className="text-sm font-medium text-slate-700">Autenticación de dos pasos</p>
             <p className="text-xs text-slate-500">Protege tu cuenta con seguridad adicional.</p>
           </div>
           <ITButton label="Habilitar 2FA" variant="outline" className="w-full" />
        </ITCard>
      </div>
    </div>
  );

  const sidebarProps = {
    navigationItems: [
      { 
        id: "dashboard", 
        label: "Dashboard", 
        icon: <FaHome />, 
        isActive: activeNav === "dashboard",
        action: () => setActiveNav("dashboard")
      },
      { 
        id: "tables", 
        label: "Tablas", 
        icon: <FaTable />,
        isActive: activeNav === "tables",
        action: () => setActiveNav("tables")
      },
      { 
        id: "settings", 
        label: "Ajustes", 
        icon: <FaCog />,
        isActive: activeNav === "settings",
        action: () => setActiveNav("settings")
      }
    ]
  };

  const topBarProps = {
    logoText: "AXZY UI SYSTEM",
    userMenu: {
      userName: "Alex Dev",
      userEmail: "alex@axzy.dev",
      menuItems: [
        { label: "Mi Perfil", onClick: () => setActiveNav("settings") },
        { label: "Cerrar Sesión", onClick: () => setToastMessage("Cerrando sesión...") }
      ]
    }
  };

  const renderContent = () => {
    switch(activeNav) {
      case "dashboard": return <DashboardScreen />;
      case "tables": return <TablesScreen />;
      case "settings": return <SettingsScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <ITThemeProvider>
      <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
        <div className="max-w-7xl mx-auto p-6">
          {renderContent()}
        </div>
      </ITLayout>

      <ITDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Crear Nuevo Usuario"
        useFormHeader
      >
        <div className="p-6">
          <ITFormBuilder
            values={formValues}
            handleChange={handleFormChange}
            handleBlur={() => {}}
            touched={{}}
            errors={{}}
            config={[
              { name: "username", label: "Nombre Completo", type: "text", required: true },
              { name: "email", label: "Correo Electrónico", type: "email", required: true },
              { name: "role", label: "Rol", type: "select", options: [
                { label: "Admin", value: "ADMIN" },
                { label: "Usuario", value: "USER" }
              ]},
              { name: "birthDate", label: "Fecha Nacimiento", type: "date" }
            ]}
          />
          <div className="mt-8 flex justify-end gap-3">
            <ITButton label="Cancelar" variant="ghost" onClick={() => setIsDialogOpen(false)} />
            <ITButton label="Guardar" color="primary" onClick={() => {
              setToastMessage("Cambios guardados");
              setIsDialogOpen(false);
            }} />
          </div>
        </div>
      </ITDialog>

      {toastMessage && (
        <ITToast 
          message={toastMessage} 
          type="success" 
          onClose={() => setToastMessage(null)} 
        />
      )}
    </ITThemeProvider>
  );
}

export default App;
