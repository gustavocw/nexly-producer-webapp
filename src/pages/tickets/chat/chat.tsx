import {
  createListCollection,
  Flex,
  HStack,
  Icon,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Textarea,
  VStack
} from "@chakra-ui/react";
import Text from "components/text/text";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Avatar } from "components/ui/avatar";
import Divider from "components/divider/divider";
import SendIcon from "@mui/icons-material/Send";
import { useChatController } from "./chat.controller";
import React, { useEffect, useRef } from "react";

const Chat: React.FC<any> = ({ roomId, setStep }) => {
  console.log(roomId);
  
  const collection = createListCollection({
    items: statusOptions,
  });

  const {
    groupMessagesByDate,
    formatDividerDate,
    sendMessage,
    input,
    handleInputChange,
    getMessagesInReverseOrder,
  } = useChatController();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const groupedMessages = groupMessagesByDate();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [getMessagesInReverseOrder()]);

  return (
    <VStack position="relative" w="100%" h="100%" flex={1} align="flex-start">
      <HStack
        borderBottom="1px solid"
        borderColor="neutral.40"
        p="32px"
        h="100px"
        w="calc(100vw - 550px)"
        justify="space-between"
        flexShrink={0}
      >
        <Flex alignItems="center" gap="10px" onClick={() => setStep("tickets")} cursor="pointer">
          <Icon color="neutral">
            <KeyboardArrowLeftIcon />
          </Icon>
          <Flex alignItems="center" gap="10px">
            <Text.Medium fontSize="22px">Nome do ticket</Text.Medium>
            <Text.Medium fontSize="22px">|</Text.Medium>
            <Text.Medium color="neutral.10" fontSize="22px">
              #2123
            </Text.Medium>
          </Flex>
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
            <SelectTrigger
              display="flex"
              justifyContent="center"
              borderWidth="1px"
              borderColor="neutral.40"
              cursor="pointer"
              w="100px"
            >
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

      {/* Área de mensagens com scroll */}
      <VStack
        px={10}
        w="calc(100vw - 550px)"
        ref={messagesContainerRef}
        flex={1}
        py={20}
        overflowY="auto"
        maxH="calc(100vh - 100px)"
      >
        {Object.keys(groupedMessages).reverse().map((date) => (
          <React.Fragment key={date}>
            <HStack h="36px" w="100%" justify="space-around">
              <Divider w="100%" />
              <Flex
                bg="neutral.40"
                borderRadius="full"
                paddingY="8px"
                paddingX="16px"
              >
                <Text.Medium>{formatDividerDate(date)}</Text.Medium>
              </Flex>
              <Divider w="100%" />
            </HStack>
            {groupedMessages[date].reverse().map((message) => (
              <VStack
                key={message.id}
                alignSelf={message.author === "Eu" ? "flex-end" : "flex-start"}
                align={message.author === "Eu" ? "flex-end" : "flex-start"}
                maxW="466px"
              >
                <Flex
                  justify={message.author === "Eu" ? "flex-end" : "flex-start"}
                  alignItems="center"
                  gap={2}
                >
                  <Text.Medium fontSize="16px">{message.author}</Text.Medium>
                  <Avatar src="/images/bg.png" />
                </Flex>
                <Flex
                  borderBottomRadius="12px"
                  borderTopLeftRadius={
                    message.author === "Eu" ? "12px" : "0"
                  }
                  borderTopRightRadius={
                    message.author === "Eu" ? "0" : "12px"
                  }
                  bg={message.author === "Eu" ? "neutral.60" : "neutral.70"}
                  p="20px"
                  gap="10px"
                  boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
                >
                  <Text.Medium fontSize="16px" color="primary">
                    {message.content}
                  </Text.Medium>
                </Flex>
                <Flex>
                  <Text.Medium fontSize="12px" color="primary">
                    {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text.Medium>
                </Flex>
              </VStack>
            ))}
          </React.Fragment>
        ))}
      </VStack>

      {/* Input fixo na parte inferior */}
      <Flex
        position="absolute"
        alignItems="center"
        bottom="0"
        zIndex={999}
        w="calc(100vw - 550px)"
        borderTopWidth="1px"
        borderColor="neutral.40"
        h="120px"
        bg="neutral.60"
        flexShrink={0}
      >
        <Textarea
          borderRadius="0"
          my={0}
          h="100%"
          minH="120px"
          maxH="120px"
          color="neutral"
          p="2"
          border="none"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Digite sua mensagem..."
        />
        <Icon
          w="80px"
          cursor="pointer"
          onClick={() => sendMessage(input)}
          color="neutral"
        >
          <SendIcon />
        </Icon>
      </Flex>

    </VStack>
  );
};

const statusOptions = [
  { value: "open", label: "Em aberto" },
  { value: "closed", label: "Resolvido" },
];

export default Chat;
