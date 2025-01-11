import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createModule, editModule } from "services/product.services";
import { useProducts } from "hooks/useProducts";
import { useEffect, useState } from "react";
import { toaster } from "components/ui/toaster";
import { useGenrenceInfoproduct } from "../../index.controller";
import { useParams } from "react-router-dom";

export const moduleSchema = z.object({
  name: z
    .string({
      required_error: "O campo nome é obrigatório",
      invalid_type_error: "O campo nome deve ser uma string",
    })
    .nonempty({ message: "O campo nome é obrigatório" }),
  description: z
    .string({
      required_error: "O campo nome é obrigatório",
      invalid_type_error: "O campo nome deve ser uma string",
    })
    .nonempty({ message: "O campo nome é obrigatório" }),

  stateModule: z
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
});

type ModuleFormData = z.infer<typeof moduleSchema>;

export const useCreateModuleController = ({
  isEdit,
  module,
}: {
  isEdit?: boolean;
  module?: Module;
}) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const { refetchCourse } = useGenrenceInfoproduct();
  const { id: productId } = useParams<{ id: string }>();
  const { product } = useProducts();
  const idProduct = product?._id ?? productId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    mode: "onBlur",
    defaultValues: {
      name: isEdit ? module?.name || "" : "",
      description: isEdit ? module?.description || "" : "",
      stateModule: isEdit ? module?.stateModule || "" : "",
      format: isEdit ? module?.format || "" : "",
    },
  });

  const updateFile = (file?: File | null) => {
    setFile(file);
  };


  const { mutate: mutateModule } = useMutation({
    mutationFn: (params: NewModule) => createModule(idProduct, params),
    onSuccess: () => {
      toaster.create({
        title: "Módulo criado com sucesso!",
        type: "success",
      });
      refetchCourse();
    },
  });

  const { mutate: mutateEditModule } = useMutation({
    mutationFn: (params: Module) => editModule(params._id, params),
    onSuccess: () => {
      toaster.create({
        title: "Módulo editado com sucesso!",
        type: "success",
      });
      refetchCourse();
    },
  });

  useEffect(() => {
    if (isEdit) {
      updateFile(module?.thumbnail);
    }
  }, []);

  const onSubmit: SubmitHandler<ModuleFormData> = (data) => {
    const params = {
      ...data,
      thumbnail: file,
    };

    if (isEdit) {
      mutateEditModule({ _id: module?._id, ...params });
    } else {
      mutateModule(params);
      reset();
    }
  };

  return {
    control,
    handleSubmit,
    updateFile,
    errors,
    setValue,
    file,
    onSubmit,
    reset,
  };
};
