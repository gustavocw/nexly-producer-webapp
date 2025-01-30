import { RadioCard } from "@chakra-ui/react";
import * as React from "react";

interface RadioCardItemProps extends RadioCard.ItemProps {
  icon?: React.ReactElement;
  label?: React.ReactNode;
  description?: React.ReactNode;
  addon?: React.ReactNode;
  indicator?: React.ReactNode | boolean;
  indicatorPlacement?: "start" | "end" | "inside";
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const RadioCardItem = React.forwardRef<
  HTMLInputElement,
  RadioCardItemProps
>(function RadioCardItem(props, ref) {
  const {
    inputProps,
    label,
    description,
    addon,
    icon,
    indicator = true,
    indicatorPlacement = "end",
    ...rest
  } = props;

  const hasContent = label || description || icon;
  const ContentWrapper = indicator ? RadioCard.ItemContent : React.Fragment;

  return (
    <RadioCard.Item {...rest}>
      <RadioCard.ItemHiddenInput ref={ref} {...inputProps} />
      <RadioCard.ItemControl>
        {indicatorPlacement === "start" && indicator !== false && indicator}
        {hasContent && (
          <ContentWrapper bg="neutral.60">
            {icon}
            {label && <RadioCard.ItemText>{label}</RadioCard.ItemText>}
            {description && (
              <RadioCard.ItemDescription>
                {description}
              </RadioCard.ItemDescription>
            )}
            {indicatorPlacement === "inside" && indicator !== false && indicator}
          </ContentWrapper>
        )}
        {indicatorPlacement === "end" && indicator !== false && indicator}
      </RadioCard.ItemControl>
      {addon && <RadioCard.ItemAddon>{addon}</RadioCard.ItemAddon>}
    </RadioCard.Item>
  );
});

export const RadioCardRoot = RadioCard.Root;
export const RadioCardLabel = RadioCard.Label;
export const RadioCardItemIndicator = RadioCard.ItemIndicator;
