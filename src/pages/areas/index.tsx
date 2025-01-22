import { VStack, Flex, Tabs, HStack } from "@chakra-ui/react";
import Text from "components/text/text";
import AreaCard from "./card/card.areas";
import { useAreasController } from "./index.controller";
import FormArea from "./form/form.area";
import Btn from "components/button/button";
import { HiPlus } from "react-icons/hi2";
import { useProducts } from "hooks/useProducts";

const Areas = () => {
  const { areas, loadingAreas } = useAreasController();
  const { creatingArea } = useProducts();
  let formSubmitHandler: (() => void) | null = null;
  const setFormSubmitHandler = (submitHandler: () => void) => {
    formSubmitHandler = submitHandler;
  };

  const handleSave = () => {
    if (formSubmitHandler) {
      formSubmitHandler();
    }
  };

  console.log(areas);
  

  return (
    <VStack gap="32px" px={8} align="stretch">
      <Tabs.Root unstyled defaultValue="areas">
        <HStack align="flex-start" justify="space-between" spaceY={5} py={5}>
          <Tabs.Content w="100%" display="flex" justifyContent="space-between" value="areas">
          <Text.Medium fontSize="24px">
            Suas áreas {areas?.length && `${(areas?.length)}`}
          </Text.Medium>
            <Tabs.Trigger value="area">
              <Btn w="200px" iconLeft={<HiPlus />} label="Nova área" />
            </Tabs.Trigger>
          </Tabs.Content>
          <Tabs.Content w="100%" display="flex" justifyContent="space-between"  value="area">
          <Text.Medium fontSize="24px">
            Nova área
          </Text.Medium>
            <Tabs.Trigger value="area">
              <Btn
                w="200px"
                label="Salvar"
                onClick={handleSave}
                isLoading={creatingArea}
              />
            </Tabs.Trigger>
          </Tabs.Content>
        </HStack>
        <Tabs.Content py={5} value="areas">
          {areas?.length && !loadingAreas ? (
            <Flex w="100%" wrap="wrap" gap="24px" justifyContent="flex-start">
              {areas?.map((area: Area) => (
                <AreaCard key={area._id} data={area} />
              ))}
            </Flex>
          ) : (
            <Text.Medium fontSize="18px">
              Você não possui nenhuma área criada.
            </Text.Medium>
          )}
        </Tabs.Content>
        <Tabs.Content value="area">
          <VStack w="100%">
            <FormArea setSubmitHandler={setFormSubmitHandler} />
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};

export default Areas;
