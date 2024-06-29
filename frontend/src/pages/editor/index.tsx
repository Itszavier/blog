/** @format */
import { EditorContent, useEditor } from "@tiptap/react";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../components/loading";
import "./prosemirror.css";
import useFetch from "../../hooks/useFetch";
import { extenions } from "../../tipTap.config";
import { IPost } from "../../api/types";
import useAutoSave from "../../hooks/useAutoSave";
import PublishModal from "../../components/publishModal";
import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import Header from "./header";

interface IPostInitailData {
  _id: string;
  title: string;
  subtitle: string;
  content: {
    html: string;
  };
}

async function handleAutoSave(unSavedData: IPostInitailData) {
  console.log("save", unSavedData);
}

export default function EditorPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Use state with an initial function
  const [post, setPost] = useState<IPostInitailData>(() => ({
    _id: "",
    title: "Test title of a post",
    subtitle: "",
    content: {
      html: "",
    },
  }));

  const { isPending, data } = useFetch<IPost>(`/article/editable/${postId}`, {
    key: "post",
    onfetch: (data) => {
      console.log("saved handle save function", data);
      setPost({
        _id: data._id,
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
      });
    },
  });

  const { isSaving } = useAutoSave<IPostInitailData>(post, {
    onSave: handleAutoSave,
    debounceDelay: 600,
  });

  const editor = useEditor({
    extensions: extenions,
    autofocus: true,
    onUpdate(updatedEditor) {
      const html = updatedEditor.editor.getHTML();
      setPost((prev) => {
        return {
          ...prev!,
          content: {
            html,
          },
        };
      });
    },
    content: post.content.html,
  });

  useEffect(() => {
    if (!isPending) {
      editor?.commands.setContent(post.content.html);
    }

    if (editor && editor?.getHTML().length > 0) {
      editor.commands.focus("end");
    }
  }, [isPending]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
  };

  if (isPending) return <Loading />;

  if (!editor) return null;

  return (
    <Box>
      <Header isSaving={isSaving} editor={editor} post={data} />

      <Box
        bg={"light.cardBackground"}
        mt={"25px"}
        width={"60%"}
        ml={"auto"}
        mr={"auto"}
        boxShadow={"md"}
        borderTopLeftRadius={"8px"}
        borderTopRightRadius={"8px"}
      >
        <Flex mb={'5'} gap={"2"} direction={"column"} pl={"6"} pr={"6"} pt={"5"}>
          <Box>
            <Input
              placeholder="Title"
              value={post.title}
              onChange={handleChange}
              name={"title"}
              rounded={0}
              fontSize={"25px"}
              fontWeight={"600"}
              border={"none"}
              variant="unstyled"
            />
          </Box>
          <Box className={style.input_wrapper}>
            <Input
              placeholder="Subtitle"
              value={post.subtitle}
              onChange={handleChange}
              name="subtitle"
              type="text"
              fontSize={"18px"}
              rounded={0}
              border={"none"}
              variant="unstyled"
            />
          </Box>
        </Flex>
        <Box pl={"5"} pr={"5"} color={"black"}>
          <EditorContent editor={editor} />
        </Box>
      </Box>
    </Box>
  );
}
