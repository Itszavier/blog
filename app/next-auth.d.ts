import type {
  AdapterUser as BaseAdapterUser,
  Adapter as BaseAdapter,
} from "next-auth/adapters";
import { ZodNullDef } from "zod";

declare module "@auth/core/adapters" {
  interface AdapterUser extends BaseAdapterUser {
    username: string;
    _id: string;
    picture: {
      url: string;
      id: string;
      storage: "url" | "us";
    };
  }

  interface Adapter extends BaseAdapter {
    getUserByAccount(
      providerAccountId: string,
      provider: string
    ): Promise<Account | null>;
  }
}
