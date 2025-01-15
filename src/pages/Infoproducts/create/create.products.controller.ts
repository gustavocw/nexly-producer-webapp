import { useQuery } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useProducts } from "hooks/useProducts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getAreas } from "services/areas.services";
import { createProduct } from "services/product.services";

interface CreateProductsFormValues {
  name: string;
  description: string;
  category: string;
  areaId: string;
}

const useCreateProductController = () => {
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
    formState: { errors },
  } = useForm<CreateProductsFormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      areaId: "",
    },
  });

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

  const onSubmit = (data: CreateProductsFormValues) => {
    const { areaId, ...bodyPayload } = data;
    const payload = {
      ...bodyPayload,
      file,
    };

    if (product) {
      console.log("Edição de produto:", product);
      return;
    }

    try {
      createProduct(payload, areaId).then((res) => {
        if (res?.id) {
          toaster.create({
            title: "Info produto criado com sucesso",
            type: "success",
          });
          refetchProducts();
        }
        navigate("/infoproducts");
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return {
    control,
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
  };
};

export default useCreateProductController;
