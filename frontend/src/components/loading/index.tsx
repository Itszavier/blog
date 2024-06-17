/** @format */

import style from "./style.module.css";
import { ClipLoader, HashLoader } from "react-spinners";

export function Loading() {
  return (
    <div className={style.container}>
      <HashLoader loading size={"100px"} color="#1e90ff" />
    </div>
  );
}
interface IButtonLoaderProps {
  size?: string | number;
  color?: string;
}

export function ButtonLoader(props: IButtonLoaderProps) {
  return <ClipLoader size={18|| props.size} color="white" />;
}
