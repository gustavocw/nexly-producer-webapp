import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Divider from "components/divider/divider";
import Input from "components/input/input";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";
import { useFormProfileController } from "./form.controller";
import React, { useState } from "react";
import {
  FileUploadRoot,
  FileUploadTrigger,
} from "components/ui/file-upload"

const ProfileForm: React.FC<{
  setSubmitHandler: (submitHandler: () => void) => void;
}> = ({ setSubmitHandler }) => {
  const {
    profileControl,
    profileErrors,
    handleProfileSubmit,
    onSubmitProfile,
    addressControl,
    addressErrors,
    handleAddressSubmit,
    onSubmitAddress,
    fetchAddressByCEP,
    updatingProfile,
    updatingAddress,
    creatingAddress,
  } = useFormProfileController();
  const [file, setFile] = useState<File | null>(null);
  const [isAddressEdited, setIsAddressEdited] = useState(false);

  const handleAddressChange = () => {
    setIsAddressEdited(true);
  };

  React.useEffect(() => {
    setSubmitHandler(async () => {
      await handleProfileSubmit(onSubmitProfile)();
      if (isAddressEdited) {
        await handleAddressSubmit(onSubmitAddress)();
      }
    });
  }, [
    handleProfileSubmit,
    onSubmitProfile,
    handleAddressSubmit,
    onSubmitAddress,
    setSubmitHandler,
    isAddressEdited,
  ]);

  const handleSave = async () => {
    await handleProfileSubmit(onSubmitProfile)();
    if (isAddressEdited) {
      await handleAddressSubmit(onSubmitAddress)();
    }
  };

  const isPending = updatingProfile || updatingAddress || creatingAddress;

  return (
    <VStack gap="32px" w="100%" h="100%" p="24px" align="flex-start">
      <Text.Medium fontSize="16px">Informações do Perfil</Text.Medium>
      <VStack align="flex-start" w="100%">
        <Text.Medium color="neutral" fontSize="12px">
          Foto do perfil
        </Text.Medium>
        <HStack alignItems="center" w="100%" align="flex-start">
          <Avatar w="80px" h="80px" src={file ? URL.createObjectURL(file) : ""} />
          <Box>
            <Flex gap="10px">
              <FileUploadRoot onFileChange={(e) => setFile(e.acceptedFiles[0])}>
                <FileUploadTrigger asChild>
                  <Btn w="120px" label="Alterar foto" />
                </FileUploadTrigger>
              </FileUploadRoot>
              <Btn
                w="120px"
                label="Deletar foto"
                bg="transparent"
                color="error.30"
                onClick={() => setFile(null)}
              />
            </Flex>
            <Text.Medium textAlign="center">
              Tamanho recomendado 300 x 300
            </Text.Medium>
          </Box>
        </HStack>
      </VStack>
      <Divider width="100%" />
      <VStack w="100%" gap="32px">
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Nome"
            control={profileControl}
            name="name"
            placeholder="Digite seu nome"
            errorText={profileErrors.name?.message}
            isRequired
          />
          <Input.Base
            label="Sobrenome"
            control={profileControl}
            name="lastname"
            placeholder="Digite seu sobrenome"
            errorText={profileErrors.lastname?.message}
            isRequired
          />
        </HStack>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Email"
            control={profileControl}
            name="email"
            placeholder="Digite seu e-mail"
            errorText={profileErrors.email?.message}
            isRequired
          />
          <Input.Base
            label="Telefone"
            control={profileControl}
            name="phone_number"
            placeholder="Digite seu telefone"
            errorText={profileErrors.phone_number?.message}
            mask="(99) 99999-9999"
            isRequired
          />
        </HStack>
        <Divider width="100%" />
        <Flex w="100%">
          <Text.Medium fontSize="16px">Endereço</Text.Medium>
        </Flex>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="CEP"
            control={addressControl}
            name="codeStreet"
            placeholder="Digite seu CEP"
            errorText={addressErrors.codeStreet?.message}
            isRequired
            mask="99999-999"
            onBlurSubmit={(value) => {
              fetchAddressByCEP(value);
              handleAddressChange();
            }}
          />
          <Input.Base
            label="Estado"
            control={addressControl}
            name="uf"
            placeholder="Digite o estado"
            errorText={addressErrors.uf?.message}
            isRequired
          />
        </HStack>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Rua"
            control={addressControl}
            name="street"
            placeholder="Digite o nome da rua"
            errorText={addressErrors.street?.message}
            isRequired
          />
          <Input.Base
            label="Cidade"
            control={addressControl}
            name="city"
            placeholder="Digite a cidade"
            errorText={addressErrors.city?.message}
            isRequired
          />
        </HStack>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Bairro"
            control={addressControl}
            name="neighborhood"
            placeholder="Digite o bairro"
            errorText={addressErrors.neighborhood?.message}
            isRequired
          />
          <Input.Base
            label="Número"
            control={addressControl}
            name="number"
            placeholder="Digite o número"
            errorText={addressErrors.number?.message}
            isRequired
          />
        </HStack>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Complemento"
            control={addressControl}
            name="complement"
            placeholder="Digite o complemento"
            errorText={addressErrors.complement?.message}
          />
        </HStack>
      </VStack>
      <Btn onClick={handleSave} label="Salvar" w="100%" isLoading={isPending} />
    </VStack>
  );
};

export default ProfileForm;
