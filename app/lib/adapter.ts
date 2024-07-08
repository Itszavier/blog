/** @return { import("next-auth/adapters").Adapter } */
import mongoose from "mongoose";

export default function MongooseAdapter() {
  return {
    async createUser(user: any) {
      console.log(user);
      return;
    },
    async getUser(id: any) {
      return;
    },
    async getUserByEmail(email: any) {
      return;
    },
    async getUserByAccount({ providerAccountId, provider }: any) {
      return;
    },
    async updateUser(user: any) {
      return;
    },
    async deleteUser(userId: any) {
      return;
    },
    async linkAccount(account: any) {
      return;
    },
    async unlinkAccount({ providerAccountId, provider }: any) {
      return;
    },
    async createSession({ sessionToken, userId, expires }: any) {
      return;
    },
    async getSessionAndUser(sessionToken: any) {
      return;
    },
    async updateSession({ sessionToken }: any) {
      return;
    },
    async deleteSession(sessionToken: any) {
      return;
    },
    async createVerificationToken({ identifier, expires, token }: any) {
      return;
    },
    async useVerificationToken({ identifier, token }: any) {
      return;
    },
  };
}
