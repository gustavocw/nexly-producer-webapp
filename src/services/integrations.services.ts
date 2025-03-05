import { http } from "./http/http";

export async function integrateHotmart(params?: any) {
  const { data } = await http.post<any>(`/course/members/hotmart`, {
    params,
  });
  return data;
}
