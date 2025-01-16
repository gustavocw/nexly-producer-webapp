import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIntegrations } from "services/producer.services";
import { integrationsList } from "./list.integrations";

interface Option {
  label: string;
  value: string;
}

export const useIntegrationsController = () => {
  const [integrations, setIntegrations] = useState<IntegrationData[]>(integrationsList);
  const optionsNav: Option[] = [
    { label: "Todas", value: "all" },
    { label: "Instaladas", value: "installed" },
    { label: "Disponíveis", value: "available" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(optionsNav[0].value);

  const handleSelectionChange = (selectedValue: any) => {
    console.log("Opção selecionada:", selectedValue);
    setSelectedOption(selectedValue);
  };

  useQuery({
    queryKey: ["integrations"],
    queryFn: () =>
      getIntegrations().then((res) => {
        console.log(res);
        setIntegrations((prev) =>
          prev.map((integration) => ({
            ...integration,
            isIntegrated: res[integration.title.toLowerCase()] ?? false,
          }))
        );
        return res;
      }),
  });

  const handleToggleIntegration = (id: number, isIntegrated: boolean) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, isIntegrated } : integration
      )
    );
  };

  const filteredIntegrations = integrations.filter((integration) => {
    if (selectedOption === "installed") {
      return integration.isIntegrated;
    } else if (selectedOption === "available") {
      return !integration.isIntegrated;
    }
    return true;
  });

  return {
    integrations: filteredIntegrations,
    handleToggleIntegration,
    optionsNav,
    handleSelectionChange,
  };
};
