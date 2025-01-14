import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import { createContext, useContext, useState } from "react";
import { getMe, getNotifications } from "services/producer.services";
import useProducerStore from "stores/producer.store";

interface ProducerContextValue {
  isLoadingProfile: boolean;
  isLoadinsNotifications: boolean;
  notifications: any;
}

export const ProducerContext = createContext({} as ProducerContextValue);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLogged } = useAuth();
  const { setProducer } = useProducerStore();
  const [notifications, setNotifications] = useState([])

  const { isLoading: isLoadinsNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      getNotifications().then((res) => {
        setNotifications(res);
        return res;
      }),
    enabled: !!isLogged,
  });

  const { isLoading: isLoadingProfile } = useQuery({
    queryKey: ["producer"],
    queryFn: () =>
      getMe().then((res) => {
        setProducer(res);
        return res;
      }),
    enabled: !!isLogged,
  });

  return (
    <ProducerContext.Provider value={{ isLoadingProfile, isLoadinsNotifications, notifications }}>
      {children}
    </ProducerContext.Provider>
  );
};

export function useProducer() {
  return useContext(ProducerContext);
}
