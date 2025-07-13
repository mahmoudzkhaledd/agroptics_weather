"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeatherData } from "../hooks/useWeatherData";
import { TemperatureChart } from "./temp-chart";
import { HumidityChart } from "./heumedity-chart";
import { PrecipitationChart } from "./participation-chart";
import { WeatherSummaryStats } from "./weather-summart";
import { Info } from "lucide-react";
import { AxiosError } from "axios";

interface WeatherDialogProps {
  fieldId: string;
  onClose: () => void;
}

export default function WeatherDialog({
  fieldId,
  onClose,
}: WeatherDialogProps) {
  const { data: rawData, isLoading, error } = useWeatherData(fieldId);

  const chartData = rawData
    ? rawData.time.map((date, index) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: date,
        tMax: rawData.tMax[index],
        tMin: rawData.tMin[index],
        rhMax: (rawData.rhMax[index] * 100).toFixed(1),
        rhMin: (rawData.rhMin[index] * 100).toFixed(1),
        precip: Math.max(0, rawData.precip[index]),
      }))
    : [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((e, idx) => (
            <Skeleton className="w-full h-[150px]" key={idx} />
          ))}
        </div>
      );
    }

    if (!rawData) {
      return (
        <div className="flex flex-col justify-center items-center gap-3">
          <Info size={40} />
          <p>
            {error instanceof AxiosError
              ? error.response?.data.error
              : "Unknown error occured, please try again later"}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Weather Data</h1>
          <p className="text-lg text-gray-600">
            CoAgMet Station: {rawData.station.toUpperCase()} | June 1-27, 2025 |{" "}
            {rawData.timezone.toUpperCase()}
          </p>
        </div>

        <TemperatureChart data={chartData} />
        <HumidityChart data={chartData} />
        <PrecipitationChart data={chartData} />

        <WeatherSummaryStats data={rawData} />
      </div>
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-full h-full md:!max-w-[calc(100%-50px)]">
        <DialogTitle className="h-fit">Get weather data</DialogTitle>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
