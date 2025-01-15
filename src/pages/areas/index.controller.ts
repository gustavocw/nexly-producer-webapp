import { useProducts } from "hooks/useProducts";

export const useAreasController = () => {
  const { areas, loadingAreas } = useProducts();

  return { areas, loadingAreas };
};
