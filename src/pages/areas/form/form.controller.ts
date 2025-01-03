import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const createAreaSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "O campo nome é obrigatório" })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    domain: z
    .string()
    .nonempty({ message: "O campo nome é obrigatório" })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  description: z
    .string()
    .nonempty({ message: "O campo descrição é obrigatório" })
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  backgroundImage: z
    .string()
    .url({ message: "Insira uma URL válida para a imagem de fundo" })
    .nonempty({ message: "O campo de imagem de fundo é obrigatório" }),
  logo: z
    .string()
    .url({ message: "Insira uma URL válida para a logo" })
    .nonempty({ message: "O campo de logo é obrigatório" }),
});

type CreateAreaFormData = z.infer<typeof createAreaSchema>;

export const useCreateAreaController = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAreaFormData>({
    resolver: zodResolver(createAreaSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      backgroundImage: "",
      domain: "",
      logo: "",
    },
  });

  const onSubmit: SubmitHandler<CreateAreaFormData> = (data) => {
    console.log("Dados da área:", data);

    reset();
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    reset,
  };
};
