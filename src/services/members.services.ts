import { http } from "services/http/http";

export async function getMembers() {
  const { data } = await http.get<any>("/member");
  return data;
}

export async function getMembersById(
  idArea?: string | null,
  idProduct?: string | null
) {
  const { data } = await http.get<any>(`/member/${idArea}/${idProduct}`);
  return data[0];
}

export async function createMember(params: any) {
  const { data } = await http.put<any>("/member/member-area", params);
  return data;
}
