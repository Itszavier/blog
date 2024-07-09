import Link from "next/link";

import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Text,
  Input,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { GoogleButton, XButton } from "@/app/components/authButton";
import { signIn } from "@/app/auth";
import SignUpForm from "./form";

export default function Signup() {
  return (
    <Box
      pt={"68px"}
      w={"100%"}
      bg={"light.background"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      <SignUpForm />
    </Box>
  );
}
