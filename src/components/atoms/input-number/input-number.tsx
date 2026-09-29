import { ChangeEvent, FocusEvent } from "react";
import ITInput from "@/components/atoms/input/input";
import ITText from "@/components/atoms/text/text";
import { ITInputNumberProps } from "./input-number.props";

/** Parse a display value ("1,234.50", 1234.5, "") into a number, or `undefined` when empty. */
function parseNumber(raw: unknown): number | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : undefined;
  const cleaned = String(raw).replace(/,/g, "").trim();
  if (cleaned === "" || cleaned === "-" || cleaned === ".") return undefined;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Numeric field that always renders currency-style formatting (thousand
 * separators + fixed decimals) and emits a real `number`.
 *
 * Built on top of `ITInput`: it is the same field, but `onChange`/`onBlur`
 * already receive the parsed value, so consumers can do math directly instead
 * of converting strings first.
 *
 * @example
 * ```tsx
 * <ITInputNumber
 *   name="amount"
 *   label="Monto"
 *   value={amount}
 *   prefix="$"
 *   onChange={(value) => setAmount(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Enteros (sin decimales) con límites
 * <ITInputNumber
 *   name="qty"
 *   label="Cantidad"
 *   decimals={0}
 *   min={1}
 *   max={99}
 *   value={qty}
 *   onChange={(value) => setQty(value)}
 * />
 * ```
 */
export default function ITInputNumber({
  value,
  onChange,
  onBlur,
  decimals = 2,
  prefix,
  iconLeft,
  ...rest
}: ITInputNumberProps) {
  const resolvedIconLeft =
    iconLeft ??
    (prefix ? (
      <ITText as="span" className="text-secondary-500 text-xs font-semibold">
        {prefix}
      </ITText>
    ) : undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(parseNumber(event.target.value), event);
  };

  return (
    <ITInput
      {...rest}
      type="number"
      currencyFormat
      formatNumber
      decimals={decimals}
      iconLeft={resolvedIconLeft}
      value={value ?? ""}
      onChange={handleChange}
      onBlur={(event) => {
        const input = event.target as HTMLInputElement;
        onBlur?.(parseNumber(input.value), event as FocusEvent<HTMLInputElement>);
      }}
    />
  );
}
