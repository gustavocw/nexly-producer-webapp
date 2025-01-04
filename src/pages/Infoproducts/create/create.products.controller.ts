import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    console.log("Submitted Data:", data);
    const { areaId, ...bodyPayload } = data;
    const payload = {
      ...bodyPayload,
      file,
    };
    try {
      createProduct(payload, areaId).then((res) => {
        console.log("Product created:", res);
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
    navigate,
    errors,
    areas,
  };
};

export default useCreateProductController;
