"use client";

import { Button, IconButton } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export function GoogleButton() {
  return (
    <Button
      w={{ base: "90%", md: "335px" }}
      colorScheme="blue"
      onClick={async () => {
        try {
          await signIn("google");
        } catch (error) {
          console.error("Error signing in with Google:", error);
          // Handle the error (e.g., show an error message to the user)
        }
      }}
    >
      Sign in with Google
    </Button>
  );
}

export function XButton() {
  return (
    <Button colorScheme="blue" w={{ base: "90%", md: "335px" }}>
      Sign in with Twitter(x)
    </Button>
  );
}
