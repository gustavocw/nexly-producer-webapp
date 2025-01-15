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
}

const CardTickets: React.FC<TicketsProps> = ({ data }) => {
  const collection = createListCollection({
    items: statusOptions,
  });

  const dummyTickets = [
    {
      id: "1",
      name: "Erro na funcionalidade de login",
      number: "3212",
      description: "Usuários estão relatando problemas ao tentar realizar login no sistema.",
      category: "Autenticação",
      priority: "Alta",
      createdAt: "2023-12-25T14:32:00Z",
      author: {
        name: "João Silva",
        avatar: "https://via.placeholder.com/150",
      },
    },
    {
      id: "2",
      name: "Bug no relatório financeiro",
      number: "3213",
      description: "O relatório financeiro exibe valores incorretos em determinadas situações.",
      category: "Financeiro",
      priority: "Média",
      createdAt: "2023-12-20T10:15:00Z",
      author: {
        name: "Maria Oliveira",
        avatar: "https://via.placeholder.com/150",
      },
    },
    {
      id: "3",
      name: "Sugestão para melhoria no layout",
      number: "3214",
      description: "Os usuários sugeriram melhorias na interface para torná-la mais intuitiva.",
      category: "Design",
      priority: "Baixa",
      createdAt: "2023-12-18T09:00:00Z",
      author: {
        name: "Carlos Ferreira",
        avatar: "https://via.placeholder.com/150",
      },
    },
    {
      id: "4",
      name: "Falha no envio de e-mails automáticos",
      number: "3215",
      description: "Os e-mails automáticos não estão sendo enviados corretamente.",
      category: "Infraestrutura",
      priority: "Alta",
      createdAt: "2023-12-28T08:45:00Z",
      author: {
        name: "Ana Costa",
        avatar: "https://via.placeholder.com/150",
      },
    },
    {
      id: "5",
      name: "Integração com API externa",
      number: "3216",
      description: "Problemas de autenticação ao tentar integrar com a API de terceiros.",
      category: "Integração",
      priority: "Média",
      createdAt: "2023-12-22T13:10:00Z",
      author: {
        name: "Lucas Pereira",
        avatar: "https://via.placeholder.com/150",
      },
    },
  ];
  
  

  return (
    <VStack spaceY="20px" w="100%">
      {dummyTickets.map((ticket) => (
        <VStack
          key={ticket.id}
          p="22px"
          borderRadius="8px"
          boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
          w="100%"
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
              <Avatar src={ticket.author.avatar} />
              <Text.Medium fontSize="14px">{ticket.author.name}</Text.Medium>
            </Flex>
            <Flex gap="10px" w="300px" justify="flex-end">
              <Link color="primary.50">Responder</Link>
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
  switch (priority.toLowerCase()) {
    case "alta":
      return "error.90";
    case "média":
      return "info.90";
    case "baixa":
      return "success.90";
    default:
      return "neutral.90";
  }
}

export default CardTickets;
