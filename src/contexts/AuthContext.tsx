import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "config/localStorageKeys";
import useAuthStore from "../stores/auth.store";
import { toaster } from "components/ui/toaster";

interface AuthContextValue {
  isLogged: boolean;
  auth(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    producerStore,
    setEmail,
    setPassword,
    email,
    password,
    rememberMe,
  } = useAuthStore();

  const [isLogged, setIsLogged] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storedAccessToken;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
      setIsLogged(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  const auth = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setIsLogged(true);
  }, []);

  const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key] = cookie.split("=");
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  };

  const signout = useCallback(async () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    clearCookies();
    setIsLogged(false);
  }, [setIsLogged, setEmail, setPassword]);

  useEffect(() => {
    const pathname = location.pathname;
    const pathSegments = pathname.split("/");
    const idFromPath = pathSegments[1];
    if (producerStore === null && idFromPath !== "login") {
      toaster.create({
        title: "Sua sessão expirou!",
        type: "error",
      });
      signout();
    }
  }, [email, password, rememberMe, producerStore, signout]);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        auth,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
