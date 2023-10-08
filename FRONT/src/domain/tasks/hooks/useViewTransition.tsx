import { flushSync } from "react-dom";

export function useTransition(callback: any) {
  if (!document.startViewTransition) {
    callback();
    return;
  }

  document.startViewTransition(() => flushSync(() => callback()));
}
