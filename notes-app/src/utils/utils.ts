import { DebouncedFunction } from "../types";

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): DebouncedFunction<T> => {
  let timeout: number | undefined;

  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
