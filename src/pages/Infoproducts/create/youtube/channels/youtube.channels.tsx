import { HStack, VStack } from "@chakra-ui/react";
import Text from "components/text/text";
import RadioChannels from "./radio.channel.component";
import useChannelController from "./radio.controller.channel";
import Btn from "components/button/button";

const YoutubeChannels = () => {
  const { channels, loadingChannels, fetchUrlGoogle } = useChannelController();

  return (
    <VStack h="100%" justify="center" align="center" w="100%">
      {channels && channels.length > 0 ? (
        <>
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
            <RadioChannels isLoading={loadingChannels} channels={channels} />
          </HStack>
        </>
      ) : (
        <VStack w="100%">
          <Text.Medium fontSize="26px" color="neutral">
            Você não tem nenhum canal
          </Text.Medium>
          <Text.Medium fontSize="20px" color="neutral">
            Se você possui canal registrado no youtube e não apareceu, refaça a integração com o youtube.
          </Text.Medium>
          <Btn label="Refazer integração" onClick={fetchUrlGoogle} w="200px" />
        </VStack>
      )}
    </VStack>
  );
};

export default YoutubeChannels;
