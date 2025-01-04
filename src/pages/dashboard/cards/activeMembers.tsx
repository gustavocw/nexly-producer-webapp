import { Flex, VStack } from "@chakra-ui/react";
import Text from "components/text/text";
import type React from "react";

interface CardProps {
  value: number;
}

const Card: React.FC<CardProps> = ({ value }) => {
  return (
    <VStack
      borderRadius="8px"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      justify="center"
      width="80%"
      mx={4}
      bg="neutral.60"
      p="20px"
    >
      <Text.Medium fontSize="34px">{value ?? 0}</Text.Medium>
      <Text.Medium fontSize="18px">Membros ativos</Text.Medium>
      <Flex align="center" gap={1}>
        <Text.Medium fontSize="13px" color="error.30">
          Redução de 8
        </Text.Medium>
        <Text.Medium fontSize="13px"> nos últimos 7 dias.</Text.Medium>
      </Flex>
    </VStack>
  );
};

export default Card;
