/** @format */

import style from "./style.module.css";

export default function BrowseSideNav() {
  return (
    <div className={style.sideNav}>
      <h2>Categories</h2>
      <ul>
        <li>
          <a href="#">Technology</a>
        </li>
        <li>
          <a href="#">Business</a>
        </li>
        <li>
          <a href="#">Health</a>
        </li>
        <li>
          <a href="#">Science</a>
        </li>
        <li>
          <a href="#">Art & Culture</a>
        </li>
        <li>
          <a href="#">Sports</a>
        </li>
        <li>
          <a href="#">Education</a>
        </li>
      </ul>
    </div>
  );
}
