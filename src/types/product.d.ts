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
  state: StateModule;
  createdAt: string;
  updatedAt: string;
  models: Module[];
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

export enum StateModule {
  PRIVADO = 'PRIVADO',
  PUBLICO = 'PUBLICO'
}