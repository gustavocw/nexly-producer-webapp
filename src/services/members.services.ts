import { http } from "services/http/http";

export async function getMembers() {
  const { data } = await http.get<any>("/member");
  return data;
}


export async function getMembersByArea(areaId?: string | null) {
  const { data } = await http.get<any>(`/member/member-area/${areaId}`);
  return data;
}

export async function getMembersById(
  idProduct?: string | null
) {
  const { data } = await http.get<any>(`/member/course/${idProduct}`);
  return data.data;
}

export async function createMember(params: any) {
  const { data } = await http.put<any>("/member/member-area", params);
  return data;
}
