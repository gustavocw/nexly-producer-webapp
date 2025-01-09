interface NewProduct {
  file: File | null;
  name: string;
  description: string;
  category: string;
  duration?: string;
}

interface Product {
  _id?: string;
  areaId?: string;
  count_modules: number;
  count_members: number,
  isCertificate: boolean;
  name: string;
  urlThumbCourse: string;
  description: string;
  category: string;
  duration: string;
  delDate: string;
  producerId: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  modules: Module[];
}

interface Module {
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

interface Lessons {
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

interface Area {
  domain: string;
  color: string;
  title: string;
  background: File | null;
  icon: File | null;
  logo: File | null;
}

interface NewModule {
  format: string;
  thumbnail: any;
  name: string;
  description: string;
  stateModule: string;
}

enum Format {
  HORIZONTAL_RECT = 'HORIZONTAL_RECT',
  SQUARE = 'SQUARE',
  VERTICAL_RECT = 'VERTICAL_RECT',
  VERTICAL_RECT_MAX = 'VERTICAL_RECT_MAX'
}

enum StateModule {
  PRIVADO = 'PRIVADO',
  PUBLICO = 'PUBLICO'
}