import { create } from "zustand";

interface Video {
  id: number;
  title: string;
  url: string;
  duration?: string;
}

interface VideosState {
  currentVideo: Video | null;
  videos: Video[];
  videoUrl: string;
  duration: string;
}

interface VideosActions {
  setCurrentVideo: (video: Video) => void;
  setVideos: (videos: Video[]) => void;
  setVideoUrl: (videoUrl: string) => void;
  setDuration: (duration: string) => void;
}

const useVideosStore = create<VideosState & VideosActions>((set) => ({
  currentVideo: null,
  videoUrl: "",
  videos: [],
  duration: "",

  setCurrentVideo: (video) => set({ currentVideo: video }),
  setVideos: (videos) => set({ videos }),
  setVideoUrl: (videoUrl) => set({ videoUrl }),
  setDuration: (duration) => set({ duration }),
}));

export default useVideosStore;
