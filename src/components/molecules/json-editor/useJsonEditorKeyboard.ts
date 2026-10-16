import { useCallback, type KeyboardEvent, type RefObject } from "react";

/** Resultado de una operación de edición sobre el textarea. */
interface EditResult {
  /** Texto completo resultante. */
  value: string;
  /** Inicio de la selección final. */
  selectionStart: number;
  /** Fin de la selección final. */
  selectionEnd: number;
  /** Si el manejador consumió el evento (hay que hacer `preventDefault`). */
  handled: boolean;
}

/**
 * Ajustes del hook de edición.
 *
 * No recibe el `value` por props a propósito: lee el documento del propio
 * `<textarea>` en cada pulsación. Entre dos teclas rápidas React todavía puede
 * no haber re-renderizado, y calcular la edición sobre el valor de props pierde
 * o duplica caracteres. `applyEdit` se encarga de notificar y de reponer el
 * cursor tras el commit.
 */
export interface UseJsonEditorKeyboardOptions {
  /** Referencia al textarea real. */
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  /** Espacios por nivel de indentación. */
  indentSize: number;
  /** `true` cuando el editor es de solo lectura (no se intercepta nada). */
  readOnly?: boolean;
  /** Aplica una edición al textarea conservando el deshacer nativo. */
  applyEdit: (result: EditResult) => void;
}

/** Caracteres que abren bloque y su pareja de cierre. */
const PAIRS: Record<string, string> = { "{": "}", "[": "]", '"': '"' };

/** Caracteres de cierre que se "saltan" al teclear si ya están delante. */
const CLOSERS = new Set(["}", "]", '"']);

/**
 * Comportamiento de editor de código sobre un `<textarea>` nativo: indentación
 * con Tab, continuación de indentación al pulsar Enter, cierre automático de
 * llaves/corchetes/comillas y borrado por parejas.
 *
 * Se implementa como hook para que `ITJSONEditor` siga siendo un componente de
 * presentación y el textarea conserve el deshacer del navegador.
 *
 * @example
 * ```tsx
 * const textareaRef = useRef<HTMLTextAreaElement>(null);
 * const handleKeyDown = useJsonEditorKeyboard({ textareaRef, indentSize: 2, applyEdit });
 * <textarea ref={textareaRef} onKeyDown={handleKeyDown} />
 * ```
 */
