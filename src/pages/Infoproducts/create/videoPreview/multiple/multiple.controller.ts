import { useMutation } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { sendVideos } from "services/videos.services";
import useProductStore from "stores/product.store";
import useVideosStore from "stores/videos.store";

const useMultipleVideoController = () => {
  const [pageRef, setPageRef] = useState(1);
  const { videos, setVideoUrl, setVideos } = useVideosStore();
  const [file, setFile] = useState<File | null>(null);
  const { productId } = useProductStore();

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<LessonYoutube>({
    defaultValues: {
      lessonLengh: "",
      description: "",
      nameLesson: "",
      duration: "",
      idLessonYt: "",
      urlVideo: "",
    },
  });
  const { id: idModule } = useParams<{ id: string }>();
  const updateFile = (file: File | null) => {
    setFile(file);
  };

  useEffect(() => {
    console.log("atualizou")
    if (videos && videos.length > 0) {
      const firstVideo = videos[0];
      reset({
        lessonLengh: firstVideo.lessonLengh || "",
        description: firstVideo.description ?? "",
        nameLesson: firstVideo.nameLesson || "",
        duration: firstVideo.duration || "",
        idLessonYt: firstVideo.idLessonYt || "",
        urlVideo: firstVideo.urlVideo || "",
      });
      setVideoUrl(firstVideo.urlVideo);
    }
  }, [videos, reset, setVideoUrl]);

  const { mutate: mutateSendVideos } = useMutation({
    mutationFn: (params: LessonYoutube[]) => sendVideos(idModule, params),
    onSuccess: () => {
      toaster.create({
        title: "Aulas sendo enviadas!",
        type: "success",
      });
      setVideos([]);
      setVideoUrl("");
      navigate(`/infoproducts/informations/${productId}`)
      reset();
    },
  });

  const onSubmit = async () => {
    const editedVideos = videos.map((video) => {
      const formData = getValues();
      return {
        ...video,
        lessonLengh: formData.lessonLengh || video.lessonLengh,
        description: formData.description || video.description,
        nameLesson: formData.nameLesson || video.nameLesson,
        duration: String(formData.duration || video.duration),
        idLessonYt: formData.idLessonYt || video.idLessonYt,
        urlVideo: formData.urlVideo || video.urlVideo,
      };
    });
    mutateSendVideos(editedVideos);
  };

  const goToVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      const selectedVideo = videos[index];
      setVideoUrl(selectedVideo.urlVideo);
      setPageRef(index + 1);
      reset({
        lessonLengh: selectedVideo.lessonLengh || "",
        description: selectedVideo.description ?? "",
        nameLesson: selectedVideo.nameLesson || "",
        duration: selectedVideo.duration || "",
        idLessonYt: selectedVideo.idLessonYt || "",
        urlVideo: selectedVideo.urlVideo || "",
      });
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
    setFile,
    file,
    playNextVideo,
  };
};

export default useMultipleVideoController;
