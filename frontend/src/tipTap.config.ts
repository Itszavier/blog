/** @format */
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Extension, Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const placeholder: string =
  "Start writing your article here. Use the toolbar above for formatting and paste your content if needed...";

export const extenions: Extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right"],
  }),
];
