import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Post {
  id: number;
  title: string;
  value: string;
  image: string;
}

export const useDashboardController = () => {
  const optionsNav: Option[] = [
    { label: "Semanal", value: "Semanal" },
    { label: "Mensal", value: "Mensal" },
  ];

  const posts: Post[] = [
    { id: 1, title: "Título 1", value: "10", image: "/images/thumb.png" },
    { id: 2, title: "Título 2", value: "20", image: "/images/thumb.png" },
    { id: 3, title: "Título 3", value: "30", image: "/images/thumb.png" },
  ];

  const [optionStatus, setOptionStatus] = useState<Option>(optionsNav[0]);

  const handleSelectionChange = (selectedOption: Option) => {
    console.log("Opção selecionada:", selectedOption);
    setOptionStatus(selectedOption);
  };

  return {
    optionsNav,
    posts,
    optionStatus,
    handleSelectionChange,
  };
};
