import { useState, useEffect } from "react";
import { Forecast } from "@/types";
import { app } from "@/config";

const { BACKEND_URL } = app;

export const useForecastData = (city: string, units: string) => {
  const [forecast, setForecast] = useState<Forecast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchForecast = async () => {
      setIsLoading(true);
      try {
        let url = `${BACKEND_URL}/weather/forecast?units=${units}&cnt=24`;
        if (city) url += `&city=${city}`;

        const response = await fetch(url);
        const data = await response.json();
        setForecast(data.data.list);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecast();
  }, [city, units]);

  return { forecast, isLoading };
};
