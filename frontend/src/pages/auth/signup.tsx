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
  return (
    <form>
      <Box mb={5} mt={19} display={"flex"} flexDir={"column"} justifyContent={"center"}>
        <Button display={"flex"} gap={3} colorScheme="blue">
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

      <Text textAlign={"left"} fontSize={"13"}>
        By creating an account, you agree to our Terms of Service and acknowledge our
        Privacy Policy
      </Text>
    </form>
  );
}
