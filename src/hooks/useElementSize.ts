import { useLayoutEffect, useRef, useState, type RefObject } from "react";

/**
 * Observes an element's rendered size with a `ResizeObserver`.
 *
 * Used to make container-relative decisions (e.g. a table falling back to its
 * cards view when the container itself is narrow, regardless of viewport
 * width). The initial measurement runs in a layout effect so the first paint
 * already has the real width and no incorrect layout flashes.
 *
 * @returns `ref` to attach to the element to measure, plus its current `width`
 * and `height` in pixels (both `0` until the first measurement).
 *
 * @example
 * const { ref, width } = useElementSize<HTMLDivElement>();
 * return <div ref={ref}>{width < 640 ? <Cards /> : <Table />}</div>;
 */
export function useElementSize<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  width: number;
  height: number;
} {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const rect = element.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, width: size.width, height: size.height };
}

export default useElementSize;
