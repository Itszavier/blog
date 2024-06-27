/** @format */

import { IoNotifications } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import { useModal } from "../../context/modalContext";
import ProfileDropdown from "../profileDropdown";
import style from "./styles.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme";
import { Box, Text, List, ListItem, Button, useDisclosure } from "@chakra-ui/react";
import AuthModal from "../authmodal";

export default function Navbar() {
  const { user } = useAuth();
  // const postModal = useModal("createPost");
  //const { theme, toggleTheme } = useTheme();
  const { openModal } = useModal("auth");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLoginPopup = () => {
    openModal();
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      pl={10}
      pr={10}
      boxShadow={"md"}
      position={"fixed"}
      h={"68px"}
      zIndex={99}
      background={"gray.100"}
    >
      <Box className={style.logo_container}>
        <Link to="/" className={style.logo_link}>
          <Text fontSize={"larger"}>ProArticle</Text>
        </Link>
      </Box>
      <Box display={"flex"} gap={2} alignItems={"center"} ml={"auto"}>
        <Link to={"/#"} className={style.link}>
          MemberShip
        </Link>
        <Button onClick={onOpen} fontWeight={400}>
          Get Started
        </Button>
      </Box>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
