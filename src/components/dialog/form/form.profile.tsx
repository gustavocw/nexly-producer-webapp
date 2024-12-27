import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Divider from "components/divider/divider";
import Input from "components/input/input";
import Text from "components/text/text";
import { Avatar } from "components/ui/avatar";
import { useFormProfileController } from "./form.controller";

const ProfileForm = () => {
  const { control, errors } = useFormProfileController();

  return (
    <VStack gap="32px" w="100%" h="100%" p="24px" align="flex-start">
      <Text.Medium fontSize="16px">Informações do Perfil</Text.Medium>
      <VStack align="flex-start" w="100%">
        <Text.Medium color="neutral" fontSize="12px">
          Foto do perfil
        </Text.Medium>
        <HStack alignItems="center" w="100%" align="flex-start">
          <Avatar w="80px" h="80px" src="/images/bg.png" />
          <Box>
            <Flex gap="10px">
              <Btn w="120px" label="Alterar foto" />
              <Btn
                w="120px"
                label="Deletar foto"
                bg="transparent"
                color="error.30"
              />
            </Flex>
            <Text.Medium textAlign="center">
              Tamanho recomendado 300 x 300
            </Text.Medium>
          </Box>
        </HStack>
      </VStack>
      <Divider width="100%" />
      <VStack w="100%" gap="16px">
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Nome"
            control={control}
            name="firstName"
            placeholder="Digite seu nome"
            errorText={errors.firstName?.message}
            isRequired
          />
          <Input.Base
            label="Sobrenome"
            control={control}
            name="lastName"
            placeholder="Digite seu sobrenome"
            errorText={errors.lastName?.message}
            isRequired
          />
        </HStack>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Email"
            control={control}
            name="email"
            placeholder="Digite seu e-mail"
            errorText={errors.email?.message}
            isRequired
          />
          <Input.Base
            label="Telefone"
            control={control}
            name="phone"
            placeholder="Digite seu telefone"
            errorText={errors.phone?.message}
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
            control={control}
            name="address.zipCode"
            placeholder="Digite seu CEP"
            errorText={errors.address?.zipCode?.message}
            isRequired
          />
          <Input.Base
            label="Estado"
            control={control}
            name="address.state"
            placeholder="Digite o estado"
            errorText={errors.address?.state?.message}
            isRequired
          />
        </HStack>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Rua"
            control={control}
            name="address.street"
            placeholder="Digite o nome da rua"
            errorText={errors.address?.street?.message}
            isRequired
          />
          <Input.Base
            label="Cidade"
            control={control}
            name="address.city"
            placeholder="Digite a cidade"
            errorText={errors.address?.city?.message}
            isRequired
          />
        </HStack>
        <HStack gap="20px" w="100%">
          <Input.Base
            label="Número"
            control={control}
            name="address.number"
            placeholder="Digite o número"
            errorText={errors.address?.number?.message}
            isRequired
          />
          <Input.Base
            label="Complemento"
            control={control}
            name="address.complement"
            placeholder="Digite o complemento"
            errorText={errors.address?.complement?.message}
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ProfileForm;
