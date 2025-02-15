import { Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import useProducerStore from "stores/producer.store";
import { useNavigate } from "react-router-dom";
import { getPlanStyles } from "./getPlans";

interface PlansProps {
  onClose: () => void;
}

const Plans: React.FC<PlansProps> = ({ onClose }) => {
  const { producer } = useProducerStore();
  const navigate = useNavigate();

  const planStyles = getPlanStyles(producer?.plan);

  return (
    <VStack gap="32px" w="100%" h="100%" p="24px" align="flex-start">
      <Text.Medium fontSize="16px" color="neutral">
        Planos
      </Text.Medium>
      <VStack
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="neutral.40"
      >
        <VStack w="100%">
          <HStack
            gap="20px"
            py="20px"
            px="16px"
            w="100%"
            justify="space-between"
          >
            <Flex gap="10px" alignItems="center">
              <Text.Medium fontSize="16px" color="neutral">
                Planos
              </Text.Medium>
              <Flex
                color={planStyles.textColor}
                alignItems="center"
                justify="center"
                bg={planStyles.bg}
                borderRadius="lg"
                py="6px"
                px="10px"
                border={planStyles.border}
                borderColor={planStyles.borderColor}
              >
                {planStyles.text}
              </Flex>
            </Flex>
            <Btn
              label="Atualizar plano"
              onClick={() => {
                navigate("/plans", { state: { plan: producer?.plan } }),
                onClose()
              }}
              w="200px"
            />
          </HStack>
        </VStack>
        <Divider width="100%" />
        <VStack w="100%">
          <HStack
            gap="20px"
            py="20px"
            px="16px"
            w="100%"
            justify="space-between"
          >
            <Flex gap="10px" alignItems="center">
              <Text.Medium fontSize="16px" color="neutral">
                R$450,00
              </Text.Medium>
              <Flex
                color="neutral"
                alignItems="center"
                justify="center"
                bg="primary.50"
                borderRadius="50px"
                py="6px"
                px="10px"
              >
                Mensal
              </Flex>
            </Flex>
            <Btn
              label="Alterar para anual (-25%)"
              onClick={() => {
                onClose();
              }}
              bg="transparent"
              w="250px"
            />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Plans;
