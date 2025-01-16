import { useDisclosure } from "@chakra-ui/react";
import { useProducts } from "hooks/useProducts";

const useInfoproductsController = () => {
  const { onOpen, onClose } = useDisclosure();
  const {
    areasList,
    products,
    handleSetAreaId,
    isLoadingProducts,
  } = useProducts();

  const categoryOptions = [
    { value: "", label: "Todos" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "negocios", label: "Negócios" },
    { value: "arte", label: "Arte" },
    { value: "ciencia", label: "Ciência" },
    { value: "saude", label: "Saúde" },
    { value: "educacao", label: "Educação" },
    { value: "idiomas", label: "Idiomas" },
  ];

  const statusOptions = [
    { value: "", label: "Todos" },
    { value: "PUBLICO", label: "Ativos" },
    { value: "PRIVADO", label: "Inativos" },
  ];

  return {
    products,
    areasList,
    isLoadingProducts,
    handleSetAreaId,
    categoryOptions,
    statusOptions,
    onOpen,
    onClose,
  };
};

export default useInfoproductsController;
