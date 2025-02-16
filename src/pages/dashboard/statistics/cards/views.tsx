import { Flex, VStack, Icon } from "@chakra-ui/react";
import Text from "components/text/text";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import type React from "react";

interface CardProps {
  value: number | null;
  type: "views" | "watchTime";
}

const Card: React.FC<CardProps> = ({ value, type }) => {
  const isIncrease = value !== null && value > 0;
  const isDecrease = value !== null && value < 0;

  return (
    <VStack
      borderRadius="8px"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      justify="center"
      width={{ base: "100%", md: "80%" }}
      mx={4}
      bg="neutral.60"
      p="20px"
    >
      <Flex align="center" gap={1} w="100%" justify="center">
        <Text.Medium fontSize="34px">
          {value !== null ? Math.abs(value) : 0}
        </Text.Medium>
        {isIncrease && (
          <Icon as={FaArrowUp} color="success.30" fontSize="24px" />
        )}
        {isDecrease && (
          <Icon as={FaArrowDown} color="error.30" fontSize="24px" />
        )}
      </Flex>
      <Text.Medium fontSize="18px">
        {type === "views" ? "Visualizações" : "Tempo de exibição (horas)"}
      </Text.Medium>
    </VStack>
  );
};

export default Card;
