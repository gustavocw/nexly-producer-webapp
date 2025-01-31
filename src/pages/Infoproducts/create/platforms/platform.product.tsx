import { Tabs, VStack } from "@chakra-ui/react";
import DualArrow from "assets/icons/DualArrowIcon";
import Btn from "components/button/button";
import Text from "components/text/text";
import TitlePage from "components/titlePage/titlePage";
import CardPlatform from "./cardPlatform/page.radio.platform";
import { getIntegrations } from "services/producer.services";
import { useQuery } from "@tanstack/react-query";

const Platform = () => {
  const { data: integrations } = useQuery({
    queryKey: ["integrations"],
    queryFn: getIntegrations,
  });

  const hasActiveIntegration = integrations
    ? Object.values(integrations).some((isIntegrated) => isIntegrated === true)
    : false;

  return (
    <VStack px={8} w="100%" align="flex-start">
      <Tabs.Root
        w="100%"
        defaultValue={hasActiveIntegration ? "cards" : "initial"}
      >
        
        <TitlePage backParams={{ section: "modules" }} title="Informações básicas" />
        <Tabs.Content value="initial">
          <VStack
            w="90%"
            alignSelf="center"
            py="32px"
            px="10px"
            gap="20px"
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
          >
            <DualArrow width="42px" />
            <VStack gap="10px" lineHeight={1.5} w="100%">
              <Text.Medium fontSize="24px" color="neutral">
                Você não possui nenhuma integração ativa
              </Text.Medium>
              <Text.Medium fontSize="20px" color="neutral.10">
                Não é possível criar um curso sem nenhuma integração com uma
                plataforma <br /> de vídeos ativa, vá para a aba “Integrações” e
                escolha sua plataforma favorita
              </Text.Medium>
            </VStack>
            <Tabs.Trigger value="cards">
              <Btn fontWeight="500" w="200px" label="Ativar integração" />
            </Tabs.Trigger>
          </VStack>
        </Tabs.Content>
        <Tabs.Content h="70vh" m="auto" value="cards">
          <CardPlatform data={integrations} />
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};

export default Platform;
