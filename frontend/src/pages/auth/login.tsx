/** @format */
import { Link, useNavigate } from "react-router-dom";
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
import { isAxiosError } from "axios";
import { useAuth } from "../../context/auth";

export default function Login() {
  const toast = useToast();
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const data = { email, password };

      const response = await serverAxios.post("/auth/login", data);
      auth.setUser(response.data.user);
      toast({
        description: "Successfully logged in",
        title: "Logged in",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      console.log(response);
      navigate(`/profile/${response.data.user.username}`);
    } catch (err) {
      if (isAxiosError(err) && err.response?.data.message) {
        return toast({
          position: "top-right",
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      toast({
        title: "Error",
        position: "top-right",
        description: "Unexpected error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      console.log(err);
    } finally {
      setIsLoading(false);
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

      <Flex display={"flex"} flexDirection={"column"} p={2} gap={"8"}>
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
      </Flex>

      <Flex justifyContent={"flex-end"} p={2} width={"100%"}>
        <Link to={"/password"}>Forgot Password</Link>
      </Flex>

      <Box mt={2} p={2}>
        <Button
          isLoading={isLoading}
          loadingText={"Logging in"}
          type="submit"
          colorScheme="blue"
          width={"100%"}
        >
          Login
        </Button>
      </Box>
    </form>
  );
}
