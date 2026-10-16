import { useEffect, useState } from "react";

function parseJson<T>(serializedValue: string): T {
  return JSON.parse(serializedValue) as T;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  deserialize: (serializedValue: string) => T = parseJson,
) {
  // Start with a safe value during rendering; browser storage is read after mounting.
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [initializedKey, setInitializedKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      const serializedValue = window.localStorage.getItem(key);
      if (serializedValue !== null) {
        // Loading after mounting keeps server rendering and the first client render safe.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStoredValue(deserialize(serializedValue));
      }
    } catch (error) {
      console.error(`Could not read "${key}" from localStorage.`, error);
    } finally {
      // The save effect waits until this key has been read before writing.
      setInitializedKey(key);
    }
  }, [key, deserialize]);

  useEffect(() => {
    // Do not save until this key is loaded or copy a previous key's value to it.
    if (initializedKey !== key) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Could not save "${key}" to localStorage.`, error);
    }
  }, [key, storedValue, initializedKey]);

  return [storedValue, setStoredValue] as const;
}
