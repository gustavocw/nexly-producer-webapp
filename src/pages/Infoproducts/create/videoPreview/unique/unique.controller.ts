import { useMutation } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createLesson, updateLesson } from "services/videos.services";
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
  const {setVideoUrl} = useVideosStore()
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lesson } = location.state || {};

  console.log(lesson);
  

  const {
    control,
    handleSubmit,
    reset,
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
  const updateFile = (file: File | null) => {
    setFile(file);
  };

  useEffect(() => {
    if (lesson) {
      setVideoUrl(lesson.urlVideo)
      reset({
        name: lesson.nameLesson || "",
        urlMovie: lesson.urlVideo || "",
        description: lesson.description || "",
        duration: lesson.duration || "",
        provider: lesson.provider || "",
        stateLesson: lesson.stateLesson || "",
      });
    }
  }, [lesson, reset]);

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

  const { mutate: mutateUpdateLesson } = useMutation({
    mutationFn: (params: any) => updateLesson(lesson?._id, params),
    onSuccess: () => {
      toaster.create({
        title: "Aula criada com sucesso!",
        type: "success",
      });
      reset();
    },
  });

  const onSubmit = async (data: Video) => {
    console.log(lesson._id);
    const payload = { ...data, thumbnail: file };
    const payloadEdit = {
      name: data.name,
      description: data.description,
      urlVideo: data.urlMovie,
      fileImageUrl: file || lesson?.fileImageUrl || "",
    };
    console.log(payloadEdit);
    
    if (lesson) {
      mutateUpdateLesson(payloadEdit);
    } else {
      mutateVideo(payload);
    }
  };
  

  return {
    control,
    handleSubmit,
    setPageRef,
    pageRef,
    updateFile,
    onSubmit,
    lesson,
    reset,
    navigate,
    errors,
  };
};

export default useUniqueVideoController;
