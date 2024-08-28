import { createSlice } from "@reduxjs/toolkit";
import { WeatherData, Forecast } from "@/types";

import { fetchForecastData, fetchWeatherData } from "@/redux/thunks";

interface WeatherState {
  weatherData: WeatherData | null;
  forecast: Forecast[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  forecast: [],
  status: "idle",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchForecastData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecast = action.payload;
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default weatherSlice.reducer;
