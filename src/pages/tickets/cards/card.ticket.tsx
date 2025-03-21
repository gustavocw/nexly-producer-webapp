import {
  createListCollection,
  Flex,
  HStack,
  Link,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  VStack,
} from "@chakra-ui/react";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";
import type React from "react";

interface TicketsProps {
  data: Ticket[];
  mutateCreateRoom: (params: any) => void;
}

const CardTickets: React.FC<TicketsProps> = ({ data, mutateCreateRoom }) => {
  const collection = createListCollection({
    items: statusOptions,
  });

  console.log(data);
  

  return (
    <VStack align="flex-start" spaceY="20px" w="100%">
      {data?.map((ticket) => (
        <VStack
          key={ticket.identity}
          p="22px"
          borderRadius="8px"
          boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
          w="auto"
          minW="85%"
          gap="10px"
          cursor="pointer"
        >
          <HStack w="100%">
            <Flex gap="20px">
              <Text.Medium fontSize="14px" color="neutral">
                Ticket #{ticket.number}
              </Text.Medium>
              <Text.Medium fontSize="14px" color="neutral">
                {ticket.category}
              </Text.Medium>
            </Flex>
          </HStack>
          <HStack justify="space-between" w="100%">
            <Text.Medium fontSize="22px" color="neutral">
              {ticket.name}
            </Text.Medium>
            <Text.Medium fontSize="14px" color="neutral">
              {formatDate(ticket.createdAt)}
            </Text.Medium>
          </HStack>
          <Flex justify="flex-start" w="100%">
            <Text.Medium fontSize="14px" color="neutral">
              {ticket.description}
            </Text.Medium>
          </Flex>
          <HStack w="100%" justify="space-between">
            <Flex gap="10px" alignItems="center">
              <Avatar src={ticket?.photo} />
              <Text.Medium fontSize="14px">{ticket?.name_student}</Text.Medium>
            </Flex>
            <Flex gap="10px" w="300px" justify="flex-end">
              <Link
                onClick={() =>
                  mutateCreateRoom({
                    ticketId: ticket._id,
                    nameRoom: ticket.name,
                  })
                }
                color="primary.50"
              >
                Responder
              </Link>
              <Flex
                alignItems="center"
                justify="center"
                w="85px"
                borderRadius="8px"
                bg={getPriorityColor(ticket.priority)}
              >
                <Text.Medium color="primary.95" fontSize="14px">
                  {ticket.priority}
                </Text.Medium>
              </Flex>
              <SelectRoot
                _icon={{
                  color: "#fff",
                }}
                color="neutral"
                collection={collection}
                size="sm"
                width="90px"
                defaultValue={["open"]}
              >
                <SelectTrigger
                  display="flex"
                  justifyContent="center"
                  borderWidth="1px"
                  borderColor="neutral.40"
                  cursor="pointer"
                  w="100px"
                >
                  <SelectValueText placeholder="Status" />
                </SelectTrigger>
                <SelectContent
                  border="1px solid"
                  borderColor="neutral.40"
                  h="100px"
                  bg="neutral.60"
                  position="absolute"
                >
                  {statusOptions?.map((status) => (
                    <SelectItem
                      defaultValue="open"
                      cursor="pointer"
                      px="10px"
                      _hover={{
                        bg: "neutral.70",
                      }}
                      item={status}
                      key={status.value}
                    >
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Flex>
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
};

const statusOptions = [
  { value: "open", label: "Em aberto" },
  { value: "closed", label: "Resolvido" },
];

function formatDate(date: string): string {
  const parsedDate = new Date(date);
  return `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString()}`;
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case "ALTA":
      return "error.90";
    case "URGENTE":
      return "error.90";
    case "MEDIA":
      return "info.90";
    case "BAIXA":
      return "success.90";
    default:
      return "neutral.90";
  }
}

export default CardTickets;
