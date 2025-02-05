import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toaster } from "components/ui/toaster";
import { useProducts } from "hooks/useProducts";

export const createAreaSchema = z.object({
  domain: z
    .string()
    .nonempty({ message: "O campo 'domain' é obrigatório" })
    .min(3, { message: "O 'domain' deve ter pelo menos 3 caracteres" }),
  color: z.string().nonempty({ message: "O campo 'color' é obrigatório" }),
  title: z.string().nonempty({ message: "O campo 'title' é obrigatório" }),
  background: z
    .string()
    .url({ message: "Insira uma URL válida" })
    .refine(
      (url) => {
        return (
          url.includes("youtube.com") ||
          url.includes("youtu.be") ||
          url.includes("vimeo.com") ||
          url.match(/\.(jpeg|jpg|gif|png|webp)$/)
        );
      },
      {
        message:
          "A URL deve ser um link de imagem ou um vídeo do YouTube/Vimeo",
      }
    ),
});

type CreateAreaFormData = z.infer<typeof createAreaSchema>;

export const useCreateAreaController = (selectedArea: Area | null) => {
  const { mutateArea, mutateUpdateArea } = useProducts();
  const [files, setFiles] = useState<{
    background: File | null;
    icon: File | null;
    logo: File | null;
  }>({
    background: null,
    icon: null,
    logo: null,
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
      background: selectedArea?.background || "",
    },
  });

  const updateFile = (name: keyof typeof files, file: File | null) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const onSubmit: SubmitHandler<CreateAreaFormData> = async (data) => {
    try {
      const payload = {
        _id: selectedArea?._id,
        area: {
          ...data,
          background: files.background || data.background,
          icon: files.icon,
          logo: files.logo,
        },
      };
      if (selectedArea) {
        try {
          mutateUpdateArea(payload);
          reset();
        } catch {}
      } else {
        mutateArea(payload.area);
        reset();
      }
      setFiles({ background: null, icon: null, logo: null });
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
      setValue("background", selectedArea.background || "");

      setFiles({
        background: selectedArea.background
          ? new File([], selectedArea.background)
          : null,
        icon: selectedArea.icon ? new File([], selectedArea.icon) : null,
        logo: selectedArea.logo ? new File([], selectedArea.logo) : null,
      });
    }
  }, [selectedArea, setValue, setFiles]);

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
