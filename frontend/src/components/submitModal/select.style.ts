/** @format */

import { GroupBase, StylesConfig } from "react-select";

// Custom styles for react-select component
const selectStyles: StylesConfig<unknown, true, GroupBase<unknown>> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#161616", // Set the background color of the control
    borderColor: state.isFocused ? "#333" : "#161616", // Adjust the border color based on focus state
    boxShadow: state.isFocused ? undefined : undefined, // Remove the box-shadow
    outline: "none", // Remove the outline
  }),
  input: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color to white
    outline: "none", // Remove the outline
    // Set the background color
  }),
  singleValue: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color for a single selected value
  }),
  placeholder: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color for the placeholder
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#161616", // Set the background color of the dropdown menu
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#333" : "#161616", // Change background color on hover
    color: "#cecdcd", // Set the text color
    "&:active": {
      backgroundColor: "#444", // Change background color when an option is selected
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#333", // Set the background color for multi-value selected tags
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#cecdcd", // Set the text color for multi-value labels
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#cecdcd", // Set the color for the remove icon
    "&:hover": {
      // backgroundColor:"#444", Change background color on hover for the remove icon
      color: "#cecdcd",
    },
  }),
};

export default selectStyles;
