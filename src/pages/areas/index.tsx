import { VStack, Flex, HStack, Icon, Box, Grid, Tabs } from "@chakra-ui/react";
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
import { usePlanFeatures } from "hooks/userRoles";
import { LuFolder, LuUser } from "react-icons/lu";
import FormLogin from "./form/form.login";

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

  const { canHaveMoreMemberAreas } = usePlanFeatures();

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
            disabled={!canHaveMoreMemberAreas(areas)}
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
                  <Flex w="100%" justifyContent="center">
                    <Grid templateColumns="repeat(3, 1fr)" w="100%">
                      {areas?.map((area) => (
                        <Box
                          key={area._id}
                          w="100%"
                          maxW="320px"
                          onClick={() => handleAreaClick(area)}
                        >
                          <AreaCard data={area} />
                        </Box>
                      ))}
                    </Grid>
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
              <Tabs.Root
                lazyMount
                unmountOnExit
                w="100%"
                defaultValue="formlogin"
                colorPalette="purple"
              >
                <Flex gap={5} alignItems="center">
                  <Tabs.Trigger
                    _selected={{ borderColor: "neutral" }}
                    borderColor="neutral"
                    color="neutral"
                    w="auto"
                    value="formlogin"
                  >
                    <LuUser />
                    Login
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    _selected={{ borderColor: "neutral" }}
                    borderColor="neutral"
                    color="neutral"
                    w="auto"
                    value="area"
                  >
                    <LuFolder />
                    Área
                  </Tabs.Trigger>
                </Flex>
                <Tabs.Content value="formlogin">
                  <FormLogin />
                </Tabs.Content>
                <Tabs.Content value="area">
                  <FormArea selectedArea={selectedArea} goBack={goBack} />
                </Tabs.Content>
              </Tabs.Root>
            </VStack>
          )}
        </>
      )}
    </VStack>
  );
};

export default Areas;
