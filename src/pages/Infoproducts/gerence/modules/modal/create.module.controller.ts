import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const moduleSchema = z.object({
  name: z
    .string({
      required_error: "O campo nome é obrigatório",
      invalid_type_error: "O campo nome deve ser uma string",
    })
    .nonempty({ message: "O campo nome é obrigatório" }),

  state: z
    .string({
      required_error: "O campo estado é obrigatório",
      invalid_type_error: "O campo estado deve ser uma string",
    })
    .nonempty({ message: "O campo estado é obrigatório" }),
  format: z
    .string({
      required_error: "O campo estado é obrigatório",
      invalid_type_error: "O campo estado deve ser uma string",
    })
    .nonempty({ message: "O campo estado é obrigatório" }),

  capa: z
    .string({
      required_error: "O campo capa é obrigatório",
      invalid_type_error: "O campo capa deve ser uma URL",
    })
    .url({ message: "Insira uma URL válida para a capa" }),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

export const useCreateModuleController = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      state: "",
      capa: "",
      format: "",
    },
  });

  const onSubmit: SubmitHandler<ModuleFormData> = (data) => {
    console.log("Dados do módulo:", data);
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
