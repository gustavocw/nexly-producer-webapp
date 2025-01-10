import { Box, Flex } from "@chakra-ui/react";
import Btn from "components/button/button";
import {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsNextTrigger,
  StepsContent,
} from "components/ui/steps";
import { useProducts } from "hooks/useProducts";

const StepProduct = () => {
  const { products } = useProducts();

  const steps = [
    "Adicione os módulos",
    "Adicione os vídeos",
    "Publique o infoproduto",
  ];

  const getStepStatus = (product: Product) => {
    return {
      modulesComplete: product.count_modules > 0,
      lessonsComplete: product.count_lesson > 0,
      publishComplete: product.state !== "PRIVADO",
    };
  };

  const handleStepClick = (step: string, productId?: string) => {
    if (step === "Adicione os módulos") {
      window.location.href = `http://localhost:5173/infoproducts/informations/${productId}`;
    } else {
      console.log(`Ação executada: ${step} para produto ${productId}`);
    }
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
          {products?.map((product, index) => {
            const productStatus = getStepStatus(product);

            let stepToShow = null;

            if (!productStatus.modulesComplete) {
              stepToShow = (
                <Btn
                  w="200px"
                  label="Adicionar Módulos"
                  onClick={() => handleStepClick("Adicione os módulos", product?._id)}
                />
              );
            } else if (!productStatus.lessonsComplete) {
              stepToShow = (
                <Btn
                  w="200px"
                  label="Adicionar Vídeos"
                  onClick={() => handleStepClick("Adicione os vídeos", product?._id)}
                />
              );
            } else if (!productStatus.publishComplete) {
              stepToShow = (
                <Btn
                  w="200px"
                  label="Publicar Curso"
                  onClick={() => handleStepClick("Publique o infoproduto", product?._id)}
                />
              );
            }

            return (
              <StepsContent key={product._id} index={index}>
                {stepToShow && (
                  <StepsNextTrigger
                    asChild
                    disabled={
                      (index === 0 && !productStatus.modulesComplete) ||
                      (index === 1 && !productStatus.lessonsComplete) ||
                      (index === 2 && !productStatus.publishComplete)
                    }
                  >
                    {stepToShow}
                  </StepsNextTrigger>
                )}
              </StepsContent>
            );
          })}
        </Flex>
      </Flex>
    </StepsRoot>
  );
};

export default StepProduct;
