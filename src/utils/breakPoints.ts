import { useBreakpointValue, useBreakpoint } from "@chakra-ui/react";

export const useDevice = () => {
  const breakpoint = useBreakpoint();

 
  const device = useBreakpointValue({
    base: "mobile", 
    sm: "mobile",   
    md: "tablet",   
    lg: "desktop",  
    xl: "large-desktop",
    "2xl": "ultrawide", 
  });

  return { breakpoint, device };
};
