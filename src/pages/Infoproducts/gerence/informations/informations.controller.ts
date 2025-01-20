import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "hooks/useProducts";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMembersById } from "services/members.services";

const useInformationsController = () => {
  const [search, setSeach] = useState("");
  const { onOpen, onClose } = useDisclosure();
  const { product } = useProducts();
  const { id } = useParams<{ id: string }>();
  const idParam = product?._id ?? id;

  const { data: members, refetch: refetchMembers } = useQuery({
    queryKey: ["members-by-id", idParam, search],
    queryFn: () =>
      getMembersById(idParam, search).then((res) => {
        return res;
      }),
    enabled: !!idParam,
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
    { value: "", label: "Nenhum" },
    { value: "colaborator", label: "Colaborador" },
    { value: "member", label: "Membro" },
  ];

  const accessOptions = [
    { value: "", label: "Todos" },
    { value: "ATIVO", label: "Ativos" },
    { value: "INATIVO", label: "Inativos" },
  ];


  return {
    refetchMembers,
    setSeach,
    typeAccessOptions,
    handleMenuAction,
    accessOptions,
    members,
    onOpen,
    onClose,
  };
};

export default useInformationsController;
