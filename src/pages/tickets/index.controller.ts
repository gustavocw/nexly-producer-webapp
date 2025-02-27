import { useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useProducts } from "contexts/ProductsContext";
import { useEffect, useState } from "react";
import { createRoom, getRooms, getTicketRooms } from "services/tickets.services";

const useTicketsController = () => {
  const { areasList, handleSetAreaId, areas, defaultArea, areaId } =
    useProducts();
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [prioryty, setPriority] = useState("");

  const { data: tickets, refetch: refetchTickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTicketRooms(areaId),
  });

  const { data: rooms, refetch: refetchRooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(0, 10),
  });

  const { mutate: mutateCreateRoom } = useMutation({
    mutationFn: (params: { nameRoom: string; ticketId?: string }) =>
      createRoom(params?.ticketId, params?.nameRoom),
    onSuccess: () => {
      toaster.create({
        title: "Sala criada com sucesso, pode visualizar na direita.",
        type: "success"
      })
      refetchRooms();
    }
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

  const priorityOptions = [
    { value: "todos", label: "Todos" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "negocios", label: "Negócios" },
    { value: "arte", label: "Arte" },
    { value: "ciencia", label: "Ciência" },
    { value: "saude", label: "Saúde" },
    { value: "educacao", label: "Educação" },
    { value: "idiomas", label: "Idiomas" },
  ];

  const categoryOptions = [
    { value: "todos", label: "Todos" },
    { value: "PUBLICO", label: "Ativos" },
    { value: "PRIVADO", label: "Inativos" },
  ];

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "PUBLICO", label: "Ativos" },
    { value: "PRIVADO", label: "Inativos" },
  ];

    useEffect(() => {
      if (!areaId && areas?.length) {
        handleSetAreaId(areasList[0]?.value);
      }
      if (tickets?.length === 0) {
        refetchTickets();
      }
    }, [areaId, areasList, tickets, refetchTickets]);

  return {
    status,
    setPriority,
    setStatus,
    setCategory,
    handleSetAreaId,
    refetchRooms,
    rooms,
    mutateCreateRoom,
    areasList,
    defaultArea,
    category,
    tickets,
    prioryty,
    priorityOptions,
    handleMenuAction,
    statusOptions,
    categoryOptions,
  };
};

export default useTicketsController;
