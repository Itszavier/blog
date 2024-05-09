import { createContext } from "react";

export const authContext = createContext({
  user: {},
  setUser: () => {},
  loading: false,
  setloading: () => {},
});

export function AuthProvider() {}
