import { http } from "./http/http";

export async function getRooms() {
  const { data } = await http.post<any>(`/tickets/room/`, {});
  return data;
}

export async function getTicketRooms(areaId?: string, skip?: number, take?: number) {
  const { data } = await http.get<any>(`/tickets/${areaId}`, {
    params: {
      skip,
      take,
    },
  });
  return data.data;
}

export async function createTicketMessage(roomId: string, contentMessage: string) {
  const { data } = await http.post<any>(`/tickets/message/${roomId}`, {
    contentMessage,
  });
  return data;
}

export async function getTicketMessages(roomId: string) {
  const { data } = await http.get<any>(`/tickets/message/${roomId}`);
  return data;
}

export async function getTicketsByUser(userId: string, skip: number, take: number) {
  const { data } = await http.get<any>(`/tickets/${userId}`, {
    params: {
      skip,
      take,
    },
  });
  return data;
}

export async function createRoom(ticketId: string | undefined, nameRoom: string) {
  const { data } = await http.post<any>(`/tickets/room/${ticketId}`, {
    nameRoom,
  });
  return data;
}
