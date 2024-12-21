import React from "react";
import { Input, Box } from "@chakra-ui/react";
import { InputGroup } from "components/ui/input-group";
import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onChange,
}) => {
  return (
    <InputGroup
      maxWidth="250px"
      color="neutral"
      flex="1"
      startElement={
        <Box ml="8px" mr="4px">
          <LuSearch />
        </Box>
      }
    >
      <Input
        borderRadius="8px"
        borderColor="neutral.40"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
