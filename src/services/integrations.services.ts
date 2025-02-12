import { http } from "./http/http";

export async function integrateHotmart(params?: any) {
  const { data } = await http.put<any>(`/course/members/hotmart`, {
    params,
  });
  return data;
}
