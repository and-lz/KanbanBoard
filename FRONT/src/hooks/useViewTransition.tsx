import { flushSync } from "react-dom";

export function useViewTransition(callback: any) {
  if (!document.startViewTransition) {
    callback();
    return;
  }

  document.startViewTransition(() => flushSync(() => callback()));
}
