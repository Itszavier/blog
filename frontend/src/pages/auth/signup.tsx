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

import { FormEvent, useState } from "react";
import { serverAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { isAxiosError } from "axios";

export default function SignUp() {
  const toast = useToast();
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const data = { email, password };
      const response = await serverAxios.post("/auth/signup", data);
      auth.setUser(response.data.user);
      console.log(response);
      toast({
        description: "We've created your Account",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      navigate(`/profile/${response.data.user._id}`);
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
      <Text m={5} textAlign={"left"} fontSize={"13"}>
        By creating an account, you agree to our Terms of Service and acknowledge our
        Privacy Policy
      </Text>
      <Box mt={2} p={2}>
        <Button
          isLoading={isLoading}
          loadingText={"Signing up"}
          type="submit"
          colorScheme="blue"
          width={"100%"}
        >
          Sign up
        </Button>
      </Box>
    </form>
  );
}
