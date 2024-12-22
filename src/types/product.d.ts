export interface Product {
  id: string;
  isCertificate: boolean;
  name: string;
  urlThumbCourse: string;
  description: string;
  category: string[];
  duration: string;
  delDate: string | null;
  producerId: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  modules: Module[];
}

export interface Module {
  id: string;
  stateModule: string;
  name: string | null;
  description: string | null;
  delDate: string | null;
  channelIdChanged: string;
  playlistIdChanged: string | null;
  courseYtId: string;
  createdAt: string;
  updatedAt: string;
  lessons: Lessons[];
}

export interface Lessons {
  createdAt: string;
  description: string;
  id: string;
  idLessonYt: string;
  nameLesson: string;
  thumbnails: string;
  updatedAt: string;
  urlVideoYt: string;
  youtubeCourseId: string;
}