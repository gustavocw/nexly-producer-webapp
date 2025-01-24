import { FC, useState } from "react";
import { Box, Text, Flex, Tabs, Image, Skeleton } from "@chakra-ui/react";

export interface AreaCardProps {
  data: Area;
  onClick: () => void;
}

const AreaCard: FC<AreaCardProps> = ({ data, onClick }) => {
  const { title, domain, background, color, logo, icon } = data;

  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  console.log(data);
  

  return (
    <Tabs.Trigger
      w="332px"
      h="200px"
      value="area"
      display="flex"
      alignItems="flex-start"
      textAlign="start"
      bottom="0"
      onClick={onClick}
    >
      <Skeleton loading={!backgroundLoaded} w="100%" maxW="332px" h="200px" borderRadius="lg">
        <Box
          w="100%"
          maxW="332px"
          h="200px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          bg={backgroundLoaded ? `url(${background})` : "transparent"}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          borderWidth="1px"
          borderColor="neutral.40"
          cursor="pointer"
          transition="0.3s"
          _hover={{
            borderColor: "primary.50",
          }}
        >
          <Image
            src={background}
            display="none"
            onLoad={() => setBackgroundLoaded(true)}
          />
          <Flex position="absolute" top="0" w="100%" p="12px" gap={2}>
            <Skeleton  loading={!iconLoaded} w="60px" h="60px" borderRadius="full">
              <Image
                w="60px"
                h="60px"
                src={icon}
                onLoad={() => setIconLoaded(true)}
              />
            </Skeleton>
            <Skeleton  loading={!logoLoaded} w="60px" h="60px" borderRadius="full">
              <Image
                w="60px"
                h="60px"
                src={logo}
                onLoad={() => setLogoLoaded(true)}
              />
            </Skeleton>
          </Flex>
          <Flex
            position="absolute"
            bottom="0"
            w="100%"
            bg="rgba(0, 0, 0, 0.7)"
            p="12px"
            justifyContent="space-between"
          >
            <Box>
              <Text fontSize="16px" fontWeight="600" color="white">
                {title}
              </Text>
              <Text fontSize="12px" color="white" opacity="0.8">
                {domain}
              </Text>
            </Box>
            <Box borderRadius="8px" w="40px" h="40px" bg={color} />
          </Flex>
        </Box>
      </Skeleton>
    </Tabs.Trigger>
  );
};

export default AreaCard;
