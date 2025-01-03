import { http } from "./http/http";

export async function getChartData(endDate: string, startDate: string) {
  const url = `/producer/chart?endDate=${endDate}&startDate=${startDate}`;
  const { data } = await http.get<any>(url);
  return data;
}

export async function getChartComments(skip: number, take: number) {
  const url = `/producer/chart/comments?skip=${skip}&take=${take}`;
  const { data } = await http.get<any>(url);
  return data;
}

export async function getChartPosts(skip: number, take: number) {
  const url = `/producer/chart/posts?skip=${skip}&take=${take}`;
  const { data } = await http.get<any>(url);
  return data;
}

export async function getChartMembers() {
  const url = `/producer/chart/members-count`;
  const { data } = await http.get<any>(url);
  return data;
}
