import { useProducts } from "contexts/ProductsContext";

export const useAreasController = () => {
  const { areas, loadingAreas } = useProducts();
  console.log("aq", areas);
  
  return { areas, loadingAreas };
};
