import { HStack, VStack } from "@chakra-ui/react";
import Text from "components/text/text";
import RadioPlatform from "./radio.channel.component";

const YoutubeChannels = () => {
  return (
    <VStack h="100%" justify="center" align="center" w="100%">
      <VStack w="90%">
        <Text.Medium fontSize="24px" color="neutral">
          Selecione o canal
        </Text.Medium>
        <Text.Medium textAlign="center" fontSize="16px" color="primary">
          O canal escolhido será usado para a postagem das aulas. <br />
          Selecione corretamente o perfil abaixo
        </Text.Medium>
      </VStack>
      <HStack w="100%" align="center" justify="center">
        <RadioPlatform />
      </HStack>
    </VStack>
  );
};

export default YoutubeChannels;
