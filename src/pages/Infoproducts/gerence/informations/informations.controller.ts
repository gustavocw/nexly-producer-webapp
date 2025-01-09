import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "hooks/useProducts";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMembersById } from "services/members.services";

const useInformationsController = () => {
  const [accessType, setAccessType] = useState("");
  const [lastAccess, setLastAccess] = useState("");
  const { onOpen, onClose } = useDisclosure();
  const { product } = useProducts();
  const { id } = useParams<{ id: string }>();
  const idParam = product?._id ?? id;

  const { data: members } = useQuery({
    queryKey: ["members-by-id", idParam],
    queryFn: () =>
      getMembersById(idParam).then((res) => {
        return res;
      }),
    enabled: !!idParam,
  });

  console.log(members);
  

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
    accessType,
    setAccessType,
    setLastAccess,
    lastAccess,
    typeAccessOptions,
    handleMenuAction,
    accessOptions,
    members,
    onOpen,
    onClose,
  };
};

export default useInformationsController;
