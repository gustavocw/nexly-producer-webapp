import { HStack, Link, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import type React from "react";

interface StatistisProps {
  viewers: number;
  time: number;
}

const Statistis: React.FC<StatistisProps> = ({ viewers, time }) => {
  return (
    <VStack
      borderRadius="8px"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      justify="flex-start"
      width={{ base: "100%", md: "80%" }}
      mx={4}
      bg="neutral.60"
      p="20px"
      alignItems="flex-start"
      gap="20px"
    >
      <VStack w="100%" align="flex-start">
        <Text.Medium fontSize="18px">Seu desempenho</Text.Medium>
        <Text.Medium fontSize="13px">Últimos 7 dias</Text.Medium>
      </VStack>
      <VStack w="100%">
        <HStack w="100%" justify="space-between">
          <Text.Medium fontSize="14px">Visualizações</Text.Medium>
          <Text.Medium fontSize="14px">{viewers}</Text.Medium>
        </HStack>
        <HStack w="100%" justify="space-between">
          <Text.Medium fontSize="14px">Tempo de exibição (Horas)</Text.Medium>
          <Text.Medium fontSize="14px">{time}</Text.Medium>
        </HStack>
      </VStack>
      <Divider width="100%" />
      <VStack justify="center" w="100%">
        <Link
          color="primary.50"
          fontWeight="600"
          cursor="pointer"
          textDecoration="none"
          fontSize="13px"
        >
          Analisar estatísticas
        </Link>
      </VStack>
    </VStack>
  );
};

export default Statistis;
