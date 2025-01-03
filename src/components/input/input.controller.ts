import { useState, useEffect } from "react";
import { masks } from "utils/masks";

interface UseInputControllerProps {
  maskType?: string;
  onChange?: (value: string) => void;
  onEnterPress?: () => void;
  initialValue?: string;
}

export const useInputController = ({
  maskType,
  onEnterPress,
  initialValue = "",
}: UseInputControllerProps) => {
  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    const maskedValue =
      maskType && masks[maskType]
        ? masks[maskType](initialValue)
        : initialValue;
    setDisplayValue(maskedValue);
  }, [initialValue, maskType]);


  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && onEnterPress) {
      event.preventDefault();
      onEnterPress();
    }
  };

  return {
    displayValue,
    setDisplayValue,
    handleKeyPress,
  };
};