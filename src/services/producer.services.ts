import { http } from "services/http/http";

export async function getMe() {
  const { data } = await http.get<ProducerData[]>("/producer/profile");
  return data[0];
}

export async function updateProfile(params: ProducerDetails) {
  const { data } = await http.put<any>("/producer/details", params);
  return data;
}


export async function uploadPhoto(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await http.put<any>("/producer/profile/image", formData);
  return data;
}

export async function deletePhoto() {
  const { data } = await http.delete<any>("/producer/profile/image");
  return data;
}

export async function createAddress(params: Address) {
  const { data } = await http.put<any>("/producer/address", params);
  return data;
}

export async function updateAddress(id?: string, params?: Address) {
  const { data } = await http.put<any>(`/producer/address/${id}`, params);
  return data;
}

export async function getIntegrations() {
  const { data } = await http.get<any>("/producer/integrations");
  return data;
}

export async function getNotifications() {
  const { data } = await http.get<any>("/producer/notifications", {});
  return data;
}
