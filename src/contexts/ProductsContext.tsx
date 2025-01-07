import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { getAreas } from "services/areas.services";

interface ProductContextValue {
  areasList: [{ value: string; label: string }];
  areas: Area[];
  product?: Product | null;
  setProduct: (product: Product) => void;
}

export const ProductContext = createContext({} as ProductContextValue);
export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProductState] = useState<Product | null>(null);

  const setProduct = (product: Product) => {
    setProductState(product);
  };

  const { data: areas } = useQuery({
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
    <ProductContext.Provider value={{ areasList, areas, product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useArea() {
  return useContext(ProductContext);
}
