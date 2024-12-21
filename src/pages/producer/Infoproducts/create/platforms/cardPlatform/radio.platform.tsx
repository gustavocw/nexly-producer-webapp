import { Flex, HStack, Image, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Text from "components/text/text";
import { RadioCardItem, RadioCardRoot } from "components/ui/radio-card";
import KeyboardArrowRightOutlined from "@mui/icons-material/KeyboardArrowRightOutlined";
import usePlatformController from "./radio.controller.platform";

const RadioPlatform = () => {
  const { onIntegrate, setPlatform } = usePlatformController();

  return (
    <RadioCardRoot orientation="vertical" align="center" defaultValue="youtube">
      <HStack w="100%" align="center">
        {items.map((item) => (
          <RadioCardItem
            cursor="pointer"
            borderRadius="8px"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPlatform(e.target.value);
            }}
            borderColor="neutral.40"
            _checked={{
              borderColor: "primary.50",
              bg: "neutral.50",
            }}
            label={
              <Flex w="100%" align="flex-start">
                <Text.Medium fontSize="14px">{item.title}</Text.Medium>
              </Flex>
            }
            description={
              <Flex p={2} w="100%" align="flex-start">
                <Text.Medium fontSize="14px">{item.description}</Text.Medium>
              </Flex>
            }
            icon={
              <Flex justify="center" align="center" h="170px" w="350px">
                <Image w="200px" src={item.image} />
              </Flex>
            }
            indicator={false}
            key={item.value}
            value={item.value}
            color="neutral"
          />
        ))}
      </HStack>
      <VStack py={5} w="100%">
        <Btn
          w="300px"
          label="Continuar"
          onClick={() => onIntegrate()}
          iconRight={<KeyboardArrowRightOutlined />}
        />
      </VStack>
    </RadioCardRoot>
  );
};

const items = [
  {
    value: "youtube",
    description: "Plataforma de vídeos",
    title: "Youtube",
    image: "/images/logoytb.png",
  },
  {
    value: "vimeo",
    description: "Plataforma de vídeos",
    title: "Vimeo",
    image: "/images/vimeologo.png",
  },
];

export default RadioPlatform;
