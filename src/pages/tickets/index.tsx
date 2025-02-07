import { Flex, HStack, Tabs, VStack } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import useTicketsController from "./index.controller";
import CardTickets from "./cards/card.ticket";
import SidebarChats from "./sidebar/sidebarChats";
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
                <CardTickets data={tickets as Ticket[]} />
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
