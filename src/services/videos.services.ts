import { http } from "./http/http";

export async function createLesson(moduleId: string | undefined, video: Video) {
  const formData = new FormData();
  formData.append("name", video.name);
  formData.append("description", video.description);
  formData.append("stateLesson", video.stateLesson);
  formData.append("duration", video.stateLesson);
  formData.append("urlMovie", video.urlMovie);
  formData.append("provider", video.provider);
  if (video.thumbnail) {
    formData.append("file", video.thumbnail);
  }

  const { data } = await http.post(`/course/lesson/${moduleId}`, formData);
  return data;
}

export async function updateLesson(lessonId: string | undefined, video: Video) {
  const formData = new FormData();
  formData.append("name", video.name);
  formData.append("description", video.description);
  formData.append("duration", video.stateLesson);
  formData.append("urlMovie", video.urlMovie);
  if (video.thumbnail) {
    formData.append("file", video.thumbnail);
  }

  const { data } = await http.put(`/course/lesson/${lessonId}`, formData);
  return data;
}

export async function sendVideos(
  moduleId: string | null | undefined,
  videos: LessonYoutube[]
) {
  const { data } = await http.post(`/course/create-lesson-queue/${moduleId}`, {
    body$object: videos,
  });
  return data;
}

export async function getPlaylists(
  productId?: string | null,
  channelId?: string | null
) {
  const { data } = await http.get<PlaylistsResponse>(
    `/course/youtube/list-playlists/${productId}/${channelId}`
  );
  return data.playlists;
}

export async function getVideosYoutube(
  productId?: string | null,
  moduleId?: string | null,
  playlistId?: string | null
) {
  const { data } = await http.get<PlaylistItemListResponse>(
    `/course/youtube/items/${productId}/${moduleId}/${playlistId}`
  );
  return data;
}
