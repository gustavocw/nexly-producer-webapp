import { Flex, Text, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import Select from "components/select/select";

interface FormProps {
  control: any;
  handle: any;
  onSubmit: any;
}

const FormProfile: React.FC<FormProps> = ({ control }) => {
  return (
    <VStack
      align="flex-start"
      w="100%"
      borderRadius="8px"
      gap="20px"
      bg="neutral.60"
    >
      <Text color="primary.40">Informações pessoais</Text>
      <Flex w="100%" gap={2}>
        <Input.Base
          name="name"
          maxLength={200}
          control={control}
          label="Nome"
        />
        <Input.Base
          name="lastname"
          maxLength={200}
          control={control}
          label="Sobrenome"
        />
      </Flex>
      <VStack w="100%" align="flex-start" spaceY={8}>
        <Flex alignItems="flex-end" w="100%" gap={2}>
          <Input.Base
            name="phone"
            maxLength={200}
            control={control}
            label="Celular"
            mask="(99) 99999-9999"
          />

          <Select
            options={[
              { label: "Masculino", value: "m" },
              { label: "Feminino", value: "f" },
              { label: "Não informar", value: "sn" },
            ]}
            control={control}
            label="Gênero"
            name="sex"
          />          <Input.Base
          name="email"
          maxLength={200}
          control={control}
          label="E-mail"
        />

        </Flex>
      </VStack>
    </VStack>
  );
};

export default FormProfile;
