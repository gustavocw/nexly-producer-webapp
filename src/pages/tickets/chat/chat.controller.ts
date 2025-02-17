import { useState, useEffect } from "react";
import { dummyMessages } from "./m";
import { Socket, io as socketClient } from "socket.io-client";
import { useMutation } from "@tanstack/react-query";
import { http } from "services/http/http";

interface Message {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

interface Room {
  _id: string;
  nameRoom: string;
  numberTicket: number;
  firstName: string;
  lastName: string;
  producerId: string;
}

export const useChatController = () => {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [input, setInput] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const socket: Socket = socketClient("ws://nexly-producer.com/chat", {
    auth: {
      student: "yourStudentId",
      producer: selectedRoom?.producerId,
    },
    transports: ["websocket"],
    autoConnect: false,
  });

  useEffect(() => {
    if (selectedRoom) {
      socket.auth = {
        student: "yourStudentId",
        producer: selectedRoom.producerId,
      };

      socket.connect();
      socket.emit("enterRoom", selectedRoom.nameRoom);

      socket.on("joinedRoom", (message: string) => {
        console.log("✅ Usuário entrou na sala:", message);
      });

      socket.on("newMessage", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        socket.off("joinedRoom");
        socket.off("newMessage");
        socket.disconnect();
      };
    }
  }, [selectedRoom]);

  const mutateSendMessage = useMutation({
    mutationFn: (message: string) =>
      http.post(`/tickets/message/${selectedRoom?._id}`, message),
  });

  const sendMessage = async (content: string) => {
    if (!content.trim() || !selectedRoom) return;

    const newMessage: Message = {
      id: messages.length + 1,
      author: "Eu",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    socket.emit("message", {
      message: content,
      nameRoom: selectedRoom.nameRoom,
    });

    try {
      mutateSendMessage.mutate(content);
    } catch (error) {
      console.error("Erro ao salvar mensagem:", error);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const groupMessagesByDate = () => {
    const grouped: Record<string, Message[]> = {};
    messages
      .slice()
      .reverse()
      .forEach((message) => {
        const date = message.timestamp.toDateString();
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

  const getMessagesInReverseOrder = () => {
    return [...messages].reverse();
  };

  const selectRoom = (room: Room) => {
    setSelectedRoom(room);
    console.log("Sala selecionada:", room);
  };

  return {
    messages,
    input,
    groupMessagesByDate,
    formatDividerDate,
    sendMessage,
    handleInputChange,
    getMessagesInReverseOrder,
    selectRoom,
  };
};
