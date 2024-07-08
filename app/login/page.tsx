import { GoogleButton, XButton } from "@/app/components/authButton";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Button,
  Text,
  Input,
  Flex,
  Divider,
  Heading,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormEvent } from "react";

/// import { serverAxios } from "../../api/axios";
// import { isAxiosError } from "axios";
// import { useAuth } from "../../context/auth";

export default function Login() {
  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };

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
          Login
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
            Login
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
