import { UserData } from "./user";

type Member = {
  _id: string;
  lastAccess: string;
  name: string;
  email: string;
  stateUser: string;
  courseId: string;
  createdAt: string;
  photo: string;
  bio: string;
  studentId: string;
  lastname: string;
  phone: string;
  sex: string;
};


type NewMember = {
  name: string;
  email: string;
  state: string;
}

type EditMember = {
  id?: string,
  name: string,
  lastname: string,
  sex: string,
  phone: string,
  email: string,
  file: File,
}