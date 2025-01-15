import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { getAreas } from "services/areas.services";
import { getProducts } from "services/product.services";
import useProductStore from "stores/product.store";

interface ProductContextValue {
  areasList: [{ value: string; label: string }];
  areas: Area[];
  product?: Product | null;
  products?: Product[] | null;
  isLoadingProducts?: boolean,
  loadingAreas?: boolean,
  setProduct: (product: Product) => void;
  refetchAreas: () => void;
  refetchProducts: () => void;
  handleSetAreaId: (_id: string) => void;
}

export const ProductContext = createContext({} as ProductContextValue);
export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProductState] = useState<Product | null>(null);
  const [areaId, setAreaId] = useState("");
  const { setAreaId: setAreaIdProduct } = useProductStore();

  const handleSetAreaId = (_id: string) => {
    setAreaId(_id)
  }
  
  const setProduct = (product: Product) => {
    setProductState(product);
  };

    const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery({
      queryKey: ["infoproducts", areaId],
      queryFn: async () => {
        const res = await getProducts(areaId);
        setAreaIdProduct(areaId)
        return res;
      },
      enabled: !!areaId,
    });
  

  const { data: areas, refetch: refetchAreas, isLoading: loadingAreas } = useQuery({
    queryKey: ["areas"],
    queryFn: () =>
      getAreas().then((res) => {
        return res;
      }),
  });

  const areasList = areas?.map((area: any) => ({
    value: area._id,
    label: area.domain,
  }));

  return (
    <ProductContext.Provider value={{ handleSetAreaId, refetchProducts, loadingAreas, products, isLoadingProducts, areasList, refetchAreas, areas, product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useArea() {
  return useContext(ProductContext);
}
