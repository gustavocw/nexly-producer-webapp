import { VStack, Flex, Tabs } from "@chakra-ui/react";
import Text from "components/text/text";
import { products } from "utils/productdummy";
import AreaCard from "./card/card.areas";
import { useAreasController } from "./index.controller";
import FormArea from "./form/form.area";

const Areas = () => {
  const { areas } = useAreasController();

  return (
    <VStack gap="32px" px={8} align="stretch">
      <VStack align="flex-start" justify="center" spaceY={5} py={5}>
        <Text.Medium fontSize="24px">
          Suas áreas ({products.length})
        </Text.Medium>
      </VStack>
      <Tabs.Root defaultValue="areas">
        <Tabs.Content py={5} value="areas">
          <Flex w="100%" wrap="wrap" gap="24px" justifyContent="flex-start">
            {areas.map((area) => (
              <AreaCard key={area.id} data={area} />
            ))}
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="area">
          <VStack w="100%">
            <FormArea />
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};

export default Areas;
