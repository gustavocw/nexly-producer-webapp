import { VStack, Image, Flex, Link, Box } from "@chakra-ui/react";
import Input from "components/input/input";
import Text from "components/text/text";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Btn from "components/button/button";
import { useRegisterController } from "./controller";
import useAuthStore from "stores/auth.store";
import { useState, useEffect } from "react";
import { SegmentedControl } from "components/ui/segmented-control";

const FormRegister = () => {
  const { control, handleSubmit, onSubmit } = useRegisterController();
  const { setStepLogin } = useAuthStore();
  const [step, setStep] = useState(0);
  const [identityType, setIdentityType] = useState("CPF");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerHeight < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerHeight < 800);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNextStep = () => {
    if (isSmallScreen) {
      if (step < 2) {
        setStep(step + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    } else {
      if (step === 0) {
        setStep(1);
      } else {
        handleSubmit(onSubmit)();
      }
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
      <VStack gap="22px" w="100%" maxH={{ base: "70vh", md: "80vh", lg: "auto" }}>
        <VStack w="100%" display={step > 0 ? "flex" : "none"} align="flex-start">
          {step > 0 && (
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
            mr="2"
          />
          {isSmallScreen && (
            <Box
              width={step === 2 ? "30px" : "12px"}
              height="12px"
              borderRadius="20px"
              transition="width 0.5s ease"
              bg={step === 2 ? "purple.500" : "gray.300"}
            />
          )}
        </Flex>
        <VStack alignItems="flex-start" w="100%">
          <Text.Base
            textWrap="nowrap"
            textAlign="left"
            fontSize={{ base: "16px", md: "22px", lg: "28px" }}
          >
            {step === 0
              ? "Informações pessoais"
              : step === 1
              ? isSmallScreen
                ? "Contato"
                : "Definir uma senha"
              : "Definir uma senha"}
          </Text.Base>
          <Text.Base
            textWrap="nowrap"
            fontSize={{ base: "14px", md: "15px", lg: "16px" }}
            color="whiteAlpha.600"
          >
            {step === 0
              ? "Por favor insira nome e sobrenome"
              : step === 1
              ? isSmallScreen
                ? "Por favor insira email, celular e CPF/CNPJ"
                : "Por favor crie uma senha"
              : "Por favor crie uma senha"}
          </Text.Base>
        </VStack>
        {step === 0 ? (
          <VStack justify="center" w="100%" spaceY={6}>
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
            {!isSmallScreen && (
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
          </VStack>
        ) : step === 1 ? (
          isSmallScreen ? (
            <VStack justify="center" w="100%" spaceY={6}>
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
            </VStack>
          ) : (
            <VStack justify="center" w="100%" spaceY={2}>
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
            </VStack>
          )
        ) : (
          <VStack justify="center" w="100%" spaceY={2}>
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
          </VStack>
        )}
        <Btn
          w="100%"
          label={
            step === 0
              ? "Continuar"
              : step === 1
              ? isSmallScreen
                ? "Continuar"
                : "Criar conta"
              : "Criar conta"
          }
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
