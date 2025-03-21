import { useState } from "react";
import { HStack, VStack, Text, Icon, Flex } from "@chakra-ui/react";
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
    rooms,
    mutateCreateRoom,
  } = useTicketsController();
  
  const [step, setStep] = useState("tickets");
  const [selectedRoom, setSelectedRoom] = useState<Room>();

  const handleChatClick = (room: Room) => {
    setSelectedRoom(room);
    setStep("chat");
  };

  return (
    <Flex overflow="hidden" w="100%" align="flex-start" h="100%">
      {step === "tickets" && (
        <VStack w="75%">
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
          <VStack p={3} w="100%">
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
              <CardTickets mutateCreateRoom={mutateCreateRoom} data={tickets as Ticket[]} />
            )}
          </VStack>
        </VStack>
      )}
      {step === "chat" && (
        <VStack h="100%" w="100%">
          <Chat room={selectedRoom} setStep={setStep} />
        </VStack>
      )}
      <SidebarChats rooms={rooms} onChatClick={handleChatClick} />
    </Flex>
  );
};

export default Tickets;
