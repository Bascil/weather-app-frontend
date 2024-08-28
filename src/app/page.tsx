"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WeatherDisplay } from "@/components/weather/WeatherDisplay";
import { ForecastDisplay } from "@/components/weather/ForecastDisplay";
import { WeatherDetails } from "@/components/weather/WeatherDetails";
import { SearchBar } from "@/components/weather/SearchBar";
import { fetchWeatherData, fetchForecastData } from "@/redux/thunks";
import SkeletonLoader from "@/components/loader/SkeletonLoader";

import { RootState, AppDispatch } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [units, setUnits] = useState<string>("metric");
  const [city, setCity] = useState<string>("nairobi");

  const { weatherData, forecast, status, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchForecastData({ city, units }));
    dispatch(fetchWeatherData({ city, units }));
  }, [dispatch, city, units]);

  const handleSearch = (city: string) => {
    setCity(city);
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "standard" : "metric"));
  };

  if (status === "loading") return <SkeletonLoader />;
  if (status === "failed") return <div>Error: {error}</div>;

  const data = weatherData && forecast;
  return (
    <>
      {data ? (
        <div className="flex flex-col md:flex-row h-screen p-4 bg-gray-100">
          {/* Sidebar */}
          <div className="md:w-1/4 flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm">
            <WeatherDisplay weatherData={weatherData} units={units} />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 flex flex-col p-4 space-y-4">
            <SearchBar
              onSearch={handleSearch}
              onToggleUnits={toggleUnits}
              units={units}
            />
            <ForecastDisplay forecast={forecast} units={units} />
            <WeatherDetails weatherData={weatherData} />
          </div>
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </>
  );
}
