import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// This is a simple implementation that checks for a token in localStorage
// In a real application, you would want to validate the token and check its expiration
interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}