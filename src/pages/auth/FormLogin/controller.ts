import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from "services/auth.services";
import { useAuth } from "hooks/useAuth";
import useAuthStore from "stores/auth.store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "O campo email é obrigatório",
      invalid_type_error: "O campo email deve ser uma string",
    })
    .email({ message: "Insira um email válido" })
    .nonempty({ message: "O campo email é obrigatório" }),

  password: z.string({
    required_error: "O campo senha é obrigatório",
    invalid_type_error: "O campo senha deve ser uma string",
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginController = () => {
  const navigate = useNavigate();
  const {
    setProducerStore,
    rememberMe,
    saveCredentials,
    savedCredentials,
    setRememberMe,
  } = useAuthStore();
  const { auth } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: savedCredentials?.email || "",
      password: savedCredentials?.password || "",
    },
  });

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  const { mutate: mutateLogin, isPending: loadingLogin } = useMutation({
    mutationFn: (params: any) => signin(params),
    onSuccess: (data) => {
      auth(data?.token);
      setProducerStore(data);
      if (rememberMe === true) {
        saveCredentials(watchedEmail, watchedPassword);
      }
      navigate("/");
    },
    onError: () => {
      setError("email", {
        type: "manual",
        message: "Credenciais inválidas. Verifique seu e-mail e senha.",
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    mutateLogin(payload);
  };

  return {
    setRememberMe,
    rememberMe,
    handleSubmit,
    loadingLogin,
    control,
    errors,
    onSubmit,
    reset,
    watchedEmail,
    watchedPassword,
  };
};
