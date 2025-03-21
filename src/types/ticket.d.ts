interface Ticket {
  _id?: string;
  identity: string;
  name: string;
  number: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  name_student: string;
  photo: string;
}

interface MessageUser {
  _id: string;
  name: string;
  photo: string;
}

interface Message {
  _id: string;
  userMessage: string;
  contentMessage: string;
  createdAt: string;
  roomId: string;
  updatedAt: string;
  __v: number;
  isMyMessage?: boolean;
  user?: MessageUser;
}

interface Room {
  _id: string;
  nameRoom: string;
  numberTicket: number;
  firstName: string;
  lastName: string;
  producerId: string;
  studentId: string;
}
