"use client";

import { Button, IconButton } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export function GoogleButton() {
  return (
    <Button
      bg={"light.secondaryBtn"}
      onClick={async () => {
        try {
          await signIn("google");
        } catch (error) {
          console.error("Error signing in with Google:", error);
          // Handle the error (e.g., show an error message to the user)
        }
      }}
      w={"90%"}
    >
      Sign in with Google
    </Button>
  );
}

export function XButton() {
  return (
    <Button bg={"light.secondaryBtn"} w={"90%"}>
      Sign in with Twitter(x)
    </Button>
  );
}
