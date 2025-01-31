import { useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useAuth } from "hooks/useAuth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createArea, getAreas, updateArea } from "services/areas.services";
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
  creatingArea?: boolean;
  updatingArea?: boolean;
  setProduct: (product: Product) => void;
  refetchAreas: () => void;
  refetchProducts: () => void;
  handleSetAreaId: (_id: string) => void;
  mutateArea: (payload: any) => void;
  mutateUpdateArea: (payload: any) => void;
  defaultArea?: { value: string; label: string };
}

export const ProductContext = createContext({} as ProductContextValue);
export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProductState] = useState<Product | null>(null);
  const [areaId, setAreaId] = useState("");
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

  const { mutate: mutateArea, isPending: creatingArea } = useMutation({
    mutationFn: (payload: any) => createArea(payload),
    onSuccess: () => {
      refetchAreas();
      toaster.create({
        title: "Área criada com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Erro ao criar área: ${error}`,
        type: "error",
      });
    },
  });

  const { mutate: mutateUpdateArea, isPending: updatingArea } = useMutation({
    mutationFn: (payload: any) => updateArea(payload.area, payload._id),
    onSuccess: () => {
      refetchAreas();
      toaster.create({
        title: "Área atualizada com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Erro ao atualizar área: ${error}`,
        type: "error",
      });
    },
  });
  
  const areasList = useMemo(() => {
    if (!areas || !Array.isArray(areas)) return [];
    return areas.map((area: any) => ({
      value: area._id,
      label: area.title,
    }));
  }, [areas]);
  

  useEffect(() => {
    if (products?.length === 0 && isLogged) {
      refetchProducts();
    }
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        areaId,
        handleSetAreaId,
        mutateUpdateArea,
        mutateArea,
        defaultArea,
        creatingArea,
        updatingArea,
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
