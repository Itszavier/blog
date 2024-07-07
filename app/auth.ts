import NextAuth from "next-auth";
import { GoogleProvider } from "./providers/google";
import mongoose from "mongoose";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GoogleProvider],
});
