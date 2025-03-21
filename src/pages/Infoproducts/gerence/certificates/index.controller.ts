import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCertificate,
  getCertificate,
  updateCertificate,
} from "services/certificates.services";
import { useParams } from "react-router-dom";
import { toaster } from "components/ui/toaster";
import { useGenrenceInfoproduct } from "../index.controller";
import { useEffect, useState } from "react";

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
    backgroundUrl: File | string | null;
    logoUrl: File | string | null;
  }>({
    backgroundUrl: null,
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
  const queryClient = useQueryClient();
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

  const { mutate: mutateCertificate, isPending } = useMutation({
    mutationFn: (
      params: CertificateFormData & {
        files: { logoUrl: File | null; backgroundUrl: File | null };
      }
    ) => createCertificate(params, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "certificates" });
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

  const { mutate: mutateUpdateCertificate, isPending: updating } = useMutation({
    mutationFn: (
      params: CertificateFormData & {
        files: { logoUrl: File | null; backgroundUrl: File | null };
      }
    ) => updateCertificate(params, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "certificates" });
      toaster.create({
        title: "Certificado atualizado com sucesso!",
        type: "success",
      });
      refetchCourse();
      refetch();
    },
    onError: () => {
      toaster.create({
        title: "Erro ao atualizar o certificado!",
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (certificate) {
      setFiles({
        backgroundUrl: certificate.backgroundUrl || null,
        logoUrl: certificate.logoUrl || null,
      });
      reset({
        signatureUrl: certificate?.signatureUrl || "",
        description: certificate?.description || "",
        percent: certificate?.percent || 0,
        progress: certificate?.progress || "",
      });
    }
  }, [certificate, reset]);

  const onSubmit: SubmitHandler<CertificateFormData> = (data) => {
    console.log(certificate?.id);

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
        backgroundUrl: files.backgroundUrl instanceof File ? files.backgroundUrl : null,
        logoUrl: files.logoUrl instanceof File ? files.logoUrl : null,
      },
    };

    
    
    if (certificate?.id) {
      mutateUpdateCertificate(processedData);
    } else {
      mutateCertificate(processedData);
    }
  };

  return {
    control,
    handleSubmit,
    certificate,
    errors,
    watch,
    isPending,
    updating,
    setValue,
    files,
    updateFiles,
    onSubmit,
    reset,
  };
};
