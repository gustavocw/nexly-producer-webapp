import { http } from "services/http/http";

export async function getMe() {
  const { data } = await http.get<ProducerData[]>("/producer/profile");
  return data[0];
}

