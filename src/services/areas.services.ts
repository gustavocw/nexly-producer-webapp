import { http } from "./http/http";

export async function getAreas() {
  const {data} = await http.get("/member/producer/member-area", {});
  return data.data;
}

export async function getAreaById(areaId: string) {
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
  const response = await http.post(`/member/member-area`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function updateArea(params: Partial<Area>, areaId: any) {
  const formData = new FormData();
  if (params.domain) formData.append("domain", params.domain);
  if (params.color) formData.append("color", params.color);
  if (params.title) formData.append("title", params.title);
  if (params.background) formData.append("background", params.background);
  if (params.icon) formData.append("icon", params.icon);
  if (params.logo) formData.append("logo", params.logo);

  const { data } = await http.patch(`/member/member-area/${areaId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}


export async function deleteAreaById(areaId?: string) {
  const { data } = await http.delete(`/member/member-area/${areaId}`, {});
  return data;
}
