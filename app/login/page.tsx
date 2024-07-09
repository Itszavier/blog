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
import LoginForm from "./form";

export default function Login() {
  return (
    <Box
      pt={"68px"}
      w={"100%"}
      bg={"light.background"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      <LoginForm />
    </Box>
  );
}
