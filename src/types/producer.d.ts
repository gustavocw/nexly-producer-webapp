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
  student: string;
  updatedAt: string;
  ProvidersForMembers: ProvidersForMembers[];
}

interface ProducerDetails {
  name: string;
  lastname: string;
  phone_number: string;
  email: string;
}

type Address = {
  city: string;
  codeStreet: string;
  street: string;
  number: string;
  complement?: string;
  uf: string;
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