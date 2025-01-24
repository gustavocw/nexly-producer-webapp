import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useProducerStore from "stores/producer.store";
import {
  createAddress,
  updateAddress,
  updateProfile,
} from "services/producer.services";
import { toaster } from "components/ui/toaster";
import axios from "axios";
import { useProducer } from "hooks/useProducer";

export const profileSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone_number: z
    .string()
    .min(9, { message: "Phone number must have at least 9 digits" }),
  address: z.object({
    codeStreet: z.string(),
    uf: z.string(),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const useFormProfileController = () => {
  const { producer } = useProducerStore();
  const { refetchMe } = useProducer();
  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: producer?.name ?? "",
      lastname: producer?.lastname ?? "",
      email: producer?.email ?? "",
      phone_number: producer?.phone ?? "",
    },
  });

  const {
    control: addressControl,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddress,
    setValue: setAddressValue,
  } = useForm<ProfileFormData["address"]>({
    resolver: zodResolver(profileSchema.shape.address),
    mode: "onBlur",
    defaultValues: {
      codeStreet: producer?.address[0]?.codeStreet ?? "",
      uf: producer?.address[0]?.uf ?? "",
      city: producer?.address[0]?.city ?? "",
      street: producer?.address[0]?.street ?? "",
      number: producer?.address[0]?.number ?? "",
      complement: producer?.address[0]?.complement ?? "",
      neighborhood: producer?.address[0]?.neighborhood ?? "",
    },
  });

  const fetchAddressByCEP = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { uf, localidade, logradouro, bairro } = response.data;
      setAddressValue("uf", uf);
      setAddressValue("city", localidade);
      setAddressValue("street", logradouro);
      setAddressValue("neighborhood", bairro);
    } catch (error) {
      toaster.create({
        title: "Erro ao buscar o endereço pelo CEP.",
        type: "error",
      });
    }
  };

  const onSubmitProfile: SubmitHandler<ProfileFormData> = async (data) => {
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
          type: "success",
        });
        refetchMe();
      });
      resetProfile();
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar o perfil.",
        type: "error",
      });
    }
  };

  const onSubmitAddress: SubmitHandler<ProfileFormData["address"]> = async (
    data
  ) => {
    try {
      const addressData = { ...data, neiborhood: data.neighborhood };
      if (producer?.address[0]?._id) {
        await updateAddress(producer.address[0]._id, addressData).then(() => {
          toaster.create({
            title: "Endereço atualizado com sucesso.",
            type: "success",
          });
          refetchMe();
        });
      } else {
        await createAddress(addressData).then(() => {
          toaster.create({
            title: "Endereço criado com sucesso.",
            type: "success",
          });
        });
      }
      resetAddress();
    } catch (error) {
      toaster.create({
        title: "Erro ao atualizar o endereço.",
        type: "error",
      });
    }
  };

  return {
    profileControl,
    handleProfileSubmit,
    profileErrors,
    onSubmitProfile,
    resetProfile,
    addressControl,
    handleAddressSubmit,
    addressErrors,
    onSubmitAddress,
    resetAddress,
    fetchAddressByCEP,
  };
};
