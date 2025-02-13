import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { Box, Text, List, Flex, Badge } from "@chakra-ui/react";
import Btn from "components/button/button";
import { UseMutateFunction } from "@tanstack/react-query";

interface PlanCardProps {
  planName: string;
  price: string;
  installmentInfo: string;
  features: Array<{ icon: React.ElementType; text: string }>;
  additionalInfo: Array<string>;
  onChoosePlan: (value: string) => void;
  isCurrentPlan: boolean;
  loading: boolean;
  planType?: any;
  mutateGetPlan: UseMutateFunction<any, unknown, string, unknown>;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  price,
  installmentInfo,
  features,
  additionalInfo,
  isCurrentPlan,
  loading,
  planType,
  mutateGetPlan,
}) => {
  const getIconColor = (icon: React.ElementType) => {
    return icon === ClearIcon ? "neutral.60" : "primary.50";
  };

  const renderBadge = () => {
    if (planType === "Starter") {
      return (
        <Badge
          p="2"
          borderRadius="8"
          bg="transparent"
          borderWidth="1px"
          borderColor="neutral.40"
          color={"neutral.40"}
        >
          <Text fontSize={12}>Econômico</Text>
        </Badge>
      );
    } else if (planType === "Free") {
      return (
        <Badge
          borderWidth="1px"
          borderColor="neutral.40"
          p="2"
          borderRadius="8"
          bg="transparent"
        >
          <Text color={"neutral.40"} fontSize={12}>
            Grátis
          </Text>
        </Badge>
      );
    } else if (planType === "Pro") {
      return (
        <Badge p="2" borderRadius="8" bg={"neutral.40"}>
          <Text color={"#00"} fontSize={12}>
            Mais popular
          </Text>
        </Badge>
      );
    } else if (planType === "Premium") {
      return (
        <Badge
          borderWidth="1px"
          borderColor="neutral.40"
          p="2"
          borderRadius="8"
          bg="linear-gradient(90deg, #7F00FF, #E100FF)"
        >
          <Text color={"neutral.40"} fontSize={12}>
            Premium
          </Text>
        </Badge>
      );
    }
    return null;
  };

  const planMap: { [key: string]: string } = {
    Starter: "basic",
    Pro: "pro",
    Premium: "bigger",
  };

  return (
    <Flex
      cursor="pointer"
      flexDir="column"
      borderWidth="1px"
      borderColor={"neutral.40"}
      borderRadius="20px"
      h="650px"
      w="400px"
      overflow="hidden"
      p="6"
      bg={"neutral.40"}
      textAlign="center"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{ transform: "scale(1.02)", boxShadow: "lg", color: "white" }}
    >
      <Flex justifyContent="center" alignItems="center" mb="4">
        <Text as="h3" fontSize="36px" color="neutral">
          {planName}
        </Text>
        <Box ml="2">{renderBadge()}</Box>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" mb="4" color="neutral">
        {price}
      </Text>
      <Btn
        borderColor={isCurrentPlan ? "neutral.10" : "primary.50"}
        bg={isCurrentPlan ? "neutral.40" : "primary.50"}
        onClick={() => mutateGetPlan(planMap[planType] || planType)}
        label={isCurrentPlan ? "Plano Atual" : "Aprimorar Plano"}
        isLoading={loading}
      />
      <Text color="neutral">{installmentInfo}</Text>
      <List.Root spaceY={3} textAlign="left" flex="1">
        {features.map((feature, index) => (
          <List.Item key={index}>
            <List.Indicator
              as={feature.icon}
              color={getIconColor(feature.icon)}
            />
            <Text color="neutral">{feature.text}</Text>
          </List.Item>
        ))}
      </List.Root>
      <Box my="10">
        {additionalInfo.map((info, index) => (
          <Text key={index} color="neutral">
            {info}
          </Text>
        ))}
      </Box>
    </Flex>
  );
};
