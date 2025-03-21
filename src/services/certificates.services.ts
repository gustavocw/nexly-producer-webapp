import { http } from "services/http/http";

export async function getCertificate(courseId?: string | null) {
  const { data } = await http.get<any>(`/course/certificate/${courseId}`);
  return data;
}

export async function createCertificate(
  params: Certificate & { files?: { backgroundUrl: File | null; logoUrl: File | null } },
  courseId: string | null | undefined
): Promise<void> {
  const formData = new FormData();
  if (params.files?.logoUrl) {
    formData.append("logoUrl", params.files.logoUrl);
  }
  if (params.files?.backgroundUrl) {
    formData.append("backgroundUrl", params.files.backgroundUrl);
  }
  if (params.description) {
    formData.append("description", params.description);
  }
  if (params.signatureUrl) {
    formData.append("signatureUrl", params.signatureUrl);
  }
  if (params.percent) {
    formData.append("percent", params.percent);
  }
  if (params.progress) {
    formData.append("progress", params.progress);
  }

  const { data } = await http.post<any>(
    `/course/certificate/${courseId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}


export async function updateCertificate(
  params: Certificate & { files?: { backgroundUrl: File | null; logoUrl: File | null } },
  certificateId: string | null | undefined
): Promise<void> {
  const formData = new FormData();
  if (params.files?.logoUrl) {
    formData.append("logoUrl", params.files.logoUrl);
  }
  if (params.files?.backgroundUrl) {
    formData.append("backgroundUrl", params.files.backgroundUrl);
  }
  if (params.description) {
    formData.append("description", params.description);
  }
  if (params.signatureUrl) {
    formData.append("signatureUrl", params.signatureUrl);
  }
  if (params.percent) {
    formData.append("percent", params.percent);
  }
  if (params.progress) {
    formData.append("progress", params.progress);
  }

  const { data } = await http.put<any>(
    `/course/certificate/${certificateId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}
