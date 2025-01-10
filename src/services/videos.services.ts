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
