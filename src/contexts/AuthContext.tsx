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
    rememberMe,
    producerStore,
    clearCredentials,
    resetProducerStore,
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

  const signout = useCallback(() => {
    clearCookies();
    setIsLogged(false);
    const keysToPreserve = [
      localStorageKeys.ACCESS_TOKEN,
      'sidebarTourCompleted',
      'auth-storage'
    ];
    Object.keys(localStorage).forEach(key => {
      if (!keysToPreserve.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    if (!rememberMe) {
      clearCredentials();
    }
    resetProducerStore();
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
  }, [setIsLogged, rememberMe, clearCredentials, resetProducerStore]);

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
  }, [producerStore, signout]);

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