import { http } from "./http/http";

export async function integrateHotmart(params?: any) {
  const { data } = await http.post<any>(`/course/members/hotmart`, {
    params,
  });
  return data;
}

export async function integrateKiwify(params?: any) {
  const { data } = await http.post<any>(`/member/kiwify/login`, params);
  return data;
}
