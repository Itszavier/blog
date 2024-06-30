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
} from "@chakra-ui/react";

export default function SignUp() {
  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };
  return (
    <form>
      <Box mb={5} mt={19} display={"flex"} flexDir={"column"} justifyContent={"center"}>
        <Button onClick={handleLogin} colorScheme="blue" display={"flex"} gap={3}>
          <i className="bx bxl-google"></i>
          Sign Up With Google
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
      <Text m={5} textAlign={"left"} fontSize={"13"}>
        By creating an account, you agree to our Terms of Service and acknowledge our
        Privacy Policy
      </Text>
      <Box p={2}>
        <Button colorScheme="blue" width={"100%"}>
          Sign Up
        </Button>
      </Box>
    </form>
  );
}
