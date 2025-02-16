import { useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks/useAuth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAreas } from "services/areas.services";
import { getProducts } from "services/product.services";
import useProductStore from "stores/product.store";

interface ProductContextValue {
  areasList: any;
  areaId: string;
  areas?: Area[];
  product?: Product | null;
  products?: Product[] | null;
  isLoadingProducts?: boolean;
  loadingAreas?: boolean;
  setProduct: (product: Product) => void;
  refetchAreas: () => void;
  refetchProducts: () => void;
  handleSetAreaId: (_id: string) => void;
  defaultArea?: { value: string; label: string };
}

export const ProductContext = createContext({} as ProductContextValue);
export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProductState] = useState<Product | null>(null);
  const [defaultArea, setDefaultArea] = useState<{
    value: string;
    label: string;
  }>();
  const { setAreaId: setAreaIdProduct, search } = useProductStore();
  const { isLogged } = useAuth();

  const handleSetAreaId = (_id: string) => {
    setAreaId(_id);
  };

  const setProduct = (product: Product) => {
    setProductState(product);
  };

  const {
    data: areas,
    refetch: refetchAreas,
    isLoading: loadingAreas,
  } = useQuery({
    queryKey: ["areas", isLogged],
    queryFn: async () => {
      return getAreas()
    },
    enabled: isLogged,
  });
    
  const areasList = useMemo(() => {
    if (!areas || !Array.isArray(areas)) return [];
    return areas.map((area: any) => ({
      value: area._id,
      label: area.title,
    }));
  }, [areas]);
  
  const [areaId, setAreaId] = useState(() => areasList.length > 0 ? areasList[0].value : "");

  const {
    data: products,
    isLoading: isLoadingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["infoproducts", areaId, search, isLogged],
    queryFn: async () => {
      const res = await getProducts(areaId, search);
      setAreaIdProduct(areaId);
      return res;
    },
    enabled: !!areaId && isLogged,
  });

  
  useMemo(() => {
    if (areas && areas.length > 0) {
      if (!defaultArea) {
        const firstArea = areas[0];
        setDefaultArea({
          value: firstArea._id,
          label: firstArea.title,
        });
      }
    }
  }, [areas, defaultArea]);

  useEffect(() => {
    if (!areaId && areasList.length > 0) {
      const firstAreaId = areasList[0].value;
      setAreaId(firstAreaId);
    }
  
    if (products?.length === 0 && isLogged) {
      refetchProducts();
    }
  }, [products, areaId, areasList]);
  
  return (
    <ProductContext.Provider
      value={{
        areaId,
        handleSetAreaId,
        defaultArea,
        refetchProducts,
        loadingAreas,
        products,
        isLoadingProducts,
        areasList,
        refetchAreas,
        areas,
        product,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProducts() {
  return useContext(ProductContext);
}
