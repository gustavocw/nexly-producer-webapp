import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCertificate,
  getCertificate,
} from "services/certificates.services";
import { useParams } from "react-router-dom";
import { toaster } from "components/ui/toaster";
import { useGenrenceInfoproduct } from "../index.controller";
import { useState } from "react";

export const certificateSchema = z.object({
  signatureUrl: z.string().min(1, "A assinatura é obrigatória."),
  description: z.string(),
  percent: z.any(),
  progress: z.string(),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

export const useCertificateController = () => {
  const { refetchCourse } = useGenrenceInfoproduct();
  const { id: productId } = useParams<{ id: string }>();
  const [files, setFiles] = useState<{
    file: File | null;
    logoUrl: File | null;
  }>({
    file: null,
    logoUrl: null,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      signatureUrl: "",
      description: "",
      percent: "",
      progress: "",
    },
  });

  const updateFiles = (name: keyof typeof files, file: File | null) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const { data: certificate, refetch } = useQuery({
    queryKey: ["certificates", productId],
    queryFn: () =>
      getCertificate(productId)
        .then((res) => res)
        .catch((error) => {
          if (
            error.response?.status === 400 &&
            error.response?.data?.message === "certificate not found"
          ) {
            return null;
          }
          throw error;
        }),
  });

  console.log(certificate);

  const { mutate: mutateCertificate } = useMutation({
    mutationFn: (
      params: CertificateFormData & {
        files: { file: File | null; logoUrl: File | null };
      }
    ) => createCertificate(params, productId),
    onSuccess: () => {
      toaster.create({
        title: "Certificado criado com sucesso!",
        type: "success",
      });
      refetchCourse();
      refetch();
    },
    onError: () => {
      toaster.create({
        title: "Erro ao criar o certificado!",
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<CertificateFormData> = (data) => {
    if (!data.signatureUrl) {
      toaster.create({
        title: "A assinatura é obrigatória.",
        type: "error",
      });
      return;
    }

    const processedData = {
      ...data,
      percent: data.percent[0],
      files: {
        file: files.file,
        logoUrl: files.logoUrl,
      },
    };
    mutateCertificate(processedData);
    reset();
  };

  return {
    control,
    handleSubmit,
    certificate,
    errors,
    watch,
    setValue,
    files,
    updateFiles,
    onSubmit,
    reset,
  };
};
