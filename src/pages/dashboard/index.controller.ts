import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
    setOptionStatus(selectedOption);
  };

  const { isLoading: isLoadingChart } = useQuery({
    queryKey: ["chart-data"],
    queryFn: () =>
      getChartData("10", "20").then((res) => {
        // console.log(res);
        return res;
      }),
  });

  const { isLoading: isLoadingChartPosts } = useQuery({
    queryKey: ["chart-posts"],
    queryFn: () =>
      getChartPosts(10, 10).then((res) => {
        // console.log(res);
        return res;
      }),
  });

  const { isLoading: isLoadingChartComments } = useQuery({
    queryKey: ["chart-comments"],
    queryFn: () =>
      getChartComments(10, 10).then((res) => {
        // console.log(res);
        return res;
      }),
  });

  const { data: membersCount, isLoading: isLoadingChartMembers } = useQuery({
    queryKey: ["chart-members"],
    queryFn: () =>
      getChartMembers().then((res) => {
        console.log("aaa", res);
        return res;
      }),
  });

  console.log(
    isLoadingChart,
    isLoadingChartComments,
    isLoadingChartMembers,
    isLoadingChartPosts
  );

  return {
    optionsNav,
    posts,
    membersCount,
    optionStatus,
    handleSelectionChange,
  };
};
