import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "components/sidebar/sidebar";

export const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex fontFamily="Inter" w="100%" height="100vh">
      <Box
        w="250px"
        overflow="hidden"
        height="100%"
        position="fixed"
        left="0"
        top="0"
      >
        <Sidebar />
      </Box>
      <Box
        flex="1"
        ml="250px"
        height="100vh"
      >
        {children}
      </Box>
    </Flex>
  );
};
