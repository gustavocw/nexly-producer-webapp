import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  getChartComments,
  getChartData,
  getChartMembers,
  getChartPosts,
} from "services/chart.services";

interface Option {
  label: string;
  value: string;
}

const getMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
  return { startDate: firstDay, endDate: lastDay };
};

const getWeekDates = () => {
  const now = new Date();
  const firstDay = new Date(now.setDate(now.getDate() - now.getDay() + 1)).toISOString();
  const lastDay = new Date(now.setDate(now.getDate() - now.getDay() + 7)).toISOString();
  return { startDate: firstDay, endDate: lastDay };
};

const getDayOfWeek = (date: string) => {
  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  return daysOfWeek[new Date(date).getDay() - 1] || "Segunda";
};

export const useDashboardController = () => {
  const optionsNav: Option[] = [
    { label: "Semanal", value: "Semanal" },
    { label: "Mensal", value: "Mensal" },
  ];

  const [optionStatus, setOptionStatus] = useState<string>("Semanal");
  const [dates, setDates] = useState(getWeekDates());
  const [weeklyChange, setWeeklyChange] = useState<number | null>(null);


  const handleSelectionChange = (value: string) => {
    setOptionStatus(value);
    if (value === "Mensal") {
      setDates(getMonthDates());
    } else {
      setDates(getWeekDates());
    }
  };

  const { data: chartData, isLoading: isLoadingChart } = useQuery({
    queryKey: ["chart-data", dates],
    queryFn: () =>
      getChartData(dates.endDate, dates.startDate).then((res) => {
        return res;
      }),
  });

  useEffect(() => {
    if (chartData && optionStatus === "Semanal") {
      const membersByDay: { [key: string]: number } = {
        Segunda: 0,
        Terça: 0,
        Quarta: 0,
        Quinta: 0,
        Sexta: 0,
        Sábado: 0,
        Domingo: 0,
      };

      chartData.forEach((item: { _id: string; createdAt: string }) => {
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

  const { data: chartPosts, isLoading: isLoadingChartPosts } = useQuery({
    queryKey: ["chart-posts"],
    queryFn: () =>
      getChartPosts(1, 10).then((res) => {
        return res;
      }),
  });

  const { data: chartComments, isLoading: isLoadingChartComments } = useQuery({
    queryKey: ["chart-comments"],
    queryFn: async () => {
      const res = await getChartComments(0, 20);
      return res?.[0]?.comments || [];
    },
  });

  const { data: membersCount, isLoading: isLoadingChartMembers } = useQuery({
    queryKey: ["chart-members"],
    queryFn: () => getChartMembers(),
  });

  return {
    optionsNav,
    isLoadingChart,
    chartPosts,
    chartComments,
    isLoadingChartComments,
    weeklyChange,
    isLoadingChartMembers,
    isLoadingChartPosts,
    membersCount,
    chartData,
    optionStatus,
    handleSelectionChange,
  };
};
