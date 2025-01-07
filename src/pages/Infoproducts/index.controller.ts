import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "hooks/useProducts";
import { useState } from "react";
import { getProducts } from "services/product.services";
import useProductStore from "stores/product.store";

const useInfoproductsController = () => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [areaId, setAreaId] = useState("");
  const { setAreaId: setAreaIdProduct } = useProductStore();
  const { onOpen, onClose } = useDisclosure();
  const { areasList } = useProducts();

  const categoryOptions = [
    { value: "todos", label: "Todos" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "negocios", label: "Negócios" },
    { value: "arte", label: "Arte" },
    { value: "ciencia", label: "Ciência" },
    { value: "saude", label: "Saúde" },
    { value: "educacao", label: "Educação" },
    { value: "idiomas", label: "Idiomas" },
  ];

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "PUBLICO", label: "Ativos" },
    { value: "PRIVADO", label: "Inativos" },
  ];

  const { data: products } = useQuery({
    queryKey: ["infoproducts", areaId],
    queryFn: async () => {
      const res = await getProducts(areaId);
      setAreaIdProduct(areaId)
      return res;
    },
    enabled: !!areaId,
  });
  

  return {
    category,
    products,
    setCategory,
    areasList,
    status,
    setAreaId,
    setStatus,
    categoryOptions,
    statusOptions,
    onOpen,
    onClose,
  };
};

export default useInfoproductsController;
