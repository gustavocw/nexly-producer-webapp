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

  const auth = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setIsLogged(true);
  }, []);

  const signout = useCallback(async () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setIsLogged(false);
  }, [setEmail, setPassword]);

  useEffect(() => {
    if (rememberMe && email && password) {
      console.log("Lembrar de Mim ativo:", email);
    }

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
