import { FC, useState } from "react";
import { Flex, HStack, Icon, Image, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Switch } from "components/ui/switch";
import { Box } from "@chakra-ui/react";
import { SlExclamation } from "react-icons/sl";
import {
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "components/ui/hover-card";
import ModalHotmart from "../modal/hotmart";
import { usePlanFeatures } from "hooks/userRoles";
import ModalKiwify from "../modal/kiwify";

export interface CardIntegrationProps {
  data: IntegrationData;
  onToggleIntegration: (id: number, isIntegrated: boolean) => void;
}

const CardIntegration: FC<CardIntegrationProps> = ({ data }) => {
  const { title, platformType, imageSrc, isIntegrated } = data;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openKiwify, setOpenKifiwy] = useState<boolean>(false);
  const { hotmartIntegration } = usePlanFeatures();

  return (
    <VStack
      borderWidth="1px"
      borderColor="neutral.40"
      borderRadius="lg"
      align="flex-start"
      w="100%"
      maxW="332px"
      p="20px"
      gap="20px"
    >
      {title === "Hotmart" && (
        <ModalHotmart
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        />
      )}
      {title === "Kiwify" && (
        <ModalKiwify onClose={() => setOpenKifiwy(false)} isOpen={openKiwify} />
      )}
      <Flex gap="16px">
        <Image src={imageSrc} w="50px" h="50px" borderRadius="8px" />
        <VStack align="flex-start" w="100%">
          <Flex justify="space-between" alignItems="center" w="100%">
            <Text.Medium fontWeight="500px" fontSize="16px" color="neutral">
              {title}
            </Text.Medium>
            {(title === "Youtube" || title === "Vimeo") && (
              <HoverCardRoot size="sm" openDelay={100} closeDelay={100}>
                <HoverCardTrigger cursor="pointer" asChild>
                  <Icon color="info.80" fontSize="20px">
                    <SlExclamation />
                  </Icon>
                </HoverCardTrigger>
                <HoverCardContent
                  bg="neutral.60"
                  color="neutral"
                  p={2}
                  maxWidth="240px"
                >
                  <Box>
                    Esta integração só é feita na página de infoprodutos ao
                    publicar aula em um curso, esta informação é apenas
                    informativa.
                  </Box>
                </HoverCardContent>
              </HoverCardRoot>
            )}
          </Flex>
          <Text.Medium color="neutral.10" fontSize="12px">
            {platformType}
          </Text.Medium>
        </VStack>
      </Flex>
      <Divider w="95%" />
      <HStack w="100%" justify="space-between">
        <Flex
          py="2px"
          px="6px"
          alignItems="center"
          borderRadius="8px"
          bg="neutral.40"
          gap={1}
        >
          <Icon
            fontSize="22px"
            color={isIntegrated ? "success.90" : "neutral.20"}
          >
            <CheckCircleOutlineIcon />
          </Icon>
          <Text.Medium
            color={isIntegrated ? "success.90" : "neutral.20"}
            fontSize="12px"
          >
            Instalada
          </Text.Medium>
        </Flex>
        <Switch
          colorPalette="green"
          variant="solid"
          checked={isIntegrated}
          disabled={
            title === "Youtube" || title === "Vimeo" || !hotmartIntegration
          }
          onClick={() => {
            if (isIntegrated) {
              if (title === "Hotmart") {
                setIsModalOpen(true);
              } else if (title === "Kiwify") {
                setOpenKifiwy(true);
              }
            }
          }}
          onChange={() => {
            if (title === "Hotmart") {
              setIsModalOpen(true);
            } else if (title === "Kiwify") {
              setOpenKifiwy(true);
            }
          }}
        />
      </HStack>
    </VStack>
  );
};

export default CardIntegration;
