import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useVideosStore from "stores/videos.store";

interface PreviewVideoFormValues {
  title: string;
  description: string;
  thumbnail: File | null;
}

const usePreviewVideoController = () => {
  const [pageRef, setPageRef] = useState(1);
  const { videos, setVideoUrl } = useVideosStore();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PreviewVideoFormValues>({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: null,
    },
  });

  const onSubmit = (data: PreviewVideoFormValues) => {
    console.log("Submitted Data:", data);
  };

  const goToVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      const selectedVideo = videos[index];
      setVideoUrl(selectedVideo.url);
      setPageRef(index + 1);
    } else {
      console.warn("Invalid video index.");
    }
  };

  const playNextVideo = () => {
    if (pageRef < videos.length) {
      const nextIndex = pageRef; 
      goToVideo(nextIndex);
    } else {
      console.warn("No more videos to play.");
    }
  };

  const playPreviousVideo = () => {
    if (pageRef > 1) {
      const previousIndex = pageRef - 2; 
      console.log(previousIndex);
      
      goToVideo(previousIndex);
    } else {
      console.warn("This is the first video.");
    }
  };

  return {
    control,
    handleSubmit,
    setPageRef,
    pageRef,
    playPreviousVideo,
    onSubmit,
    reset,
    navigate,
    errors,
    playNextVideo,
  };
};

export default usePreviewVideoController;
