import { WeatherData } from "@/types";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weatherData,
}) => {
  return (
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
  );
};
