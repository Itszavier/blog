/** @format */
import { ToastOptions } from "react-toastify";
export const encodeTitle = (title: string) => {
  return encodeURIComponent(title.trim().toLowerCase().replace(/\s+/g, "-"));
};

// Decoding function to revert the encoded title
export const decodeTitle = (encodedTitle: string) => {
  return decodeURIComponent(encodedTitle.replace(/-/g, " "));
};

export const ToastConfig: ToastOptions = {
  theme: "dark",
  delay: 1000,
};
