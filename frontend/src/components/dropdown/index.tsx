/** @format */

import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.css";

export type Menu =
  | { type: "PARAGRAPH"; value: string; label: string }
  | { type: "HEADING"; depth: number; label: string; value?: string }
  | { type: "FONTSIZE"; label: number; value: number }
  | { type: "FONTFAMILY"; label: string; value: string };

interface DropdownProps {
  type: "Font" | "heading/Normal" | "FontSize";
  options: Menu[];
  defaultValue: Menu;
  width?: string | number;
  onSelect: (selected: Menu) => void;
}

export default function Dropdown(props: DropdownProps) {
  const [selected, setSelected] = useState<Menu>(props.defaultValue);
  const [options, setOptions] = useState<Menu[]>(props.options);
  const [FontValue, setFontValue] = useState(props.defaultValue.label || 12);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (item: Menu) => {
    if (item.type == "FONTSIZE") {
      setFontValue(item.value);
    }
    setSelected(item);
    setShowMenu(false);
    props.onSelect(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "font") {
      setSelected((prev) => {
        const newSelected = {
          ...prev,
          label: e.target.value,
          value: e.target.value,
        } as Menu;
        props.onSelect(newSelected);
        return newSelected;
      });
      const items = options;
    }

    setSelected((prev: any) => {
      const newSelected = {
        ...prev,
        label: parseInt(e.target.value),
        value: parseInt(e.target.value),
      } as Menu;
      props.onSelect(newSelected);
      return newSelected;
    });
  };

  const RenderInput = () => {
    if (props.type === "heading/Normal") {
      return (
        <span onClick={(e) => props.onSelect(selected)} className={style.selected_text}>
          {selected.label}
        </span>
      );
    }

    if (props.type === "FontSize") {
      return (
        <input
          className={style.dropdown_input}
          value={FontValue}
          placeholder="Font size"
          onChange={(e) => {
            setFontValue(e.target.value);
            handleChange(e);
          }}
          name="fontSize"
          min={0}
          max={100}
          type={"number"}
        />
      );
    }

    return (
      <input
        className={style.dropdown_input}
        value={selected.label}
        placeholder="Font Family"
        onChange={handleChange}
        name="font"
        min={0}
        readOnly
        max={100}
        type={"text"}
      />
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={style.dropdown_container}
      style={{ width: props.width || "130px" }}
    >
      <div className={style.input_container}>
        <RenderInput />
        <button className={style.toggle_btn} onClick={() => setShowMenu((prev) => !prev)}>
          <i className="bx bx-chevron-down"></i>
        </button>
      </div>

      {showMenu && (
        <div className={style.dropdown}>
          {options.map((value, index) => {
            switch (value.type) {
              case "PARAGRAPH":
                return (
                  <ParagraphItem
                    key={index}
                    onClick={() => handleClick(value)}
                    item={value}
                  />
                );
              case "HEADING":
                return (
                  <HeadingItem
                    key={index}
                    onClick={() => handleClick(value)}
                    item={value}
                  />
                );
              case "FONTSIZE":
                return (
                  <FontSizeItem
                    key={index}
                    onClick={() => handleClick(value)}
                    item={value}
                  />
                );
              case "FONTFAMILY":
                return (
                  <FontFamilyItem
                    key={index}
                    onClick={() => handleClick(value)}
                    item={value}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
}

interface ItemProps {
  item: Menu;
  onClick?: () => void;
}

function ParagraphItem(props: ItemProps) {
  return (
    <button
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      className={style.dropdown_select_btn}
    >
      <span className={style.paragraph}>{props.item.label}</span>
    </button>
  );
}

function FontFamilyItem(props: ItemProps) {
  return (
    <button
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      className={`${style.dropdown_select_btn} ${style.font_family_btn}`}
    >
      <p
        style={{ fontFamily: props.item.value as string }}
        className={`${
          props.item.type === "HEADING" && style[`heading-${props.item.depth}`]
        }`}
      >
        {props.item.label}
      </p>
    </button>
  );
}

function FontSizeItem(props: ItemProps) {
  return (
    <button
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      className={style.dropdown_select_btn}
    >
      <span
        className={`${
          props.item.type === "HEADING" && style[`heading-${props.item.depth}`]
        }`}
      >
        {props.item.label}
      </span>
    </button>
  );
}

function HeadingItem(props: ItemProps) {
  return (
    <button
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      className={style.dropdown_select_btn}
    >
      <span
        className={`${
          props.item.type === "HEADING" && style[`heading-${props.item.depth}`]
        }`}
      >
        {props.item.label}
      </span>
    </button>
  );
}
