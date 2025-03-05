import { useMutation } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createLesson, updateLesson } from "services/videos.services";
import useProductStore from "stores/product.store";
import useVideosStore from "stores/videos.store";

interface PreviewVideoFormValues {
  name: string;
  urlMovie: string;
  description: string;
  duration: string;
  provider: string;
  stateLesson: string;
}

const useUniqueVideoController = () => {
  const [pageRef, setPageRef] = useState(1);
  const { setVideoUrl, videoUrl: videoStored } = useVideosStore();
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lesson } = location.state || {};

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PreviewVideoFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      provider: "",
      duration: "",
      stateLesson: "",
      urlMovie: "",
    },
  });

  const videoUrl = watch("urlMovie");

  const { id: idModule } = useParams<{ id: string }>();
  const updateFile = (file: File | null) => {
    setFile(file);
  };
  const { productId } = useProductStore();

  useEffect(() => {
    if (lesson) {
      setVideoUrl(lesson.urlVideo);
      reset({
        name: lesson.nameLesson || "",
        urlMovie: lesson.urlVideo || "",
        description: lesson.description || "",
        duration: lesson.duration || "",
        provider: lesson.provider || "",
        stateLesson: lesson.stateLesson || "",
      });
    } else {
      setVideoUrl(videoUrl);
    }
  }, [lesson, videoStored, reset, watch]);

  const { mutate: mutateVideo, isPending: creatingVideo } = useMutation({
    mutationFn: (params: Video) => createLesson(idModule, params),
    onSuccess: () => {
      toaster.create({
        title: "Aula criada com sucesso!",
        type: "success",
      });
      reset();
      navigate(`/infoproducts/informations/${productId}`, { state: "modules" });
    },
  });

  const { mutate: mutateUpdateLesson, isPending: updatingVideo } = useMutation({
    mutationFn: (params: any) => updateLesson(lesson?._id, params),
    onSuccess: () => {
      toaster.create({
        title: "Aula atualizada com sucesso!",
        type: "success",
      });
      reset();
      navigate(`/infoproducts/informations/${productId}`, { state: "modules" });
    },
  });

  const onSubmit = async (data: Video) => {
    const payload = { ...data, thumbnail: file };
    const payloadEdit = {
      name: data.name,
      description: data.description,
      urlVideo: data.urlMovie,
      fileImageUrl: file || lesson?.fileImageUrl || "",
    };
    if (lesson) {
      mutateUpdateLesson(payloadEdit);
    } else {
      mutateVideo(payload);
    }
  };

  return {
    control,
    creatingVideo,
    updatingVideo,
    handleSubmit,
    setPageRef,
    pageRef,
    updateFile,
    onSubmit,
    lesson,
    file,
    reset,
    navigate,
    errors,
    setVideoUrl,
    watch
  };
};

export default useUniqueVideoController;
