import React from "react";
import { Controller } from "react-hook-form";
import { Field } from "components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "components/ui/native-select";

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
          <NativeSelectRoot
            width="100%"
            invalid={!!error}
            zIndex={1000000}
            border="1px solid"
            borderColor="neutral.40"
            bg="neutral.50"
            color="neutral"
            borderRadius="8px"
          >
            <NativeSelectField
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        )}
      />
    </Field>
  );
};

export default Select;
