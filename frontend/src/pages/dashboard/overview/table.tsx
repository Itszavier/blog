/** @format */

import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../../../api/types";
import {
  Box,
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  useDisclosure,
  Tag,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import style from "./style.module.css";
import moment from "moment";
interface TableProps {
  title: string;
  posts: IPost[];
}

export default function PostTable(props: TableProps) {
  const navigate = useNavigate();
  const [posts, setPost] = useState<IPost[]>(() => props.posts || []);

  const editPost = (postId: string): void => {
    navigate(`/editor/${postId}`);
    console.log("Editing post", postId);
  };

  const unpublishPost = (postId: string): void => {
    console.log("Unpublishing post", postId);
  };

  return (
    <Box mt={"20px"} className={style.recent_activity}>
      <Box w={"450px"} display={"flex"} alignItems={"center"}>
        <Input flex={1} rounded={0} placeholder="Filter" />
        <Button rounded={0}>
          <SearchIcon />
        </Button>
      </Box>
      <TableContainer>
        <Table variant="striped" overflowY={"auto"} h={"120px"}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th isNumeric>Status</Th>
              <Th isNumeric>created</Th>
              <Th isNumeric>Likes</Th>
              <Th isNumeric>Comments</Th>
              <Th>options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.posts.map((post) => {
              return (
                <Tr>
                  <Td isNumeric>
                    <Text
                      _hover={{ color: "blue" }}
                      isTruncated
                      textAlign={"start"}
                      width={"340px"}
                    >
                      <Link to={`/editor/${post._id}`}>{post.title}</Link>
                    </Text>
                  </Td>
                  <Td isNumeric>
                    {post.published ? <Tag>Published</Tag> : <Tag>Draft</Tag>}
                  </Td>
                  <Td>{moment(post.createdAt).fromNow()}</Td>
                  <Td isNumeric>0</Td>
                  <Td isNumeric>0</Td>
                  <Td>
                    <OptionMenu />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function OptionMenu() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        _hover={{ bg: "transparent" }}
        bg={"transparent"}
        fontSize={"24px"}
      >
        <i className="bx bx-dots-horizontal-rounded"></i>
      </MenuButton>
      <MenuList w={"90px"}>
        <MenuItem p={0}>
          <DeleteButton />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function DeleteButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  return (
    <>
      <Button colorScheme="red" w={"100%"} rounded={0} onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <AlertDialogCloseButton ref={cancelRef} />
              Delete Article
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
