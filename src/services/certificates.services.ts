import { http } from "services/http/http";

export async function getCertificate(courseId?: string | null) {
  const { data } = await http.get<any>(`/course/certificate/${courseId}`);
  return data;
}

export async function createCertificate(
  data: Certificate,
  courseId: string | null | undefined
): Promise<void> {
  const formData = new FormData();

  if (data.files?.file) {
    formData.append("files", data.files.file);
  }
  if (data.files?.logoUrl) {
    formData.append("files", data.files.logoUrl);
  }

  formData.append("description", data.description);
  formData.append("signatureUrl", data.signatureUrl);
  formData.append("percent", data.percent);
  formData.append("progress", data.progress);

  const response = await http.post<any>(
    `/course/certificate/${courseId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
