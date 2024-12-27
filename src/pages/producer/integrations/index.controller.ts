import { useState } from "react";
import {  IntegrationData } from "./card/card.integrations";

export const useIntegrationsController = () => {
  const dummyIntegrations: IntegrationData[] = [
    {
      id: 1,
      title: "Vimeo",
      platformType: "Plataforma de vídeo",
      imageSrc: "/images/vimeo.png",
      isIntegrated: true,
    },
    {
      id: 2,
      title: "YouTube",
      platformType: "Plataforma de vídeo",
      imageSrc: "/images/vimeo.png",
      isIntegrated: false,
    },
  ];
  const [integrations, setIntegrations] = useState<IntegrationData[]>(dummyIntegrations);

  const handleToggleIntegration = (id: number, isIntegrated: boolean) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, isIntegrated }
          : integration
      )
    );
  };

  return { integrations, handleToggleIntegration, dummyIntegrations };
};