export function useJsonEditorKeyboard({
  textareaRef,
  indentSize,
  readOnly = false,
  applyEdit,
}: UseJsonEditorKeyboardOptions) {
  return useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      if (!textarea || readOnly) return;

      const current = textarea.value;
      const { selectionStart, selectionEnd } = textarea;
      const indent = " ".repeat(indentSize);
      const before = current.slice(0, selectionStart);
      const after = current.slice(selectionEnd);

      /** Sustituye la selección por `text` y deja el cursor al final. */
      const replace = (text: string, caretOffset = text.length): EditResult => {
        const next = current.slice(0, selectionStart) + text + after;
        const caret = selectionStart + caretOffset;
        return { value: next, selectionStart: caret, selectionEnd: caret, handled: true };
      };

      /* ------------------------------------------------------------ Tab */
      if (event.key === "Tab") {
        event.preventDefault();
        const lineStart = current.lastIndexOf("\n", selectionStart - 1) + 1;
        const lineEndRaw = current.indexOf("\n", selectionEnd);
        const lineEnd = lineEndRaw === -1 ? current.length : lineEndRaw;
        const multiline = current.slice(lineStart, lineEnd).includes("\n");

        if (!multiline && !event.shiftKey && selectionStart === selectionEnd) {
          // Sangrado simple en el cursor.
          applyEdit(replace(indent));
          return;
        }

        // Sangrado/desangrado por bloques: afecta a todas las líneas tocadas.
        const block = current.slice(lineStart, lineEnd);
        const lines = block.split("\n");
        /** Cuánto se ha desplazado cada línea (positivo al indentar). */
        const shifts: number[] = [];
        const shifted = lines
          .map((line) => {
            if (event.shiftKey) {
              if (line.startsWith(indent)) {
                shifts.push(-indent.length);
                return line.slice(indent.length);
              }
              const match = line.match(/^[ \t]/);
              shifts.push(match ? -1 : 0);
              return match ? line.slice(1) : line;
            }
            shifts.push(indent.length);
            return indent + line;
          })
          .join("\n");

        const next = current.slice(0, lineStart) + shifted + current.slice(lineEnd);
        /**
         * Lleva una posición del bloque original a su nueva posición: suma los
         * desplazamientos de las líneas anteriores y recorta el de la propia
         * línea para no dejar el cursor antes de su inicio.
         */
        const remap = (position: number): number => {
          const relative = Math.max(0, position - lineStart);
          let offset = 0;
          let lineIndex = lines.length - 1;
          for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + (i < lines.length - 1 ? 1 : 0);
            if (relative <= offset + lineLength) {
              lineIndex = i;
              break;
            }
            offset += lineLength;
          }
          const accumulated = shifts.slice(0, lineIndex).reduce((total, n) => total + n, 0);
          const inLine = relative - offset;
          const shift = shifts[lineIndex] ?? 0;
          return lineStart + accumulated + Math.max(0, inLine + Math.min(shift, inLine));
        };

        const startNext = remap(selectionStart);
        const endNext = Math.max(startNext, remap(selectionEnd));
        applyEdit({
          value: next,
          selectionStart: Math.min(startNext, next.length),
          selectionEnd: Math.min(endNext, next.length),
          handled: true,
        });
        return;
      }

      /* ---------------------------------------------------------- Enter */
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const currentLine = before.slice(before.lastIndexOf("\n") + 1);
        const leading = currentLine.match(/^[ \t]*/)?.[0] ?? "";
        /** `true` cuando el cursor está al final de su línea (nada detrás salvo el cierre). */
        const atLineEnd = /^[ \t]*[}\]]?[ \t]*$/.test(after);
        const nextChar = after[0] ?? "";
        const prevChar = before[before.length - 1] ?? "";
        const opensBlock = prevChar === "{" || prevChar === "[";
        const closesBlock = nextChar === "}" || nextChar === "]";

        // Entre llaves vacías: se abre un bloque y se deja el cursor centrado.
        if (opensBlock && closesBlock) {
          const inner = `\n${leading}${indent}\n${leading}`;
          applyEdit(replace(inner, 1 + leading.length + indent.length));
          return;
        }
        if (opensBlock) {
          applyEdit(replace(`\n${leading}${indent}`));
          return;
        }
        if (!atLineEnd) {
          // A mitad de línea solo se parte la línea: no se toca el resto, pero la
          // línea nueva sí hereda la sangría del bloque en el que se está.
          applyEdit(replace(`\n${leading}${closesBlock ? indent : ""}`, 1 + leading.length + (closesBlock ? indent.length : 0)));
          return;
        }
        if (closesBlock) {
          applyEdit(replace(`\n${leading}`, 1 + leading.length));
          return;
        }
        applyEdit(replace(`\n${leading}`));
        return;
      }

      /* --------------------------------------------- Cierre automático */
      if (PAIRS[event.key]) {
        const closing = PAIRS[event.key];
        const selected = current.slice(selectionStart, selectionEnd);
        // Teclear la comilla de cierre sobre una ya existente solo avanza el
        // cursor. La comprobación es contra el MISMO carácter: delante de un `}`
        // o un `]` lo que toca es abrir una cadena, no saltar nada.
        if (event.key === '"' && nextCharOf(after) === '"' && !selected) {
          event.preventDefault();
          applyEdit({ value: current, selectionStart: selectionEnd + 1, selectionEnd: selectionEnd + 1, handled: true });
          return;
        }
        event.preventDefault();
        applyEdit(replace(`${event.key}${selected}${closing}`, 1));
        return;
      }

      /* ------------------------------------------------ Salto de cierre */
      if (CLOSERS.has(event.key) && selectionStart === selectionEnd && after[0] === event.key) {
        event.preventDefault();
        applyEdit({ value: current, selectionStart: selectionStart + 1, selectionEnd: selectionStart + 1, handled: true });
        return;
      }

      /* ----------------------------------------------- Borrado de pareja */
      if (event.key === "Backspace" && selectionStart === selectionEnd && selectionStart > 0) {
        const prev = before[before.length - 1];
        const next = after[0];
        const isPair =
          (prev === "{" && next === "}") || (prev === "[" && next === "]") || (prev === '"' && next === '"');
        if (isPair) {
          event.preventDefault();
          const nextValue = current.slice(0, selectionStart - 1) + current.slice(selectionStart + 1);
          applyEdit({
            value: nextValue,
            selectionStart: selectionStart - 1,
            selectionEnd: selectionStart - 1,
            handled: true,
          });
          return;
        }
      }

      /* ------------------------------------------------------ Atajos */
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
        // Seleccionar todo dentro del editor (no toda la página).
        event.preventDefault();
        textarea.select();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d") {
        // Duplicar la línea actual.
        event.preventDefault();
        const lineStart = before.lastIndexOf("\n") + 1;
        const lineEndRaw = current.indexOf("\n", selectionStart);
        const lineEnd = lineEndRaw === -1 ? current.length : lineEndRaw;
        const line = current.slice(lineStart, lineEnd);
        const next = current.slice(0, lineEnd) + "\n" + line + current.slice(lineEnd);
        const caret = selectionStart + line.length + 1;
        applyEdit({ value: next, selectionStart: caret, selectionEnd: caret, handled: true });
        return;
      }
    },
    [applyEdit, indentSize, readOnly, textareaRef]
  );
}

/** Carácter vigente en una cadena, o `""`. */
function nextCharOf(text: string): string {
  return text[0] ?? "";
}
