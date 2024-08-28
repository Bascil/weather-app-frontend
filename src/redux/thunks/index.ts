import { createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "@/config";

const { BACKEND_URL } = app;

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ city, units }: { city: string; units: string }) => {
    const response = await fetch(
      `${BACKEND_URL}/weather/data?units=${units}&city=${city}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data.data;
  }
);

export const fetchForecastData = createAsyncThunk(
  "weather/fetchForecastData",
  async ({ city, units }: { city: string; units: string }) => {
    const response = await fetch(
      `${BACKEND_URL}/weather/forecast?units=${units}&city=${city}&cnt=24`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    const data = await response.json();
    return data.data.list;
  }
);
