import React, { useState } from "react";
import { FaCode } from "react-icons/fa";
import {
  ITButton,
  ITInput,
  ITSelect,
  ITBadget,
} from "../index";
import { CodeViewer } from "./ShowcaseLayout";
import { useITTranslation } from "@/i18n";

type SizeKey = "sm" | "md" | "lg";

const sizes: SizeKey[] = ["sm", "md", "lg"];

const sizeDemoCode = (s: SizeKey) => `// Medida estándar "${s}" — misma escala en todos los componentes
<ITInput size="${s}" label="Nombre" />
<ITSelect size="${s}" label="Rol" />
<ITButton size="${s}">Guardar</ITButton>
<ITBadget size="${s}">Activo</ITBadget>`;

const SizeRow = ({ size, isOpen, onToggleShow }: { size: SizeKey; isOpen: boolean; onToggleShow: () => void }) => {
  const { t } = useITTranslation();
  return (
  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase">{size}</h3>
        <p className="text-xs text-slate-500 mt-1">{t("showcase.sizes.rowDesc")}</p>
      </div>
      <ITButton variant="outlined" color="gray" size="sm" onClick={onToggleShow}>
        <span className="inline-flex items-center gap-1.5"><FaCode size={12} /> {t("showcase.common.code")}</span>
      </ITButton>
    </div>
    <div className="px-6 py-5 space-y-4">
      <div>
        <p className="text-xs text-slate-400 mb-1.5">ITInput</p>
        <ITInput name={`names_${size}`} label={t("showcase.sizes.name")} placeholder={t("showcase.sizes.exampleName")} onChange={() => {}} onBlur={() => {}} size={size} />
      </div>
      <div>
        <p className="text-xs text-slate-400 mb-1.5">ITSelect</p>
        <ITSelect
          name={`roles_${size}`}
          label={t("showcase.sizes.role")}
          placeholder={t("showcase.sizes.placeholder")}
          size={size}
          onChange={() => {}}
          onBlur={() => {}}
          options={[
            { label: "Administrador", value: "admin" },
            { label: "Colaborador", value: "staff" },
          ]}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <p className="text-xs text-slate-400 mr-1">ITButton / ITBadget</p>
        <ITButton size={size}>{t("showcase.common.save")}</ITButton>
        <ITButton variant="outlined" color="gray" size={size}>{t("showcase.common.cancel")}</ITButton>
        <ITBadget size={size}>{t("showcase.common.active")}</ITBadget>
        <ITBadget size={size} variant="outlined">{t("showcase.sizes.draft")}</ITBadget>
      </div>
    </div>
    {isOpen && (
      <div className="border-t border-slate-200 dark:border-slate-700">
        <CodeViewer code={sizeDemoCode(size)} />
      </div>
    )}
  </div>
  );
};

export const SizesShowcase = () => {
  const { t } = useITTranslation();
  const [openSize, setOpenSize] = useState<SizeKey | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t("showcase.sizes.title")}</h2>
        <p className="text-sm text-slate-500 mt-1">
          {t("showcase.sizes.desc")}{" "}
          <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">size</code>.
        </p>
      </div>
      {sizes.map((s) => (
        <SizeRow key={s} size={s} isOpen={openSize === s} onToggleShow={() => setOpenSize(openSize === s ? null : s)} />
      ))}
    </div>
  );
};