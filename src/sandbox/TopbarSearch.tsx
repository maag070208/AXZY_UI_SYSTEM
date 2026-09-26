import type { ChangeEvent } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import ITButton from "@/components/atoms/button/button";
import ITInput from "@/components/atoms/input/input";

/** Props for the sandbox topbar search filter. */
export interface TopbarSearchProps {
  /** Current (live) search term shown in the input. */
  value: string;
  /** Called with the new term on every keystroke. */
  onChange: (value: string) => void;
  /** Called when the user clears the search. */
  onClear: () => void;
  /** Number of matching navigation entries for the current term. */
  resultCount: number;
  /**
   * When true, the debounced filter has not caught up with the live term yet.
   * The result count is hidden so it never announces a stale number.
   */
  pending?: boolean;
  /** Additional CSS classes on the form wrapper. Defaults to `"w-full"`. */
  className?: string;
}

/**
 * Topbar search box that filters every sandbox component live.
 *
 * Renders a search input with a clear button and an accessible live-region
 * announcement of the result count. It lives in the topbar center slot
 * (`topBar.centerContent`), so it stays visible while the sidebar collapses.
 */
export default function TopbarSearch({
  value,
  onChange,
  onClear,
  resultCount,
  pending = false,
  className = "w-full",
}: TopbarSearchProps) {
  const isActive = value.trim().length > 0;
  const showCount = isActive && !pending;

  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className={className}
    >
      <div className="flex items-center gap-1.5">
        <div className="flex-1 min-w-0">
          <ITInput
            name="sandbox-topbar-search"
            label="Buscar componentes"
            labelClassName="sr-only"
            placeholder="Buscar componente…"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(event.target.value)
            }
            iconLeft={<FaSearch size={12} />}
            size="sm"
            containerClassName="w-full"
          />
        </div>

        {isActive && (
          <ITButton
            variant="text"
            color="danger"
            size="sm"
            ariaLabel="Limpiar búsqueda"
            onClick={onClear}
            className="flex-shrink-0"
          >
            <FaTimes size={11} />
          </ITButton>
        )}
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {showCount ? `${resultCount} resultados` : ""}
      </span>
    </form>
  );
}
