import { Box, Flex } from "@chakra-ui/react";
import Btn from "components/button/button";
import {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsNextTrigger,
  StepsContent,
} from "components/ui/steps";
// import { useNavigate } from "react-router-dom";

const StepProduct = () => {
  // const navigate = useNavigate;
  const steps = [
    "Adicione os módulos",
    "Adicione os vídeos",
    "Publique o infoproduto",
  ];

  const handleStepClick = (step: string) => {
    console.log(`Ação executada: ${step}`);
  };

  return (
    <StepsRoot defaultValue={0} count={steps.length}>
      <Flex w="100%" p="4" gap="4">
        <Box flex="0 0 30%" pr="8">
          <StepsList>
            {steps.map((_, index) => (
              <StepsItem key={index} index={index} />
            ))}
          </StepsList>
        </Box>

        <Flex flex={1} alignItems="center" justifyContent="flex-end">
          {steps.map((step, index) => (
            <StepsContent key={index} index={index}>
              <StepsNextTrigger asChild>
                <Btn
                  w="200px"
                  label={step}
                  onClick={() => handleStepClick(step)}
                />
              </StepsNextTrigger>
            </StepsContent>
          ))}
        </Flex>
      </Flex>
    </StepsRoot>
  );
};

export default StepProduct;
