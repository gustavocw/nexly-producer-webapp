import { useForm } from "react-hook-form";

interface CreateProductsFormValues {
  title: string;
  description: string;
  category: string;
  area: string;
  image: File | null;
}

const useCreateProductController = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductsFormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      area: "",
      image: null,
    },
  });

  const onSubmit = (data: CreateProductsFormValues) => {
    console.log("Submitted Data:", data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    reset,
    errors,
  };
};

export default useCreateProductController;
