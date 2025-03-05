import {
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import Btn from "components/button/button";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  return (
    <Flex
      minH="100vh"
      bg="neutral.60"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        bg="neutral.40"
        p={8}
        borderRadius="md"
        shadow="lg"
        spaceY={6}
        maxW="lg"
        textAlign="center"
      >
        <Icon as={IoCheckmarkCircle} w={16} h={16} color="primary.50">
          <IoCheckmarkCircle />
        </Icon>
        <Heading color="primary.50">Parabéns! 🎉</Heading>
        <Text fontSize="lg" color="neutral">
          Você agora faz parte da <strong>Nexly</strong>. Obrigado por adquirir
          nosso plano! Esperamos que tenha uma ótima experiência.
        </Text>
        <HStack spaceX={4}>
          <Btn label="Acessar meu painel" onClick={() => navigate("/")} />
        </HStack>
      </VStack>
    </Flex>
  );
};

export default SuccessPayment;
