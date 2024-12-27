import { useState } from "react";
import { dummyMessages } from "./m";

export const useChatController = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const sendMessage = (content: string) => {
    if (content.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      author: "Eu",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const groupMessagesByDate = () => {
    const grouped: Record<string, typeof dummyMessages> = {};
    [...messages].reverse().forEach((message) => {
      const date = message.timestamp.toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(message);
    });
    return grouped;
  };

  const formatDividerDate = (date: string) => {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));
    const dateObj = new Date(date);

    if (dateObj.toDateString() === today.toDateString()) return "Hoje";
    if (dateObj.toDateString() === yesterday.toDateString()) return "Ontem";
    return dateObj.toLocaleDateString("pt-BR");
  };

  const getMessagesInReverseOrder = () => {
    return [...messages].reverse();
  };

  return {
    messages,
    input,
    groupMessagesByDate,
    formatDividerDate,
    sendMessage,
    handleInputChange,
    getMessagesInReverseOrder,
  };
};
