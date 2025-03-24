import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toaster } from "components/ui/toaster";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAreaLogin, getAreaLogin, updateAreaLogin } from "services/areas.services";

export const loginCustomizationSchema = z.object({
  title: z.string().nonempty({ message: "O título é obrigatório" }),
  primary_color: z
    .string()
    .nonempty({ message: "A cor primária é obrigatória" }),
  backgroundColor: z
    .string()
    .nonempty({ message: "A cor de fundo é obrigatória" }),
  backgroundImage: z.string().optional(),
  logo: z.any(),
  icon: z.any(),
});

type LoginCustomizationFormData = z.infer<typeof loginCustomizationSchema>;

export const useLoginCustomizationController = (selectedArea: any | null) => {
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(
    null
  );
  const [iconFile, setIconFile] = useState<any>(null);
  const [logoFile, setLogoFile] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: areaLogin } = useQuery({
    queryKey: ["areaLogin", selectedArea?._id],
    queryFn: () => getAreaLogin(selectedArea?._id),
    enabled: !!selectedArea?._id
  });

  const { mutate: mutateLogin, isPending: creatingLogin } = useMutation({
    mutationFn: (payload: any) => createAreaLogin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      reset();
      toaster.create({
        title: "Página de login personalizada com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: `Erro ao personalizar login: ${error}`,
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
  } = useForm<LoginCustomizationFormData>({
    resolver: zodResolver(loginCustomizationSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      primary_color: "",
      backgroundColor: "",
      backgroundImage: "",
      logo: "",
      icon: "",
    },
  });

  const onSubmit: SubmitHandler<LoginCustomizationFormData> = async (data) => {
    try {
      const payload = {
        title: data.title,
        primary_color: data.primary_color,
        backgroundColor: data.backgroundColor,
        backgroundImage: backgroundImageFile,
        icon: iconFile,
        logo: logoFile,
      };

      if (areaLogin) {
        await updateAreaLogin(
          {
            ...payload,
            backgroundImage: backgroundImageFile
              ? backgroundImageFile.name
              : undefined,
          },
          selectedArea._id
        );
      } else {
        mutateLogin(payload);
      }
    } catch (error) {
      toaster.create({
        title: `Erro ao personalizar login: ${error}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (areaLogin) {
      setValue("title", areaLogin.title);
      setValue("primary_color", areaLogin.primary_color);
      setValue("backgroundColor", areaLogin.backgroundColor);
      setValue("backgroundImage", areaLogin.backgroundImage || "");
      setValue("logo", areaLogin.logo);
      setValue("icon", areaLogin.icon);

      setBackgroundImageFile(areaLogin.backgroundImage);
      setIconFile(areaLogin.icon);
      setLogoFile(areaLogin.logo);
    }
  }, [areaLogin, setValue]);

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    backgroundImageFile,
    iconFile,
    logoFile,
    creatingLogin,
    updateFile: (
      name: "backgroundImage" | "icon" | "logo",
      file: File | null
    ) => {
      if (name === "backgroundImage") setBackgroundImageFile(file);
      if (name === "icon") setIconFile(file);
      if (name === "logo") setLogoFile(file);
    },
    watch,
  };
};
