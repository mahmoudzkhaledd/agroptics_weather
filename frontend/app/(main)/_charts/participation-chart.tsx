"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { CloudRain } from "lucide-react";
import { ChartDataPoint } from "@/types/weather.type";

interface PrecipitationChartProps {
  data: ChartDataPoint[];
}

const precipitationConfig = {
  precip: {
    label: "Precipitation",
    color: "hsl(var(--chart-5))",
  },
};

export const PrecipitationChart: React.FC<PrecipitationChartProps> = ({
  data,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudRain className="h-5 w-5 text-green-500" />
          Daily Precipitation
        </CardTitle>
        <CardDescription>Daily precipitation in millimeters</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={precipitationConfig}
          className="max-h-[400px] w-full"
        >
          <BarChart
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
              radius={10}
              width={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              radius={10}
              width={10}
              tickFormatter={(value) => `${value}mm`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.fullDate;
                    }
                    return label;
                  }}
                  formatter={(value, name) => [`${value}mm`, name]}
                />
              }
            />
            <Bar
              dataKey="precip"
              fill="var(--color-precip)"
              className="w-[20px]"
              radius={10}
              width={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
