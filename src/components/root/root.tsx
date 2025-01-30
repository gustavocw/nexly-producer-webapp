import React from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import useSidebar from "stores/sidebar.store";
import Sidebar from "components/sidebar/sidebar";

export const Root = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();

  const displaySidebar = useBreakpointValue({
    base: isOpen ? "block" : "none",
    md: "block",
  });

  return (
    <Flex fontFamily="Inter" w="100%" height="100vh">
      <Box
        position={{ base: "fixed", md: "relative" }}
        zIndex="1000"
        display={displaySidebar}
        overflow="hidden"
        height="100vh"
      >
        <Sidebar />
      </Box>
      <Box
        flex="1"
        transition="margin-left 0.2s ease"
        overflowY="auto"
        minHeight="100vh"
      >
        {children}
      </Box>
    </Flex>
  );
};
