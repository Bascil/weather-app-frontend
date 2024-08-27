import { WeatherData } from "@/types";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weatherData,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center justify-between min-h-[120px]">
        <h3 className="text-lg font-bold">Wind Status</h3>
        <p className="text-xl mb-2">{weatherData.wind.speed} m/s</p>
        <div className="flex items-center">
          <div
            className="w-12 h-12 border-2 border-red-500 rounded-full flex justify-center items-center"
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
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderBottom: "12px solid red",
              }}
            />
          </div>
          <span className="ml-2 text-xl">WSW</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center justify-between min-h-[150px]">
        <h3 className="text-lg font-bold">Humidity</h3>
        <p className="text-2xl">{weatherData.main.humidity}%</p>
        <progress
          className="progress progress-flat-success w-full"
          value={weatherData.main.humidity}
          max="100"
        ></progress>
      </div>
    </div>
  );
};
