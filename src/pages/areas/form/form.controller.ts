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
  const { successArea, mutateArea, mutateUpdateArea } = useProducts();
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

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
      if (selectedArea) {
        try {
          mutateUpdateArea(payload);
        } catch {}
      } else {
        mutateArea(payload.area);
        if (successArea) {
          reset();
          setIconFile(null);
          setLogoFile(null);
        }
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
      setValue("background", selectedArea.background || "");

      setBackgroundFile(
        selectedArea.background ? new File([], selectedArea.background) : null
      );
      setIconFile(selectedArea.icon ? new File([], selectedArea.icon) : null);
      setLogoFile(selectedArea.logo ? new File([], selectedArea.logo) : null);
    }
  }, [selectedArea, setValue]);

  return {
    control,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
    reset,
    setBackgroundFile,
    setIconFile,
    setLogoFile,
    backgroundFile,
    iconFile,
    logoFile,
    watch,
    updateFile,
  };
};
