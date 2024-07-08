import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import MongooseAdapter from "./lib/adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
