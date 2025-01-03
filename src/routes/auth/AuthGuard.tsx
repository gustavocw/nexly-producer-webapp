import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../stores/auth.store";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { isLogged } = useAuthStore();

  if (isPrivate && !isLogged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
