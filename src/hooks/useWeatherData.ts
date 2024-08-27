import { useState, useEffect } from "react";
import { WeatherData } from "@/types";
import { app } from "@/config";

const { BACKEND_URL } = app;

export const useWeatherData = (city: string, units: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        let url = `${BACKEND_URL}/weather/data?units=${units}`;
        if (city) url += `&city=${city}`;

        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, units]);

  return { weatherData, isLoading };
};
