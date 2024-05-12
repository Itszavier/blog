import { createContext, useEffect } from "react";

export const authContext = createContext({
  user: {},
  setUser: () => {},
  loading: false,
  setloading: () => {},
});

export function AuthProvider() {
  useEffect(() => {}, []);

  return <div></div>;
}
