"use client";

import { useState } from "react";
import { WeatherDisplay } from "@/components/weather/WeatherDisplay";
import { ForecastDisplay } from "@/components/weather/ForecastDisplay";
import { WeatherDetails } from "@/components/weather/WeatherDetails";
import { SearchBar } from "@/components/weather/SearchBar";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useForecastData } from "@/hooks/useForecastData";
import SkeletonLoader from "@/components/loader/SkeletonLoader";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [units, setUnits] = useState<string>("metric");

  const { weatherData, isLoading: isWeatherLoading } = useWeatherData(
    city,
    units
  );
  const { forecast, isLoading: isForecastLoading } = useForecastData(
    city,
    units
  );

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "standard" : "metric"));
  };

  if (isWeatherLoading || isForecastLoading) return <SkeletonLoader />;

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/4 flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm">
        {weatherData ? (
          <WeatherDisplay weatherData={weatherData} units={units} />
        ) : (
          <div className="ml-2">No weather data available</div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 flex flex-col p-4 space-y-4">
        <SearchBar
          onSearch={handleSearch}
          onToggleUnits={toggleUnits}
          units={units}
        />
        <ForecastDisplay forecast={forecast} units={units} />
        {weatherData ? (
          <WeatherDetails weatherData={weatherData} />
        ) : (
          <div className="ml-2">No weather data available</div>
        )}
      </div>
    </div>
  );
}
