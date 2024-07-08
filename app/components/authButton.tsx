"use client";

import { Button, IconButton } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export function GoogleButton() {
  return (
    <Button
      onClick={() => {
        signIn("google");
      }}
      w={"90%"}
    >
      Sign in with Google
    </Button>
  );
}

export function XButton() {
  return <Button w={"90%"}>Sign in with Twitter</Button>;
}
