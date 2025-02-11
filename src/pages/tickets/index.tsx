import { Flex, HStack, Tabs, VStack, Text, Icon } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import useTicketsController from "./index.controller";
import CardTickets from "./cards/card.ticket";
import SidebarChats from "./sidebar/sidebarChats";
import { LuTicketPlus } from "react-icons/lu";
import Chat from "./chat/chat";

const Tickets = () => {
  const {
    setCategory,
    setPriority,
    setStatus,
    priorityOptions,
    categoryOptions,
    statusOptions,
    tickets,
    handleSetAreaId,
    areasList,
    defaultArea,
  } = useTicketsController();

  console.log(tickets);

  return (
    <VStack align="flex-start">
      <Tabs.Root variant="subtle" w="100%" defaultValue="tickets">
        <Flex flex={1} align="flex-start" w="100%">
          <Tabs.Content pl={8} value="tickets">
            <VStack pr={8} w="100%">
              <HStack justify="flex-start" w="100%" h="100px">
                <SelectOption
                  onSelectChange={(v) => handleSetAreaId(v)}
                  placeholder="Área"
                  options={areasList}
                  value={defaultArea}
                />
                <SelectOption
                  onSelectChange={(v) => setPriority(v)}
                  placeholder="Prioridade"
                  options={priorityOptions}
                />
                <SelectOption
                  onSelectChange={(v) => setCategory(v)}
                  placeholder="Categoria"
                  options={categoryOptions}
                />
                <SelectOption
                  onSelectChange={(v) => setStatus(v)}
                  placeholder="Status"
                  options={statusOptions}
                />
              </HStack>
              <VStack w="100%">
                {tickets?.length === 0 ? (
                  <VStack
                    w="100%"
                    py="32px"
                    px="10px"
                    gap="20px"
                    boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
                  >
                    <Icon fontSize="44px" color="neutral">
                      <LuTicketPlus />
                    </Icon>
                    <VStack gap="10px" lineHeight={1.5} w="100%">
                      <Text textAlign="center" fontSize="24px" color="neutral">
                        Você não possui tickets.
                      </Text>
                    </VStack>
                  </VStack>
                ) : (
                  <CardTickets data={tickets as Ticket[]} />
                )}
              </VStack>
            </VStack>
          </Tabs.Content>
          <Tabs.Content value="chat">
            <Chat />
          </Tabs.Content>
          <SidebarChats />
        </Flex>
      </Tabs.Root>
    </VStack>
  );
};

export default Tickets;
