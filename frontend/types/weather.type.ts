export type WeatherData = {
  which: string;
  frequency: string;
  timestep: number;
  timezone: string;
  tzOffset: string;
  units: string;
  station: string;
  time: string[];
  tMax: number[];
  tMin: number[];
  rhMax: number[];
  rhMin: number[];
  precip: number[];
};

export interface ChartDataPoint {
  date: string;
  fullDate: string;
  tMax: number;
  tMin: number;
  rhMax: string;
  rhMin: string;
  precip: number;
}
