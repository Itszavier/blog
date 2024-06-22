/** @format */

import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function BrowseSideNav() {
  return (
    <div className={style.sideNav}>
      <ul className={style.header}>
        <li className={style.headerItem}>
          <Link className={style.headerLink} to="/browse">
            <i className="bx bxs-home"></i> <span>Home</span>
          </Link>
        </li>
        <li className={style.headerItem}>
          <Link className={style.headerLink} to="/collections">
            <i className="bx bxs-user-circle"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className={style.headerItem}>
          <Link className={style.headerLink} to="/collections">
            <i className="bx bxs-bookmarks"></i> <span>Collections</span>
          </Link>
        </li>
        <li className={style.headerItem}>
          <Link className={style.headerLink} to="/Dashboard">
            <i className="bx bxs-dashboard"></i> <span>Dashboard</span>
          </Link>
        </li>
      </ul>

      <div className={style.wrapper}>
        <h3 className={style.title}>Categories</h3>
        <ul className={style.list}>
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
      <div className={style.wrapper}>
        <h3 className={style.title}>Popular Tags</h3>
        <ul className={` ${style.list} ${style.tagList}`}>
          <li>
            <a href="#">Technology</a>
          </li>
          <li>
            <a href="#">Startups</a>
          </li>
          <li>
            <a href="#">Marketing</a>
          </li>
          <li>
            <a href="#">Health & Wellness</a>
          </li>
          <li>
            <a href="#">Finance</a>
          </li>
          <li>
            <a href="#">Design</a>
          </li>
          <li>
            <a href="#">Travel</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
