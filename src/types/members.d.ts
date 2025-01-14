import { UserData } from "./user";

interface Member {
  _id: string;
  lastAccess: string;
  name: string;
  email: string;
  stateUser: string;
}

interface NewMember {
  name: string;
  email: string;
  state: string;
}
