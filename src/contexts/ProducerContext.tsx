import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getMe } from "services/user.services";
import useProducerStore from "stores/producer.store";

interface ProducerContextValue {
  isLoadingProfile: boolean;
}

export const ProducerContext = createContext({} as ProducerContextValue);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { setProducer } = useProducerStore();
  const { isLoading: isLoadingProfile } = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      getMe().then((res) => {
        setProducer(res);
        return res;
      }),
  });

  return (
    <ProducerContext.Provider value={{ isLoadingProfile }}>
      {children}
    </ProducerContext.Provider>
  );
};

export function useProducer() {
  return useContext(ProducerContext);
}
