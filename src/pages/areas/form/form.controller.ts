import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toaster } from "components/ui/toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArea, deleteAreaById, updateArea } from "services/areas.services";

export const createAreaSchema = z.object({
  domain: z
    .string()
    .nonempty({ message: "O campo 'domain' é obrigatório" })
    .min(3, { message: "O 'domain' deve ter pelo menos 3 caracteres" }),
  color: z.string().nonempty({ message: "O campo 'color' é obrigatório" }),
  title: z.string().nonempty({ message: "O campo 'title' é obrigatório" }),
  description: z.string().optional(),
  background: z.any(),
});

type CreateAreaFormData = z.infer<typeof createAreaSchema>;

export const useCreateAreaController = (
  selectedArea: Area | null,
  goBack: () => void
) => {
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const queryClient = useQueryClient()

  const { mutate: mutateArea, isPending: creatingArea } = useMutation({
    mutationFn: (payload: any) => createArea(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] })
      reset();
      setIconFile(null);
      setLogoFile(null);
      toaster.create({
        title: "Área criada com sucesso",
        type: "success",
      });
      goBack();
    },
    onError: (error) => {
      toaster.create({
        title: `Erro ao criar área: ${error}`,
        type: "error",
      });
    },
  });

  const { mutate: mutateUpdateArea, isPending: updatingArea } = useMutation({
    mutationFn: (payload: any) => updateArea(payload.area, payload._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] })
      toaster.create({
        title: "Área atualizada com sucesso",
        type: "success",
      });
      goBack();
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
    watch,
  } = useForm<CreateAreaFormData>({
    resolver: zodResolver(createAreaSchema),
    mode: "onBlur",
    defaultValues: {
      domain: selectedArea?.domain || "",
      color: selectedArea?.color || "",
      title: selectedArea?.title || "",
      description: selectedArea?.description || "",
      background: selectedArea?.background || "",
    },
  });

  const updateFile = (
    name: "background" | "icon" | "logo",
    file: File | null
  ) => {
    if (name === "background") setBackgroundFile(file);
    if (name === "icon") setIconFile(file);
    if (name === "logo") setLogoFile(file);
  };

  const onSubmit: SubmitHandler<CreateAreaFormData> = async (data) => {
    try {
      const payload = {
        _id: selectedArea?._id,
        area: {
          ...data,
          background: backgroundFile || data.background,
          icon: iconFile,
          logo: logoFile,
        },
      };

      const payloadEdit = {
        _id: selectedArea?._id,
        area: {
          title: data.title,
          color: data.color,
          domain: data.domain !== selectedArea?.domain ? data.domain : null,
          background: backgroundFile || data.background,
          icon: iconFile,
          logo: logoFile,
        },
      };

      if (selectedArea) {
        try {
          mutateUpdateArea({ _id: selectedArea._id, area: payloadEdit.area });
        } catch {}
      } else {
        mutateArea(payload.area);
      }
      setBackgroundFile(null);
    } catch (error) {
      toaster.create({
        title: `Erro ao ${selectedArea ? "atualizar" : "criar"} área: ${error}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (selectedArea) {
      setValue("domain", selectedArea.domain);
      setValue("color", selectedArea.color);
      setValue("title", selectedArea.title);
      setValue("description", selectedArea.description);
      setValue("background", selectedArea.background || "");
      setBackgroundFile(selectedArea.background);
      setIconFile(selectedArea.icon);
      setLogoFile(selectedArea.logo);
    }
  }, [selectedArea, setValue]);

  const handleComplete = (response: { title: string; description: string }) => {
    if (!response || typeof response !== "object") {
      console.error("Resposta inválida da IA:", response);
      return;
    }
    if (!response.title || !response.description) {
      console.error("Dados incompletos recebidos:", response);
      return;
    }
    setValue("title", response.title.trim());
    setValue("description", response.description.trim());
  };
  
  const mutateDelete = useMutation({
    mutationKey: ["deleteArea"],
    mutationFn: (areaId?: string) => deleteAreaById(areaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] })
      window.location.reload(); 
    }
  })
  

  return {
    control,
    handleSubmit,
    handleComplete,
    mutateDelete,
    setValue,
    errors,
    onSubmit,
    reset,
    updatingArea,
    creatingArea,
    backgroundFile,
    iconFile,
    logoFile,
    watch,
    updateFile,
  };
};
