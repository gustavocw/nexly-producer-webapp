import { Box, Stack, Tabs, Text, VStack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import Card from "./cards/views";
import { useStatisticsController } from "./index.controller";
import TitlePage from "components/titlePage/titlePage";
import GraphicStatistic from "./graphic";
import TableViews from "./table/tableview";

const Statistics = () => {
  const {
    chartData,
    optionsNav,
    weeklyChange,
    optionStatus,
    handleSelectionChange,
  } = useStatisticsController();

  return (
    <Stack pb={{ base: 20, md: 0 }} gap="32px" px={8}>
      <TitlePage title="Analisar estatísticas | Seu desempenho" />
      <Tabs.Root>
        <NavOptions
          defaultValue={optionsNav[0].value}
          options={optionsNav}
          onChange={handleSelectionChange}
        />
      </Tabs.Root>
      <Box py={2}>
        <Text color="neutral" fontSize="22px">O seu perfil teve {0} visualizações nos últimos 7 dias</Text>
      </Box>
      <Box w="100%">
        <Stack
          flexDirection={{ base: "column", md: "row" }}
          gap="20px"
          align="flex-start"
          w="100%"
        >
          <VStack gap="20px" width={{ base: "100%", md: "70%" }} flex={1}>
            <GraphicStatistic data={chartData} mode={optionStatus} />
            <TableViews />
          </VStack>
          <VStack
            align={{ base: "center", md: "flex-start" }}
            gap="20px"
            width={{ base: "100%", md: "30%" }}
          >
            <Card type="views" value={weeklyChange} />
            <Card type="watchTime" value={weeklyChange} />
          </VStack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Statistics;
