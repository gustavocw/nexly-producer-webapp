import { Box, Steps as ChakraSteps } from "@chakra-ui/react";
import * as React from "react";
// import { LuCheck } from "react-icons/lu";

interface StepInfoProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepsItemProps
  extends Omit<ChakraSteps.ItemProps, "title">,
    StepInfoProps {
  completedIcon?: React.ReactNode;
  icon?: React.ReactNode;
}

export const StepsItem = React.forwardRef<HTMLDivElement, StepsItemProps>(
  function StepsItem(props, ref) {
    const { title, description, completedIcon, icon, ...rest } = props;
    return (
      <ChakraSteps.Item {...rest} ref={ref}>
        <ChakraSteps.Trigger>
          <ChakraSteps.Indicator
            borderWidth="2px"
            borderColor="primary.50"
            bg="primary.50"
            _incomplete={{
              borderColor: "neutral.30",
              bg: "neutral.40",
            }}
            _complete={{
              borderColor: "primary.50",
              bg: "primary.50",
            }}
            w="25px"
            h="25px"
          >
            <></>
          </ChakraSteps.Indicator>
          <StepInfo title={title} description={description} />
        </ChakraSteps.Trigger>
        <ChakraSteps.Separator
          bg="neutral.30"
          borderWidth="2px"
          borderColor="neutral.30"
          _complete={{ bg: "primary.50", borderColor: "primary.50" }}
          _incomplete={{ bg: "neutral.30" }}
        />
      </ChakraSteps.Item>
    );
  }
);

const StepInfo = (props: StepInfoProps) => {
  const { title, description } = props;

  if (title && description) {
    return (
      <Box>
        <ChakraSteps.Title>{title}</ChakraSteps.Title>
        <ChakraSteps.Description>{description}</ChakraSteps.Description>
      </Box>
    );
  }

  return (
    <>
      {title && <ChakraSteps.Title>{title}</ChakraSteps.Title>}
      {description && (
        <ChakraSteps.Description>{description}</ChakraSteps.Description>
      )}
    </>
  );
};

interface StepsIndicatorProps {
  completedIcon: React.ReactNode;
  icon?: React.ReactNode;
}

export const StepsIndicator = React.forwardRef<
  HTMLDivElement,
  StepsIndicatorProps
>(function StepsIndicator(props, ref) {
  const { icon = <ChakraSteps.Number />, completedIcon } = props;
  return (
    <ChakraSteps.Indicator ref={ref}>
      <ChakraSteps.Status complete={completedIcon} incomplete={icon} />
    </ChakraSteps.Indicator>
  );
});

export const StepsList = ChakraSteps.List;
export const StepsRoot = ChakraSteps.Root;
export const StepsContent = ChakraSteps.Content;
export const StepsCompletedContent = ChakraSteps.CompletedContent;

export const StepsNextTrigger = ChakraSteps.NextTrigger;
export const StepsPrevTrigger = ChakraSteps.PrevTrigger;
