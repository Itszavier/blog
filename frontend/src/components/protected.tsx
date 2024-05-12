/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <div>loading...</div>;

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
}
