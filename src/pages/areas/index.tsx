import { VStack, Flex, Tabs, HStack, Icon } from "@chakra-ui/react";
import Text from "components/text/text";
import AreaCard from "./card/card.areas";
import { useAreasController } from "./index.controller";
import FormArea from "./form/form.area";
import Btn from "components/button/button";
import { HiPlus } from "react-icons/hi2";
import { useProducts } from "hooks/useProducts";
import { useState } from "react";
import { BsTextareaResize } from "react-icons/bs";

const Areas = () => {
  const { areas, loadingAreas } = useAreasController();
  const { creatingArea } = useProducts();
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  let formSubmitHandler: (() => void) | null = null;
  const setFormSubmitHandler = (submitHandler: () => void) => {
    formSubmitHandler = submitHandler;
  };

  const handleSave = () => {
    if (formSubmitHandler) {
      formSubmitHandler();
    }
  };

  const handleAreaClick = (area: Area) => {
    setSelectedArea(area);
  };

  return (
    <VStack gap="32px" px={8} align="stretch">
      <Tabs.Root unstyled defaultValue="areas">
        <HStack align="flex-start" justify="space-between" spaceY={5} py={5}>
          <Tabs.Content
            w="100%"
            display="flex"
            justifyContent="space-between"
            value="areas"
          >
            <Text.Medium fontSize="24px">
              Suas áreas {areas?.length && `${areas?.length}`}
            </Text.Medium>
            {areas?.length > 0 && (
              <Tabs.Trigger value="area">
                <Btn
                  w="200px"
                  iconLeft={<HiPlus />}
                  label="Nova área"
                  onClick={() => setSelectedArea(null)}
                />
              </Tabs.Trigger>
            )}
          </Tabs.Content>
          <Tabs.Content
            w="100%"
            display="flex"
            justifyContent="space-between"
            value="area"
          >
            <Text.Medium fontSize="24px">Nova área</Text.Medium>
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
                <AreaCard
                  key={area._id}
                  data={area}
                  onClick={() => handleAreaClick(area)}
                />
              ))}
            </Flex>
          ) : (
            <VStack
              w="100%"
              py="32px"
              px="10px"
              gap="20px"
              boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            >
              <Icon fontSize="58px" color="neutral">
                <BsTextareaResize />
              </Icon>
              <VStack gap="32px" lineHeight={1.5} w="100%">
                <Text.Medium fontSize="24px" color="neutral">
                  Comece sua jornada com a nexly criando sua primeira área de
                  membro.
                </Text.Medium>
                <Tabs.Trigger value="area">
                  <Btn
                    w="200px"
                    iconLeft={<HiPlus />}
                    label="Nova área"
                    onClick={() => setSelectedArea(null)}
                  />
                </Tabs.Trigger>
              </VStack>
            </VStack>
          )}
        </Tabs.Content>
        <Tabs.Content value="area">
          <VStack w="100%">
            <FormArea
              setSubmitHandler={setFormSubmitHandler}
              selectedArea={selectedArea}
            />
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
};

export default Areas;
