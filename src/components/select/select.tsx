import React from "react";
import { Controller } from "react-hook-form";
import { createListCollection } from "@chakra-ui/react";
import { Field } from "components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "components/ui/select";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label: string;
  name: string;
  control: any;
  options: Option[];
  helperText?: string;
  errorText?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  control,
  options,
  helperText,
  errorText,
  placeholder = "Select an option",
  isRequired,
}) => {
  const collection = React.useMemo(() => {
    if (!Array.isArray(options) || options.length === 0) {
      return createListCollection({ items: [] });
    }
    return createListCollection({ items: options });
  }, [options]);

  return (
    <Field
      helperText={helperText}
      errorText={errorText}
      label={label}
      required={isRequired}
      color="neutral"
      zIndex={999}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectRoot
            collection={collection}
            width="100%"
            value={value || ""}
            onValueChange={(selectedValue) => {
              onChange(selectedValue.value);
            }}
            invalid={!!error}
            zIndex={1000000}
          >
            <SelectTrigger zIndex={1000000} _icon={{ mr: "2", color: "neutral" }}>
              <SelectValueText px={2} placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
              zIndex={1000000}
              gap={2}
              border="1px solid"
              borderColor="neutral.40"
              bg="neutral.50"
              color="neutral"
            >
              {options?.map((option) => (
                <SelectItem
                  cursor="pointer"
                  fontSize="16px"
                  zIndex={1000000}
                  p={2}
                  _hover={{ bg: "neutral.20" }}
                  item={option}
                  key={option?.value}
                >
                  {option?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </Field>
  );
};

export default Select;
