import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts } from "services/product.services";

const useInfoproductsController = () => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const { onOpen, onClose } = useDisclosure();

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
    queryKey: ["products"],
    queryFn: () =>
      getProducts().then((res) => {
        return res
      }),
  });

  console.log(products);
  

  return {
    category,
    products,
    setCategory,
    status,
    setStatus,
    categoryOptions,
    statusOptions,
    onOpen,
    onClose
  };
};

export default useInfoproductsController;
