import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const useInformationsController = () => {
  const [accessType, setAccessType] = useState("");
  const [lastAccess, setLastAccess] = useState("");
  const { onOpen, onClose } = useDisclosure();

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
    onOpen,
    onClose
  };
};

export default useInformationsController;
