"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/types/weather.type";

interface WeatherSummaryStatsProps {
  data: WeatherData;
}

export const WeatherSummaryStats: React.FC<WeatherSummaryStatsProps> = ({
  data,
}) => {
  const maxTemp = Math.max(...data.tMax);
  const minTemp = Math.min(...data.tMin);
  const totalPrecip = data.precip
    .filter((p) => p > 0)
    .reduce((a, b) => a + b, 0);
  const avgMaxHumidity = (
    (data.rhMax.reduce((a, b) => a + b, 0) / data.rhMax.length) *
    100
  ).toFixed(0);
  const avgMinHumidity = (
    (data.rhMin.reduce((a, b) => a + b, 0) / data.rhMin.length) *
    100
  ).toFixed(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Temperature Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {maxTemp.toFixed(1)}°C / {minTemp.toFixed(1)}°C
          </div>
          <p className="text-xs text-muted-foreground">Max / Min</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total Precipitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPrecip.toFixed(2)}mm</div>
          <p className="text-xs text-muted-foreground">June 1-27, 2025</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Avg Humidity Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {avgMaxHumidity}% / {avgMinHumidity}%
          </div>
          <p className="text-xs text-muted-foreground">Max / Min</p>
        </CardContent>
      </Card>
    </div>
  );
};
