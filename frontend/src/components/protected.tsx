/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import Loading from "./loading";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
}
