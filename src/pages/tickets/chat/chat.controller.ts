import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "services/http/http";
import { getTicketMessages } from "services/tickets.services";
import useProducerStore from "stores/producer.store";

export const useChatController = (selectedRoom: Room) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const socketRef = useRef<WebSocket | null>(null);
  const { producer } = useProducerStore();

  const { data: apiMessages = [] } = useQuery({
    queryKey: ["ticketMessages", selectedRoom?._id],
    queryFn: () => getTicketMessages(selectedRoom?._id),
  });

  console.log(apiMessages);
  

  useEffect(() => {
    const uniqueMessages = [...messages];
    apiMessages?.forEach((apiMessage: Message) => {
      if (!uniqueMessages.find((m) => m._id === apiMessage._id)) {
        uniqueMessages.push(apiMessage);
      }
    });
    setMessages(uniqueMessages);
  }, [apiMessages]);

  useEffect(() => {
    if (selectedRoom) {
      if (socketRef.current) {
        socketRef.current.close();
      }
      const socket = new WebSocket('ws://nexly-producer.com/chat');
      socketRef.current = socket;
      socket.onopen = () => {
        const handshake = {
          auth: {
            studentId: selectedRoom.studentId,
            producerId: producer?._id
          }
        };
        socket.send(JSON.stringify(handshake));
        const enterRoomEvent = {
          event: 'enterRoom',
          roomName: selectedRoom.nameRoom
        };
        socket.send(JSON.stringify(enterRoomEvent));
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.event === 'joinedRoom') {
          } else if (data.event === 'newMessage') {
            const newMessage: Message = {
              _id: data.id || Date.now().toString(),
              userMessage: data.userMessage || producer?._id || '',
              contentMessage: data.contentMessage,
              createdAt: new Date().toISOString(),
              roomId: selectedRoom._id,
              updatedAt: new Date().toISOString(),
              __v: 0
            };
            
            setMessages((prev) => {
              if (!prev.find((m) => m._id === newMessage._id)) {
                return [...prev, newMessage];
              }
              return prev;
            });
          }
        } catch (error) {
          console.error("Erro ao processar mensagem recebida:", error);
        }
      };

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [selectedRoom, producer]);

  const mutateSendMessage = useMutation({
    mutationFn: (message: { contentMessage: string }) =>
      http.post(`/tickets/message/${selectedRoom?._id}`, {
        contentMessage: message.contentMessage,
      }),
  });

  const sendMessage = async (content: string) => {
    if (!content.trim() || !selectedRoom) return;

    const newMessage: Message = {
      _id: Date.now().toString(),
      userMessage: producer?._id || '',
      contentMessage: content,
      createdAt: new Date().toISOString(),
      roomId: selectedRoom._id,
      updatedAt: new Date().toISOString(),
      __v: 0
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const messageData = {
        event: 'message',
        message: {
          contentMessage: content,
          nameRoom: selectedRoom.nameRoom
        }
      };
      socketRef.current.send(JSON.stringify(messageData));
    }

    try {
      await mutateSendMessage.mutateAsync({ contentMessage: content });
    } catch (error) {
      console.error("Erro ao salvar mensagem:", error);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const groupMessagesByDate = () => {
    const grouped: Record<string, Message[]> = {};
    messages.forEach((message) => {
      const date = new Date(message.createdAt).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(message);
    });
    return grouped;
  };

  const formatDividerDate = (date: string) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dateObj = new Date(date);

    if (dateObj.toDateString() === today.toDateString()) return "Hoje";
    if (dateObj.toDateString() === yesterday.toDateString()) return "Ontem";
    return dateObj.toLocaleDateString("pt-BR");
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  return {
    messages,
    input,
    groupMessagesByDate,
    formatDividerDate,
    sendMessage,
    handleInputChange,
    disconnect,
  };
};