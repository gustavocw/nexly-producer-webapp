import { FC } from "react";
import { Flex, HStack, Icon, Image, VStack } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Switch } from "components/ui/switch";

export interface IntegrationData {
  id: number;
  title: string;
  platformType: string;
  imageSrc: string;
  isIntegrated: boolean;
}

export interface CardIntegrationProps {
  data: IntegrationData;
  onToggleIntegration: (id: number, isIntegrated: boolean) => void;
}

const CardIntegration: FC<CardIntegrationProps> = ({ data, onToggleIntegration }) => {
  const { id, title, platformType, imageSrc, isIntegrated } = data;

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
      <Flex gap="16px">
        <Image src={imageSrc} w="50px" h="50px" borderRadius="8px" />
        <VStack align="flex-start" w="100%">
          <Text.Medium fontWeight="500px" fontSize="16px" color="neutral">
            {title}
          </Text.Medium>
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
          borderRadius="12px"
          bg="neutral.40"
        >
          <Icon color={isIntegrated ? "success.90" : "neutral.20"}>
            <CheckCircleOutlineIcon />
          </Icon>
          <Text.Medium color={isIntegrated ? "success.90" : "neutral.20"} fontSize="12px">
            Instalada
          </Text.Medium>
        </Flex>
        <Switch
          colorPalette="green"
          variant="solid"
          checked={isIntegrated}
          onChange={() => onToggleIntegration(id, !isIntegrated)}
        />
      </HStack>
    </VStack>
  );
};

export default CardIntegration;
