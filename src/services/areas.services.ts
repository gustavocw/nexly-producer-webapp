import { http } from "./http/http";

export async function getAreas(skip?: number, take?: number) {
  const { data } = await http.get("/member/member-area", {
    params: {
      skip,
      take,
    },
  });
  return data?.data;
}

export async function getArea(areaId: string) {
  const { data } = await http.get(`/member/member-area/${areaId}`, {});
  return data;
}

export async function createArea(params: Area) {
  const formData = new FormData();
  formData.append("domain", params.domain);
  formData.append("color", params.color);
  formData.append("title", params.title);
  if (params.background) {
    formData.append("background", params.background);
  }
  if (params.icon) {
    formData.append("icon", params.icon);
  }
  if (params.logo) {
    formData.append("logo", params.logo);
  }
  const { data } = await http.post(`/member/member-area`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
