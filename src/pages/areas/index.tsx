import { VStack, Flex, HStack, Icon, Box } from "@chakra-ui/react";
import Text from "components/text/text";
import AreaCard from "./card/card.areas";
import { useAreasController } from "./index.controller";
import FormArea from "./form/form.area";
import Btn from "components/button/button";
import { HiPlus } from "react-icons/hi2";
import { BsTextareaResize } from "react-icons/bs";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DomainList from "./domains";
import NavOptions from "components/navoptions/navoptions";

const Areas = () => {
  const {
    areas,
    loadingAreas,
    selectedArea,
    step,
    selectedTab,
    optionsNav,
    handleTabChange,
    handleAreaClick,
    handleNewArea,
    goBack,
  } = useAreasController();

  return (
    <VStack gap="32px" px={8} align="stretch">
      <HStack align="flex-start" justify="space-between" py={5}>
        <NavOptions
          value={selectedTab}
          options={optionsNav}
          onChange={handleTabChange}
        />
        {step === "list" && areas && areas?.length > 0 && (
          <Btn
            w={{ base: "140px", md: "200px" }}
            iconLeft={<HiPlus />}
            label="Nova área"
            onClick={handleNewArea}
            h="40px"
          />
        )}
      </HStack>

      {selectedTab === "domains" ? (
        <DomainList />
      ) : (
        <>
          {step === "list" && (
            <>
              {areas?.length && !loadingAreas ? (
                <>
                  <Flex
                    w="100%"
                    wrap="wrap"
                    gap="24px"
                    justifyContent="flex-start"
                  >
                    {areas?.map((area) => (
                      <Flex flexWrap="wrap" w="100%" key={area._id}>
                        <Box w="300px">
                          <Box onClick={() => handleAreaClick(area)} w="100%">
                            <AreaCard data={area} />
                          </Box>
                        </Box>
                      </Flex>
                    ))}
                  </Flex>
                </>
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
                      Comece sua jornada com a Nexly criando sua primeira área
                      de membro.
                    </Text.Medium>
                    <Btn
                      w="200px"
                      iconLeft={<HiPlus />}
                      label="Nova área"
                      onClick={handleNewArea}
                    />
                  </VStack>
                </VStack>
              )}
            </>
          )}
          {step === "form" && (
            <VStack w="100%">
              <Flex
                w="100%"
                py={5}
                alignItems="center"
                gap="6px"
                onClick={goBack}
              >
                <Flex cursor="pointer">
                  <Icon color="neutral">
                    <KeyboardArrowLeftIcon />
                  </Icon>
                  <Text.Medium fontSize="16px" color="neutral">
                    {selectedArea
                      ? "Editar área de membros"
                      : "Criar área de membros"}
                  </Text.Medium>
                </Flex>
              </Flex>
              <FormArea selectedArea={selectedArea} goBack={goBack} />
            </VStack>
          )}
        </>
      )}
    </VStack>
  );
};

export default Areas;
