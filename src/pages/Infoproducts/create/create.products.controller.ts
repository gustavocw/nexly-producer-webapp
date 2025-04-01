import { useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useProducts } from "hooks/useProducts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getAreas } from "services/areas.services";
import { createProduct, updateProduct } from "services/product.services";
import { formatSelect } from "utils/formatSelect";

interface CreateProductsFormValues {
  name: string;
  description: string;
  category: string;
  areaId: string;
}

export const useCreateProductController = () => {
  const [file, setFile] = useState<File | null>(null);
  const [areas, setAreas] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const { type } = location.state || {};
  const { refetchProducts } = useProducts();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateProductsFormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      areaId: "",
    },
  });

  const formValues = watch();
  const isEditing = !!product?.id;
  const isValid =
    formValues.name &&
    formValues.description &&
    formValues.category &&
    (!isEditing || formValues.areaId) &&
    !errors.name &&
    !errors.description &&
    !errors.category &&
    (!isEditing || !errors.areaId);
  

  useEffect(() => {
    if (product) {
      setFile(product?.thumbnail);
      reset({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        areaId: product.areaId || "",
      });
    }
  }, [product, reset]);

  const updateFile = (file: File | null) => {
    setFile(file);
  };

  useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      const res = await getAreas();
      setAreas(res);
      return res;
    },
  });

  const areaList = areas?.map((area: any) => ({
    value: area._id,
    label: area.domain,
  }));

  const { mutate: createProductMutate, isPending: creatingCourse } = useMutation({
    mutationFn: (payload: any) => createProduct(payload, payload.areaId),
    onSuccess: (res) => {
      if (res?.id) {
        toaster.create({
          title: "Info produto criado com sucesso",
          type: "success",
        });
        refetchProducts();
        navigate("/infoproducts");
      }
    },
    onError: (error) => {
      toaster.create({
        title: `Erro ao criar o infoproduto: ${error}`,
        type: "error",
      });
    },
  });

  const { mutate: updateProductMutate, isPending: updatingCourse } = useMutation({
    mutationFn: (payload: any) => updateProduct(payload, product._id),
    onSuccess: (res) => {
      if (res && res._id) {
        toaster.create({
          title: "Info produto atualizado com sucesso",
          type: "success",
        });
        navigate("/infoproducts");
        refetchProducts();
      }
    },
    onError: (error) => {
      toaster.create({
        title: `Erro ao atualizar o infoproduto: ${error}`,
        type: "error",
      });
    },
  });

  const onSubmit = async (data: CreateProductsFormValues) => {
    const { category, areaId: rawAreaId, ...bodyPayload } = data;
    const extractedCategory = formatSelect(category);
    const extractedAreaId = formatSelect(rawAreaId);
    const payload = {
      ...bodyPayload,
      category: extractedCategory,
      areaId: extractedAreaId,
      file,
      type,
    };
  
    if (product) {
      updateProductMutate(payload);
    } else {
      createProductMutate(payload);
    }
  };
  
    const handleComplete = (response: { title: string; description: string }) => {
      if (!response || typeof response !== "object") {
        console.error("Resposta inválida da IA:", response);
        return;
      }
      if (!response.title || !response.description) {
        console.error("Dados incompletos recebidos:", response);
        return;
      }
      setValue("name", response.title.trim());
      setValue("description", response.description.trim());
    };

  return {
    control,
    isValid,
    updateFile,
    handleSubmit,
    onSubmit,
    reset,
    handleComplete,
    areaList,
    product,
    navigate,
    errors,
    areas,
    file,
    creatingCourse,
    updatingCourse,
  };
};

export default useCreateProductController;
