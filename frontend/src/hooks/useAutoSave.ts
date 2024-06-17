/** @format */

import { useState, useEffect, useCallback, useRef } from "react";
import _ from "lodash";

export interface Config<Data> {
  onSave: (dataToSave: Data) => any;
  debounceDelay?: number;
}

export default function useAutoSave<Data>(initialData: Data, config: Config<Data>) {
  const { onSave, debounceDelay = 2000 } = config;

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const debounceSave = useCallback(() => {
    if (!onSave) return;

    const delay = debounceDelay || 1000;
    setIsSaving(true);

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(async () => {
      try {
        // Compare current data with dataRef.current before saving

        await onSave(initialData);
        // Update dataRef.current after save

        setIsSaving(false);
      } catch (error) {
        console.error("Error occurred during save:", error);
        setIsSaving(false);
      }
    }, delay);
  }, [initialData, debounceDelay]);

  useEffect(() => {
    debounceSave();
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [debounceSave]);

  return { isSaving, setIsSaving };
}
