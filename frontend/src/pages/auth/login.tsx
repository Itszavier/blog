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
} from "@chakra-ui/react";

export default function Login() {
  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };

  return (
    <form>
      <Box mb={5} mt={19} display={"flex"} flexDir={"column"} justifyContent={"center"}>
        <Button onClick={handleLogin} colorScheme="blue" display={"flex"} gap={3}>
          <i className="bx bxl-google"></i>
          Login With Google
        </Button>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={"8"}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" />
        </FormControl>
      </Box>

      <Flex justifyContent={"flex-end"} p={2} width={"100%"}>
        <Link to={"/password"}>Forgot Password</Link>
      </Flex>

      <Box mt={2} p={2}>
        <Button colorScheme="blue" width={"100%"}>
          Sign Up
        </Button>
      </Box>
    </form>
  );
}
