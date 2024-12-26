import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const certificateSchema = z.object({
  name: z
    .string({
      required_error: "O campo nome é obrigatório",
      invalid_type_error: "O campo nome deve ser uma string",
    })
    .nonempty({ message: "O campo nome é obrigatório" }),

  capa: z.instanceof(File, {
    message: "O campo capa deve ser um arquivo de imagem válido",
  }),

  logo: z.instanceof(File, {
    message: "O campo logo deve ser um arquivo de imagem válido",
  }),

  description: z
    .string({
      required_error: "O campo descrição é obrigatório",
      invalid_type_error: "O campo descrição deve ser uma string",
    })
    .nonempty({ message: "O campo descrição é obrigatório" }),

  assinatura: z
    .string({
      required_error: "O campo assinatura é obrigatório",
      invalid_type_error: "O campo assinatura deve ser uma string",
    })
    .nonempty({ message: "O campo assinatura é obrigatório" }),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

export const useCertificateController = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      capa: undefined,
      logo: undefined,
      description: "",
      assinatura: "",
    },
  });

  const onSubmit: SubmitHandler<CertificateFormData> = (data) => {
    const processedData = {
      ...data,
      capa:
        data.capa instanceof File ? URL.createObjectURL(data.capa) : undefined,
      logo:
        data.logo instanceof File ? URL.createObjectURL(data.logo) : undefined,
    };

    console.log("Dados processados:", processedData);
    reset();
  };

  return {
    control,
    handleSubmit,
    errors,
    watch,
    onSubmit,
    reset,
  };
};
