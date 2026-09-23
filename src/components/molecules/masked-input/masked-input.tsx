import React, { useRef, useState, useMemo } from "react";
import clsx from "clsx";
import ITInput from "@/components/atoms/input/input";
import { ITMaskedInputProps } from "./masked-input.props";

type Token = "9" | "A" | "a" | "x" | "*";

type MaskRule =
  | { type: "token"; token: Token }
  | { type: "literal"; char: string };

const TOKEN_SET = /[9Aax*]/;

function parseMask(mask: string): MaskRule[] {
  return mask.split("").map((ch) =>
    TOKEN_SET.test(ch)
      ? { type: "token", token: ch as Token }
      : { type: "literal", char: ch }
  );
}

function matchToken(token: Token, ch: string): boolean {
  switch (token) {
    case "9":
      return /\d/.test(ch);
    case "A":
    case "a":
      return /[A-Za-z]/.test(ch);
    case "x":
      return /[A-Za-z0-9]/.test(ch);
    case "*":
      return ch.length > 0;
    default:
      return false;
  }
}

function extract(input: string, rules: MaskRule[], maskChar: string): string {
  let raw = "";
  let slot = 0;
  for (const ch of input) {
    while (slot < rules.length && rules[slot].type === "literal") slot++;
    if (slot >= rules.length) break;
    const rule = rules[slot];
    if (
      rule.type === "token" &&
      ch !== maskChar &&
      matchToken(rule.token, ch)
    ) {
      raw += rule.token === "A" ? ch.toUpperCase() : ch;
      slot++;
    }
  }
  return raw;
}

function format(raw: string, rules: MaskRule[], maskChar: string): string {
  let out = "";
  let idx = 0;
  for (const rule of rules) {
    if (rule.type === "literal") {
      out += rule.char;
    } else {
      const ch = raw[idx];
      out += ch !== undefined ? ch : maskChar;
      idx++;
    }
  }
  return out;
}

function countConsumed(input: string, rules: MaskRule[], upto: number, maskChar: string): number {
  let slot = 0;
  let n = 0;
  for (let i = 0; i < upto && i < input.length; i++) {
    const ch = input[i];
    while (slot < rules.length && rules[slot].type === "literal") slot++;
    if (slot >= rules.length) break;
    const rule = rules[slot];
    if (rule.type === "token" && ch !== maskChar && matchToken(rule.token, ch)) {
      n++;
      slot++;
    }
  }
  return n;
}

function caretAfter(n: number, rules: MaskRule[]): number {
  let pos = 0;
  let consumed = 0;
  for (const rule of rules) {
    if (rule.type === "token") {
      consumed++;
      if (consumed > n) break;
    }
    pos++;
  }
  return pos;
}

/**
 * Text input that applies a formatting mask while the user types, exposing only
 * the clean (raw) value through `onChange`.
 *
 * The mask is defined by a pattern string. Tokens are filled by the user and
 * any other character acts as an auto-inserted literal separator. Empty slots
 * are painted with `placeholderChar`, so the mask is always visible.
 *
 * @example
 * ```tsx
 * <ITMaskedInput
 *   name="code"
 *   mask="xxxx-xxxx-xxxx"
 *   label="Código"
 *   onChange={(e) => setCode(e.target.value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ITMaskedInput
 *   name="phone"
 *   mask="(999) 999-9999"
 *   pattern={/^\d{10}$/}
 *   onChange={(e) => setPhone(e.target.value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ITMaskedInput
 *   name="card"
 *   mask="9999-9999-9999-9999"
 *   onComplete={(card) => validateCard(card)}
 * />
 * ```
 */
export default function ITMaskedInput({
  name,
  mask,
  value,
  onChange,
  onBlur,
  onComplete,
  pattern,
  placeholderChar = "_",
  variant = "primary",
  size = "md",
  label,
  disabled = false,
  required,
  touched,
  error,
  className,
  containerClassName,
  iconLeft,
  iconRight,
  autoFocus = false,
}: ITMaskedInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawRef = useRef<string>(value ?? "");
  const isControlled = value !== undefined;

  const [internalRaw, setInternalRaw] = useState<string>(value ?? "");
  const [invalidPattern, setInvalidPattern] = useState(false);

  const rules = useMemo(() => parseMask(mask), [mask]);
  const tokenCount = useMemo(() => rules.filter((r) => r.type === "token").length, [rules]);

  const raw = isControlled ? (value ?? "") : internalRaw;
  const display = useMemo(() => format(raw, rules, placeholderChar), [raw, rules, placeholderChar]);

  const scheduleCaret = (caret: number) => {
    const inputEl = containerRef.current?.querySelector("input");
    if (!inputEl) return;
    requestAnimationFrame(() => {
      if (document.activeElement === inputEl) {
        const pos = Math.min(caret, inputEl.value.length);
        inputEl.setSelectionRange(pos, pos);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement;
    const inputVal = el.value ?? "";
    const caretBefore = el.selectionStart ?? inputVal.length;

    const nextRaw = extract(inputVal, rules, placeholderChar);
    const targetCaret = caretAfter(
      countConsumed(inputVal, rules, caretBefore, placeholderChar),
      rules
    );

    if (nextRaw !== rawRef.current) {
      rawRef.current = nextRaw;
      setInternalRaw(nextRaw);
      onChange?.({ target: { name, value: nextRaw } });
      if (nextRaw.length === tokenCount && nextRaw.length > 0) {
        onComplete?.(nextRaw);
      }
      if (invalidPattern) setInvalidPattern(false);
    }

    scheduleCaret(targetCaret);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (pattern && rawRef.current.length > 0 && !pattern.test(rawRef.current)) {
      setInvalidPattern(true);
    }
    onBlur?.(e);
  };

  const resolvedError = invalidPattern
    ? typeof error === "string"
      ? error
      : "Formato inválido"
    : error;

  return (
    <div ref={containerRef} className={clsx("w-full", className)}>
      <ITInput
        name={name}
        type="text"
        label={label}
        value={display}
        onChange={handleChange}
        onBlur={(e) => handleBlur(e as React.FocusEvent<HTMLInputElement>)}
        maxLength={mask.length}
        variant={variant}
        size={size}
        disabled={disabled}
        required={required}
        touched={touched}
        error={resolvedError}
        containerClassName={containerClassName}
        iconLeft={iconLeft}
        iconRight={iconRight}
        autoFocus={autoFocus}
      />
    </div>
  );
}