import { Flex, HStack, VStack, Icon } from "@chakra-ui/react";
import SearchBar from "components/search/search";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";
import { LuMessageCircle } from "react-icons/lu";
import { formatDateToString } from "utils/formatDateToString";
import { truncateText } from "utils/truncateText";
const SidebarChats: React.FC<any> = ({ rooms, onChatClick }) => {

  const handleChatClick = (room: any) => {
    onChatClick(room);
  };

  return (
    <VStack
      bg="neutral.60"
      borderLeftWidth="1px"
      borderColor="neutral.40"
      w="400px"
      h="100vh"
      position="fixed"
      top="10px"
      right="0px"
      zIndex={10}
    >
      <Flex w="100%" justify="center" h="100px">
        <SearchBar placeholder="Pesquisar chats" />
      </Flex>
      <VStack w="100%">
        {rooms?.length === 0 ? (
          <VStack
            w="100%"
            py="10px"
            px="10px"
            gap="20px"
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
          >
            <Icon fontSize="28px" color="neutral">
              <LuMessageCircle />
            </Icon>
            <VStack gap="10px" lineHeight={1.5} w="100%">
              <Text.Medium textAlign="center" fontSize="16px" color="neutral">
                Você não possui nenhum chat em aberto.
              </Text.Medium>
            </VStack>
          </VStack>
        ) : (
          rooms?.map((room: any) => (
            <HStack
              key={room.id}
              borderTopWidth="1px"
              borderBottomWidth="1px"
              borderColor="neutral.40"
              cursor="pointer"
              _hover={{ bg: "neutral.40" }}
              align="flex-start"
              p="20px"
              w="100%"
              onClick={() => handleChatClick(room)}
            >
              <Avatar src={room.photoStudent} />
              <VStack align="flex-start" w="100%">
                <Flex w="100%" alignItems="center" justify="space-between">
                  <Text.Medium color="neutral.10">
                    {truncateText(room.nameRoom, 12)} | #Ticket{room.numberTicket}
                  </Text.Medium>
                    <Text.Medium fontSize="11px" color="primary.50">
                      {formatDateToString(room.createdAt)}
                  </Text.Medium>
                </Flex>
                <Flex alignItems="center" justify="space-between" w="100%">
                  <Text.Medium color="neutral.10">
                    {room.nameStudent} {room.lastnameStudent}
                  </Text.Medium>
                  <Flex
                    justify="center"
                    alignItems="center"
                    borderRadius="50%"
                    bg="primary.50"
                    w="20px"
                    h="20px"
                  >
                    <Text.Medium fontSize="11px" color="neutral">
                      {room.messageCount}
                    </Text.Medium>
                  </Flex>
                </Flex>
              </VStack>
            </HStack>
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default SidebarChats;
