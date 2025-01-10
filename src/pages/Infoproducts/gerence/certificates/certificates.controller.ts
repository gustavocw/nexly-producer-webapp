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
  signatureUrl: z.string().min(1),
  description: z.string().min(1),
  percent: z.number(),
  progress: z.boolean(),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

export const useCertificateController = () => {
  const { refetchCourse } = useGenrenceInfoproduct();
  const { id: productId } = useParams<{ id: string }>();
  const [files, setFiles] = useState<{
    background: File | null;
    logo: File | null;
  }>({
    background: null,
    logo: null,
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      signatureUrl: "",
      description: "",
      percent: 0,
      progress: false,
    },
  });

  const updateFiles = (name: keyof typeof files, file: File | null) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const { data: certificate } = useQuery({
    queryKey: ["certificates", productId],
    queryFn: () =>
      getCertificate(productId).then((res) => {
        console.log(res);
      }),
  });

  const { mutate: mutateCertificate } = useMutation({
    mutationFn: (params: Certificate) => createCertificate(params, productId),
    onSuccess: () => {
      toaster.create({
        title: "Módulo criado com sucesso!",
        type: "success",
      });
      refetchCourse();
    },
  });

  const onSubmit: SubmitHandler<CertificateFormData> = (data) => {
    const processedData = {
      ...data,
      files: {
        background: files?.background || null,
        logo: files?.logo || null,
      },
    };
    console.log("Dados processados:", processedData);
    mutateCertificate(processedData);
    reset();
  };

  const handleteste = () => {
    console.log("afff");
  };

  return {
    control,
    handleSubmit,
    certificate,
    errors,
    handleteste,
    watch,
    updateFiles,
    onSubmit,
    reset,
  };
};
