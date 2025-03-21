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
  const [editedVideos, setEditedVideos] = useState<LessonYoutube[]>([]);
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
      thumbnail: "",
    },
  });
  const { id: idModule } = useParams<{ id: string }>();
  const updateFile = (file: File | null) => {
    setFile(file);
  };

  useEffect(() => {
    if (videos && videos.length > 0) {
      // Initialize editedVideos with the original videos
      setEditedVideos(videos);
      const firstVideo = videos[0];
      reset({
        lessonLengh: firstVideo.lessonLengh || "",
        description: firstVideo.description ?? "",
        nameLesson: firstVideo.nameLesson || "",
        duration: firstVideo.duration || "",
        idLessonYt: firstVideo.idLessonYt || "",
        urlVideo: firstVideo.urlVideo || "",
        thumbnail: firstVideo.thumbnail || "",
      });
      setVideoUrl(firstVideo.urlVideo);
      if (typeof firstVideo.thumbnail === "string") {
        setFile(null);
      } else {
        setFile(firstVideo.thumbnail || null);
      }
    }
  }, [videos, reset, setVideoUrl]);

  const updateCurrentVideo = () => {
    const formData = getValues();
    const currentIndex = pageRef - 1;

    setEditedVideos((prev) => {
      const updated = [...prev];
      updated[currentIndex] = {
        ...updated[currentIndex],
        lessonLengh: formData.lessonLengh || updated[currentIndex].lessonLengh,
        description: formData.description || updated[currentIndex].description,
        nameLesson: formData.nameLesson || updated[currentIndex].nameLesson,
        duration: String(formData.duration || updated[currentIndex].duration),
        idLessonYt: formData.idLessonYt || updated[currentIndex].idLessonYt,
        urlVideo: formData.urlVideo || updated[currentIndex].urlVideo,
        thumbnail: file || updated[currentIndex].thumbnail,
      };
      return updated;
    });
  };

  const { mutate: mutateSendVideos } = useMutation({
    mutationFn: (params: LessonYoutube[]) => sendVideos(idModule, params),
    onSuccess: () => {
      toaster.create({
        title: "Aulas sendo enviadas!",
        type: "success",
      });
      setVideos([]);
      setVideoUrl("");
      navigate(`/infoproducts/informations/${productId}`, {
        state: { section: "modules" },
      });
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async () => {
    updateCurrentVideo();
    mutateSendVideos(editedVideos);
  };

  const goToVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      updateCurrentVideo();
      const selectedVideo = editedVideos[index];
      setVideoUrl(selectedVideo.urlVideo);
      setPageRef(index + 1);
      reset({
        lessonLengh: selectedVideo.lessonLengh || "",
        description: selectedVideo.description ?? "",
        nameLesson: selectedVideo.nameLesson || "",
        duration: selectedVideo.duration || "",
        idLessonYt: selectedVideo.idLessonYt || "",
        urlVideo: selectedVideo.urlVideo || "",
        thumbnail: selectedVideo.thumbnail || "",
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
    goToVideo,
  };
};

export default useMultipleVideoController;
