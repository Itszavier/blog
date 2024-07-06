"use client";
import { HiSearch } from "react-icons/hi";

import {
  Box,
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
  Flex,
  Slide,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SearchBar() {
  return (
    <Box m={"auto"} display={"flex"} alignItems={"center"} width={"40%"}>
      <Flex
        width={"100%"}
        position={"relative"}
        bg={"light.background"}
        rounded={2}
      >
        <Input
          border={"none"}
          flex={1}
          p={"10px 20px"}
          outline={"none"}
          bg={"transparent"}
          _active={{ outline: "none", border: "none", boxShadow: "none" }}
          _focus={{ outline: "none", border: "none", boxShadow: "none" }}
          rounded={0}
          placeholder="Search"
        />

        <IconButton
          cursor={"pointer"}
          fontSize={"23px"}
          p={"10px"}
          icon={<HiSearch />}
          aria-label=""
          bg={"transparent"}
        />
      </Flex>
    </Box>
  );
}
