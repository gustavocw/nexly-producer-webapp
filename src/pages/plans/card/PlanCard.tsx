import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { Box, Text, Flex, Badge, VStack, HStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import { UseMutateFunction } from "@tanstack/react-query";

type PlanType = 'Starter' | 'Free' | 'Pro' | 'Premium';

type BadgeVariant = {
  bg: string;
  borderWidth?: string;
  borderColor?: string;
  color: string;
  text: string;
};

interface PlanCardProps {
  planName: string;
  price: string;
  installmentInfo: string;
  features: Array<{ icon: React.ElementType; text: string }>;
  additionalInfo: Array<string>;
  onChoosePlan: (value: string) => void;
  isCurrentPlan: boolean;
  loading: boolean;
  planType?: PlanType;
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
    const badgeVariants: Record<PlanType, BadgeVariant> = {
      Starter: { 
        bg: "transparent", 
        borderWidth: "1px", 
        borderColor: "neutral", 
        color: "neutral", 
        text: "Econômico" 
      },
      Free: { 
        bg: "transparent", 
        borderWidth: "1px", 
        borderColor: "neutral", 
        color: "neutral", 
        text: "Grátis" 
      },
      Pro: { 
        bg: "neutral", 
        color: "#000", 
        text: "Mais popular" 
      },
      Premium: { 
        bg: "linear-gradient(90deg, #7F00FF, #E100FF)", 
        borderWidth: "1px", 
        borderColor: "neutral.40", 
        color: "neutral.40", 
        text: "Premium" 
      }
    };

    if (!planType) return null;

    const badgeProps = badgeVariants[planType];

    return (
      <Badge
        ml={2}
        p="2"
        borderRadius="8"
        {...badgeProps}
      >
        <Text fontSize={12}>{badgeProps.text}</Text>
      </Badge>
    );
  };

  const planMap: Record<PlanType, string> = {
    Starter: "basic",
    Pro: "pro",
    Premium: "bigger",
    Free: "free"
  };

  return (
    <Flex
      cursor="pointer"
      flexDirection="column"
      borderWidth="1px"
      borderColor="neutral.40"
      borderRadius="20px"
      height="auto"
      width="400px"
      overflow="hidden"
      padding="6"
      bg="neutral.40"
      textAlign="center"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{ transform: "scale(1.02)", boxShadow: "lg", color: "white" }}
    >
      <VStack spaceY={4} align="center" width="full">
        <Flex alignItems="center" justifyContent="center">
          <Text as="h3" fontSize="36px" color="neutral">
            {planName}
          </Text>
          {renderBadge()}
        </Flex>

        <Text fontSize="2xl" fontWeight="bold" color="neutral">
          {price}
        </Text>

        <Btn
          borderColor={isCurrentPlan ? "neutral.10" : "primary.50"}
          bg={isCurrentPlan ? "neutral.40" : "primary.50"}
          onClick={() => mutateGetPlan(planType ? planMap[planType] : "")}
          label={isCurrentPlan ? "Plano Atual" : "Aprimorar Plano"}
          isLoading={loading}
        />

        <Text color="neutral">{installmentInfo}</Text>

        <VStack 
          spaceY={3} 
          align="start" 
          width="full" 
          flex={1}
        >
          {features.map((feature, index) => (
            <HStack key={index} spaceX={2} align="center">
              <Box 
                as={feature.icon} 
                color={getIconColor(feature.icon)} 
              />
              <Text color="neutral">{feature.text}</Text>
            </HStack>
          ))}
        </VStack>

        <VStack spaceY={2} mt={10}>
          {additionalInfo.map((info, index) => (
            <Text key={index} color="neutral" textAlign="center">
              {info}
            </Text>
          ))}
        </VStack>
      </VStack>
    </Flex>
  );
};