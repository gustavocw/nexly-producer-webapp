import { http } from "services/http/http";

interface SignInParams {
  email: string;
  password: string;
}

export async function signin(params: SignInParams) {
  const { data } = await http.post<any>("/producer/login", params);
  return data;
}

export async function register(params: CreateProducer) {
  const { data } = await http.post<any>("/producer", params);
  return data;
}

