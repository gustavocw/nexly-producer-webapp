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
  count_lesson: number;
  count_members: number;
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
  _id: any;
  name: string;
  stateModule: string;
  description: string;
  format: string;
  lessons_count: number;
  thumbnail?: File | null;
}

interface Lesson {
  _id?: string;
  createdAt: string;
  duration: string;
  moduleId: string;
  nameLesson: string;
  stateLesson: string;
  urlVideo: string;
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
  HORIZONTAL_RECT = "HORIZONTAL_RECT",
  SQUARE = "SQUARE",
  VERTICAL_RECT = "VERTICAL_RECT",
  VERTICAL_RECT_MAX = "VERTICAL_RECT_MAX",
}

enum StateModule {
  PRIVADO = "PRIVADO",
  PUBLICO = "PUBLICO",
}
