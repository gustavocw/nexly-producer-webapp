import { VStack, Flex, Tabs } from "@chakra-ui/react";
import SearchBar from "components/search/search";
import Text from "components/text/text";
import CardIntegration from "./card/card.integrations";
import { useIntegrationsController } from "./index.controller";
import NavOptions from "components/navoptions/navoptions";
import { useState, useMemo } from "react";
import debounce from "lodash/debounce";

const Integrations = () => {
  const {
    integrations,
    handleToggleIntegration,
    optionsNav,
    handleSelectionChange,
  } = useIntegrationsController();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = useMemo(
    () =>
      debounce((query) => {
        setSearchTerm(query);
      }, 300),
    []
  );

  return (
    <VStack gap="32px" px={8} align="stretch">
      <VStack align="flex-start" justify="center" spaceY={5} py={5}>
        <Text.Medium fontSize="24px">
          Integrações {`(${integrations.length})`}
        </Text.Medium>
        <Tabs.Root>
          <NavOptions
            defaultValue={optionsNav[0].value}
            options={optionsNav}
            onChange={(value) => handleSelectionChange(value)}
          />
        </Tabs.Root>
        <SearchBar
          onChange={handleSearch}
          placeholder="Pesquisar integrações"
        />
      </VStack>
      <Flex py={5} w="100%" wrap="wrap" gap="24px" justifyContent="flex-start">
        {integrations
          ?.filter((integration) =>
            integration.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((integration) => (
            <CardIntegration
              key={integration.id}
              data={integration}
              onToggleIntegration={handleToggleIntegration}
            />
          ))}
      </Flex>
    </VStack>
  );
};

export default Integrations;
