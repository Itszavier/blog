import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import MongooseAdapter from "./lib/adapter";
import UserModel from "./models/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  adapter: MongooseAdapter(),
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
      type: "credentials",
      credentials: {
        email: { label: "email" },
        password: { label: "password" },
      },

      authorize: async ({ email, password }) => {
        console.log(email, password);
        const user = await UserModel.findOne({ email: email });

        if (!user) {
          console.log("no user with that password");
          throw new Error("Invalid credentials");
        }

        const vaildPassword = await user!.comparePassword(password as string);
        console.log(vaildPassword);
        if (!vaildPassword) {
          console.log("password not valid");
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
});
