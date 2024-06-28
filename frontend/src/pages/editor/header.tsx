/** @format */

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../../components/profileDropdown";
import { Editor } from "@tiptap/react";
import Toolbar from "./EditorToolbar";
import PublishButton from "./publishButton";

/** @format */
interface Props {
  post: any;
  isSaving: boolean;
  editor: Editor;
}
export default function Header(props: Props) {
  const navigate = useNavigate();
  return (
    <Box bg={"light.cardBackground"} position={"sticky"} top={0} p={"8px"} zIndex={99}>
      <Box display={"flex"} alignItems={"center"}>
        <Flex>
          <Button bg={"transparent"} onClick={() => navigate(-1)}>
            <i className="bx bx-arrow-back"></i>
          </Button>
          <Box>
            <Text isTruncated width={"430px"}>
              {props.post.title}
            </Text>
          </Box>
        </Flex>

        <Flex alignItems={"center"} ml={"auto"}>
          <Text fontSize={"12px"}>{!props.isSaving && "Changes saved"}</Text>
          {props.post?.published && <PublishButton />}
          <ProfileDropdown />
        </Flex>
      </Box>
      <Toolbar editor={props.editor} />
    </Box>
  );
}
