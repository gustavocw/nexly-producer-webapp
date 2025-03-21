import { Flex, HStack, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import Divider from "components/divider/divider";
import Text from "components/text/text";
import useProducerStore from "stores/producer.store";
import { useNavigate } from "react-router-dom";
import { getPlanStyles } from "./getPlans";
import { formatToBRL } from "utils/formatBrl";

interface PlansProps {
  onClose: () => void;
}

const Plans: React.FC<PlansProps> = ({ onClose }) => {
  const { producer } = useProducerStore();
  const navigate = useNavigate();

  const planPropeties = getPlanStyles(producer?.plan);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Data inválida";

    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getTextColor = (dateString?: string) => {
    if (!dateString) return "gray.500";
    const today = new Date();
    const paymentDate = new Date(dateString);
    const differenceInTime = paymentDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    return differenceInDays <= 5 ? "red.500" : "black";
  };

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
            alignItems="center"
          >
            <Flex gap="10px" alignItems="center">
              <Text.Medium fontSize="16px" color="neutral">
                Planos
              </Text.Medium>
              <Flex
                color={planPropeties.textColor}
                alignItems="center"
                justify="center"
                bg={planPropeties.bg}
                borderRadius="lg"
                py="6px"
                px="10px"
                border={planPropeties.border}
                borderColor={planPropeties.borderColor}
              >
                {planPropeties.text}
              </Flex>
            </Flex>
            <VStack>
              {producer?.plan !== "bigger" && (
                <Btn
                  label="Atualizar plano"
                  onClick={() => {
                    navigate("/plans", { state: { plan: producer?.plan } });
                    onClose();
                  }}
                  w="200px"
                />
              )}
              <Text.Medium fontSize="14px" color={getTextColor(producer?.nextPayment)}>
                Próximo pagamento: {formatDate(producer?.nextPayment)}
              </Text.Medium>
            </VStack>
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
                {formatToBRL(planPropeties.monthlyPrice)}
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
            {producer?.plan !== "visitor" && (
              <Btn
                label={`Alterar para anual (-20%) ${formatToBRL(
                  planPropeties.annualPrice
                )}`}
                onClick={() => {
                  onClose();
                }}
                bg="transparent"
                w="auto"
              />
            )}
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Plans;
