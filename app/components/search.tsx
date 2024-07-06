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
    <Box ml={"auto"} mr={"auto"} width={"40%"}>
      <Flex position={"relative"} bg={"light.background"} rounded={8}>
        <Input
          border={"none"}
          flex={1}
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
          icon={<HiSearch />}
          aria-label=""
          bg={"transparent"}
        />
      </Flex>
    </Box>
  );
}
