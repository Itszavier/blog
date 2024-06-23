/** @format */
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useLocation, useParams } from "react-router-dom";

export default function Publish() {
  const { postId } = useParams();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    console.log(data, postId);
  }, []);
  return <div className={style.container}>publish page</div>;
}
