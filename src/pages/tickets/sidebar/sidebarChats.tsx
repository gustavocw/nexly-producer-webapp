import { Box, Flex, HStack, Tabs, VStack } from "@chakra-ui/react";
import SearchBar from "components/search/search";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";

const SidebarChats: React.FC<any> = ({ rooms }) => {
  console.log(rooms);
  
  return (
    <VStack
      bg="neutral.60"
      borderLeftWidth="1px"
      borderColor="neutral.40"
      w="30%"
      h="100vh"
    >
      <Flex w="100%" justify="center" h="100px">
        <SearchBar placeholder="Pesquisar chats" />
      </Flex>
      <VStack w="100%">
        <Tabs.Trigger
          w="100%"
          h="100%"
          value="chat"
          _selected={{
            bg: "#1C06284D",
            borderLeftWidth: "2px",
            borderLeftColor: "primary.50"
          }}
        >
          <HStack
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderColor="neutral.40"
            cursor="pointer"
            _hover={{ bg: "neutral.40" }}
            align="flex-start"
            p="20px"
            w="100%"
            // onClick={openChat}
          >
            <Avatar />
            <VStack align="flex-start" w="100%">
              <Flex w="100%" alignItems="center" justify="space-between">
                <Flex gap="5px" alignItems="center">
                  <Text.Medium>Nome</Text.Medium>
                  <Text.Medium>|</Text.Medium>
                  <Text.Medium color="neutral.10">Ticket #221</Text.Medium>
                </Flex>
                <Box>
                  <Text.Medium fontSize="11px" color="primary.50">
                    há 12 min
                  </Text.Medium>
                </Box>
              </Flex>
              <Flex justify="space-between" w="100%">
                <Text.Medium color="neutral.10">Mensagem</Text.Medium>
                <Flex
                  justify="center"
                  alignItems="center"
                  borderRadius="50%"
                  bg="primary.50"
                  w="24px"
                  h="24px"
                >
                  <Text.Medium fontSize="11px" color="neutral">
                    10
                  </Text.Medium>
                </Flex>
              </Flex>
            </VStack>
          </HStack>
        </Tabs.Trigger>
      </VStack>
    </VStack>
  );
};

export default SidebarChats;
