import { HStack, VStack } from "@chakra-ui/react";
import Text from "components/text/text";
import RadioChannels from "./radio.channel.component";
import { useQuery } from "@tanstack/react-query";
import { getChannelsYt } from "services/google.services";
import useProductStore from "stores/product.store";

const YoutubeChannels = () => {
  const { productId } = useProductStore();
  const { data: channels, isLoading: loadingChannels } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannelsYt(productId),
  });
  
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
        <RadioChannels isLoading={loadingChannels} channels={channels} />
      </HStack>
    </VStack>
  );
};

export default YoutubeChannels;
