/** @format */

import { BsThreeDots } from "react-icons/bs";
import { IPost } from "../../api/types";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface IPostMenuDropdownProps {
  post: IPost;
}

export default function PostMenuDropdown({ post }: IPostMenuDropdownProps) {
  const [showMenu, setShowMenu] = useState(false);
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

  return (
    <div className={style.menu_wrapper} ref={dropdownRef}>
      <button onClick={() => setShowMenu((prev) => !prev)} className={style.toggle_btn}>
        <BsThreeDots />
      </button>
      {showMenu && (
        <div onClick={() => setShowMenu(false)} className={style.menu_dropdown}>
          <Link className={style.link} to={`/editor/${post._id}`}>
            edit
          </Link>
          <Link
            onClick={() => setShowMenu(false)}
            className={style.link}
            to={`/editor/${post._id}`}
          >
            visit
          </Link>
        </div>
      )}
    </div>
  );
}
