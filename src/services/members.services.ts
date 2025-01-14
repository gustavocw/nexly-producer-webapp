import { http } from "services/http/http";
import type { NewMember } from "types/members";

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

export async function createMember(areaId?: string | null, productId?: string | null, params?: NewMember) {
  const { data } = await http.post<any>(`/member/${areaId}/${productId}`, params);
  return data;
}
