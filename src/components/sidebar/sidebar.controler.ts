import { useState } from "react";

export const useSidebarController = () => {
    const [isOpen, setIsOpen] = useState<false | true>(true);
  
    const toggleIsOpen = () => {
      setIsOpen((prevSize) => (prevSize === false ? true : false));
    };

  return { isOpen, toggleIsOpen };
};