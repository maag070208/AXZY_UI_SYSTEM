import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const clickedDialog = target?.closest("[data-it-dialog]");
      const currentDialog = ref.current?.closest("[data-it-dialog]");

      // Nested dialogs must not close their parent when interacting with the
      // child overlay or its contents.
      if (clickedDialog && clickedDialog !== currentDialog) return;

      // Floating panels (select/date/time pickers, menus) are portaled to
      // <body>, so they sit outside the DOM of the dialog/drawer that opened
      // them. Picking an option there must not count as an outside click.
      const clickedFloating = target?.closest("[data-it-floating]");
      if (clickedFloating && !ref.current?.contains(clickedFloating)) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
