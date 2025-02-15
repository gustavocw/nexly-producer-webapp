import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "services/auth.services";
import { useUnmask } from "hooks/unmask";
import useAuthStore from "stores/auth.store";
import { toaster } from "components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { validateCPForCNPJ } from "utils/validateCpf";
import { useMutation } from "@tanstack/react-query";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "O campo nome é obrigatório" })
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
      .nonempty({ message: "O campo nome é obrigatório" }),
    lastname: z
      .string({ required_error: "O campo sobrenome é obrigatório" })
      .min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres" })
      .nonempty({ message: "O campo sobrenome é obrigatório" }),
    email: z
      .string({
        required_error: "O campo email é obrigatório",
        invalid_type_error: "O campo email deve ser uma string",
      })
      .email({ message: "Insira um email válido" })
      .nonempty({ message: "O campo email é obrigatório" }),
    phone: z
      .string({ required_error: "O campo celular é obrigatório" })
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
        message: "Insira um número válido no formato (99) 99999-9999",
      }),
    identity: z
      .string({ required_error: "O campo CPF/CNPJ é obrigatório" })
      .min(11, { message: "O CPF deve ter no mínimo 11 caracteres" })
      .refine((value) => validateCPForCNPJ(value), {
        message: "CPF/CNPJ inválido",
      }),
    password: z
      .string({
        required_error: "O campo senha é obrigatório",
        invalid_type_error: "O campo senha deve ser uma string",
      })
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z
      .string({
        required_error: "O campo confirmar senha é obrigatório",
        invalid_type_error: "O campo confirmar senha deve ser uma string",
      })
      .min(6, {
        message: "A confirmação de senha deve ter pelo menos 6 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const useRegisterController = () => {
  const navigate = useNavigate();
  const umask = useUnmask();
  const { setProducerStore } = useAuthStore();
  const { auth } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      identity: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();
  const isStep1Valid =
  formValues.name &&
  formValues.lastname &&
  !errors.name &&
  !errors.lastname;

const isStep2Valid =
  formValues.email &&
  formValues.phone &&
  formValues.identity &&
  !errors.email &&
  !errors.phone &&
  !errors.identity;

const isStep3Valid =
  formValues.password &&
  formValues.confirmPassword &&
  formValues.password === formValues.confirmPassword &&
  !errors.password &&
  !errors.confirmPassword;

  const { mutate: mutateRegister, isPending: loadingRegister } = useMutation({
    mutationFn: (params: any) => register(params),
    onSuccess: (data) => {
      setProducerStore(data);
      auth(data?.token);
      navigate("/");
      toaster.create({
        title: "Conta criada com sucesso",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Confira seus dados",
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const payload = {
      ...data,
      phone: umask(data.phone),
      identity: umask(data.identity),
    };
    mutateRegister(payload);
  };

  return {
    control,
    handleSubmit,
    loadingRegister,
    isStep1Valid,
    isStep3Valid,
    isStep2Valid,
    errors,
    onSubmit,
    reset,
  };
};
