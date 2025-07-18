import React from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "components/sidebar/sidebar";
import useSidebar from "stores/sidebar.store";

export const Root = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebar();
  const sidebarWidth = useBreakpointValue({ base: isOpen ? "250px" : "0px", md: isOpen ? "250px" : "80px" });

  return (
    <Flex overflow="hidden" fontFamily="Inter" w="100%" height="100vh">
      <Box
        w={sidebarWidth}
        overflowY="hidden"
        height="100vh"
        position="fixed"
        left="0"
        top="0"
        zIndex={20}
      >
        <Sidebar />
      </Box>
      <Box
        flex="1"
        ml={sidebarWidth}
        height="100%"
        overflowY="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};
