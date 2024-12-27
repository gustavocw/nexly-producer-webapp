import { Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Divider from "components/divider/divider";
import Text from "components/text/text";

const Plans = () => {
  return (
    <VStack gap="32px" w="100%" h="100%" p="24px" align="flex-start">
      <Text.Medium fontSize="16px" color="neutral">
        Planos
      </Text.Medium>
      <VStack
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="neutral.40"
      >
        <VStack w="100%">
          <HStack
            gap="20px"
            py="20px"
            px="16px"
            w="100%"
            justify="space-between"
          >
            <Flex gap="10px" alignItems="center">
              <Text.Medium fontSize="16px" color="neutral">
                Planos
              </Text.Medium>
              <Flex
                color="#111111"
                alignItems="center"
                justify="center"
                bg="neutral"
                borderRadius="lg"
                py="6px"
                px="10px"
              >
                PRO
              </Flex>
            </Flex>
            <Btn
              label="Atualizar plano"
              onClick={() => console.log("atualizar")}
              w="200px"
            />
          </HStack>
        </VStack>
        <Divider width="100%" />
        <VStack w="100%">
          <HStack
            gap="20px"
            py="20px"
            px="16px"
            w="100%"
            justify="space-between"
          >
            <Flex gap="10px" alignItems="center">
              <Text.Medium fontSize="16px" color="neutral">
                R$450,00
              </Text.Medium>
              <Flex
                color="neutral"
                alignItems="center"
                justify="center"
                bg="primary.50"
                borderRadius="50px"
                py="6px"
                px="10px"
              >
                Mensal
              </Flex>
            </Flex>
            <Btn
              label="Alterar para anual (-25%)"
              onClick={() => console.log("atualizar")}
              bg="transparent"
              w="200px"
            />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Plans;
