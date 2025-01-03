import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface CreateProductsFormValues {
  title: string;
  description: string;
  category: string;
  area: string;
  image: File | null;
}

const useCreateProductController = () => {
  const navigate = useNavigate();
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
    navigate("/infoproducts")
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    reset,
    navigate,
    errors,
  };
};

export default useCreateProductController;
