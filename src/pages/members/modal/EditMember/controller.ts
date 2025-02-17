import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { toaster } from "components/ui/toaster";
import { updateMember } from "services/members.services";
import { EditMember, Member } from "types/members";

export const useProfileController = (member: Member | undefined) => {
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    control: controlProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<Partial<Member>>({
    defaultValues: {
      name: "",
      lastname: "",
      phone: "",
      sex: "",
      bio: "",
      email: "",
      photo: "",
    },
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    if (member) {
      resetProfile({
        name: member?.name || "",
        lastname: member?.lastname || "",
        phone: member?.phone || "",
        sex: member?.sex || "",
        bio: member?.bio || "",
        email: member?.email || "",
        photo: member?.photo || "",
      });
    }
  }, [member]);

  const { mutate: mutateProfile, isPending: updatingProfile } = useMutation({
    mutationFn: async (params: Partial<EditMember>) => {
      return updateMember(member?.studentId, photoFile, params);
    },
    onSuccess: () => {
      resetProfile();
      setPhotoFile(null);
      toaster.create({
        title: "Perfil atualizado com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Erro ao atualizar perfil!",
        type: "error",
      });
    },
  });

  const onSubmitProfile: SubmitHandler<Partial<Member>> = (data) => {
    const updatedData: Partial<Member> = {};

    if (data.name && data.name !== member?.name) updatedData.name = data.name;
    if (data.lastname && data.lastname !== member?.lastname) updatedData.lastname = data.lastname;
    if (data.phone && data.phone !== member?.phone) updatedData.phone = data.phone;
    if (data.sex && data.sex !== member?.sex) updatedData.sex = data.sex;
    if (data.bio && data.bio !== member?.bio) updatedData.bio = data.bio;
    if (data.email && data.email !== member?.email) updatedData.email = data.email;

    mutateProfile(updatedData);
  };

  return {
    registerProfile,
    handleProfileSubmit,
    onSubmitProfile,
    updatingProfile,
    resetProfile,
    profileErrors,
    controlProfile,
    setPhotoFile,
    photoFile,
  };
};
