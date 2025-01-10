import { http } from "services/http/http";

export async function getCertificate(courseId?: string | null) {
  const { data } = await http.get<any>(`/course/certificate/${courseId}`);
  return data;
}

export async function createCertificate(
	data: Certificate,
	courseId: string | null | undefined,
): Promise<void> {
	const formData = new FormData();
	formData.append("files", data.files[0]);
	formData.append("files", data.files[1]);
	formData.append("description", data.description);
	formData.append("signatureUrl", data.signatureUrl);
	const response = await http.post<any>(`/course/certificate/${courseId}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
}