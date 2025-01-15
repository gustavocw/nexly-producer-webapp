import { Box, HStack, Stack, Tabs, VStack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import Card from "./cards/activeMembers";
import GraphicNexly from "components/graphic/graphic";
import Statistis from "./cards/statistics";
import LastPost from "./cards/lastPost";
import Comments from "./comments/comments";
import { useDashboardController } from "./index.controller";

const Dashboard = () => {
  const { chartData, chartPosts, chartComments, optionsNav, weeklyChange, optionStatus, handleSelectionChange } =
    useDashboardController();

  return (
    <Stack gap="32px" px={8}>
      <Tabs.Root>
        <NavOptions
          pt="10"
          defaultValue={optionsNav[0].value}
          options={optionsNav}
          onChange={handleSelectionChange}
        />
      </Tabs.Root>
      <Box w="100%">
        <HStack gap="20px" align="flex-start" w="100%">
          <VStack gap="20px" width="70%" flex={1}>
            <GraphicNexly data={chartData} mode={optionStatus.value} />
            <Comments data={chartComments} />
          </VStack>
          <VStack align="flex-start" gap="20px" width="30%">
          <Card value={weeklyChange} />
          <Statistis time={100} viewers={30} />
            <LastPost posts={chartPosts} />
          </VStack>
        </HStack>
      </Box>
    </Stack>
  );
};

export default Dashboard;
