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
  IconButton,
  Flex,
} from "@chakra-ui/react";
import AuthModal from "../authmodal";
import CreateButton from "../createButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Navbar() {
  const auth = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);
  // const postModal = useModal("createPost");
  //const { theme, toggleTheme } = useTheme();

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      boxShadow={{ base: "md", sm: "md" }}
      position={"fixed"}
      h={"68px"}
      pl={"4px"}
      pr={"4px"}
      zIndex={99}
      bgColor={"light.background"}
      color={"light.headerFooterText"}
    >
      <Box className={style.logo_container}>
        <Link to="/" className={style.logo_link}>
          <Text fontSize={"larger"}>ProArticle </Text>
        </Link>
      </Box>
      <Box
        className={style.links}
        display={{ base: "none", sm: "flex" }}
        gap={2}
        position={{ base: "absolute", sm: "unset" }}
        left={{ base: 0, sm: "unset" }}
        top={{ base: "68px", sm: "unset" }}
        w={{ base: "100%", sm: "fit-content" }}
        ml={{ base: 0, sm: "auto" }}
        flexDirection={{ base: "column", sm: "unset" }}
        alignItems={"center"}
        bgColor={"light.background"}
        boxShadow={{ base: "md", sm: "none" }}
      >
        {!auth.user ? (
          <>
            <Link to={"/#"} className={style.link}>
              MemberShip
            </Link>

            <Link to={"/auth"} className={style.link}>
              Login/Signup
            </Link>
          </>
        ) : (
          <>
            <CreateButton />
          </>
        )}{" "}
      </Box>

      <Flex gap={2} ml={{ base: "auto", sm: "4" }} alignItems={"center"}>
        <ProfileDropdown />
        <IconButton
          display={{ base: "flex", sm: "none" }}
          m={0}
          fontSize={"35px"}
          icon={<GiHamburgerMenu />}
          aria-label=""
          size={"lg"}
          mr="2px"
        />
      </Flex>
    </Box>
  );
}

/* <Button onClick={onOpen} fontWeight={400}>
   Get Started
 </Button>;

 */
