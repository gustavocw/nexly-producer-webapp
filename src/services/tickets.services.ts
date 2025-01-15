import { http } from "./http/http";

export async function createTicketRoom(ticketId: string, nameRoom: string) {
  const { data } = await http.post<any>(`/ticket/room/${ticketId}`, {
    nameRoom,
  });
  return data;
}

export async function getTicketRooms(skip?: number, take?: number) {
  const { data } = await http.get<any>("/ticket/rooms", {
    params: {
      skip,
      take,
    },
  });
  return data.data;
}

// export async function createTicket(
//   courseId: string,
//   ticketData: {
//     name: string;
//     number: string;
//     description: string;
//     category: string;
//     priority: string;
//   }
// ) {
//   const { data } = await http.post<any>(`/ticket/${courseId}`, ticketData);
//   return data;
// }

export async function createTicketMessage(roomId: string, contentMessage: string) {
  const { data } = await http.post<any>(`/ticket/message/${roomId}`, {
    contentMessage,
  });
  return data;
}

export async function getTicketMessages(roomId: string) {
  const { data } = await http.get<any>(`/ticket/message/${roomId}`);
  return data;
}

export async function getTicketsByUser(userId: string, skip: number, take: number) {
  const { data } = await http.get<any>(`/ticket/${userId}`, {
    params: {
      skip,
      take,
    },
  });
  return data;
}
