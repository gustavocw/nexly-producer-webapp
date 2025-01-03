import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { isLogged } = useAuth();

  if (isLogged === false && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isLogged && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}