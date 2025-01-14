import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Text from "components/text/text";
import { RadioCardItem, RadioCardRoot } from "components/ui/radio-card";
import KeyboardArrowRightOutlined from "@mui/icons-material/KeyboardArrowRightOutlined";
import useChannelController from "./radio.controller.channel";
import type React from "react";
import { SkeletonCircle } from "components/ui/skeleton"

interface ChannelsProps {
  channels?: Channel[];
  isLoading: boolean;
}

const RadioChannels: React.FC<ChannelsProps> = ({ channels, isLoading }) => {
  const { setChannel, onIntegrate, channel } = useChannelController();

  return (
    <RadioCardRoot orientation="vertical" align="center" defaultValue={channel?.id}>
      <HStack gap="64px" w="100%" justify="center" align="center">
        {channels?.map((channel) => (
          <Box key={channel.id}>
            <SkeletonCircle loading={isLoading}>
              <RadioCardItem
                cursor="pointer"
                borderRadius="50%"
                bgImage={`url(${channel.snippet?.thumbnails?.high?.url})`}
                bgRepeat="no-repeat"
                bgPos="center"
                w="200px"
                h="200px"
                bgSize="contain"
                onChange={() => setChannel(channel)}
                borderColor="neutral.40"
                _checked={{
                  borderColor: "primary.50",
                }}
                indicator={false}
                value={channel.id}
              />
            </SkeletonCircle>
            <Flex py={2} w="100%" justify="center">
              <Text.Medium fontSize="16px">{channel.snippet?.title}</Text.Medium>
            </Flex>
          </Box>
        ))}
      </HStack>
      <VStack py={10} w="100%">
        <Btn
          w="300px"
          label="Continuar"
          onClick={onIntegrate}
          iconRight={<KeyboardArrowRightOutlined />}
          disabled={!channel}
        />
      </VStack>
    </RadioCardRoot>
  );
};

export default RadioChannels;
