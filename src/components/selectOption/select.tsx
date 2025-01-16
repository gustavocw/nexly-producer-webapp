import React, { useEffect, useState, useRef } from 'react';
import Select, { components, SingleValue } from 'react-select';
import { Box, Flex } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
import Text from 'components/text/text';

interface Option {
  value: string;
  label: string;
}

interface SelectOptionProps {
  placeholder: string;
  options: Option[];
  onSelectChange: (value: string) => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke={'purple.600'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </components.DropdownIndicator>
  );
};

const SelectOption: React.FC<SelectOptionProps> = ({ placeholder, options, onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);

  // Ref para garantir que onSelectChange seja chamado apenas uma vez durante a inicialização
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (options?.length > 0) {
      const defaultOption = options[0];
      setSelectedOption(defaultOption);

      // Garante que onSelectChange só seja chamado uma vez na inicialização
      if (isInitialRender.current) {
        onSelectChange(defaultOption.value);
        isInitialRender.current = false;
      }
    }
  }, [options]);

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
          value={selectedOption}
          onChange={handleChange}
          options={options}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#1D1B20',
              width: 'auto',
              maxWidth: '240px',
              zIndex: 999999,
            }),
            option: (base) => ({
              ...base,
              cursor: "pointer",
              zIndex: 999999,
              backgroundColor: '#1D1B20',
              color: '#ffffff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: "120px",
              '&:hover': {
                transition: '0.2s',
                backgroundColor: '#2E2A34',
              },
              '&:active': {
                backgroundColor: '#2E2A34',
              },
            }),
            singleValue: (base) => ({
              ...base,
              color: 'white',
            }),
            placeholder: (base) => ({
              ...base,
              color: 'gray',
            }),
          }}
          components={{ IndicatorSeparator: () => null, DropdownIndicator }}
          isClearable={false}
        />
        <LuChevronDown width={8} height={8} color="#911DD4" />
      </Flex>
      <Text.Medium ml="30px" mt="2" fontSize="16px" color="neutral">
        {selectedOption ? capitalize(selectedOption.label) : ''}
      </Text.Medium>
    </Box>
  );
};

export default SelectOption;
