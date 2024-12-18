import React from "react";
import { Controller } from "react-hook-form";
import {
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  Box,
} from "@chakra-ui/react";
import { Field } from "components/ui/field";
import { withMask } from "use-mask-input";

interface InputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  isTextarea?: boolean;
  isRequired?: boolean;
  errorText?: string;
  width?: any;
  height?: string | number;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  mask?: string;
}

const InputBase: React.FC<InputProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
  isRequired,
  errorText,
  width,
  height,
  isReadOnly,
  isDisabled,
  autoComplete,
  maxLength,
  mask,
}) => (
  <Field color="white" label={label} errorText={errorText} required={isRequired}>
    <Box width={width || "100%"} height={height || "auto"}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ChakraInput
            {...field}
            type={type}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
            ref={mask ? withMask(mask) : undefined}
            readOnly={isReadOnly}
            disabled={isDisabled}
            maxLength={maxLength}
            height="40px"
            borderColor="#FFFFFF60"
            _placeholder={{ color: "#FFFFFF40" }}
            bg="transparent"
            px={2}
            color="#FFFFFF"
            borderRadius="4px"
            autoComplete={autoComplete}
          />
        )}
      />
    </Box>
  </Field>
);

const InputText: React.FC<InputProps> = ({
  control,
  name,
  label,
  placeholder,
  isRequired,
  errorText,
  width,
  height,
  isReadOnly,
  isDisabled,
  maxLength,
  mask,
}) => (
  <Field color="white" label={label} errorText={errorText} required={isRequired}>
    <Box width={width || "100%"} height={height || "200px"}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ChakraTextarea
            {...field}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
            ref={mask ? withMask(mask) : undefined}
            readOnly={isReadOnly}
            disabled={isDisabled}
            maxLength={maxLength}
            borderColor="#FFFFFF60"
            _active={{
              borderColor: "primary.50"
            }}
            _focus={{
              borderColor: "primary.50"
            }}
            _placeholder={{ color: "#FFFFFF40" }}
            bg="transparent"
            borderRadius="4px"
          />
        )}
      />
    </Box>
  </Field>
);

const Input = {
  Base: InputBase,
  Text: InputText,
};

export default Input;
