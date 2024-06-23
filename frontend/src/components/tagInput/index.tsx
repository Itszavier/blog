/** @format */
import { useMemo, useState } from "react";
import style from "./style.module.css";

interface TagInputProps {
  tags: string[];
  onRemove?: (updatedTags: string[]) => {};
  onAdd?: (updatedTags: string[]) => {};
  maxWidth?: string;
  maxheight?: string;
  // onInputChange?: () => {};
}

export default function TagInput(props: TagInputProps) {
  const [tags, setTags] = useState<string[]>(props.tags);
  const [value, setValue] = useState("");
  const isInputDisabled = useMemo(() => tags.length >= 5, [tags]);

  const removeLast = () => {
    setTags((prevArray) => {
      const newArray = [...prevArray];
      newArray.pop();
      return newArray;
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    console.log(`Key pressed: ${key}`);

    if (e.key === "Enter") {
      e.preventDefault();
    }

    if (key === "Backspace" && tags.length > 0) {
      removeLast();
      if (props.onRemove && typeof props.onRemove === "function") {
        props.onRemove(tags);
      }
    }

    if (key === "Backspace" && !value && tags.length > 0) {
      removeLast();
    } else if (
      (key === "," || key === "Enter") &&
      value.trim() &&
      !tags.includes(value.trim())
    ) {
      const newValue = value.replace(/,/g, "").trim();
      if (newValue) {
        setTags((prev) => [...prev, newValue]);

        if (props.onAdd && typeof props.onAdd === "function") {
          props.onAdd([...tags, newValue]);
        }
      }
      setValue("");
    }
  };

  const handleRemove = (tagName: string) => {
    const copyOfTags = [...tags];

    setTags((prev) => {
      return prev.filter((tag) => tag !== tagName);
    });

    if (props.onRemove && typeof props.onRemove === "function") {
      props.onRemove(copyOfTags);
    }
  };

  return (
    <div
      className={style.container}
      style={{
        maxHeight: props.maxheight,
        maxWidth: props.maxWidth,
      }}
    >
      {tags.map((tag) => (
        <div className={style.tag_wrapper} key={tag}>
          <span className={style.tag_text}>{tag}</span>
          <button
            onClick={() => handleRemove(tag)}
            className={style.close_btn}
            type="button"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>
      ))}
      {!isInputDisabled && (
        <input
          className={style.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Press ',' or 'Enter' to add tag"
          disabled={isInputDisabled}
        />
      )}
    </div>
  );
}
