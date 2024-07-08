"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import theme from "./theme";
import { SessionProvider } from "next-auth/react";
export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session?: any;
}) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ChakraProvider>
  );
}
