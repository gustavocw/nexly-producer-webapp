import { UserData } from "./user";

export interface Member {
  courseId: string;
  createdAt: string;
  id: string;
  username: string;
  email: string;
  idUser: string;
  provider: string;
  stateUser: string;
  updatedAt: string;
  studentMember: User;
}
