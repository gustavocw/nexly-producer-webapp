import { HStack, VStack } from "@chakra-ui/react";
import Text from "components/text/text";
import RadioPlatform from "./radio.platform";

const CardPlatform = () => {
  return (
    <VStack h="100%" justify="center" align="center" w="100%">
      <VStack w="90%">
        <Text.Medium fontSize="24px" color="neutral">
          Selecione a plataforma
        </Text.Medium>
        <Text.Medium textAlign="center" fontSize="16px" color="primary">
          Estas são suas integrações ativas. selecione uma plataforma <br />
          integrada para hospedar seu curso.
        </Text.Medium>
      </VStack>
      <HStack w="100%" align="center" justify="center">
        <RadioPlatform />
      </HStack>
    </VStack>
  );
};

export default CardPlatform;
