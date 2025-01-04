import { FC } from "react";
import { Box, Text, Flex, Tabs, Image } from "@chakra-ui/react";

export interface AreaData {
  _id: number;
  title: string;
  domain: string;
  background: string;
  color: string;
  icon: string;
  logo: string;
}

export interface AreaCardProps {
  data: AreaData;
}

const AreaCard: FC<AreaCardProps> = ({ data }) => {
  const { title, domain, background, color, logo, icon } = data;

  return (
    <Tabs.Trigger
      w="100%"
      value="area"
      position="absolute"
      display="flex"
      alignItems="flex-start"
      textAlign="start"
      bottom="0"
    >
      <Box
        w="100%"
        maxW="332px"
        h="200px"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        bgImage={`url(${background})`}
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
        <Flex
          position="absolute"
          top="0"
          w="100%"
          p="12px"
          gap={2}
        >
          <Image w="60px" h="60px" src={icon} />
          <Image w="60px" h="60px" src={logo} />
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
    </Tabs.Trigger>
  );
};

export default AreaCard;
