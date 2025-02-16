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

const CustomDot = ({ cx = 0, cy = 0, index = 0 }: any) => {
  if (index === 0) {
    return <circle cx={cx} cy={cy} r={2} stroke="none" fill="#911DD4" />;
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
  const displayDays = ["01", "05", "10", "20", "25", "30", "31"];
  const daysOfMonth = displayDays.map((day) => ({
    name: day,
    value: 0,
  }));

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const dayOfMonth = date.getDate().toString().padStart(2, "0");

    const index = displayDays.indexOf(dayOfMonth);
    if (index !== -1) {
      daysOfMonth[index].value++;
    }
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

const GraphicStatistic = ({
  data,
  mode,
}: {
  data: { createdAt: string }[];
  mode: string;
}) => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [maxValue, setMaxValue] = useState(5);

  useEffect(() => {
    if (data) {
      const processedData =
        mode === "Semanal" ? countDaysOfWeek(data) : countDaysOfMonth(data);
      setChartData(processedData);

      const values = processedData.map((item) => item.value);
      const maxDataValue = Math.max(...values);
      setMaxValue(maxDataValue);
    }
  }, [data, mode]);

  const yAxisTicks = Array.from(
    { length: Math.ceil(maxValue / 2) + 1 },
    (_, i) => i * 2
  );

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
            data={chartData}
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
              interval={0} // Mostra todas as labels
              textAnchor="middle"
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
              stroke="#911DD4"
              dot={<CustomDot />}
              strokeWidth={1}
              activeDot={{
                r: 5,
                stroke: "darkGray.800",
                strokeWidth: 1,
                fill: "#911DD4",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
};

export default GraphicStatistic;
