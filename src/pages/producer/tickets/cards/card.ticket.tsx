import {
  createListCollection,
  Flex,
  HStack,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  VStack,
} from "@chakra-ui/react";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";

const CardTickets = () => {
  const collection = createListCollection({
    items: statusOptions,
  });

  return (
    <VStack
      p="22px"
      borderRadius="8px"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      w="100%"
      gap="10px"
    >
      <HStack w="100%">
        <Flex gap="20px">
          <Text.Medium fontSize="14px" color="neutral">
            Ticket #3212
          </Text.Medium>
          <Text.Medium fontSize="14px" color="neutral">
            "Problema relatado"
          </Text.Medium>
        </Flex>
      </HStack>
      <HStack justify="space-between" w="100%">
        <Text.Medium fontSize="22px" color="neutral">
          Título do problema
        </Text.Medium>
        <Text.Medium fontSize="14px" color="neutral">
          há 5 dias
        </Text.Medium>
      </HStack>
      <Flex justify="flex-start" w="100%">
        <Text.Medium fontSize="14px" color="neutral">
          Descrição
        </Text.Medium>
      </Flex>
      <HStack w="100%" justify="space-between">
        <Flex gap="10px" alignItems="center">
          <Avatar src="foto aqui" />
          <Text.Medium fontSize="14px">Nome do author</Text.Medium>
        </Flex>
        <Flex gap="10px" w="300px" justify="flex-end">
          <Flex
            alignItems="center"
            justify="center"
            w="85px"
            borderRadius="8px"
            bg="success.90"
          >
            <Text.Medium color="primary.95" fontSize="14px">
              Baixa
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
            <SelectTrigger display="flex" justifyContent="center" borderWidth="1px" borderColor="neutral.40" cursor="pointer"  w="100px">
              <SelectValueText placeholder="Select movie" />
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
                  defaultValue="public"
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
  );
};

const statusOptions = [
  { value: "open", label: "Em aberto" },
  { value: "closed", label: "Resolvido" },
];

export default CardTickets;
