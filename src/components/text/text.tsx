import { Text as ChakraText, TextProps } from "@chakra-ui/react";
import React from "react";

interface TextNexlyProps extends TextProps {
  children: React.ReactNode;
  color?: any;
}

const TextBase: React.FC<TextNexlyProps> = (props) => (
  <ChakraText
    fontFamily="Poppins"
    fontSize={props.fontSize ?? "16px"}
    fontWeight={props.fontWeight ?? "500"}
    color={props.color ?? "primary"}
    textAlign={props.textAlign ?? "left"}
    {...props}
  >
    {props.children}
  </ChakraText>
);

const TextLarge: React.FC<TextNexlyProps> = (props) => (
  <ChakraText
    fontFamily="Poppins"
    fontSize={props.fontSize ?? "24px"}
    fontWeight={props.fontWeight ?? "600"}
    color={props.color ?? "primary"}
    textAlign={props.textAlign ?? "left"}
    {...props}
  >
    {props.children}
  </ChakraText>
);

const TextMedium: React.FC<TextNexlyProps> = (props) => (
  <ChakraText
    fontFamily="Poppins"
    fontSize={props.fontSize ?? "12px"}
    fontWeight={props.fontWeight ?? "400"}
    color={props.color ?? "primary"}
    textAlign={props.textAlign ?? "left"}
    {...props}
  >
    {props.children}
  </ChakraText>
);


const TextSmall: React.FC<TextNexlyProps> = (props) => (
  <ChakraText
    fontFamily="Poppins"
    fontSize={props.fontSize ?? "12px"}
    fontWeight={props.fontWeight ?? "400"}
    color={props.color ?? "primary"}
    textAlign={props.textAlign ?? "left"}
    {...props}
  >
    {props.children}
  </ChakraText>
);

const Text = {
  Base: TextBase,
  Large: TextLarge,
  Medium: TextMedium,
  Small: TextSmall,
};

export default Text;
