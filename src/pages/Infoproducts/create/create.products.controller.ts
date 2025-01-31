import { useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useProducts } from "hooks/useProducts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getAreas } from "services/areas.services";
import { createProduct, updateProduct } from "services/product.services";

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
  const { refetchProducts } = useProducts();

  const {
    control,
    handleSubmit,
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

  const isValid =
    formValues.name &&
    formValues.description &&
    formValues.category &&
    formValues.areaId &&
    !errors.name &&
    !errors.description &&
    !errors.category &&
    !errors.areaId;

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
        refetchProducts();
        navigate("/infoproducts");
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
    const { areaId, ...bodyPayload } = data;
    const payload = {
      ...bodyPayload,
      file,
    };

    if (product) {
      updateProductMutate(payload);
    } else {
      createProductMutate({ ...payload, areaId });
    }
  };

  return {
    control,
    isValid,
    updateFile,
    handleSubmit,
    onSubmit,
    reset,
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
