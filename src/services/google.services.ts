import { http } from "./http/http";

export async function getIntegrationByCourse(courseId?: string | null) {
  const { data } = await http.get<any>(`/course/integrations/${courseId}`);
  return data;
}

export async function getUrlGoogle() {
  const { data } = await http.get<any>(`/producer/login/google`);
  console.log(data);
  return data;
}

export async function setUrlGoogle(
  courseId?: string | null,
  code?: string | null
) {
  const { data } = await http.put(`/course/youtube/token/${courseId}`, null, {
    params: { code },
  });
  return data;
}

export async function changeUrlGoogle(courseId?: string | null, code?: string) {
  const { data } = await http.put<any>(`/course/youtube/token/${courseId}`, {
    code,
  });
  console.log(data);
  return data;
}

export async function getChannelsYt(courseId?: string | null) {
  const { data } = await http.get<any>(
    `/course/youtube/list-channels/${courseId}`
  );
  return data;
}

export async function getPlaylistYt(courseId: string, channelId: string) {
  const { data } = await http.get<any>(
    `/course/youtube/list-playlists/${courseId}/${channelId}`
  );
  return data;
}

export async function listVideosYt(
  courseId: string,
  moduleId: string,
  playlistId: string
) {
  const { data } = await http.get<any>(
    `/course/youtube/items/${courseId}/${moduleId}/${playlistId}`
  );
  return data;
}
