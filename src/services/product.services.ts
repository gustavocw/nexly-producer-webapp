import { http } from "./http/http";

export async function createProduct(
  params: NewProduct,
  memberAreaId?: any
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
  console.log(formData);
  
  const { data } = await http.post<any>(`/course/${memberAreaId}`, formData);
  return data;
}

export async function updateProduct(
  params: NewProduct,
  productId?: string
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
  const { data } = await http.patch<any>(`/course/${productId}`, formData);
  return data;
}

export async function getProducts(memberAreaId: string, search?: string | null) {
  const url = `/course/producer/${memberAreaId}${search ? `?search=${encodeURIComponent(search)}` : ''}`;
  const { data } = await http.get(url, {});
  return data;
}


export async function getProductUnique(productId?: string | null) {
  const { data } = await http.get(`/course/${productId}`, {});
  return data.data;
}

export async function deleteProduct(productId?: string | null) {
  const { data } = await http.delete(`/course/${productId}`, {});
  return data.data;
}
export async function cancelDeletion(productId?: string | null) {
  const { data } = await http.put(`/course/cancel-deletion/${productId}`, {});
  return data.data;
}



export async function getLessons(productId?: string | null) {
  const { data } = await http.get(`/course/lessons/${productId}`, {});
  return data.data;
}

export async function publishProduct(productId?: string | null) {
  const { data } = await http.put(`/course/state-course/${productId}`, {
    state: "PUBLICO"
  });
  return data.data;
}

export async function createModule(
  productId?: string | null,
  module?: NewModule
) {
  const formData = new FormData();
  if (module?.name) {
    formData.append("name", module?.name);
  }
  if (module?.description) {
    formData.append("description", module?.description);
  }
  if (module?.stateModule) {
    formData.append("stateModule", module?.stateModule);
  }
  if (module?.format) {
    formData.append("format", module?.format);
  }

  if (module?.thumbnail) {
    formData.append("file", module?.thumbnail);
  }

  const { data } = await http.post(`/course/module/${productId}`, formData);
  return data;
}

export async function editModule(moduleId: string, module: NewModule) {
  const formData = new FormData();
  formData.append("name", module?.name);
  formData.append("description", module?.description);
  formData.append("stateModule", module?.stateModule);
  formData.append("format", module?.format);

  if (module?.thumbnail) {
    formData.append("file", module?.thumbnail);
  }

  const { data } = await http.post(
    `/course/change-details-module/${moduleId}`,
    formData
  );
  return data;
}
