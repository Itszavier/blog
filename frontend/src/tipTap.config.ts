/** @format */
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
const placeholder: string =
  "Start writing your article here. Use the toolbar above for formatting and paste your content if needed...";

export const extenions: Extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder,
  }),

  FontFamily.configure({
    types: ["textStyle"],
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),

  TextStyle,
];
