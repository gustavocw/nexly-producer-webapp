import { http } from "./http/http";

export async function createProduct(
  params: NewProduct,
  memberAreaId?: string
): Promise<any> {
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("description", params.description);
  formData.append("category", params.category);
  if (params.duration) {
    formData.append("duration", params.duration);
  }
  if (params.file) {
    formData.append("file", params.file);
  }
  const { data } = await http.post<any>(`/course/${memberAreaId}`, formData);
  return data;
}

export async function getProducts() {
  const { data } = await http.get("course", {});
  return data.data;
}
