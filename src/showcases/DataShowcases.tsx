import React, { useState, useMemo, useCallback } from "react";
import {
  ITTable,
  ITDataTable,
  ITBadget,
  ITImage,
  ITInput,
  ITSelect,
  ITSlideToggle,
  ITDataTableFetchParams,
  ITDataTableResponse
} from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";

// 1. ITTable Showcase
export const TableShowcase = () => {
  const [variant, setVariant] = useState<any>("default");
  const [size, setSize] = useState<any>("md");

  const columns: any = [
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "Nombre", type: "string" },
    { key: "role", label: "Rol", type: "string" },
    {
      key: "status",
      label: "Estado",
      type: "actions",
      render: (row: any) => (
        <ITBadget
          label={row.status ? "Conectado" : "Inactivo"}
          color={row.status ? "success" : "danger"}
          size="small"
        />
      )
    }
  ];

  const data = [
    { id: 101, name: "Esteban Dido", role: "Auditor", status: true },
    { id: 102, name: "Elsa Pato", role: "Administrador", status: true },
    { id: 103, name: "Aquiles Baeza", role: "Operador", status: false }
  ];

  const code = `<ITTable\n  columns={columns}\n  data={data}\n  variant="${variant}"\n  size="${size}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITTable"
      description="Base de renderizado de tablas estructuradas con soporte de alineamiento y tipado estricto."
      code={code}
      demo={
        <div className="w-full bg-white dark:bg-slate-900  rounded-xl overflow-hidden shadow-sm">
          <ITTable
            columns={columns}
            data={data}
            variant={variant}
            size={size}
          />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="var_ctrl"
            label="Variante Estilo"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Default", value: "default" },
              { label: "Striped (Cebra)", value: "striped" },
              { label: "Bordered (Bordes)", value: "bordered" },
              { label: "Clean (Limpio)", value: "clean" }
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label="Tamaño Filas"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small (sm)", value: "sm" },
              { label: "Medium (md)", value: "md" },
              { label: "Large (lg)", value: "lg" }
            ]}
          />
        </>
      }
    />
  );
};

// 2. ITDataTable Showcase
export const DataTableShowcase = () => {
  const userColumns = useMemo(() => [
    { key: "id", label: "ID", type: "number" as const },
    { key: "name", label: "Nombre", type: "string" as const, filter: true },
    { key: "role", label: "Rol", type: "string" as const, filter: true },
    { key: "active", label: "Activo", type: "boolean" as const, filter: true }
  ], []);

  const fetchData = useCallback(async (params: ITDataTableFetchParams): Promise<ITDataTableResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    let mockData = [
      { id: 1, name: "Juan Pérez", role: "Administrador", active: true },
      { id: 2, name: "María García", role: "Usuario", active: true },
      { id: 3, name: "Pedro López", role: "Usuario", active: false },
      { id: 4, name: "Ana Torres", role: "Editor", active: true },
      { id: 5, name: "Luis Gómez", role: "Administrador", active: false }
    ];

    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        const filterVal = params.filters[key];
        if (filterVal) {
          mockData = mockData.filter(item =>
            String((item as any)[key]).toLowerCase().includes(String(filterVal).toLowerCase())
          );
        }
      });
    }

    return {
      data: mockData,
      total: mockData.length
    };
  }, []);

  const code = `<ITDataTable\n  columns={[\n    { key: 'id', label: 'ID', type: 'number' },\n    { key: 'name', label: 'Nombre', type: 'string', filter: true }\n  ]}\n  fetchData={api.fetchUsers}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDataTable"
      description="Tabla de datos auto-suficiente con carga dinámica, paginación integrada y filtros avanzados."
      code={code}
      demo={
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md">
          <ITDataTable
            columns={userColumns}
            fetchData={fetchData}
          />
        </div>
      }
      controls={
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs space-y-2">
          <p className="text-slate-500">Esta tabla consume una función de carga de datos que se autogestiona en ordenamiento, paginado y filtros.</p>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded text-amber-800 dark:text-amber-300">
            Prueba a escribir en los inputs de filtro de la tabla!
          </div>
        </div>
      }
    />
  );
};

// 3. ITBadget Showcase
export const BadgetShowcase = () => {
  const [color, setColor] = useState<any>("success");
  const [size, setSize] = useState<any>("medium");
  const [labelText, setLabelText] = useState("Activo");

  const code = `<ITBadget\n  label="${labelText}"\n  color="${color}"\n  size="${size}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITBadget"
      description="Badges (etiquetas) estilizados para representar estados o categorías de items."
      code={code}
      demo={
        <ITBadget label={labelText} color={color} size={size} />
      }
      controls={
        <>
          <ITInput
            name="label"
            label="Texto"
            value={labelText}
            onChange={(e: any) => setLabelText(e.target.value)}
            onBlur={() => { }}
          />
          <ITSelect
            name="color"
            label="Color"
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
          <ITSelect
            name="size"
            label="Tamaño"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" }
            ]}
          />
        </>
      }
      gallery={
        <div className="flex flex-wrap items-center gap-4">
          <ITBadget label="Primary" color="primary" />
          <ITBadget label="Secondary" color="secondary" />
          <ITBadget label="Success" color="success" />
          <ITBadget label="Danger" color="danger" />
          <ITBadget label="Warning" color="warning" />
          <ITBadget label="Info" color="info" />
          <span className="mx-4 text-slate-300">|</span>
          <ITBadget label="Small" color="primary" size="small" />
          <ITBadget label="Medium" color="primary" size="medium" />
          <ITBadget label="Large" color="primary" size="large" />
        </div>
      }
    />
  );
};

// 4. ITImage Showcase
export const ImageShowcase = () => {
  const [broken, setBroken] = useState(false);
  const src = broken ? "https://nonexistent.image.site/broken.jpg" : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80";

  const code = `<ITImage\n  src="${src}"\n  alt="Imagen Abstracta"\n  fallback="https://placehold.co/400x200?text=No+Preview"\n  className="rounded-xl object-cover h-40"\n/>`;

  return (
    <ShowcaseLayout
      title="ITImage"
      description="Componente de renderizado de imágenes inteligente con cargador interno y fallback automático ante fallas de red."
      code={code}
      demo={
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <ITImage
            src={src}
            alt="Demo abstracta"
            fallback="https://placehold.co/400x200?text=Error+Carga+Imagen"
            className="rounded-xl object-cover h-40 w-full shadow-md"
          />
          <span className="text-xs text-slate-500 font-mono">
            {broken ? "Cargando URL Rota (Fallback Activo)" : "Cargando URL Correcta"}
          </span>
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Forzar Error de Carga (URL rota)</span>
            <ITSlideToggle isOn={broken} onToggle={setBroken} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};
