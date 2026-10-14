import React, { useState } from "react";
import { FaInfoCircle, FaSlidersH, FaRegBell, FaSync, FaEdit, FaCopy, FaTrash, FaDownload } from "react-icons/fa";
import {
  ITTabs,
  ITStepper,
  ITPagination,
  ITTripleFilter,
  ITSelect,
  ITSlideToggle,
  ITDropdownMenu,
  ITCard
} from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";
import { useITTranslation } from "@/i18n";

// 1. ITTabs Showcase
export const TabsShowcase = () => {
  const { t } = useITTranslation();
  const [variant, setVariant] = useState<any>("line");

  const tabItems = [
    {
      id: "tab1",
      label: t("showcase.nav.tabGeneral"),
      icon: <FaInfoCircle />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">{t("showcase.nav.tabsGeneralBody")}</div>
    },
    {
      id: "tab2",
      label: t("showcase.nav.tabSecurity"),
      icon: <FaSlidersH />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">{t("showcase.nav.tabsSecurityBody")}</div>
    },
    {
      id: "tab3",
      label: t("showcase.nav.tabNotifications"),
      icon: <FaRegBell />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">{t("showcase.nav.tabsNotificationsBody")}</div>
    }
  ];

  const code = `<ITTabs\n  variant="${variant}"\n  items={[\n    { id: 'tab1', label: 'General', content: <General /> }\n  ]}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTabs"
      description={t("showcase.nav.tabsDesc")}
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
            label={t("showcase.nav.variantAesthetic")}
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
  const { t } = useITTranslation();
  const [step, setStep] = useState(0);
  const [useIcons, setUseIcons] = useState(true);

  const steps = [
    { label: t("showcase.nav.stepValidate"), content: <div className="p-6">{t("showcase.nav.stepValidateBody")}</div> },
    { label: t("showcase.nav.stepKyc"), content: <div className="p-6">{t("showcase.nav.stepKycBody")}</div> },
    { label: t("showcase.nav.stepSign"), content: <div className="p-6">{t("showcase.nav.stepSignBody")}</div> }
  ];

  const code = `<ITStepper\n  steps={steps}\n  currentStep={${step}}\n  useIcons={${useIcons}}\n  onStepChange={(idx) => setStep(idx)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITStepper"
      description={t("showcase.nav.stepperDesc")}
      code={code}
      demo={
        <div className="w-full">
          <ITStepper
            steps={steps}
            currentStep={step}
            useIcons={useIcons}
            onStepChange={setStep}
            onFinish={() => alert(t("showcase.nav.stepperFinish"))}
          />
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.nav.useIcons")}</span>
            <ITSlideToggle isOn={useIcons} onToggle={setUseIcons} size="sm" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.nav.resetStep")}</span>
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
  const { t } = useITTranslation();
  const [page, setPage] = useState(1);
  const [color, setColor] = useState<any>("primary");

  const code = `<ITPagination\n  currentPage={${page}}\n  totalPages={10}\n  onPageChange={(p) => setPage(p)}\n  color="${color}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITPagination"
      description={t("showcase.nav.paginationDesc")}
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITPagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
            color={color}
          />
          <span className="text-xs font-mono text-slate-500">{t("showcase.nav.currentPage", { page })}</span>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="col_ctrl"
            label={t("showcase.nav.activeColorLabel")}
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
  const { t } = useITTranslation();
  const [filter, setFilter] = useState("all");

  const code = `<ITTripleFilter\n  value="${filter}"\n  onChange={(val) => setFilter(String(val))}\n  options={[\n    { label: 'Todos', value: 'all' },\n    { label: 'Activos', value: 'active' },\n    { label: 'Inactivos', value: 'inactive' }\n  ]}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTripleFilter"
      description={t("showcase.nav.tripleFilterDesc")}
      code={code}
      demo={
        <div className="flex flex-col items-center gap-4">
          <ITTripleFilter
            value={filter}
            onChange={(val) => setFilter(String(val))}
            options={[
              { label: t("showcase.nav.filterAll"), value: "all" },
              { label: t("showcase.nav.filterActive"), value: "active" },
              { label: t("showcase.nav.filterInactive"), value: "inactive" }
            ]}
          />
          <p className="text-xs text-slate-500 font-mono">{t("showcase.nav.activeFilter", { filter })}</p>
        </div>
      }
      controls={
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs">
          <p className="text-slate-500">{t("showcase.nav.tripleFilterHint")}</p>
        </div>
      }
    />
  );
};

// ITDropdownMenu Showcase
export const DropdownMenuShowcase = () => {
  const { t } = useITTranslation();
  const [lastAction, setLastAction] = useState<string>(t("showcase.nav.none"));

  const items = [
    { id: "edit", label: t("showcase.nav.actionEdit"), icon: <FaEdit />, onClick: () => setLastAction(t("showcase.nav.actionEdit")) },
    { id: "copy", label: t("showcase.nav.actionDuplicate"), icon: <FaCopy />, shortcut: "⌘D", onClick: () => setLastAction(t("showcase.nav.actionDuplicate")) },
    { id: "download", label: t("showcase.nav.actionDownload"), icon: <FaDownload />, disabled: true },
    { id: "delete", label: t("showcase.nav.actionDelete"), icon: <FaTrash />, danger: true, divider: true, onClick: () => setLastAction(t("showcase.nav.actionDelete")) },
  ];

  const code = `<ITDropdownMenu\n  items={[\n    { id: 'edit', label: 'Editar', icon: <FaEdit />, onClick: edit },\n    { id: 'delete', label: 'Eliminar', icon: <FaTrash />, danger: true, divider: true, onClick: remove },\n  ]}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDropdownMenu"
      description={t("showcase.nav.dropdownDesc")}
      code={code}
      demo={
        <div className="w-full max-w-md">
          <ITCard title={t("showcase.nav.rowActions")}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Reporte Q3.pdf</p>
                <p className="text-xs text-slate-500">{t("showcase.nav.lastAction", { action: lastAction })}</p>
              </div>
              <ITDropdownMenu items={items} />
            </div>
          </ITCard>
        </div>
      }
      controls={
        <p className="text-xs text-slate-500">
          {t("showcase.nav.dropdownKeyboardHint")}
        </p>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full max-w-xs">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{t("showcase.nav.customTrigger")}</p>
            <ITDropdownMenu items={items} trigger={<span className="text-sm font-semibold px-1">{t("showcase.nav.actions")}</span>} triggerLabel={t("showcase.nav.actions")} placement="bottom-start" />
          </div>
          <div className="w-full max-w-xs">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Placement top-start</p>
            <ITDropdownMenu items={items.slice(0, 3)} placement="top-start" />
          </div>
        </div>
      }
      doc={{
        summary: "Menú de acciones accesible (role=menu) en portal, con teclado y flip automático.",
        examples: [
          "<ITDropdownMenu items={items} />",
          "<ITDropdownMenu items={items} trigger={<span>Acciones</span>} placement=\"bottom-start\" />",
        ],
        props: [
          { name: "items", type: "ITDropdownMenuItem[]", required: true, description: "Acciones { id, label, icon?, shortcut?, onClick?, disabled?, danger?, divider? }." },
          { name: "trigger", type: "ReactNode", default: "icono elipsis", description: "Contenido del trigger." },
          { name: "triggerLabel", type: "string", default: '"Abrir menú"', description: "Etiqueta accesible del trigger." },
          { name: "placement", type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"', default: '"bottom-end"', description: "Posición del menú." },
          { name: "onSelect", type: "(id, item) => void", description: "Se dispara al activar un item." },
          { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el trigger." },
        ],
        notes: ["El panel voltea arriba cuando no hay espacio abajo.", "role=menu / menuitem + aria-haspopup / aria-expanded."],
      }}
    />
  );
};
