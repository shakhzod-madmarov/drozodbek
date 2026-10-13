import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export const useModalA11y = (isOpen, onClose) => {
  const containerRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement;

    const container = containerRef.current;
    const focusables = () =>
      container ? [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null) : [];

    const initial = focusables();
    if (initial.length > 0) {
      const firstInput = initial.find((el) => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
      (firstInput || initial[0]).focus();
    } else if (container) {
      container.focus();
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      const returnTo = previouslyFocusedRef.current;
      if (returnTo && typeof returnTo.focus === "function" && document.contains(returnTo)) {
        returnTo.focus();
      }
    };
  }, [isOpen, onClose]);

  return containerRef;
};
