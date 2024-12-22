import { AbsoluteCenter, Box, Button } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "components/ui/accordion";
import type React from "react";
import type { Module } from "types/product";

interface AccordeonProps {
  modules: Module[];
}

const Accordeon: React.FC<AccordeonProps> = ({ modules }) => {
  return (
    <AccordionRoot spaceY="4" variant="plain" collapsible>
      {modules.map((module, index) => (
        <AccordionItem key={index} value={module.id}>
          <Box position="relative">
            <AccordionItemTrigger cursor="pointer" indicatorPlacement="start">
              {module.name}
            </AccordionItemTrigger>
            <AbsoluteCenter axis="vertical" insetEnd="0">
              <Button variant="subtle" colorPalette="blue">
                Editar
              </Button>
            </AbsoluteCenter>
          </Box>
          <AccordionItemContent>
            a
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

export default Accordeon;
