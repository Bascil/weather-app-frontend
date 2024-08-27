"use client";
import { useState, useEffect } from "react";

import moment from "moment";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Forecast {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function Home() {
  const [city, setCity] = useState<string>("nairobi");
  const [searchCity, setSearchCity] = useState<string>(city);
  const [units, setUnits] = useState<string>("metric"); // Default to metric
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<Forecast[]>([]);

  useEffect(() => {
    fetch(
      `https://weather-app-backend-hwiqzxsgfq-uc.a.run.app/api/v1/weather/data?units=${units}&city=${city}`
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data.data));
  }, [city, units]);

  useEffect(() => {
    fetchForecast();
  }, [city, units]);

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://weather-app-backend-hwiqzxsgfq-uc.a.run.app/api/v1/weather/forecast?units=${units}&city=${city}&cnt=24`
      );
      const data = await response.json();
      setForecast(data.data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  if (!weatherData) return <div>Loading...</div>;

  const currentDate = new Date(weatherData.dt * 1000).toLocaleDateString();
  const currentTemp = weatherData.main.temp;

  const formatTemp = (temp: number): string =>
    `${Math.round(temp)}°${units === "metric" ? "C" : "F"}`;

  const getDailyForecast = (): Forecast[] => {
    const dailyForecast: Forecast[] = [];
    const hoursInterval = 24 / 3; // Fetch data in 3-day interval (8-hourly data)
    for (let i = hoursInterval; i < forecast.length; i += hoursInterval) {
      dailyForecast.push(forecast[i]);
    }

    console.log(dailyForecast);
    return dailyForecast.slice(0, 3); // Return forecast for 3 days
  };

  const handleSearch = () => {
    setCity(searchCity);
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "standard" : "metric"));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4">
      <div className="md:w-1/4 flex flex-col items-center justify-center bg-blue-100 p-4 rounded-md shadow-lg">
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="Sun Icon"
          className="w-16 h-16 mb-4"
        />
        <div className="text-3xl font-bold">
          {currentTemp}°{units === "metric" ? "C" : "F"}
        </div>
        <div className="text-md mt-1">{weatherData.weather[0].description}</div>
        <div className="text-md mt-1">{currentDate}</div>
        <div className="text-xl mt-2">{weatherData.name}</div>
      </div>

      <div className="md:w-3/4 flex flex-col p-4">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search city"
            className="border p-2 rounded-md w-3/4"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-gray-200 p-2 rounded-md ml-2"
            onClick={toggleUnits}
          >
            °{units === "metric" ? "C" : "F"} / °
            {units === "metric" ? "F" : "C"}
          </button>
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {getDailyForecast().map((day, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="text-center text-lg font-semibold">
                {moment.unix(day.dt).format("dddd")}
              </div>
              <div className="text-center text-5xl font-bold my-2">
                {formatTemp(day.main.temp)}
              </div>
              <div className="flex justify-center">
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="w-16 h-16"
                />
              </div>
              <div className="text-center">{day.weather[0].description}</div>
            </div>
          ))}
        </div>

        {/* Wind and Humidity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold">Wind Status</h3>
            <p>{weatherData.wind.speed} m/s</p>
            <div className="flex items-center mt-2">
              <div
                className="w-8 h-8 border-2 border-red-500 rounded-full flex justify-center items-center"
                style={{
                  transform: `rotate(${weatherData.wind.deg}deg)`,
                }}
              >
                <div
                  className="w-0 h-0"
                  style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    backgroundColor: "red",
                    width: "0",
                    height: "0",
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderBottom: "8px solid red",
                  }}
                />
              </div>
              <span className="ml-2">WSW</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold">Humidity</h3>
            <progress
              className="progress"
              value={weatherData.main.humidity}
              max="100"
            ></progress>
            <p>{weatherData.main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
