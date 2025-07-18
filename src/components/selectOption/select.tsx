import React, { useState, useRef, useEffect } from "react";
import Select, { components, SingleValue } from "react-select";
import { Box, Flex } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import Text from "components/text/text";
import { truncateText } from "utils/truncateText";

interface Option {
  value: string;
  label: string;
}

interface SelectOptionProps {
  placeholder: string;
  options: Option[];
  onSelectChange: (value: string) => void;
  value?: Option;
}

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="10"
        height="7"
        viewBox="0 0 10 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke={"purple.600"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const SelectOption: React.FC<SelectOptionProps> = ({
  placeholder,
  options,
  onSelectChange,
  value,
}) => {
  const isInitialRender = useRef(true);
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(
    value || (options?.length > 0 ? options[0] : null)
  );
 
  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  useEffect(() => {
    if (isInitialRender.current) {
      if (selectedOption) {
        onSelectChange(selectedOption.value);
      }
      isInitialRender.current = false;
    }
  }, [selectedOption, onSelectChange]);

  const handleChange = (selected: SingleValue<Option>) => {
    setSelectedOption(selected);
    if (selected) {
      onSelectChange(selected.value);
    }
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Select
          placeholder={placeholder}
          defaultValue={selectedOption}
          onChange={handleChange}
          options={options}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1D1B20",
              width: "auto",
              maxWidth: "240px",
              zIndex: 999999,
            }),
            option: (base) => ({
              ...base,
              cursor: "pointer",
              zIndex: 999999,
              backgroundColor: "#1D1B20",
              color: "#ffffff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "150px",
              "&:hover": {
                transition: "0.2s",
                backgroundColor: "#2E2A34",
              },
              "&:active": {
                backgroundColor: "#2E2A34",
              },
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "gray",
            }),
          }}
          components={{ IndicatorSeparator: () => null, DropdownIndicator }}
          isClearable={false}
        />
        <LuChevronDown width={8} height={8} color="#911DD4" />
      </Flex>
      <Text.Medium ml="30px" mt="2" fontSize="16px" color="neutral">
        {selectedOption ? capitalize(truncateText(selectedOption.label, 10)) : ""}
      </Text.Medium>
    </Box>
  );
};

export default SelectOption;
