interface ProducerData {
  _id?: string;
  address: Address;
  identity: string;
  email: string;
  lastname: string;
  name: string;
  phone: string;
  isAccountActive: boolean;
  photo: string;
  plan: string;
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

interface IntegrationData {
  id: number;
  title: string;
  platformType: string;
  imageSrc: string;
  isIntegrated: boolean;
}
