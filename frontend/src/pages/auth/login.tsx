/** @format */
import { Link } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { serverAxios } from "../../api/axios";

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = { email, password };
      const response = await serverAxios.post("/auth/login", data);
      console.log(response);
      toast({
        description: "Successfully logged in",
        title: "Logged in",
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

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={5} mt={19} display={"flex"} flexDir={"column"} justifyContent={"center"}>
        <Button onClick={handleLogin} colorScheme="blue" display={"flex"} gap={3}>
          <i className="bx bxl-google"></i>
          Login With Google
        </Button>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={"8"}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type={"email"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type={"password"}
          />
        </FormControl>
      </Box>

      <Flex justifyContent={"flex-end"} p={2} width={"100%"}>
        <Link to={"/password"}>Forgot Password</Link>
      </Flex>

      <Box mt={2} p={2}>
        <Button type="submit" colorScheme="blue" width={"100%"}>
          Sign Up
        </Button>
      </Box>
    </form>
  );
}
