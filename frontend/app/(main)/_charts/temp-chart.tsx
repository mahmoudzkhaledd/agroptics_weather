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
import { Thermometer } from "lucide-react";
import { ChartDataPoint } from "@/types/weather.type";

interface TemperatureChartProps {
  data: ChartDataPoint[];
}

const temperatureConfig = {
  tMax: {
    label: "Max Temperature",
    color: "hsl(var(--chart-1))",
  },
  tMin: {
    label: "Min Temperature",
    color: "hsl(var(--chart-2))",
  },
};

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-red-500" />
          Daily Temperature Range
        </CardTitle>
        <CardDescription>
          Maximum and minimum temperatures in Celsius
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={temperatureConfig}
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
              tickFormatter={(value) => `${value}°C`}
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
                  formatter={(value, name) => [`${value}°C`, name]}
                />
              }
            />
            <Line
              dataKey="tMax"
              type="monotone"
              stroke="black"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              dataKey="tMin"
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
