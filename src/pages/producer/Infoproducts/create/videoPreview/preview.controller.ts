import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface PreviewVideoFormValues {
  title: string;
  description: string;
  thumbnail: File | null;
}

const usePreviewVideoController = () => {
  const [pageRef, setPageRef] = useState(0);
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

  return {
    control,
    handleSubmit,
    setPageRef,
    pageRef,
    onSubmit,
    reset,
    navigate,
    errors,
  };
};

export default usePreviewVideoController;
