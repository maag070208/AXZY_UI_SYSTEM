import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisV } from "react-icons/fa";
import { ITDropdownMenuProps } from "./dropdown-menu.props";
import { useFloatingPanel } from "@/hooks/useFloatingPanel";
import ITText from "@/components/atoms/text/text";

/**
 * Action menu with keyboard navigation and ARIA menu semantics.
 *
 * Renders the menu through a portal so it escapes `overflow: hidden` and
 * transformed ancestors, and flips above the trigger when there is no room
 * below.
 *
 * @example
 * <ITDropdownMenu
 *   items={[
 *     { id: "edit", label: "Editar", icon: <FaEdit />, onClick: edit },
 *     { id: "delete", label: "Eliminar", icon: <FaTrash />, danger: true, divider: true, onClick: remove },
 *   ]}
 * />
 */
export default function ITDropdownMenu({
  items,
  trigger,
  triggerLabel = "Abrir menú",
  placement = "bottom-end",
  onSelect,
  disabled = false,
  className,
  menuClassName,
}: ITDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { panelRef, style: panelStyle } = useFloatingPanel(triggerRef, isOpen, {
    estimatedHeight: Math.max(items.length * 40, 120),
    matchWidth: false,
    align: placement.endsWith("end") ? "end" : "start",
  });

  const enabledIndexes = useMemo(
    () => items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0),
    [items]
  );

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !panelRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, panelRef]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(enabledIndexes[0] ?? -1);
      requestAnimationFrame(() => {
        if (enabledIndexes[0] !== undefined) itemRefs.current[enabledIndexes[0]]?.focus();
      });
    }
  }, [isOpen, enabledIndexes]);

  const open = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  const close = (restoreFocus = true) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const activate = (index: number) => {
    const item = items[index];
    if (!item || item.disabled) return;
    item.onClick?.();
    onSelect?.(item.id, item);
    close();
  };

  const moveActive = (dir: 1 | -1) => {
    if (!enabledIndexes.length) return;
    const currentPos = enabledIndexes.indexOf(activeIndex);
    const nextPos =
      currentPos === -1
        ? dir === 1
          ? 0
          : enabledIndexes.length - 1
        : (currentPos + dir + enabledIndexes.length) % enabledIndexes.length;
    const next = enabledIndexes[nextPos];
    setActiveIndex(next);
    itemRefs.current[next]?.focus();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) open();
      else moveActive(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) open();
      else moveActive(-1);
    } else if (e.key === "Escape") {
      close();
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveActive(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveActive(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      if (enabledIndexes.length) {
        const first = enabledIndexes[0];
        setActiveIndex(first);
        itemRefs.current[first]?.focus();
      }
    } else if (e.key === "End") {
      e.preventDefault();
      const last = enabledIndexes[enabledIndexes.length - 1];
      if (last !== undefined) {
        setActiveIndex(last);
        itemRefs.current[last]?.focus();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={triggerLabel}
        disabled={disabled}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleTriggerKeyDown}
        className={clsx(
          "inline-flex items-center justify-center rounded-lg p-2 text-secondary-500 transition-colors",
          "hover:bg-secondary-100 hover:text-secondary-700 dark:hover:bg-slate-800 dark:hover:text-slate-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {trigger ?? <FaEllipsisV size={14} />}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={panelRef}
            role="menu"
            aria-label={triggerLabel}
            style={panelStyle}
            onKeyDown={handleMenuKeyDown}
            className={clsx(
              "min-w-[180px] rounded-xl border border-secondary-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1 overflow-hidden",
              menuClassName
            )}
          >
            {items.map((item, index) => (
              <div key={item.id}>
                {item.divider && <div className="my-1 h-px bg-secondary-100 dark:bg-slate-800" />}
                <button
                  ref={(el) => { itemRefs.current[index] = el; }}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  disabled={item.disabled}
                  onClick={() => activate(index)}
                  onMouseEnter={() => !item.disabled && setActiveIndex(index)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors",
                    "focus:outline-none",
                    item.disabled
                      ? "opacity-50 cursor-not-allowed text-secondary-400"
                      : item.danger
                      ? "text-danger-600 hover:bg-danger-50 focus:bg-danger-50 dark:hover:bg-danger-950/30"
                      : "text-secondary-700 dark:text-slate-200 hover:bg-secondary-50 focus:bg-secondary-50 dark:hover:bg-slate-800 dark:focus:bg-slate-800",
                    activeIndex === index && !item.disabled && !item.danger && "bg-secondary-50 dark:bg-slate-800"
                  )}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <ITText as="span" className="flex-1 truncate">{item.label}</ITText>
                  {item.shortcut && (
                    <ITText as="span" className="text-xs text-secondary-400 font-mono">{item.shortcut}</ITText>
                  )}
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
