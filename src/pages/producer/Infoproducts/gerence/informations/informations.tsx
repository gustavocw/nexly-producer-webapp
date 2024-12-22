import { HStack, VStack, Image, Flex } from "@chakra-ui/react";
import Divider from "components/divider/divider";
import Text from "components/text/text";

const Informations = () => {
  return (
    <VStack w="100%">
      <HStack w="100%">
        <VStack
          gap="20px"
          p="20px"
          borderWidth="1px"
          borderColor="neutral.40"
          borderRadius="8px"
          align="flex-start"
          w="70%"
        >
          <HStack gap="10px">
            <Image borderRadius="8px" w="100px" h="57px" src="/images/bg.png" />
            <Text.Medium fontSize="16px">Nome do curso</Text.Medium>
          </HStack>
          <Divider width="100" />
          <Flex>
            <Text.Medium fontSize="14px">
              O curso "Introdução à Programação em Python" é voltado para
              iniciantes que desejam aprender os conceitos básicos de
              programação utilizando a linguagem Python. Ao longo de quatro
              semanas, os alunos explorarão desde os fundamentos da lógica de
              programação até a criação de pequenos projetos práticos.
            </Text.Medium>
          </Flex>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Informations;
