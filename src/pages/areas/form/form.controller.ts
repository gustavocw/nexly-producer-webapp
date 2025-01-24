import { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toaster } from "components/ui/toaster";
import { useProducts } from "hooks/useProducts";
import { useMutation } from "@tanstack/react-query";
import { updateArea } from "services/areas.services";

export const createAreaSchema = z.object({
  domain: z
    .string()
    .nonempty({ message: "O campo 'domain' é obrigatório" })
    .min(3, { message: "O 'domain' deve ter pelo menos 3 caracteres" }),
  color: z.string().nonempty({ message: "O campo 'color' é obrigatório" }),
  title: z.string().nonempty({ message: "O campo 'title' é obrigatório" }),
});

type CreateAreaFormData = z.infer<typeof createAreaSchema>;

export const useCreateAreaController = (selectedArea: Area | null) => {
  const { mutateArea, refetchAreas } = useProducts();
  const [files, setFiles] = useState<{
    background: File | null;
    icon: File | null;
    logo: File | null;
  }>({
    background: null,
    icon: null,
    logo: null,
  });

  const { mutate: mutateUpdateArea } = useMutation({
    mutationFn: (payload: any) => updateArea(payload, selectedArea?._id),
    onSuccess: () => {
      refetchAreas();
      toaster.create({
        title: "Área atualizada com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Erro ao atualizar área: ${error}`,
        type: "error",
      });
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateAreaFormData>({
    resolver: zodResolver(createAreaSchema),
    mode: "onBlur",
    defaultValues: {
      domain: selectedArea?.domain || "",
      color: selectedArea?.color || "",
      title: selectedArea?.title || "",
    },
  });

  const updateFile = (name: keyof typeof files, file: File | null) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const onSubmit: SubmitHandler<CreateAreaFormData> = async (data) => {
    try {
      const payload = {
        ...data,
        background: files.background,
        icon: files.icon,
        logo: files.logo,
      };
      if (selectedArea) {
        mutateUpdateArea(payload);
      } else {
        mutateArea(payload);
      }
      reset();
      setFiles({ background: null, icon: null, logo: null });
    } catch (error) {
      toaster.create({
        title: `Erro ao ${selectedArea ? "atualizar" : "criar"} área: ${error}`,
        type: "error",
      });
    }
  };

  return {
    control,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
    reset,
    setFiles,
    files,
    updateFile,
  };
};
