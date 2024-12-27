import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Text from "components/text/text";
import { RadioCardItem, RadioCardRoot } from "components/ui/radio-card";
import KeyboardArrowRightOutlined from "@mui/icons-material/KeyboardArrowRightOutlined";
import usePlatformController from "./radio.controller.channel";
import { useNavigate } from "react-router-dom";

const RadioPlatform = () => {
  const navigate = useNavigate();
  const { setChannel } = usePlatformController();

  return (
    <RadioCardRoot orientation="vertical" align="center" defaultValue="youtube">
      <HStack gap="64px" w="100%" align="center">
        {items.map((item) => (
          <Box>
            <RadioCardItem
              cursor="pointer"
              borderRadius="50%"
              bgImage={`url(${item.image})`}
              bgRepeat="no-repeat"
              objectPosition="center"
              w="200px"
              h="200px"
              bgSize="contain"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setChannel(e.target.value);
              }}
              borderColor="neutral.40"
              _checked={{
                borderColor: "primary.50",
              }}
              indicator={false}
              key={item.value}
              value={item.value}
              color="neutral"
            />
            <Flex py={2} w="100%" justify="center">
              <Text.Medium fontSize="16px">{item.title}</Text.Medium>
            </Flex>
          </Box>
        ))}
      </HStack>
      <VStack py={10} w="100%">
        <Btn
          w="300px"
          label="Continuar"
          onClick={() => {
            navigate("/infoproducts/create/youtube/playlists");
          }}
          iconRight={<KeyboardArrowRightOutlined />}
        />
      </VStack>
    </RadioCardRoot>
  );
};

const items = [
  {
    value: "channel1",
    description: "Plataforma de vídeos",
    title: "Kevin Levrone",
    image: "/images/logo_sigla.png",
  },
  {
    value: "channel2",
    description: "Plataforma de vídeos",
    title: "Jorlan Vieira",
    image: "/images/logo_sigla.png",
  },
];

export default RadioPlatform;
