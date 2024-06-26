/** @format */

// Tab.tsx
import React, { Children, useState } from "react";
import style from "./style.module.css";

interface Props {
  children?: React.ReactNode;
}

interface TabProps extends Props {
  label: string;
  className?: string;
}

export function Tab(props: TabProps) {
  return (
    <div className={`${style.tabItem} ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
}
/*interface Style {
  tabs?: React.CSSProperties;
  navButtons?: React.CSSProperties;
}*/

interface TabsProps extends Props {
  containerClassName?: string;
  headerClassName?: string;
  ActiveClassName?: string;
  bodyClassName?: string;
}

export default function Tabs(props: TabsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const buttons = Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return (
      <button
        className={`${style.button} ${
          index === activeIndex ? props.ActiveClassName : ""
        }`}
        onClick={() => handleClick(index)}
      >
        {child.props.label}
      </button>
    );
  });

  const tabs = Children.toArray(props.children);

  return (
    <div
      className={`${style.tabs} ${
        props.containerClassName ? props.containerClassName : ""
      }`}
    >
      <div
        className={`${style.header} ${
          props.headerClassName ? props.headerClassName : ""
        }`}
      >
        {buttons}
      </div>
      <div className={`${style.body} ${props.bodyClassName ? props.bodyClassName : ""}`}>
        {tabs[activeIndex]}
      </div>
    </div>
  );
}
