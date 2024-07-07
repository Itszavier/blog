import { GoogleButton } from "@/app/components/authButton";
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
      <Box
        as="form"
        width={"470px"}
        h="fit-content"
        boxShadow={"md"}
        p={"10px"}
      >
        <Box padding={"5px"}>
          <Heading textAlign={"center"}>Login</Heading>
        </Box>

        <Flex display={"flex"} flexDirection={"column"} p={2} gap={"8"}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" type={"email"} />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" type={"password"} />
          </FormControl>
        </Flex>

        <Flex justifyContent={"space-evenly"} p={2} width={"100%"}>
          <Text>
            Don't have an account? <Link href={"/auth/signup"}>Signup</Link>
          </Text>

          <Link style={{ marginLeft: "auto" }} href={"/reset-password"}>
            Forgot Password
          </Link>
        </Flex>
        <Box p={"4px"}>
          <Button type="submit" colorScheme="blue" width={"100%"}>
            Login
          </Button>
        </Box>

        <Divider h={"20px"} />
        <Box padding={"10px"}>
          <Flex justify={"center"} alignItems={"center"}>
            <GoogleButton />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
