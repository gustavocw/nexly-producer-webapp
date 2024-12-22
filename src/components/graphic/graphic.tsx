import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Flex } from "@chakra-ui/react";
// import { getChartData } from 'services/ProducerRequests/chart';

const weeklyData = [
  { name: "Segunda", value: 0 },
  { name: "Terça", value: 0 },
  { name: "Quarta", value: 0 },
  { name: "Quinta", value: 0 },
  { name: "Sexta", value: 0 },
];

const CustomDot = ({ cx = 0, cy = 0, index = 0 }: any) => {
  if (index === 0) {
    return <circle cx={cx} cy={cy} r={2} stroke="none" fill="#478853" />;
  }
  return null;
};

const countDaysOfWeek = (data: { createdAt: string }[]) => {
  const weekDaysCount = {
    Segunda: 0,
    Terça: 0,
    Quarta: 0,
    Quinta: 0,
    Sexta: 0,
    Sábado: 0,
    Domingo: 0,
  };

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const dayOfWeek = date.getDay();

    switch (dayOfWeek) {
      case 0:
        weekDaysCount["Domingo"]++;
        break;
      case 1:
        weekDaysCount["Segunda"]++;
        break;
      case 2:
        weekDaysCount["Terça"]++;
        break;
      case 3:
        weekDaysCount["Quarta"]++;
        break;
      case 4:
        weekDaysCount["Quinta"]++;
        break;
      case 5:
        weekDaysCount["Sexta"]++;
        break;
      case 6:
        weekDaysCount["Sábado"]++;
        break;
      default:
        break;
    }
  });

  return Object.entries(weekDaysCount).map(([name, value]) => ({
    name,
    value,
  }));
};

const countDaysOfMonth = (data: { createdAt: string }[]) => {
  const daysOfMonth = Array.from({ length: 31 }, (_, i) => ({
    name: (i + 1).toString().padStart(2, "0"),
    value: 0,
  }));

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const dayOfMonth = date.getDate();

    daysOfMonth[dayOfMonth - 1].value++;
  });

  return daysOfMonth;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="darkGray.800"
        borderRadius="8px"
        padding="10px"
        color="#FFFFFF"
        width="150px"
        height="auto"
      >
        <p style={{ fontSize: "12px" }}>{`${label} : ${payload[0].value}`}</p>
      </Box>
    );
  }

  return null;
};

const GraphicNexly = ({ mode }: { mode: string }) => {
  const [data, setData] =
    useState<{ name: string; value: number }[]>(weeklyData);
  const [maxValue, setMaxValue] = useState(5);
  useEffect(() => {
    const getData = async () => {
      const today = new Date();
      const endDate = today.toISOString();
      const startDate = new Date();
      const daysRemove = mode === "Semanal" ? 7 : 30;
      startDate.setDate(today.getDate() - daysRemove);
      const formattedStartDate = startDate.toISOString();

      const getChartData = async (endDate: string, startDate: string) => {
        console.log(endDate, startDate);

        return [
          { createdAt: "2024-12-18T14:00:00Z" },
          { createdAt: "2024-12-17T14:00:00Z" },
          { createdAt: "2024-12-16T14:00:00Z" },
        ];
      };

      try {
        const fetchedData = await getChartData(endDate, formattedStartDate);
        if (
          Array.isArray(fetchedData) &&
          fetchedData.every((item) => "createdAt" in item)
        ) {
          const countedData =
            mode === "Semanal"
              ? countDaysOfWeek(fetchedData)
              : countDaysOfMonth(fetchedData);
          setData(countedData);
          const values = countedData.map((item) => item.value);
          const maxDataValue = Math.max(...values);
          setMaxValue(maxDataValue);
        } else {
          console.error("Fetched data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [mode]);

  const yAxisTicks =
    maxValue <= 5
      ? [0, 1, 2, 3, 4, 5]
      : Array.from({ length: Math.ceil(maxValue / 5) + 1 }, (_, i) => i * 5);

  return (
    <Flex
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      borderRadius="8px"
      align="center"
      w="full"
      h="300px"
    >
      <Box w="95%" h="100%">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 50, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.1)"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#FFFFFF", fontSize: 10 }}
              tickLine={{ transform: "translate(0, 6)" }}
              interval={0}
              textAnchor="start"
            />
            <YAxis
              domain={[0, Math.max(...yAxisTicks)]}
              ticks={yAxisTicks}
              tick={{ fill: "#FFFFFF" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "darkGray.400", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#478853"
              dot={<CustomDot />}
              strokeWidth={1}
              activeDot={{
                r: 5,
                stroke: "darkGray.800",
                strokeWidth: 1,
                fill: "#478853",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
};

export default GraphicNexly;
