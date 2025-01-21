import { http } from "./http/http";

export async function getVimeoUrl() {
  const { data } = await http.get<any>(`/course/vimeo/login`);
  return data;
}

export async function setVimeoUrl(
  courseId?: string | null,
  accessToken?: string | null
) {
  const { data } = await http.get(
    `/course/vimeo/access-token/${courseId}`,
    {
      params: { accessToken },
    }
  );
  return data;
}

export async function getFolders(courseId?: string | null) {
  const { data } = await http.get<any>(`/course/vimeo/list-folders/${courseId}`);
  console.log(data);
  return data;
}