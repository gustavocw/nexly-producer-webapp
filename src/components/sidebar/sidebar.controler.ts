import { useState } from "react";

export const useSidebarController = () => {
    const [isOpenModal, setIsOpenModal] = useState<false | true>(false);
    const toggleIsOpenModal = () => {
      setIsOpenModal((prevSize) => (prevSize === false ? true : false));
    };

  return { toggleIsOpenModal, isOpenModal };
};