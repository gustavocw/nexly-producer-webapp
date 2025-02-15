import { VStack, Image, Flex, Link, Box } from "@chakra-ui/react";
import Input from "components/input/input";
import Text from "components/text/text";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Btn from "components/button/button";
import { useRegisterController } from "./controller";
import useAuthStore from "stores/auth.store";
import { useState } from "react";
import { SegmentedControl } from "components/ui/segmented-control";

const FormRegister = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    loadingRegister,
  } = useRegisterController();
  const { setStepLogin } = useAuthStore();
  const [step, setStep] = useState(0);
  const [identityType, setIdentityType] = useState("CPF");

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const identityMask =
    identityType === "CPF" ? "999.999.999-99" : "99.999.999/9999-99";
  const identityLabel = identityType === "CPF" ? "CPF" : "CNPJ";

  return (
    <VStack maxW="462px" px={2} justify="space-between" w="100%" h="100%">
      <Flex w="100%" justify="flex-start">
        <Image width="150px" src="images/logo-name-svg.svg" />
      </Flex>

      <VStack spaceY={6} w="100%" maxH={{ base: "70vh", md: "80vh", lg: "auto" }}>
        <VStack w="100%" display={step > 0 ? "flex" : "none"} align="flex-start">
          {step > 0 && (
            <Box
              _hover={{ color: "white", bg: "transparent" }}
              color="white"
              cursor="pointer"
              onClick={() => setStep(step - 1)}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
          )}
        </VStack>

        <Flex w="100%" mx={{ base: "auto", md: "auto", lg: "0" }}>
          {[0, 1, 2].map((item, index) => (
            <Box
              key={index}
              width={step === item ? "30px" : "12px"}
              height="12px"
              borderRadius="20px"
              transition="width 0.5s ease"
              bg={step === item ? "purple.500" : "gray.300"}
              mr="2"
            />
          ))}
        </Flex>

        <VStack alignItems="flex-start" w="100%">
          <Text.Base fontSize={{ base: "16px", md: "22px", lg: "28px" }}>
            {step === 0
              ? "Informações pessoais"
              : step === 1
              ? "Informações de contato"
              : "Definir uma senha"}
          </Text.Base>
          <Text.Base fontSize={{ base: "14px", md: "15px", lg: "16px" }} color="whiteAlpha.600">
            {step === 0
              ? "Por favor insira nome e sobrenome"
              : step === 1
              ? "Por favor insira email, celular e CPF/CNPJ"
              : "Por favor crie uma senha"}
          </Text.Base>
        </VStack>

        <VStack justify="center" w="100%" spaceY={6}>
          {step === 0 && (
            <>
              <Input.Base
                height="44px"
                errorToast
                control={control}
                name="name"
                label="Nome"
                placeholder="Digite seu nome"
              />
              <Input.Base
                height="44px"
                errorToast
                control={control}
                name="lastname"
                label="Sobrenome"
                placeholder="Digite seu sobrenome"
              />
            </>
          )}

          {step === 1 && (
            <>
              <Input.Base
                height="44px"
                errorToast
                control={control}
                name="email"
                label="Email"
                placeholder="Digite seu email"
              />
              <Input.Base
                height="44px"
                errorToast
                control={control}
                name="phone"
                label="Celular/Whatsapp"
                placeholder="(99) 99999-9999"
                mask="(99) 99999-9999"
              />
              <Flex alignItems="center" gap={2} w="100%">
                <Input.Base
                  height="44px"
                  errorToast
                  control={control}
                  name="identity"
                  label={identityLabel}
                  placeholder={`Digite seu ${identityLabel}`}
                  mask={identityMask}
                />
                <SegmentedControl
                  px={2}
                  bg="neutral.60"
                  color="neutral"
                  value={identityType}
                  onValueChange={(value) => setIdentityType(value.value)}
                  items={["CPF", "CNPJ"]}
                />
              </Flex>
            </>
          )}

          {step === 2 && (
            <>
              <Input.Base
                height="44px"
                errorToast
                control={control}
                name="password"
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
              />
              <Input.Base
                height="44px"
                errorToast
                control={control}
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                placeholder="Confirme sua senha"
              />
            </>
          )}
        </VStack>
        <Btn
          w="100%"
          isLoading={loadingRegister}
          label={step === 2 ? "Criar conta" : "Continuar"}
          onClick={handleNextStep}
          disabled={step === 0 ? !isStep1Valid : step === 1 ? !isStep2Valid : !isStep3Valid}
        />
      </VStack>

      <Flex justify="center" textAlign="center" py={5} w="80%" gap={2}>
        <Text.Base>Não possui uma conta?</Text.Base>
        <Link onClick={() => setStepLogin(false)} textDecoration="none" color="primary.50">
          Fazer login.
        </Link>
      </Flex>
    </VStack>
  );
};

export default FormRegister;
