import FormLogin from "./FormLogin/form";
import useAuthStore from "stores/auth.store";
import FormRegister from "./FormRegister/form";
import { Flex, Image, VStack } from "@chakra-ui/react";

const AuthProducer = () => {
  const { stepLogin } = useAuthStore();

  return (
    <Flex flex={1} w="100%" h="100vh">
      <VStack py="32px" w="40%" h="100%">
        {!stepLogin ? <FormLogin /> : <FormRegister />}
      </VStack>
      <Flex
        bg="#131313"
        display={{ base: "none", lg: "flex" }}
        h={{ base: "50%", lg: "100%" }}
        justify="center"
        width={{ base: "100%", lg: "70%" }}
        w="60%"
      >
        <Image
          m="auto"
          objectFit="contain"
          h="100vh"
          src={stepLogin ? "images/detailLogin2.png" : "images/detailLogin.png"}
        />
      </Flex>
    </Flex>
  );
};
export default AuthProducer;
