/** @format */
"use client";

import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "@chakra-ui/next-js";
import { useState } from "react";
import SearchBar from "./search";

const links: { path: string; type?: "auth" | "normal"; label: string }[] = [
  {
    type: "normal",
    path: "#",
    label: "contact",
  },
  {
    type: "normal",
    path: "#",
    label: "blog",
  },

  {
    type: "normal",
    path: "#",
    label: "membership",
  },

  {
    type: "auth",
    path: "/auth",
    label: "Sign up",
  },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box
      position={"fixed"}
      left={0}
      w={"100%"}
      bg={"white"}
      top={0}
      boxShadow={"md"}
      display={"flex"}
      alignItems={"center"}
      p={5}
      h={68}
      zIndex={99}
    >
      <Box>
        <Text fontSize={20} fontWeight={500}>
          OurCommunity
        </Text>
      </Box>

      <SearchBar />

      <Flex
        position={{ base: "fixed", md: "unset" }}
        w={{ base: "100%", md: "fit-content" }}
        display={{ base: showMenu ? "flex" : "none", md: "flex" }}
        h={{ base: "100%", md: "unset" }}
        bg={"white"}
        left={{ base: 0, md: "unset" }}
        top={{ base: 0, md: "unset" }}
        gap={"5px"}
        mt={0}
        p={{ base: "8px", md: 0 }}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        // color={"red"}
        zIndex={200}
      >
        <Flex
          display={{ base: "flex", md: "none" }}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          mr={6}
        >
          <IconButton
            onClick={() => {
              setShowMenu(false);
            }}
            fontSize={"35px"}
            icon={<MdClose />}
            aria-label=""
          />
        </Flex>
        {links.map((link, index) => {
          if (link?.type == "normal") {
            return (
              <Link
                onClick={() => {
                  setShowMenu(false);
                }}
                key={index}
                p={"10px"}
                w={{ base: "80%", md: "unset" }}
                borderRadius={"10px"}
                textAlign={{ base: "center", md: "unset" }}
                _hover={{ bg: "gray.100", textDecoration: "none" }}
                textTransform={"capitalize"}
                href={link.path}
              >
                {link.label}
              </Link>
            );
          } else {
            return (
              <Link
                ml={{ base: 0, md: "8px" }}
                p={"10px"}
                onClick={() => {
                  setShowMenu(false);
                }}
                bg={"#3182ce"}
                color={"#ffffff"}
                w={{ base: "80%", md: "unset" }}
                borderRadius={"10px"}
                textAlign={{ base: "center", md: "unset" }}
                key={index}
                href={link.path}
                _hover={{ bg: "gray.100", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            );
          }
        })}
      </Flex>

      <IconButton
        _hover={{ cursor: "pointer" }}
        fontSize={"30px"}
        p={"4px"}
        aria-label=""
        display={{ base: "unset", md: "none" }}
        icon={<GiHamburgerMenu />}
        onClick={() => {
          setShowMenu(true);
        }}
        ml={{ base: "auto", md: 0 }}
      />
    </Box>
  );
}
