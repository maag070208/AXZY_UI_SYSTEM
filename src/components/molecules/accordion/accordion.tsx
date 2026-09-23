import clsx from "clsx";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { ITAccordionProps } from "./accordion.props";
import ITText from "@/components/atoms/text/text";

/**
 * Collapsible sections for FAQs, settings panels, and long content.
 *
 * Works uncontrolled (`defaultOpenIds`) or controlled (`openIds` + `onChange`).
 * Supports single-open (default) or multiple-open mode, and animates the body
 * with a CSS grid-rows transition (no JS height measurement).
 *
 * @example
 * <ITAccordion
 *   items={[
 *     { id: "a", title: "¿Qué es AXZY?", content: "Un sistema de componentes." },
 *     { id: "b", title: "¿Cómo instalo?", content: "pnpm add @axzydev/axzy_ui_system" },
 *   ]}
 *   defaultOpenIds={["a"]}
 * />
 */
export default function ITAccordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  openIds,
  onChange,
  variant = "separated",
  className,
  itemClassName,
}: ITAccordionProps) {
  const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpenIds);
  const isControlled = openIds !== undefined;
  const currentOpen = isControlled ? openIds : internalOpen;

  const toggle = (id: string) => {
    const isOpen = currentOpen.includes(id);
    let next: string[];
    if (isOpen) {
      next = currentOpen.filter((x) => x !== id);
    } else {
      next = allowMultiple ? [...currentOpen, id] : [id];
    }
    if (!isControlled) setInternalOpen(next);
    onChange?.(next);
  };

  const wrapperClass =
    variant === "separated"
      ? clsx("flex flex-col gap-2", className)
      : clsx(
          "rounded-xl border border-secondary-200 dark:border-slate-700 overflow-hidden",
          className
        );

  return (
    <div className={wrapperClass}>
      {items.map((item, index) => {
        const isOpen = currentOpen.includes(item.id);
        const panelId = `it-accordion-panel-${item.id}`;
        const buttonId = `it-accordion-button-${item.id}`;
        const itemClass = clsx(
          variant === "separated" &&
            "rounded-xl border border-secondary-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900",
          variant === "bordered" &&
            index > 0 &&
            "border-t border-secondary-200 dark:border-slate-700",
          item.disabled && "opacity-50",
          itemClassName
        );

        return (
          <div key={item.id} className={itemClass}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                  "text-sm font-semibold text-secondary-800 dark:text-slate-100",
                  "hover:bg-secondary-50 dark:hover:bg-slate-800",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400",
                  item.disabled && "cursor-not-allowed hover:bg-transparent"
                )}
              >
                {item.icon && <span className="shrink-0 text-secondary-500">{item.icon}</span>}
                <ITText as="span" className="flex-1">{item.title}</ITText>
                <FaChevronDown
                  size={12}
                  className={clsx(
                    "shrink-0 text-secondary-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={clsx(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-1 text-sm text-secondary-600 dark:text-slate-300">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
