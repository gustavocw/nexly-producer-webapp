import { useProducts } from "hooks/useProducts";

export const useAreasController = () => {
  const { areas } = useProducts();

  return { areas };
};
