import { Adapter } from "@auth/core/adapters";
import mongoose from "mongoose";
import UserModel from "../models/user";
import AccountModel, { Account } from "../models/account"; // Assuming you have an Account model
import user from "../models/user";
import { AdapterUser } from "@auth/core/adapters";
import SessionModel from "../models/sessions";
import { AdapterSession } from "next-auth/adapters";
// Assuming you have a Session model

export default function MongooseAdapter(): Adapter {
  return {
    createUser: async function ({ email, emailVerified, name }) {
      console.log("creating user");
      const createdUser = await UserModel.create({ email, emailVerified });
      return {
        id: createdUser._id.toString(),
        email: createdUser.email,
        emailVerified: null,
        username: createdUser.username,
        image: createdUser.picture.url,
        picture: createdUser.picture,
        name: name,
        _id: createdUser._id.toString(),
      } satisfies AdapterUser;
    },

    getUser: async function (id) {
      console.log("getting user by id");
      return await extractAdapterUserById(id);
    },

    getUserByEmail: async function (email) {
      console.log("getting user by email");
      return await extractAdapterUserByEmail(email);
    },

    deleteUser: async function (id) {
      console.log("deleting user by email");
      await UserModel.findByIdAndDelete(id);
    },
    getUserByAccount: async function (
      providerAccountId: string,
      provider: string
    ) {
      try {
        const account = await AccountModel.findOne({
          providerAccountId,
          provider,
        }).exec();
        if (!account) {
          return null;
        }

        const user = await UserModel.findById(account.userId).exec();
        return user as any;
      } catch (error) {
        console.error("Error getting user by account:", error);
        throw new Error("Could not get user by account");
      }
    },

    linkAccount: async function (account) {
      console.log("linking account", account);
      return;
    },
    unlinkAccount: async function ({ providerAccountId, provider }) {
      console.log("unlinking account", providerAccountId);
      return;
    },
    createSession: async function ({ sessionToken, userId, expires }) {
      console.log("creating session", sessionToken, userId, expires);
      try {
        const session = new SessionModel({
          _id: new mongoose.Types.ObjectId().toString(),
          sessionToken,
          userId,
          expires,
        });
        await session.save();
        return session;
      } catch (error) {
        console.error("Error creating session:", error);
        throw new Error("Could not create session");
      }
    },
    getSessionAndUser: async function (sessionToken) {
      console.log("feteching session", sessionToken);
      try {
        const session = await SessionModel.findOne({ sessionToken }).exec();
        if (!session) return null;
        const user = await UserModel.findById(session.userId).exec();
        if (!user) return null;
        return { session, user } as any;
      } catch (error) {
        console.error("Error getting session and user:", error);
        throw new Error("Could not get session and user");
      }
    },
    updateSession: async function ({ sessionToken }) {
      console.log("updating session", sessionToken);
      try {
        const session = await SessionModel.findOneAndUpdate(
          { sessionToken },
          { timestamp: Date.now() },
          { new: true }
        ).exec();
        return session;
      } catch (error) {
        console.error("Error updating session:", error);
        throw new Error("Could not update session");
      }
    },
    deleteSession: async function (sessionToken) {
      console.log("deleting session", sessionToken);
      try {
        await SessionModel.deleteOne({ sessionToken }).exec();
        return null;
      } catch (error) {
        console.error("Error deleting session:", error);
        throw new Error("Could not delete session");
      }
    },
  };
}

async function extractAdapterUserById(id: string) {
  return (await UserModel.findById(id).select(
    "email username name picture _id followers following emailVerified"
  )) as AdapterUser;
}

async function extractAdapterUserByEmail(email: string) {
  return (await UserModel.findOne({ email: email }).select(
    "email username name picture _id followers following emailVerified"
  )) as AdapterUser;
}
