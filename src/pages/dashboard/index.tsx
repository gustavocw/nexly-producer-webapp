import { Box, Stack, Tabs, VStack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import Card from "./cards/activeMembers";
import GraphicNexly from "components/graphic/graphic";
import Statistis from "./cards/statistics";
// import LastPost from "./cards/lastPost";
import Comments from "./comments/comments";
import { useDashboardController } from "./index.controller";

const Dashboard = () => {
  const {
    chartData,
    chartComments,
    optionsNav,
    weeklyChange,
    optionStatus,
    handleSelectionChange,
  } = useDashboardController();

  return (
    <Stack pb={{ base: 20, md: 0 }} gap="32px" px={8}>
      <Tabs.Root>
        <NavOptions
          pt="10"
          defaultValue={optionsNav[0].value}
          options={optionsNav}
          onChange={handleSelectionChange}
        />
      </Tabs.Root>
      <Box w="100%">
        <Stack
          flexDirection={{ base: "column", md: "column", lg: "row" }}
          gap="20px"
          align="flex-start"
          w="100%"
        >
          <VStack gap="20px" width={{ base: "100%", md: "100%", lg: "70%" }} flex={1}>
            <GraphicNexly data={chartData} mode={optionStatus} />
            <Comments data={chartComments} />
          </VStack>
          <VStack
            align={{ base: "center", md: "center", lg: "flex-start" }}
            gap="20px"
            width={{ base: "100%", md: "100%", lg: "30%" }}
          >
            <Card value={weeklyChange} />
            <Statistis time={0} viewers={0} />
            {/* <LastPost posts={chartPosts} /> */}
          </VStack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Dashboard;
