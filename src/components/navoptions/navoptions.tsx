import React, { useEffect, useState } from "react";
import { Text, Box, Button, Flex } from "@chakra-ui/react";

interface Option {
  label: string;
  value: string;
}

interface NavOptionsProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  pt?: string;
  py?: string;
  pb?: string;
  value?: string; // Permite receber o estado de fora
}

const NavOptions: React.FC<NavOptionsProps> = ({
  options,
  defaultValue,
  onChange,
  pt,
  pb,
  py,
  value, // Se passado, controla externamente
}) => {
  const [selected, setSelected] = useState<string>(
    value || defaultValue || options[0]?.value
  );

  // Sempre que `value` mudar externamente, atualiza o estado interno
  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (value: string) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Flex pt={pt} py={py} pb={pb} w="100%" mx="auto" className="barra-navegacao">
      <Flex gap="20" px="10" borderBottom="1px solid" borderColor="neutral.40">
        {options.map((option: Option) => (
          <Box key={option.value} className="cada-link">
            <Button
              onClick={() => handleSelect(option.value)}
              outline="none"
              background="none"
              width="fit-content"
              height="fit-content"
              borderRadius="0"
              _hover={{}}
              borderBottom="none"
              padding="0"
              _focus={{
                borderBottom: "none",
                color: "#9D2ED5",
              }}
              _active={{
                borderBottom: "none",
                color: "#9D2ED5",
              }}
            >
              <Text
                color={selected === option.value ? "purple.400" : "#FFF"}
                marginBottom="3"
                fontWeight="400"
                fontFamily="Inter"
                position="relative"
              >
                {option.label}
              </Text>
              {selected === option.value && (
                <Box
                  position="absolute"
                  bottom="-3px"
                  left="0"
                  height="3px"
                  borderRadius="100px 100px 0 0"
                  backgroundColor="purple.500"
                  w="100%"
                />
              )}
            </Button>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default NavOptions;
