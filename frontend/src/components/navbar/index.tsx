/** @format */

import { IoNotifications } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import { useModal } from "../../context/modalContext";
import ProfileDropdown from "../profileDropdown";
import style from "./styles.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme";
import {
  Box,
  Text,
  List,
  ListItem,
  Button,
  useDisclosure,
  useColorModeValue,
  DarkMode,
  useColorMode,
} from "@chakra-ui/react";
import AuthModal from "../authmodal";
import CreateButton from "../createButton";

export default function Navbar() {
  const auth = useAuth();
  // const postModal = useModal("createPost");
  //const { theme, toggleTheme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const { openModal } = useModal("auth");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLoginPopup = () => {
    openModal();
  };

  console.log(colorMode);

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
      bgColor={"light.background"}
      color={"light.headerFooterText"}
    >
      <Box className={style.logo_container}>
        <Link to="/" className={style.logo_link}>
          <Text fontSize={"larger"}>ProArticle </Text>
        </Link>
      </Box>
      <Box display={"flex"} gap={2} alignItems={"center"} ml={"auto"}>
        {!auth.user ? (
          <>
            <Link to={"/#"} className={style.link}>
              MemberShip
            </Link>
            <Button onClick={onOpen} fontWeight={400}>
              Get Started
            </Button>
          </>
        ) : (
          <>
            <CreateButton />
            <ProfileDropdown />
          </>
        )}{" "}
      </Box>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
