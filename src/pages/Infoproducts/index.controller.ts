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
    statusOptions,
    onOpen,
    onClose,
  };
};

export default useInfoproductsController;
