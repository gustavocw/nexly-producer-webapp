import { Tabs, VStack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import TitlePage from "components/titlePage/titlePage";
import Informations from "./informations/informations";
import Modules from "./modules/modules";
import Certificates from "./certificates/certificates";

const GenrenceInfoproduct = () => {
  const optionsNav = [
    { label: "Informações", value: "informations" },
    { label: "Módulos", value: "modules" },
    { label: "Certificado", value: "certificates" },
  ];

  const handleSelectionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    console.log("Opção selecionada:", selectedOption);
  };

  return (
    <VStack align="flex-start" px={8}>
      <TitlePage title="Nome do curso" />
      <Tabs.Root color="neutral" defaultValue="informations">
        <VStack gap="32px">
          <NavOptions options={optionsNav} onChange={handleSelectionChange} />
          <Tabs.Content value="informations">
            <Informations />
          </Tabs.Content>
          <Tabs.Content value="modules">
            <Modules />
          </Tabs.Content>
          <Tabs.Content value="certificates">
            <Certificates />
          </Tabs.Content>
        </VStack>
      </Tabs.Root>
    </VStack>
  );
};

export default GenrenceInfoproduct;
