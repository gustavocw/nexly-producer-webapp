import { Stack, VStack, Image, Flex, Link, HStack } from "@chakra-ui/react";
import Input from "components/input/input";
import Text from "components/text/text";
import { useLoginController } from "./login.controller";
import { RadioGroup } from "components/ui/radio";
import Btn from "components/button/button";
import useAuthStore from "stores/auth.store";
import { CheckboxCard } from "components/ui/checkbox-card";

const FormLogin = () => {
  const { control, errors, handleSubmit, onSubmit, rememberMe, setRememberMe } =
    useLoginController();
  const { setStepLogin, setEmail, setPassword } = useAuthStore();

  return (
    <Stack justify="space-between" alignItems="center" h="100%" width="100%">
      <Image width="200px" h="100px" src="images/logo.png" />
      <VStack
        mb={40}
        spaceY={10}
        w={{ base: "70%", md: "70%", lg: "50%" }}
        lineHeight={1}
      >
        <VStack w="100%">
          <Text.Base
            textWrap="nowrap"
            fontSize={{ base: "16px", md: "22px", lg: "28px" }}
          >
            Bem vindo de volta a
          </Text.Base>
          <Text.Base
            textWrap="nowrap"
            fontSize={{ base: "16px", md: "22px", lg: "28px" }}
            color="primary.50"
          >
            Nexly members!
          </Text.Base>
        </VStack>
        <VStack w="100%" gap="32px">
          <Input.Base
            control={control}
            name="email"
            placeholder="Endereço de e-mail"
            errorText={errors.email?.message}
            isRequired
          />
          <Input.Base
            control={control}
            type="password"
            name="password"
            placeholder="Senha"
            errorText={errors.password?.message}
            isRequired
          />
          <HStack w="100%" justify="space-between">
            <Link textDecoration="none" color="primary.50">
              Esqueceu a senha?
            </Link>
            <RadioGroup
              defaultValue={rememberMe || "false"}
              color="#fff"
              borderColor="white"
              size="sm"
            >
              <CheckboxCard
                onCheckedChange={(e) => {
                  if (e.checked === true) {
                    setRememberMe("true");
                  } else {
                    setRememberMe("false");
                    setEmail("");
                    setPassword("");
                  }
                }}
                checked={rememberMe === "true"}
                indicatorPlacement="start"
                border="none"
                label="Lembrar de mim"
              />
            </RadioGroup>
          </HStack>
          <Btn label="Entrar" onClick={handleSubmit(onSubmit)} />
        </VStack>
      </VStack>
      <Flex py={10} gap={2}>
        <Text.Base>Não possui um conta?</Text.Base>
        <Link
          onClick={() => setStepLogin(true)}
          textDecoration="none"
          color="primary.50"
        >
          Cadastre-se
        </Link>
      </Flex>
    </Stack>
  );
};

export default FormLogin;
