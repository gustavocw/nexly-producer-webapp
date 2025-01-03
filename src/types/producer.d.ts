interface ProducerData {
  address: Address;
  bio: string;
  code: string;
  codeDate: string;
  identity: string;
  createAt: string;
  email: string;
  id?: string;
  lastname: string;
  name: string;
  password?: string;
  phone: string;
  isAccountActive: boolean;
  photo: string;
  sex: string;
  student: string;
  updatedAt: string;
  ProvidersForMembers: ProvidersForMembers[];
}

type Address = {
  id?: string;
  city: string;
  codeStreet: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  state: string;
};

type CreateProducer = {
  name: string;
  lastname: string;
  email: string;
  identity: string;
  phone: string;
  password: string;
  confirmPassword: string;
}