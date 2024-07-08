import Link from "next/link";

import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Text,
  Input,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { GoogleButton, XButton } from "@/app/components/authButton";
import { signIn } from "@/app/auth";

export default function Signup() {
  return (
    <Box
      pt={"68px"}
      w={"100%"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box as="form" p={"14px"} boxShadow={"md"} width={"450px"}>
        <Heading size={"lg"} p={"14px"} textAlign={"center"}>
          Sign up
        </Heading>
        <Flex flexDir={"column"} alignItems={"center"}>
          <FormControl w="90%" p={"14px"}>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" />
          </FormControl>

          <FormControl w="90%" p={"14px"}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" />
          </FormControl>
        </Flex>

        <Flex mt={2} p={2} w={"100%"} justify={"center"}>
          <Button type="submit" colorScheme="blue" width={"90%"}>
            Sign up
          </Button>
        </Flex>
        <Flex justifyContent={"center"} w={"100%"} alignItems="center">
          <Divider w={"20px"} orientation="horizontal" height="2px" flex="1" />
          <Text mx={2}>Or</Text>
          <Divider w={"20px"} orientation="horizontal" height="2px" flex="1" />
        </Flex>
        <Flex
          mt={2}
          gap={"3"}
          flexDirection={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <GoogleButton />
          <XButton />
        </Flex>
      </Box>
    </Box>
  );
}
