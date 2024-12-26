import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../stores/all/auth.store";

interface AuthGuardProps {
  isPrivate: boolean;
  allowedRole?: "producer" | "user";
}

export function AuthGuard({ isPrivate, allowedRole }: AuthGuardProps) {
  const { isLogged, producer, user } = useAuthStore();

  if (isPrivate && !isLogged) {
    return <Navigate to="/login" replace />;
  }

  if (isLogged && allowedRole === "producer" && !producer) {
    return <Navigate to="/login" replace />;
  }

  if (isLogged && allowedRole === "user" && !user) {
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet />;
}
