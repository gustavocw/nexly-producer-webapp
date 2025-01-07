import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductUnique } from "services/product.services";
import { useProducts } from "hooks/useProducts";

interface UseGenrenceInfoproduct {
  product: Product | null;
  optionsNav: { label: string; value: string }[];
  handleSelectionChange: (selectedOption: {
    label: string;
    value: string;
  }) => void;
}

export const useGenrenceInfoproduct = (): UseGenrenceInfoproduct => {
  const { id } = useParams<{ id: string }>();
  const { product: productData, setProduct } = useProducts();

  const { data: productUnique, refetch } = useQuery({
    queryKey: ["product-byId", productData?._id],
    queryFn: () =>
      getProductUnique(id).then((res) => {
        setProduct(res[0]);
        return res[0];
      }),
    enabled: !productData?._id && !!id,
  });

  const product = productData ?? productUnique;

  useEffect(() => {
    if (!product) {
      refetch();
    }
  }, [product, refetch]);

  const optionsNav = [
    { label: "Informações", value: "informations" },
    { label: "Módulos", value: "modules" },
    { label: "Certificado", value: "certificates" },
  ];

  const handleSelectionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    console.log("Opção selecionada:", selectedOption);
  };

  return {
    product,
    optionsNav,
    handleSelectionChange,
  };
};
