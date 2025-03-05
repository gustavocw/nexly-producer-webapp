import { Box, Flex } from "@chakra-ui/react";
import Header from "./header/header";
import { PlanCard } from "./card/PlanCard";
import { planDetails } from "./list/list";
import { useMutation } from "@tanstack/react-query";
import { getPlan } from "services/auth.services";
import useProducerStore from "stores/producer.store";
import { useState, useEffect } from "react";
import { formatToBRL } from "utils/formatBrl";

export const PlansFn = {
  visitor: "Free",
  basic: "Starter",
  pro: "Pro",
  bigger: "Premium",
} as const;

const PlansPage = () => {
  const { producer } = useProducerStore();
  const { mutate: mutateGetPlan, isPending } = useMutation({
    mutationFn: (plan: string) => getPlan(producer?.email, plan),
    onSuccess: (data) => {
      if (data?.url) {
        window.open(data?.url, "_self");
      }
    },
  });

  const [updatedPlanDetails, setUpdatedPlanDetails] = useState(planDetails);

  useEffect(() => {
    handleHeaderClick("anual");
  }, []);

  const currentPlanType =
    PlansFn[producer?.plan as keyof typeof PlansFn] || "Starter";

  const handleHeaderClick = (selectedType: "mensal" | "anual") => {
    const updatedPlans = planDetails.map((planDetail) => {
      if (planDetail.planName === 'FREE') {
        return { ...planDetail, installmentInfo: 'Grátis' };
      }
      const monthlyPrices = {
        'Starter': 10000,   
        'Pro': 30000,       
        'Premium': 80000    
      };
      if (selectedType === "anual") {
        const monthlyPrice = monthlyPrices[planDetail.planName as 'Starter' | 'Pro' | 'Premium'];
        const annualPrice = monthlyPrice * 12 * 0.8;
        
        return {
          ...planDetail,
          price: annualPrice,
          installmentInfo: `${formatToBRL(annualPrice)}/ano`
        };
      } else {
        const monthlyPrice = monthlyPrices[planDetail.planName as 'Starter' | 'Pro' | 'Premium'];
        return {
          ...planDetail,
          price: monthlyPrice,
          installmentInfo: `${formatToBRL(monthlyPrice)}/mês`
        };
      }
    });

    setUpdatedPlanDetails(updatedPlans);
  };

  return (
    <Box h="100%">
      <Header click={handleHeaderClick} />
      <Flex py={5} w="95%" gap="5" mx="auto" justify="space-between" wrap="wrap">
        {updatedPlanDetails.map((planDetail: any) => (
          <PlanCard
            key={planDetail.planName}
            planName={planDetail.planName}
            price={formatToBRL(planDetail.price)}
            installmentInfo={planDetail.installmentInfo}
            features={planDetail.features}
            additionalInfo={planDetail.additionalInfo}
            onChoosePlan={() => mutateGetPlan(planDetail.onClick)}
            isCurrentPlan={currentPlanType === planDetail.planType}
            planType={planDetail.planType}
            mutateGetPlan={mutateGetPlan}
            loading={isPending}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default PlansPage;