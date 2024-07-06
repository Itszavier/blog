import { Link } from "@chakra-ui/next-js";
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
import { FormEvent } from "react";

export default function Login() {


 
  return (
    <Box w={"100%"} h={"100vh"}>
      <form>
        <Box
          mb={5}
          mt={19}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Button colorScheme="blue" display={"flex"} gap={3}>
            <i className="bx bxl-google"></i>
            Login With Google
          </Button>
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

        <Flex justifyContent={"flex-end"} p={2} width={"100%"}>
          <Text>
            Already have an account <Link href={"/auth/signup"}>signup</Link>
          </Text>
          <Link href={"/reset-password"}>Forgot Password</Link>
        </Flex>

        <Box mt={2} p={2}>
          <Button
            loadingText={"Logging in"}
            type="submit"
            colorScheme="blue"
            width={"100%"}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
