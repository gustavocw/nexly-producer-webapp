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
  onChange,
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const rawValue = event.target.value;

    const maskedValue =
      maskType && masks[maskType] ? masks[maskType](rawValue) : rawValue;

    setDisplayValue(maskedValue);

    const unmaskedValue = maskType ? rawValue.replace(/\D/g, "") : rawValue;

    event.target.value = maskType ? unmaskedValue : rawValue;

    if (onChange) {
      onChange(event.target.value);
    }
  };

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
    handleInputChange,
    handleKeyPress,
  };
};