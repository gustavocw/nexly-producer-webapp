import { HStack, Image, Stack, Box, Flex } from "@chakra-ui/react";
import FormLogin from "./FormLogin/login";
import useAuthStore from "stores/all/auth.store";
import FormRegister from "./FormRegister/register";

const AuthProducer = () => {
  const { stepLogin } = useAuthStore();

  return (
    <HStack h="100vh" flex={1}>
      <Flex h="100%" w={{ base: "100%", md: "100%", lg: "50%" }}>
        {!stepLogin ? <FormLogin /> : <FormRegister />}
      </Flex>
      <Stack
        bg="#131313"
        display={{ base: "none", md: "none", lg: "flex" }}
        h="100vh"
        justify="center"
        width="50%"
      >
        <Box>
          <Image m="auto" objectFit="autoy" src={ stepLogin ? "images/detailLogin2.png" : "images/detailLogin.png" } />
        </Box>
      </Stack>
    </HStack>
  );
};

export default AuthProducer;
