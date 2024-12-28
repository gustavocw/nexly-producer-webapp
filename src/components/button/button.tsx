import { Button, Box, Spinner } from "@chakra-ui/react";
import Text from "components/text/text";

interface BtnProps {
  label: string;
  weight?: string;
  color?: string;
  padding?: string;
  bgHover?: string;
  borderColor?: string;
  isLoading?: boolean;
  w?: any;
  h?: string;
  pb?: string;
  pt?: string;
  pr?: string;
  pl?: string;
  bg?: string;
  borderRadius?: string;
  onClick?: () => void;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  fontWeight?: string;
  type?: any;
}

const Btn = ({
  label,
  weight,
  color,
  padding,
  bgHover,
  type,
  w,
  h,
  pb,
  pt,
  pr,
  pl,
  bg,
  borderRadius = "8px",
  borderColor,
  onClick,
  isLoading,
  fontWeight,
  iconLeft,
  iconRight,
}: BtnProps) => {
  const isTransparent = bg === "transparent";

  return (
    <Button
      type={type}
      onClick={onClick}
      w={w ?? "100%"}
      h={h ?? "44px"}
      padding={padding}
      pb={pb}
      pt={pt}
      pr={pr}
      pl={pl}
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
      {iconLeft && <Box color="neutral">{iconLeft}</Box>}
      <Text.Large
        color={color || (bg === "transparent" ? "#111111" : "#ffffff")}
        fontWeight={weight}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Text.Medium
            textTransform="initial"
            fontWeight={fontWeight ?? "500px"}
            fontSize="16px"
          >
            {label}
          </Text.Medium>
        )}
      </Text.Large>
      {iconRight && <Box>{iconRight}</Box>}
    </Button>
  );
};

export default Btn;
