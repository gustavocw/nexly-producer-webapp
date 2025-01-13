import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Text from "components/text/text";
import { RadioCardItem, RadioCardRoot } from "components/ui/radio-card";
import KeyboardArrowRightOutlined from "@mui/icons-material/KeyboardArrowRightOutlined";
import usePlatformController from "./radio.controller.channel";
import { useNavigate } from "react-router-dom";
import type React from "react";

interface ChannelsProps{
  channels?: Channel[];
}

const RadioChannels: React.FC<ChannelsProps> = ({ channels }) => {
  const navigate = useNavigate();
  const { setChannel } = usePlatformController();

  return (
    <RadioCardRoot orientation="vertical" align="center" defaultValue="youtube">
      <HStack gap="64px" w="100%" justify="center" align="center">
        {channels?.map((channel) => (
          <Box>
            <RadioCardItem
              cursor="pointer"
              borderRadius="50%"
              bgImage={`url(${channel?.snippet?.thumbnails?.high?.url})`}
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
              key={channel.id}
              value={channel.id}
              color="neutral"
            />
            <Flex py={2} w="100%" justify="center">
              <Text.Medium fontSize="16px">{channel.snippet.title}</Text.Medium>
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

export default RadioChannels;
