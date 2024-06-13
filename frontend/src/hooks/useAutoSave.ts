/** @format */

import { useState, useEffect, useCallback, useRef } from "react";
import { IPost } from "../api/types"; // Adjust path as per your project structure

interface AutosaveOptions {
  onSave: (updatedPost: IPost) => Promise<void>;
  debounceDelay: number;
}

const useAutosave = (initialPost: IPost | null, options: AutosaveOptions) => {
  const { onSave, debounceDelay } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const previousFields = useRef<{
    title?: string;
    subtitle?: string;
    content?: { html: string; text: string };
    tags?: string[];
  }>({});

  const autosave = useCallback(
    async (updatedPost: IPost) => {
      try {
        setIsSaving(true);
        await onSave(updatedPost);
        setLastSaved(new Date());
      } catch (error) {
        console.error("Autosave error:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [onSave]
  );

  useEffect(() => {
    if (!initialPost) return;

    const { title, subtitle, content, tags } = initialPost;

    const hasChanged =
      title !== previousFields.current.title ||
      subtitle !== previousFields.current.subtitle ||
      JSON.stringify(content) !== JSON.stringify(previousFields.current.content) ||
      JSON.stringify(tags) !== JSON.stringify(previousFields.current.tags);

    if (hasChanged) {
      const debounceSave = setTimeout(() => autosave(initialPost), debounceDelay);

      return () => clearTimeout(debounceSave);
    }

    // Update previous fields to current values
    previousFields.current = { title, subtitle, content, tags };
  }, [initialPost, autosave, debounceDelay]);

  return { isSaving, lastSaved };
};

export default useAutosave;
