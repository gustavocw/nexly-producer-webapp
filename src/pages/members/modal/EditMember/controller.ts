import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { toaster } from "components/ui/toaster";
import { updateMember, uploadPhotoMember } from "services/members.services";
import { EditMember } from "types/members";

interface UseProfileControllerProps {
  memberId: string;
  user?: Partial<EditMember>;
}

export const useProfileController = ({ memberId }: UseProfileControllerProps) => {
   const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    control: controlProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<Partial<User>>({
    defaultValues: {
      name: "",
      lastname: "",
      phone: "",
      cpf: "",
      sex: "",
      bio: "",
      email: "",
    },
  });
  
  // useEffect(() => {
  //   if (user) {
  //     resetProfile({
  //       name: user?.name || "",
  //       lastname: user?.lastname || "",
  //       phone: user?.phone || "",
  //       cpf: user?.cpf || "",
  //       sex: user?.sex || "",
  //       bio: user?.bio || "",
  //       email: user?.email || "",
  //     });
  //   }
  // }, [resetProfile, resetAddress]);

  const { mutate: mutateFile, isPending: loadingImage } = useMutation({
    mutationFn: (file: any) => uploadPhotoMember(file),
  });

  const { mutate: mutateProfile, isPending: updatingProfile } = useMutation({
    mutationFn: (params: Partial<EditMember>) => updateMember(memberId, params),
    onSuccess: () => {
      resetProfile();
      toaster.create({
        title: "Perfil atualizado com sucesso!",
        type: "success",
      })
    },
    onError: () => {
      toaster.create({
        title: "Erro ao atualizar perfil!",
        type: "error",
      })
    }
  });

  const onSubmitProfile: SubmitHandler<Partial<User>> = (data) => {
    const updatedData: Partial<User> = {};
    // if (data.name !== user?.name) updatedData.name = data.name;
    // if (data.lastname !== user?.lastname) updatedData.lastname = data.lastname;
    // if (data.phone !== user?.phone) updatedData.phone = data?.phone;
    // if (data.cpf !== user?.cpf) updatedData.cpf = data.cpf;
    // if (data.sex !== user?.sex) updatedData.sex = formatSelect(data.sex);
    // if (data.bio !== user?.bio) updatedData.bio = data.bio;
    // if (data.email !== user?.email) updatedData.email = data.email;
    console.log(data);
    
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
    mutateFile,
    loadingImage,
  };
};
