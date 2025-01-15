import { useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "components/ui/toaster";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createMember } from "services/members.services";
import { getProducts } from "services/product.services";
import useProductStore from "stores/product.store";
import type { NewMember } from "types/members";

interface CreateModulesFormValues {
  name: string;
  email: string;
  state: string;
}

const useCreateModuleController = ({
  refetch,
  onClose,
}: {
  refetch: () => void;
  onClose: () => void;
}) => {
  const { areaId } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [productId, setProductId] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateModulesFormValues>({
    defaultValues: {
      name: "",
      email: "",
      state: "",
    },
  });

  const { data: products } = useQuery({
    queryKey: ["infoproducts", areaId],
    queryFn: async () => getProducts(areaId),
    enabled: !!areaId,
  });

  const productList =
    products?.map((product: Product) => ({
      value: product._id,
      label: product.name,
    })) || [];

  const idToSend = productId.length ? productId : id;

  const { mutate: mutateCreateMember } = useMutation({
    mutationFn: (params?: NewMember) => createMember(areaId, idToSend, params),
    onSuccess: () => {
      toaster.create({
        title: "Membro criado com sucesso!",
        type: "success",
      });
      reset();
      refetch();
      onClose();
    },
    onError: () => {
      toaster.create({
        title: "Erro ao criar o membro!",
        type: "error",
      });
    },
  });

  const handleSelectProduct = (id: string) => {
    setProductId(id);
  };

  const onSubmit = (data: CreateModulesFormValues) => {
    if (!idToSend) {
      toaster.create({
        title: "Selecione um produto!",
        type: "warning",
      });
      return;
    }
    mutateCreateMember({
      ...data,
      state: data.state[0],
    });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    handleSelectProduct,
    reset,
    navigate,
    errors,
    productList,
  };
};

export default useCreateModuleController;
