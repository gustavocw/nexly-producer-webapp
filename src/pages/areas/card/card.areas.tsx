import { FC } from "react";
import { Box, Text, Flex, Tabs } from "@chakra-ui/react";

export interface AreaData {
  _id: number;
  name: string;
  domain: string;
  imageSrc: string;
}

export interface AreaCardProps {
  data: AreaData;
}

const AreaCard: FC<AreaCardProps> = ({ data }) => {
  const { name, domain, imageSrc } = data;

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
        bgImage={`url(${imageSrc})`}
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
          bottom="0"
          w="100%"
          bg="rgba(0, 0, 0, 0.7)"
          p="12px"
          flexDir="column"
          justifyContent="center"
        >
          <Text fontSize="16px" fontWeight="bold" color="white">
            {name}
          </Text>
          <Text fontSize="12px" color="white" opacity="0.8">
            {domain}
          </Text>
        </Flex>
      </Box>
    </Tabs.Trigger>
  );
};

export default AreaCard;
