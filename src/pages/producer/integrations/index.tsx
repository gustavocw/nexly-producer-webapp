import { Stack, VStack } from "@chakra-ui/react";
import SearchBar from "components/search/search";
import Text from "components/text/text";
import { products } from "utils/productdummy";

const Integrations = () => {
  return (
    <Stack gap="32px" px={8}>
      <VStack align="flex-start" justify="center" spaceY={5} py={5}>
        <Text.Medium fontSize="24px">
          Integrações ({products.length})
        </Text.Medium>
        <SearchBar placeholder="Pesquisar integrações" />
      </VStack>
      <Stack w="100%">
        
      </Stack>
    </Stack>
  );
};

export default Integrations;
