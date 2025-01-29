import { HStack, Image, Stack, Box, Flex } from "@chakra-ui/react";
import FormLogin from "./FormLogin/login";
import useAuthStore from "stores/auth.store";
import FormRegister from "./FormRegister/register";

const AuthProducer = () => {
  const { stepLogin } = useAuthStore();

  return (
    <HStack h="100vh" flex={1} flexDirection={{ base: "column", lg: "row" }}>
      <Flex h={{ base: "50%", lg: "100%" }} w={{ base: "100%", lg: "50%" }}>
        {!stepLogin ? <FormLogin /> : <FormRegister />}
      </Flex>
      <Stack
        bg="#131313"
        display={{ base: "none", lg: "flex" }}
        h={{ base: "50%", lg: "100vh" }}
        justify="center"
        width={{ base: "100%", lg: "50%" }}
      >
        <Box>
          <Image
            m="auto"
            objectFit="cover"
            src={stepLogin ? "images/detailLogin2.png" : "images/detailLogin.png"}
          />
        </Box>
      </Stack>
    </HStack>
  );
};

export default AuthProducer;
