export interface AreaData {
  id: number;
  name: string;
  url: string;
  imageSrc: string;
}

export interface AreaCardProps {
  data: AreaData;
}


export const useAreasController = () => {
  const areas: AreaData[] = [
    {
      id: 1,
      name: "Nexly area",
      url: "nexly.com.br",
      imageSrc: "/images/bg.png",
    },
    {
      id: 2,
      name: "Optimum",
      url: "youtube.com",
      imageSrc: "/images/bg.png",
    },
    {
      id: 3,
      name: "Google",
      url: "youtube.com",
      imageSrc: "/images/bg.png",
    },
  ];

  return { areas };
};
