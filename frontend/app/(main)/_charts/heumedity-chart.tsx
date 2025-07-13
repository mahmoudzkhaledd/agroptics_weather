// components/weather/HumidityChart.tsx
"use client";
import React from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { ChartDataPoint } from "@/types/weather.type";

interface HumidityChartProps {
  data: ChartDataPoint[];
}

const humidityConfig = {
  rhMax: {
    label: "Max Humidity",
    color: "hsl(var(--chart-3))",
  },
  rhMin: {
    label: "Min Humidity",
    color: "hsl(var(--chart-4))",
  },
};

export const HumidityChart: React.FC<HumidityChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Daily Humidity Range
        </CardTitle>
        <CardDescription>
          Maximum and minimum relative humidity percentage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={humidityConfig}
          className="max-h-[400px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.fullDate;
                    }
                    return label;
                  }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
              }
            />
            <Line
              dataKey="rhMax"
              type="monotone"
              stroke="black"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              dataKey="rhMin"
              type="monotone"
              stroke="black"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
