import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import MongooseAdapter from "./lib/adapter";
import UserModel from "./models/user";

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

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "username", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) {
          return null;
        } else {
          if (!(await user.comparePassword(credentials.password as string))) {
            return null;
          }
          return user;
        }
      },
    }),
  ],
});
