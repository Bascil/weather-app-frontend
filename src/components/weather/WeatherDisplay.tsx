import moment from "moment";
import { WeatherData } from "@/types";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  units: string;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  units,
}) => {
  const currentDate = new Date(weatherData.dt * 1000).toLocaleDateString();
  const currentTemp = weatherData.main.temp;

  return (
    <>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="w-16 h-16 mb-4"
      />
      <div className="text-3xl font-bold">
        {currentTemp}°{units === "metric" ? "C" : "F"}
      </div>
      <div className="text-md mt-1">{weatherData.weather[0].description}</div>
      <div className="text-md mt-1">
        {moment(currentDate).format("D MMM Y")}
      </div>
      <div className="text-xl mt-2">{weatherData.name}</div>
    </>
  );
};
