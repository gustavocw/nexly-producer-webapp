import { useQuery } from "@tanstack/react-query";
import { getAreas } from "services/areas.services";

export const useAreasController = () => {
  const { data: areas } = useQuery({
    queryKey: ["areas"],
    queryFn: () =>
      getAreas().then((res) => {
        return res
      }),
  });

  return { areas };
};
