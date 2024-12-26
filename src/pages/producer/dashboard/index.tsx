import { Box, HStack, Stack, Tabs, VStack } from "@chakra-ui/react";
import NavOptions from "components/navoptions/navoptions";
import Card from "./cards/activeMembers";
import GraphicNexly from "components/graphic/graphic";
import { useState } from "react";
import Statistis from "./cards/statistics";
import LastPost from "./cards/lastPost";
import Comments from "./comments/comments";

const Dashboard = () => {
  const optionsNav = [
    { label: "Semanal", value: "Semanal" },
    { label: "Mensal", value: "Mensal" },
  ];

  const posts = [
    { id: 1, title: "Título 1", value: "10", image: "/images/thumb.png" },
    { id: 2, title: "Título 2", value: "20", image: "/images/thumb.png" },
    { id: 3, title: "Título 3", value: "30", image: "/images/thumb.png" },
  ];

  const [optionStatus, setOptionStatus] = useState<any>(optionsNav[0]);

  const handleSelectionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    console.log("Opção selecionada:", selectedOption);
    setOptionStatus(selectedOption);
  };

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
            <GraphicNexly mode={optionStatus.values} />
            <Comments />
          </VStack>
          <VStack align="flex-start" gap="20px" width="30%">
            <Card value={10} />
            <Statistis time={100} viewers={30} />
            <LastPost posts={posts} />
          </VStack>
        </HStack>
      </Box>
    </Stack>
  );
};

export default Dashboard;
