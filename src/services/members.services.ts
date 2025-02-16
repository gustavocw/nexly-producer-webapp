import { http } from "services/http/http";
import type { EditMember, NewMember } from "types/members";

export async function getMembers() {
  const { data } = await http.get<any>("/member");
  return data;
}

export async function getMembersByArea(
  areaId?: string | null,
  search?: string
) {
  const { data } = await http.get<any>(
    `/member/member-area/${areaId}?search=${search}`
  );
  return data;
}

export async function getMembersById(idProduct?: string | null, search?: any) {
  const { data } = await http.get<any>(
    `/member/course/${idProduct}?search=${search}`
  );
  return data.data;
}

export async function createMember(
  areaId?: string | null,
  productId?: string | null,
  params?: NewMember
) {
  const { data } = await http.post<any>(
    `/member/${areaId}/${productId}`,
    params
  );
  return data;
}

export async function updateStateMember(memberId?: string | null, state?: string) {
  const { data } = await http.put<any>(
    `/member/change-state/${memberId}`,
    { state }
  );
  return data;
}


export async function changePasswordMember(memberId?: string | null, password?: string) {
  const { data } = await http.put(`/member/change-password-member/${memberId}`, {
    password
  });
  return data.data;
}

export async function updateMember(studentId?: string, params?: Partial<EditMember>) {
  const { data } = await http.put<any>(`/member/change-details-member/${studentId}`, params);
  return data;
}

export async function uploadPhotoMember(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await http.patch<any>("/student/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}