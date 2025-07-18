import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  Box,
} from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import Text from "components/text/text";
import { toaster } from "components/ui/toaster";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
interface InputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  isTextarea?: boolean;
  isRequired?: boolean;
  width?: any;
  height?: string | number;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  mask?: string | null;
  helperText?: string;
  maxH?: string;
  minH?: string;
  errorText?: string;
  errorToast?: boolean;
  onBlurSubmit?: (value?: any) => void;
  onEnterSubmit?: (value?: any) => void;
  onGenerateIa?: (message?: string) => void
}

const InputBase: React.FC<InputProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
  isRequired,
  helperText,
  width,
  height,
  isReadOnly,
  isDisabled,
  autoComplete,
  maxLength,
  mask,
  errorToast,
  onBlurSubmit,
  onEnterSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => {
      useEffect(() => {
        if (error && errorToast) {
          toaster.create({
            title: `Erro no campo: ${label || name}`,
            description: error.message || "Preencha corretamente",
            type: "error",
          });
        }
      }, [error, errorToast]);

      return (
        <Box
          width={width || "100%"}
          height={height || "auto"}
          position="relative"
        >
          {label && (
            <Text.Medium
              fontSize="14px"
              position="absolute"
              top="-20px"
              left="0"
              color="white"
            >
              {label} {isRequired && "*"}
            </Text.Medium>
          )}
          <ChakraInput
            {...field}
            type={type === "password" && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
            ref={mask ? withMask(mask) : undefined}
            readOnly={isReadOnly}
            disabled={isDisabled}
            maxLength={maxLength}
            height="40px"
            borderColor={error ? "red.500" : "neutral.30"}
            _placeholder={{ color: "#FFFFFF40" }}
            bg="transparent"
            px={2}
            color="#FFFFFF"
            borderRadius="4px"
            autoComplete={autoComplete}
            onBlur={(e) => {
              field.onBlur();
              onBlurSubmit?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onEnterSubmit) {
                e.preventDefault();
                onEnterSubmit(field.value);
              }
            }}
          />

          {type === "password" && (
            <Box
              position="absolute"
              top="50%"
              right="10px"
              transform="translateY(-50%)"
              cursor="pointer"
              color="whiteAlpha.800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
            </Box>
          )}
          {helperText && (
            <Text.Medium fontSize="14px" color="whiteAlpha.600" mt={1}>
              {helperText}
            </Text.Medium>
          )}
        </Box>
      );
    }}
  />
  )
}

const InputText: React.FC<InputProps> = ({
  control,
  name,
  label,
  placeholder,
  isRequired,
  width,
  height,
  isReadOnly,
  isDisabled,
  helperText,
  maxLength,
  maxH,
  minH,
  mask,
  errorToast,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => {
      useEffect(() => {
        if (error && errorToast) {
          toaster.create({
            title: `Erro no campo: ${label || name}`,
            description: error.message || "Preencha corretamente",
            type: "error",
          });
        }
      }, [error, errorToast]);

      return (
        <Box
          width={width || "100%"}
          height={height || "auto"}
          position="relative"
        >
          {label && (
            <Text.Medium
              fontSize="14px"
              position="absolute"
              top="-25px"
              left="0"
              color="white"
            >
              {label} {isRequired && "*"}
            </Text.Medium>
          )}
          <ChakraTextarea
            {...field}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
            ref={mask ? withMask(mask) : undefined}
            readOnly={isReadOnly}
            maxH={maxH ?? "200px"}
            minH={minH ?? "200px"}
            p={2}
            color="neutral"
            disabled={isDisabled}
            maxLength={maxLength}
            borderColor={error ? "red.500" : "neutral.30"}
            _active={{ borderColor: "primary.50" }}
            _focus={{ borderColor: "primary.50" }}
            _placeholder={{ color: "#FFFFFF40" }}
            bg="transparent"
            borderRadius="4px"
          />
          {helperText && (
            <Text.Medium fontSize="14px" color="whiteAlpha.600" mt={1}>
              {helperText}
            </Text.Medium>
          )}
        </Box>
      );
    }}
  />
);

const Input = {
  Base: InputBase,
  Text: InputText,
};

export default Input;
