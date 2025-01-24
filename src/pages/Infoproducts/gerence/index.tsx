import { Flex, HStack, Tabs, VStack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import TitlePage from "components/titlePage/titlePage";
import Informations from "./informations/informations";
import Modules from "./modules/modules";
import Certificates from "./certificates/certificates";
import { ModalCreateModule } from "./modules/modal/modal.create.module";
import { useGenrenceInfoproduct } from "./index.controller";

const GenrenceInfoproduct = () => {
  const { product, optionsNav, handleSelectionChange } = useGenrenceInfoproduct();
  return (
    <VStack w="100%" align="flex-start" px={8}>
      <TitlePage title={product?.name || "Carregando..."} />
      <Tabs.Root w="100%" color="neutral" defaultValue="informations">
        <VStack w="auto" gap="32px">
          <HStack w="100%">
            <NavOptions options={optionsNav} onChange={handleSelectionChange} />
            <Tabs.Content w="200px" value="modules">
              <Flex alignSelf="flex-end">
                <ModalCreateModule />
              </Flex>
            </Tabs.Content>
          </HStack>
          <Tabs.Content value="informations">
            <Informations data={product} />
          </Tabs.Content>
          <Tabs.Content value="modules">
            <Modules data={product} />
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
