import { create } from "zustand";

interface Video {
  id: number;
  title: string;
  url: string;
}

interface VideosState {
  currentVideo: Video | null;
  videos: Video[];
  videoUrl: string;
}

interface VideosActions {
  setCurrentVideo: (video: Video) => void;
  setVideos: (videos: Video[]) => void;
  setVideoUrl: (videoUrl: string) => void;
}

const useVideosStore = create<VideosState & VideosActions>((set) => ({
  currentVideo: null,
  videoUrl: "",
  videos: [],

  setCurrentVideo: (video) => set({ currentVideo: video }),
  setVideos: (videos) => set({ videos }),
  setVideoUrl: (videoUrl) => set({ videoUrl }),
}));

export default useVideosStore;
