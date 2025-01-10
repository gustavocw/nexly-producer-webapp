import { useMutation } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createLesson } from "services/videos.services";
import useVideosStore from "stores/videos.store";

interface PreviewVideoFormValues {
  name: string;
  urlMovie: string;
  description: string;
  duration: string;
  provider: string;
  stateLesson: string;
}

const usePreviewVideoController = () => {
  const [pageRef, setPageRef] = useState(1);
  const { videos, setVideoUrl, videoUrl, duration } = useVideosStore();
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PreviewVideoFormValues>({
    defaultValues: {
      name: "",
      description: "",
      provider: "",
      duration: "",
      stateLesson: "",
      urlMovie: "",
    },
  });
  const { id: idModule } = useParams<{ id: string }>();
  const watchedFields = watch();
  const updateFile = (file: File | null) => {
    setFile(file);
  };

  useEffect(() => {
    if (watchedFields.urlMovie) {
      setVideoUrl(watchedFields.urlMovie);
    } else {
      setVideoUrl("https://www.youtube.com/watch?v=KrieZlvNlas");
    }
  }, [watchedFields.urlMovie, videoUrl, duration]);

  const { mutate: mutateVideo } = useMutation({
    mutationFn: (params: Video) => createLesson(idModule, params),
    onSuccess: () => {
      toaster.create({
        title: "Aula criada com sucesso!",
        type: "success",
      });
      reset();
    },
  });

  const onSubmit = async (data: Video) => {
    const payload = { ...data, thumbnail: file };
    mutateVideo(payload);
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
    updateFile,
    playPreviousVideo,
    onSubmit,
    reset,
    navigate,
    errors,
    playNextVideo,
  };
};

export default usePreviewVideoController;
