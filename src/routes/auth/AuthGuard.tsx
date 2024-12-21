import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from '../../stores/all/auth.store';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { isLogged, producer, user } = useAuthStore();

  if (isLogged === false && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isLogged && !isPrivate && producer) {
    return <Navigate to="/" replace />;
  }

  if (isLogged && !isPrivate && user) {
    return <Navigate to="/user/home" replace />;
  }

  return <Outlet />;
}