/** @format */
import style from "./style.module.css";

export default function EditorPreview({ content }: { content: string }) {
  return <div className={style.preview} dangerouslySetInnerHTML={{ __html: content }} />;
}
