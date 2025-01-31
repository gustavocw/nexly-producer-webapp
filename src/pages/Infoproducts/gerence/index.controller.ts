import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductUnique } from "services/product.services";
import { useProducts } from "hooks/useProducts";
import useProductStore from "stores/product.store";

interface UseGenrenceInfoproduct {
  product: Product | null;
  optionsNav: { label: string; value: string }[];
  handleSelectionChange: (value: string) => void;
  refetchCourse: () => void;
}

export const useGenrenceInfoproduct = (): UseGenrenceInfoproduct => {
  const { id } = useParams<{ id: string }>();
  const { setProduct } = useProducts();
  const { setProductId } = useProductStore();

  const { data: product, refetch: refetchCourse } = useQuery({
    queryKey: ["product-unique", id],
    queryFn: () =>
      getProductUnique(id).then((res) => {
        setProduct(res[0]);
        setProductId(id);
        return res[0];
      }),
    enabled: !!id,
  });

  useEffect(() => {
    if (!product && id) {
      refetchCourse();
    }
  }, [product, refetchCourse]);

  const optionsNav = [
    { label: "Informações", value: "informations" },
    { label: "Módulos", value: "modules" },
    { label: "Certificado", value: "certificates" },
  ];

  const handleSelectionChange = (value: string) => {
    console.log("Opção selecionada:", value);
  };

  return {
    product,
    optionsNav,
    refetchCourse,
    handleSelectionChange,
  };
};
