"use client";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { WeatherData } from "@/types/weather.type";

export const useWeatherData = (fieldId: string) => {
  return useQuery({
    queryKey: ["get-weather", fieldId],
    queryFn: async () =>
      (
        await axiosClient.get<{ weatherData: WeatherData }>(
          `/field/weather?fieldId=${fieldId}`
        )
      ).data.weatherData,
  });
};
