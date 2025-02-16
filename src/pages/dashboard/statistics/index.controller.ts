import { useState, useEffect } from "react";
import { dummyChartData } from "./data/dummyData";

interface Option {
  label: string;
  value: string;
}

const getLast30Days = () => {
  const now = new Date();
  const startDate = new Date(now.setDate(now.getDate() - 30)).toISOString();
  const endDate = new Date().toISOString();
  return { startDate, endDate };
};

const getLast7Days = () => {
  const now = new Date();
  const startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
  const endDate = new Date().toISOString();
  return { startDate, endDate };
};

const getLast24Hours = () => {
  const now = new Date();
  const startDate = new Date(now.setDate(now.getDate() - 1)).toISOString();
  const endDate = new Date().toISOString();
  return { startDate, endDate };
};

const getDayOfWeek = (date: string) => {
  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  return daysOfWeek[new Date(date).getDay() - 1] || "Segunda";
};

export const useStatisticsController = () => {
  const optionsNav: Option[] = [
    { label: "Últimos 30 dias", value: "30dias" },
    { label: "Últimos 7 dias", value: "7dias" },
    { label: "Últimas 24 horas", value: "24horas" },
  ];

  const [optionStatus, setOptionStatus] = useState<string>("30dias");
  const [dates, setDates] = useState(getLast30Days());
  console.log(dates);
  
  const [weeklyChange, setWeeklyChange] = useState<number | null>(null);

  const handleSelectionChange = (value: string) => {
    setOptionStatus(value);
    if (value === "30dias") {
      setDates(getLast30Days());
    } else if (value === "7dias") {
      setDates(getLast7Days());
    } else {
      setDates(getLast24Hours());
    }
  };

  const chartData = dummyChartData;

  useEffect(() => {
    if (chartData && optionStatus === "7dias") {
      const membersByDay: { [key: string]: number } = {
        Segunda: 0,
        Terça: 0,
        Quarta: 0,
        Quinta: 0,
        Sexta: 0,
        Sábado: 0,
        Domingo: 0,
      };

      chartData.forEach((item: { createdAt: string }) => {
        const day = getDayOfWeek(item.createdAt);
        membersByDay[day]++;
      });

      const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
      let totalMembers = 0;
      const dailyProgression: number[] = [];

      days.forEach((day) => {
        totalMembers += membersByDay[day] || 0;
        dailyProgression.push(totalMembers);
      });

      const change = dailyProgression[dailyProgression.length - 1] - dailyProgression[0];
      setWeeklyChange(change);
    }
  }, [chartData]);

  return {
    optionsNav,
    chartData,
    weeklyChange,
    optionStatus,
    handleSelectionChange,
  };
};
