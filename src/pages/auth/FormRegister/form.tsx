import { VStack, Image, Flex, Link, Box } from "@chakra-ui/react";
import Input from "components/input/input";
import Text from "components/text/text";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Btn from "components/button/button";
import { useRegisterController } from "./controller";
import useAuthStore from "stores/auth.store";
import { useState } from "react";
import { personalInfoInputs, passwordInputs } from "./fields";

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
    <VStack maxW="462px" px={2} justify="space-between" w="100%" h="100%">
      <Flex w="100%" justify="flex-start">
        <Image width="150px" src="images/logo-name-svg.svg" />
      </Flex>
      <VStack gap="22px" w="100%">
        <VStack w="100%" display={step === 1 ? "flex" : "none"} align="flex-start">
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
        </VStack>
        <Flex w="100%" mx={{ base: "auto", md: "auto", lg: "0" }}>
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
        <VStack alignItems="flex-start"  w="100%">
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
        {step === 0 ? (
          <VStack justify="center" w="100%" mb="2" spaceY={2}>
            {personalInfoInputs.map((input) => (
              <Input.Base
                key={input.name}
                height="4vh"
                control={control}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                mask={input.mask}
                onEnterSubmit={
                  input.name === "identity" ? handleNextStep : undefined
                }
                errorText={errors[input.name as keyof typeof errors]?.message}
              />
            ))}
          </VStack>
        ) : (
          passwordInputs.map((input) => (
            <Input.Base
              key={input.name}
              height="4vh"
              control={control}
              name={input.name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              errorText={errors[input.name as keyof typeof errors]?.message}
            />
          ))
        )}
        <Btn
          w="100%"
          label={step === 0 ? "Continuar" : "Criar conta"}
          onClick={handleNextStep}
        />
      </VStack>
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
    </VStack>
  );
};

export default FormRegister;
