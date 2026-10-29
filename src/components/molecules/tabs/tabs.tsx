import React, { useState } from 'react';
import { ITTabsProps } from './tabs.props';
import { clsx } from 'clsx';
import ITText from "@/components/atoms/text/text";
import { useITAppearance } from "@/theme/theme-context";

/**
 * Tabbed navigation component with "line" and "pill" visual variants.
 * Manages its own active state internally via a defaultActiveId.
 * With `appearance="bento"` the "pill" variant becomes a rounded track with an ink active pill.
 *
 * @example
 * <ITTabs
 *   items={[
 *     { id: "tab1", label: "General", content: <GeneralPanel /> },
 *     { id: "tab2", label: "Settings", content: <SettingsPanel />, disabled: true },
 *   ]}
 *   defaultActiveId="tab1"
 *   onChange={(id) => console.log("Active tab:", id)}
 * />
 */
const ITTabs: React.FC<ITTabsProps> = ({
  items,
  defaultActiveId,
  onChange,
  variant = 'line',
  className = '',
  containerClassName = ''
}) => {
  const bento = useITAppearance() === "bento" && variant === 'pill';
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveId(id);
    if (onChange) onChange(id);
  };

  const activeContent = items.find(item => item.id === activeId)?.content;

  return (
    <div className={clsx("w-full", containerClassName)}>
      {/* HEADER */}
      <div className={clsx(
        "flex border-secondary-200 mb-4",
        variant === 'line' ? "border-b" : bento ? "gap-2 p-1 rounded-full w-fit" : "gap-2 p-1 bg-secondary-100 rounded-lg w-fit",
        className
      )}
      style={bento ? { backgroundColor: "var(--it-bento-control-bg, #f1f5f9)", borderColor: "transparent" } : undefined}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.disabled)}
              disabled={item.disabled}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 outline-none",
                // LINE VARIANT
                variant === 'line' && [
                  "border-b-2 -mb-[2px]",
                  isActive 
                    ? "border-primary-500 text-primary-600" 
                    : "border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300",
                ],
                // PILL VARIANT
                variant === 'pill' && (bento
                  ? "rounded-full"
                  : [
                      "rounded-md",
                      isActive
                        ? "bg-white text-primary-600 shadow-sm"
                        : "text-secondary-500 hover:text-secondary-700",
                    ]),
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              style={
                bento
                  ? {
                      backgroundColor: isActive ? "var(--it-bento-ink-bg, #0f172a)" : "transparent",
                      color: isActive ? "var(--it-bento-ink-text, #ffffff)" : "var(--it-bento-control-text, #475569)",
                    }
                  : undefined
              }
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <ITText as="span">{item.label}</ITText>
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="tab-content animate-fadeIn">
        {activeContent}
      </div>
    </div>
  );
};

export default ITTabs;
