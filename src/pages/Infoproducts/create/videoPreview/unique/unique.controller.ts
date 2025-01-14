import { useMutation } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createLesson } from "services/videos.services";

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
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
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

  return {
    control,
    handleSubmit,
    setPageRef,
    pageRef,
    updateFile,
    onSubmit,
    reset,
    navigate,
    errors,
  };
};

export default useUniqueVideoController;
