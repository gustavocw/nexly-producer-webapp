import { VStack, Flex, Tabs, HStack, Icon, Box } from "@chakra-ui/react";
import Text from "components/text/text";
import AreaCard from "./card/card.areas";
import { useAreasController } from "./index.controller";
import FormArea from "./form/form.area";
import Btn from "components/button/button";
import { HiPlus } from "react-icons/hi2";
import { useProducts } from "hooks/useProducts";
import { useState, useEffect } from "react";
import { BsTextareaResize } from "react-icons/bs";
import { checkDomainStatus } from "utils/domainVercel";
import ModalDomain from "./modal/modal.domain";

const Areas = () => {
  const { areas, loadingAreas } = useAreasController();
  const { creatingArea, updatingArea } = useProducts();
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

  useEffect(() => {
    const verifyDomains = async () => {
      if (!areas || areas.length === 0) return;

      const newStatuses: { [key: string]: string } = {};

      for (const area of areas) {
        if (area.domain && area._id) {
          const result = await checkDomainStatus(area.domain);
          if (result.error) {
            newStatuses[area._id] = "⏳ Aguardando configuração DNS";
          } else {
            newStatuses[area._id] = "✅ Domínio configurado corretamente!";
          }
        }
      }
    };

    verifyDomains();
  }, [areas]);

  return (
    <VStack gap="32px" px={8} align="stretch">
      <Tabs.Root unstyled defaultValue="areas">
        <HStack align="flex-start" justify="space-between" spaceY={5} py={5}>
          <Tabs.Content
            w="100%"
            display="flex"
            gap={2}
            justifyContent={{ base: "flex-start", md: "space-between" }}
            value="areas"
            alignItems="center"
          >
            <Text.Medium fontSize={{ base: "18px", md: "24px" }}>
              Suas áreas {areas?.length && `(${areas?.length})`}
            </Text.Medium>
            {areas && areas?.length > 0 && (
              <Tabs.Trigger value="area">
                <Btn
                  w={{ base: "140px", md: "200px" }}
                  iconLeft={<HiPlus />}
                  label="Nova área"
                  onClick={() => setSelectedArea(null)}
                  h="30px"
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
                isLoading={creatingArea || updatingArea}
              />
            </Tabs.Trigger>
          </Tabs.Content>
        </HStack>
        <Tabs.Content py={5} value="areas">
          {areas?.length && !loadingAreas ? (
            <Flex w="100%" wrap="wrap" gap="24px" justifyContent="flex-start">
              {areas?.map((area) => (
                <Flex flexWrap="wrap" w="100%">
                  <Box w="100%">
                    <AreaCard
                      data={area}
                      onClick={() => handleAreaClick(area)}
                    />
                    <ModalDomain area={area} />
                  </Box>
                </Flex>
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
                  Comece sua jornada com a Nexly criando sua primeira área de
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
