import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTicketRooms } from "services/tickets.services";

const useTicketsController = () => {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [prioryty, setPriority] = useState("");

  const { data: tickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTicketRooms(),
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

  return {
    status,
    setPriority,
    setStatus,
    setCategory,
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
