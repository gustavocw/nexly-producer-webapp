import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "hooks/useProducts";
import { useEffect, useState } from "react";
import { getMembersByArea } from "services/members.services";
import useProductStore from "stores/product.store";

const useMembersController = () => {
  const [accessType, setAccessType] = useState("");
  const [lastAccess, setLastAccess] = useState("");
  const { onOpen, onClose } = useDisclosure();
  const { areasList, handleSetAreaId } = useProducts();
  const { areaId } = useProductStore();

  useEffect(() => {
    if (!areaId) {
      handleSetAreaId(areasList[0].value)
    }
  }, [areaId])
  

  const { data: members } = useQuery({
    queryKey: ["members"],
    queryFn: () =>
      getMembersByArea(areaId).then((res) => {
        console.log(res);
        return res.data;
      }),
  });

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "export":
        console.log("Exportar Lista Atual");
        break;
      case "import":
        console.log("Importar Lista");
        break;
      case "bulkDelete":
        console.log("Excluir em Massa");
        break;
      default:
        console.log("Ação não reconhecida");
    }
  };

  const typeAccessOptions = [
    { value: "todos", label: "Todos" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "negocios", label: "Negócios" },
    { value: "arte", label: "Arte" },
    { value: "ciencia", label: "Ciência" },
    { value: "saude", label: "Saúde" },
    { value: "educacao", label: "Educação" },
    { value: "idiomas", label: "Idiomas" },
  ];

  const accessOptions = [
    { value: "todos", label: "Todos" },
    { value: "PUBLICO", label: "Ativos" },
    { value: "PRIVADO", label: "Inativos" },
  ];

  return {
    members,
    accessType,
    setAccessType,
    setLastAccess,
    handleSetAreaId,
    lastAccess,
    areasList,
    typeAccessOptions,
    handleMenuAction,
    accessOptions,
    onOpen,
    onClose,
  };
};

export default useMembersController;
