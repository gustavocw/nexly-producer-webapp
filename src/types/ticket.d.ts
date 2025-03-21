
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
  studentId: string;
}
