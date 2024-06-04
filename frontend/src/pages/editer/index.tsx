import React from "react";
import "draft-js/dist/Draft.css";
import style from "./style.module.css";
import { Editor, EditorState } from "draft-js";

export default function EditorPage() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );
  return (
    <div className={style.container}>
      hi
      <Editor editorState={editorState} onChange={setEditorState} />;
    </div>
  );
}
