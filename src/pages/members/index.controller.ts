import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "hooks/useProducts";
import { useEffect, useState } from "react";
import { getMembersByArea } from "services/members.services";
import useProductStore from "stores/product.store";

const useMembersController = () => {
  const [accessType, setAccessType] = useState("");
  const [lastAccess, setLastAccess] = useState("");
  const [search, setSearch] = useState("");
  const { onOpen, onClose } = useDisclosure();
  const { areasList, handleSetAreaId, areas } = useProducts();
  const { areaId } = useProductStore();

  const { data: members, refetch: refetchMembers } = useQuery({
    queryKey: ["members", areaId, search],
    queryFn: () =>
      getMembersByArea(areaId, search).then((res) => {
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
    { value: "", label: "Nenhum" },
    { value: "", label: "Colaborador" },
    { value: "member", label: "Membro" },
  ];

  const accessOptions = [
    { value: "", label: "Todos" },
    { value: "ATIVO", label: "Ativos" },
    { value: "INATIVO", label: "Inativos" },
  ];

  useEffect(() => {
    if (!areaId && areas?.length) {
      handleSetAreaId(areasList[0]?.value);
    }
    if (members?.length === 0) {
      refetchMembers();
    }
  }, [areaId, areasList, members, refetchMembers]);
  
  return {
    members,
    accessType,
    setAccessType,
    setLastAccess,
    handleSetAreaId,
    lastAccess,
    areasList,
    setSearch,
    search,
    areaId,
    typeAccessOptions,
    refetchMembers,
    handleMenuAction,
    accessOptions,
    onOpen,
    onClose,
  };
};

export default useMembersController;
