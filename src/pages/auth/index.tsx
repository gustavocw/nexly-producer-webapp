import FormLogin from "./FormLogin/form";
import useAuthStore from "stores/auth.store";
import FormRegister from "./FormRegister/form";
import { Flex, Image, VStack } from "@chakra-ui/react";

const AuthProducer = () => {
  const { stepLogin } = useAuthStore();

  return (
    <Flex
    flexDirection={{ base: "column", lg: "row" }}
     flex={1} w="100%" h="100vh">
      <VStack h="100%" w={{ base: "100%", lg: "50%" }} py="32px">
        {!stepLogin ? <FormLogin /> : <FormRegister />}
      </VStack>
      <Flex
        bg="#131313"
        display={{ base: "none", lg: "flex" }}
        h={{ base: "50%", lg: "100%" }}
        justify="center"
        width={{ base: "100%", lg: "70%" }}
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
