import { Stack, VStack, Image, Flex, Link, Box } from "@chakra-ui/react";
import Input from "components/input/input";
import Text from "components/text/text";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Btn from "components/button/button";
import { useRegisterController } from "./register.controller";
import useAuthStore from "stores/auth.store";
import { useState } from "react";

const FormRegister = () => {
  const { control, errors, handleSubmit, onSubmit } = useRegisterController();
  const { setStepLogin } = useAuthStore();
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Stack
      justify="space-between"
      alignItems={{ base: "center", md: "center", lg: "flex-start" }}
      h="100%"
      width="100%"
    >
      <Stack w={{ base: "100%", md: "100%", lg: "80%" }} mx="auto">
        <Image my={10} width="150px" src="images/logo-name-svg.svg" />
        <Flex>
          {step === 1 && (
            <Box
              _hover={{ color: "fff", bg: "transparent" }}
              color="white"
              cursor="pointer"
              onClick={() => setStep(step - 1)}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
          )}
        </Flex>
        <Flex mx={{ base: "auto", md: "auto", lg: "0" }} my={10}>
          <Box
            width={step === 0 ? "30px" : "12px"}
            height="12px"
            borderRadius="20px"
            transition="width 0.5s ease"
            bg={step === 0 ? "purple.500" : "gray.300"}
            mr="2"
          />
          <Box
            width={step === 1 ? "30px" : "12px"}
            height="12px"
            borderRadius="20px"
            transition="width 0.5s ease"
            bg={step === 1 ? "purple.500" : "gray.300"}
          />
        </Flex>
        <VStack spaceY={10} w="100%" lineHeight={1}>
          <VStack
            gap={3}
            alignItems={{ base: "center", md: "center", lg: "flex-start" }}
            w="100%"
          >
            <Text.Base
              textWrap="nowrap"
              textAlign="left"
              fontSize={{ base: "16px", md: "22px", lg: "28px" }}
            >
              {step === 0 ? "Informações pessoais" : "Definir uma senha"}
            </Text.Base>
            <Text.Base
              textWrap="nowrap"
              fontSize={{ base: "14px", md: "15px", lg: "16px" }}
              color="whiteAlpha.600"
            >
              {step === 0
                ? "Por favor insira nome, e-mail e telefone"
                : "Por favor crie uma senha"}
            </Text.Base>
          </VStack>
          <VStack
            px={{ base: "5", md: "5", lg: 0 }}
            alignItems={{ base: "center", md: "center", lg: "flex-start" }}
            w="100%"
          >
            {step === 0 ? (
              <VStack mb="2" w="100%" spaceY={2}>
                <Input.Base
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  control={control}
                  name="name"
                  label="Nome"
                  placeholder="Digite seu nome"
                  errorText={errors.name?.message}
                />
                <Input.Base
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  control={control}
                  name="lastname"
                  label="Sobrenome"
                  placeholder="Digite seu sobrenome"
                  errorText={errors.lastname?.message}
                />
                <Input.Base
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Digite seu email"
                  errorText={errors.email?.message}
                />
                <Input.Base
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  control={control}
                  name="phone"
                  label="Celular/Whatsapp"
                  placeholder="(99) 99999-9999"
                  mask="(99) 99999-9999"
                  errorText={errors.phone?.message}
                />
                <Input.Base
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  control={control}
                  name="identity"
                  label="CPF/CNPJ"
                  placeholder="Digite seu CPF ou CNPJ"
                  mask="999.999.999-99"
                  onEnterSubmit={() => handleNextStep()}
                  errorText={errors.identity?.message}
                />
              </VStack>
            ) : (
              <>
                <Input.Base
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  control={control}
                  name="password"
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  errorText={errors.password?.message}
                />
                <Input.Base
                  width={{ base: "100%", md: "100%", lg: "70%" }}
                  control={control}
                  name="confirmPassword"
                  label="Confirmar Senha"
                  type="password"
                  placeholder="Confirme sua senha"
                  errorText={errors.confirmPassword?.message}
                />
              </>
            )}
            <Btn
              w="70%"
              label={step === 0 ? "Continuar" : "Criar conta"}
              onClick={handleNextStep}
            />
          </VStack>
        </VStack>
      </Stack>
      <Flex justify="center" textAlign="center" py={5} w="80%" gap={2}>
        <Text.Base>Não possui uma conta?</Text.Base>
        <Link
          onClick={() => setStepLogin(false)}
          textDecoration="none"
          color="primary.50"
        >
          Fazer login.
        </Link>
      </Flex>
    </Stack>
  );
};

export default FormRegister;
