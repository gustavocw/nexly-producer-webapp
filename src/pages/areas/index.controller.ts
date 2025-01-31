import { useProducts } from "contexts/ProductsContext";

export const useAreasController = () => {
  const { areas, loadingAreas } = useProducts();
  
  return { areas, loadingAreas };
};
