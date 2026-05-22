import React, { useState } from "react";
import { FaInfoCircle, FaSlidersH, FaRegBell, FaSync } from "react-icons/fa";
import {
  ITTabs,
  ITStepper,
  ITPagination,
  ITTripleFilter,
  ITSelect,
  ITSlideToggle
} from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";

// 1. ITTabs Showcase
export const TabsShowcase = () => {
  const [variant, setVariant] = useState<any>("line");

  const tabItems = [
    {
      id: "tab1",
      label: "General",
      icon: <FaInfoCircle />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">Configuración global y perfil general de la cuenta.</div>
    },
    {
      id: "tab2",
      label: "Seguridad",
      icon: <FaSlidersH />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">Ajustes de credenciales, MFA y logs de accesos.</div>
    },
    {
      id: "tab3",
      label: "Notificaciones",
      icon: <FaRegBell />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">Preferencias de alertas vía email, SMS y notificaciones PUSH.</div>
    }
  ];

  const code = `<ITTabs\n  variant="${variant}"\n  items={[\n    { id: 'tab1', label: 'General', content: <General /> }\n  ]}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTabs"
      description="Separadores de contenido en pestañas integrables con íconos y transiciones."
      code={code}
      demo={
        <div className="w-full bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm min-h-[160px]">
          <ITTabs items={tabItems} defaultActiveId="tab1" variant={variant} />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="var_ctrl"
            label="Variante Estética"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Línea (Line)", value: "line" },
              { label: "Pastilla (Pill)", value: "pill" }
            ]}
          />
        </>
      }
    />
  );
};

// 2. ITStepper Showcase
export const StepperShowcase = () => {
  const [step, setStep] = useState(0);
  const [useIcons, setUseIcons] = useState(true);

  const steps = [
    { label: "Validar Identidad", content: <div className="p-6">Paso 1: Sube tu documento de identidad oficial.</div> },
    { label: "Cargar KYC", content: <div className="p-6">Paso 2: Rellena tus datos fiscales y origen de fondos.</div> },
    { label: "Completar Firma", content: <div className="p-6">Paso 3: Realiza la firma biométrica digital.</div> }
  ];

  const code = `<ITStepper\n  steps={steps}\n  currentStep={${step}}\n  useIcons={${useIcons}}\n  onStepChange={(idx) => setStep(idx)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITStepper"
      description="Barra e indicador secuencial de pasos para completar procesos guiados complejos."
      code={code}
      demo={
        <div className="w-full">
          <ITStepper
            steps={steps}
            currentStep={step}
            useIcons={useIcons}
            onStepChange={setStep}
            onFinish={() => alert("Proceso completado exitosamente!")}
          />
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Usar íconos</span>
            <ITSlideToggle isOn={useIcons} onToggle={setUseIcons} size="sm" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-semibold text-gray-700">Reiniciar Paso</span>
            <button onClick={() => setStep(0)} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-800">
              <FaSync size={12} />
            </button>
          </div>
        </>
      }
    />
  );
};

// 3. ITPagination Showcase
export const PaginationShowcase = () => {
  const [page, setPage] = useState(1);
  const [color, setColor] = useState<any>("primary");

  const code = `<ITPagination\n  currentPage={${page}}\n  totalPages={10}\n  onPageChange={(p) => setPage(p)}\n  color="${color}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITPagination"
      description="Controlador de navegación de páginas numeradas con botones de dirección rápida."
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITPagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
            color={color}
          />
          <span className="text-xs font-mono text-slate-500">Página actual activa: {page} de 10</span>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="col_ctrl"
            label="Color del Botón Activo"
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
              { label: "Purple", value: "purple" }
            ]}
          />
        </>
      }
    />
  );
};

// 4. ITTripleFilter Showcase
export const TripleFilterShowcase = () => {
  const [filter, setFilter] = useState("all");

  const code = `<ITTripleFilter\n  value="${filter}"\n  onChange={(val) => setFilter(String(val))}\n  options={[\n    { label: 'Todos', value: 'all' },\n    { label: 'Activos', value: 'active' },\n    { label: 'Inactivos', value: 'inactive' }\n  ]}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTripleFilter"
      description="Selector segmentado rápido diseñado típicamente para filtros rápidos de 3 estados."
      code={code}
      demo={
        <div className="flex flex-col items-center gap-4">
          <ITTripleFilter
            value={filter}
            onChange={(val) => setFilter(String(val))}
            options={[
              { label: "Todos", value: "all" },
              { label: "Activos", value: "active" },
              { label: "Inactivos", value: "inactive" }
            ]}
          />
          <p className="text-xs text-slate-500 font-mono">Filtro activo: "{filter}"</p>
        </div>
      }
      controls={
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs">
          <p className="text-slate-500">Proporciona un layout de tipo segmentado con animación al cambiar entre las opciones disponibles.</p>
        </div>
      }
    />
  );
};
