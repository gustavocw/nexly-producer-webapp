import { HStack, VStack } from "@chakra-ui/react";
import SelectOption from "components/selectOption/select";
import useTicketsController from "./index.controller";
import CardTickets from "./cards/card.ticket";
import SidebarChats from "./sidebar/sidebarChats";

const Tickets = () => {
  const {
    setCategory,
    setPriority,
    setStatus,
    priorityOptions,
    categoryOptions,
    statusOptions,
  } = useTicketsController();

  return (
    <VStack pl={8} w="100%" align="flex-start">
      <HStack justify="space-between" align="flex-start" w="100%">
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
            <CardTickets />
          </VStack>
        </VStack>
        <SidebarChats />
      </HStack>
    </VStack>
  );
};

export default Tickets;
