import { createContext, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { localStorageKeys } from "config/localStorageKeys";
import axios from "axios";

interface AuthContextValue {
  signedIn: boolean;
  user: any;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ["producer"],
    queryFn: async () => axios.get(""),
    enabled: signedIn,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(async () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  // useEffect(() => {
  //   if (isError) {
  //     toast({
  //       variant: "destructive",
  //       title: "Sua sessão expirou!",
  //     });
  //     signout();
  //   }
  // }, [isError, signout, toast]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout,
      }}
    >
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
