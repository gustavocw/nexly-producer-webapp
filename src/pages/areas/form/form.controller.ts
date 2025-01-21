import { useState } from "react";
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
});

type CreateAreaFormData = z.infer<typeof createAreaSchema>;

export const useCreateAreaController = () => {
  const { mutateArea } = useProducts();
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
      domain: "",
      color: "",
      title: "",
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
      mutateArea(payload)
      reset();
      setFiles({ background: null, icon: null, logo: null });
    } catch (error) {
      toaster.create({
        title: `Erro ao criar área: ${error}`,
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
    files,
    updateFile,
  };
};
