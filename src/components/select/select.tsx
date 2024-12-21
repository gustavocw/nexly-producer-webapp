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
  value: string;
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
  const collection = createListCollection({
    items: options,
  });

  return (
    <Field
      helperText={helperText}
      errorText={errorText}
      label={label}
      required={isRequired}
      color="neutral"
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
            borderColor="red"
          >
            <SelectTrigger borderColor="neutral.40">
              <SelectValueText px={2} placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem item={option} key={option.value}>
                  {option.label}
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
