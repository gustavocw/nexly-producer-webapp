import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useProducerStore from "stores/producer.store";
import { updateAddress, updateProfile } from "services/producer.services";
import { toaster } from "components/ui/toaster";

export const profileSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone_number: z
    .string()
    .min(9, { message: "Phone number must have at least 9 digits" }) 
    ,
  address: z.object({
    codeStreet: z.string(),
    uf: z.string(),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const useFormProfileController = () => {
  const { producer } = useProducerStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: producer?.name ?? "",
      lastname: producer?.lastname ?? "",
      email: producer?.email ?? "",
      phone_number: producer?.phone ?? "",
      address: {
        codeStreet: producer?.address?.codeStreet ?? "",
        uf: producer?.address?.uf ?? "",
        city: producer?.address?.city ?? "",
        street: producer?.address?.street ?? "",
        number: producer?.address?.number ?? "",
        complement: producer?.address?.complement ?? "",
      },
    },
  });

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      const profileData = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone_number: data.phone_number,
      };
      await updateProfile(profileData).then(() => {
        toaster.create({
          title: "Perfil editado com sucesso.",
          type: "success"
        })
      });
      const addressData = data.address;
      await updateAddress(addressData).then(() => {
        toaster.create({
          title: "Endereço editado com sucesso.",
          type: "success"
        })
      });

      reset();
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar o perfil.",
        type: "error"
      })
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    reset,
  };
};
