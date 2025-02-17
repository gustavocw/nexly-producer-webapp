import { Button, Box, Spinner } from "@chakra-ui/react";
import Text from "components/text/text";

interface BtnProps {
  label: string;
  weight?: string;
  color?: string;
  p?: string;
  bgHover?: string;
  borderColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  w?: any;
  h?: string;
  bg?: string;
  borderRadius?: string;
  onClick: (e?: any) => void;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  fontWeight?: string;
  type?: any;
  fontSize?: any;
  iconSize?: any;
}

const Btn = ({
  label,
  weight,
  color,
  p,
  bgHover,
  type,
  w,
  h,
  bg,
  borderRadius = "8px",
  borderColor,
  onClick,
  isLoading,
  disabled,
  fontWeight,
  iconLeft,
  iconRight,
  fontSize = { base: "12px", md: "14px" },
  iconSize = { base: "12px", md: "16px" },
}: BtnProps) => {
  const isTransparent = bg === "transparent";

  return (
    <Button
      type={type}
      zIndex={9999}
      onClick={(e) => {
        onClick(e)
      }}
      disabled={disabled}
      w={w ?? "100%"}
      h={h ?? "44px"}
      p={p}
      px={2}
      bg={bg ?? "purple.500"}
      borderRadius={borderRadius}
      color={isTransparent ? "#111111" : color ?? "#fff"}
      fontWeight={weight}
      textTransform="capitalize"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      border={isTransparent ? "1px solid" : borderColor}
      borderColor={borderColor ? borderColor : "gray.600"}
      _hover={{
        bg: isTransparent ? "neutral.40" : bgHover ?? "primary.50",
      }}
    >
      {iconLeft && <Box color="neutral" fontSize={iconSize}>{iconLeft}</Box>}
      <Text.Large
        color={color || (bg === "transparent" ? "#111111" : "#ffffff")}
        fontWeight={weight}
        fontSize={fontSize}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Text.Medium
            textTransform="initial"
            fontWeight={fontWeight ?? "500px"}
            fontSize={fontSize}
            color={color || "neutral"}
          >
            {label}
          </Text.Medium>
        )}
      </Text.Large>
      {iconRight && <Box fontSize={iconSize}>{iconRight}</Box>}
    </Button>
  );
};

export default Btn;
