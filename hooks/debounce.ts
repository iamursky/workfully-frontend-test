import { useEffect, useState } from "react";

export function useDebounce<TValueType = any>(value: TValueType, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<TValueType>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
