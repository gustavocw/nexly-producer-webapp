import { useDisclosure } from "@chakra-ui/react";
import { useProducts } from "hooks/useProducts";
import { useState } from "react";

const useInfoproductsController = () => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const { onOpen, onClose } = useDisclosure();
  const { areasList, products, handleSetAreaId, isLoadingProducts } = useProducts();

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
  

  return {
    category,
    products,
    setCategory,
    areasList,
    isLoadingProducts,
    status,
    handleSetAreaId,
    setStatus,
    categoryOptions,
    statusOptions,
    onOpen,
    onClose,
  };
};

export default useInfoproductsController;
