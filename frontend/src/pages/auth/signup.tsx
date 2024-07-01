/** @format */
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Box,
  Checkbox,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useState } from "react";
import { serverAxios } from "../../api/axios";

export default function SignUp() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = { email, password };
      const response = await serverAxios.post("/auth/signup", data);
      console.log(response);
      toast({
        description: "We've created your Account",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        description: "Unexpected error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box mb={5} mt={19} display={"flex"} flexDir={"column"} justifyContent={"center"}>
        <Button onClick={handleLogin} colorScheme="blue" display={"flex"} gap={3}>
          <i className="bx bxl-google"></i>
          Sign Up With Google
        </Button>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={"8"}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </FormControl>
      </Box>
      <Text m={5} textAlign={"left"} fontSize={"13"}>
        By creating an account, you agree to our Terms of Service and acknowledge our
        Privacy Policy
      </Text>
      <Box p={2}>
        <Button type="submit" colorScheme="blue" width={"100%"}>
          Sign Up
        </Button>
      </Box>
    </form>
  );
}
