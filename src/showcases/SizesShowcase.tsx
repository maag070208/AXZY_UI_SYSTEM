import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { ITBadget, ITButton, ITInput, ITSelect } from "../index";
import { BloqueCodigo, BotonAccion, EYEBROW, FILETE } from "@/sandbox/ui";
import { useITTranslation } from "@/i18n";

type SizeKey = "sm" | "md" | "lg";

const SIZES: SizeKey[] = ["sm", "md", "lg"];

/** Código de ejemplo de cada medida, mostrado en el bloque desplegable. */
const codigoDeMedida = (s: SizeKey) => `// Medida estándar "${s}" — misma escala en todos los componentes
<ITInput size="${s}" label="Nombre" />
<ITSelect size="${s}" label="Rol" />
<ITButton size="${s}">Guardar</ITButton>
<ITBadget size="${s}">Activo</ITBadget>`;

/**
 * Una fila de medida: la etiqueta mono, los componentes en esa medida y el botón
 * para ver el código. Filete entre filas, sin tarjetas anidadas.
 */
const FilaMedida = ({
  size,
  abierta,
  onToggle,
}: {
  /** Medida que muestra la fila. */
  size: SizeKey;
  /** Si el bloque de código está desplegado. */
  abierta: boolean;
  /** Alterna el bloque de código. */
  onToggle: () => void;
}) => {
  const { t } = useITTranslation();

  return (
    <div className={`grid gap-5 border-b py-6 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-10 ${FILETE}`}>
      <div>
        <p className="font-display text-[18px] font-bold tracking-[-0.02em] text-slate-900 uppercase dark:text-white">
          {size}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
          {t("showcase.sizes.rowDesc")}
        </p>
        <BotonAccion
          variante="text"
          tamano="sm"
          className="!mt-3 !px-0"
          icono={<FaCode size={11} />}
          onClick={onToggle}
        >
          {t("showcase.common.code")}
        </BotonAccion>
      </div>

      <div className="min-w-0">
        <div className="grid gap-4 sm:grid-cols-2">
          <ITInput
            name={`names_${size}`}
            label={t("showcase.sizes.name")}
            placeholder={t("showcase.sizes.exampleName")}
            onChange={() => {}}
            onBlur={() => {}}
            size={size}
          />
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

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ITButton size={size}>{t("showcase.common.save")}</ITButton>
          <ITButton variant="outlined" color="gray" size={size}>
            {t("showcase.common.cancel")}
          </ITButton>
          <ITBadget size={size}>{t("showcase.common.active")}</ITBadget>
          <ITBadget size={size} variant="outlined">
            {t("showcase.sizes.draft")}
          </ITBadget>
        </div>

        {abierta && (
          <div className="mt-5">
            <BloqueCodigo code={codigoDeMedida(size)} filename={`size="${size}"`} />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Medidas del sistema (`#ui-system/general/sizes`): la misma escala
 * `sm / md / lg` aplicada a input, select, botón y badge, en filas con filete.
 *
 * @example
 * ```tsx
 * <SizesShowcase />
 * ```
 */
export const SizesShowcase = () => {
  const { t } = useITTranslation();
  const [abierta, setAbierta] = useState<SizeKey | null>(null);

  return (
    <div className="animate-fadeIn pb-4">
      <header className={`border-b pb-8 ${FILETE}`}>
        <p className={EYEBROW}>{`sm · md · lg`}</p>
        <h1 className="mt-2.5 font-display text-[32px] font-bold leading-[1.06] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-[40px]">
          {t("showcase.sizes.title")}
        </h1>
        <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          {t("showcase.sizes.desc")}{" "}
          <code className="rounded-[6px] border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[12px] text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            size
          </code>
          .
        </p>
      </header>

      <section className="pt-10">
        <div className={`border-t ${FILETE}`}>
          {SIZES.map((size) => (
            <FilaMedida
              key={size}
              size={size}
              abierta={abierta === size}
              onToggle={() => setAbierta(abierta === size ? null : size)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
