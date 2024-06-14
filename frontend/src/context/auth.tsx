/** @format */
import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { serverAxios } from "../api/axios";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  followers: string[];
  following: string[];
}

interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const authContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
});

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("Auth context was not provided");
  }
  return context;
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    serverAxios
      .get("/auth/check")
      .then(function (response) {
        if (!response.data) return;
        setUser(response.data.user);
        console.log("form context", response.data);
      })
      .catch(function (error) {
        if (!error.response.data) return;
        setError(error.response.data.message);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <authContext.Provider value={{ error, user, loading, setError, setLoading, setUser }}>
      {props.children}
    </authContext.Provider>
  );
}
