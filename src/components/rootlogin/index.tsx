import { HStack, Image, Stack, Flex } from "@chakra-ui/react";
import useAuthStore from "stores/auth.store";

const RootLogin = ({ children }: { children: React.ReactNode }) => {
  const { stepLogin } = useAuthStore();

  return (
    <HStack
      w="100%"
      h="100vh"
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Flex h={{ base: "50vh", lg: "100%" }} w={{ base: "100%", lg: "50%" }}>
        {children}
      </Flex>
      <Stack
        bg="#131313"
        display={{ base: "none", lg: "flex" }}
        h={{ base: "50%", lg: "100%" }}
        justify="center"
        width={{ base: "100%", lg: "70%" }}
      >
        <Image
          m="auto"
          objectFit="cover"
          src={stepLogin ? "images/detailLogin2.png" : "images/detailLogin.png"}
        />
      </Stack>
    </HStack>
  );
};

export default RootLogin;
