export type Note = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;
