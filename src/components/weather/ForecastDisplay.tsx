import moment from "moment";
import { ForecastCard } from "./ForecastCard";
import { Forecast } from "@/types";

interface ForecastDisplayProps {
  forecast: Forecast[];
  units: string;
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({
  forecast,
  units,
}) => {
  const getDailyForecast = () => {
    const dailyForecast: {
      [date: string]: {
        minTemp: number;
        maxTemp: number;
        icon: string;
        description: string;
      };
    } = {};

    forecast.forEach((item) => {
      const date = moment.unix(item.dt).format("YYYY-MM-DD"); // Format date as YYYY-MM-DD
      const temp = item.main.temp;

      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          minTemp: temp,
          maxTemp: temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      } else {
        dailyForecast[date].minTemp = Math.min(
          dailyForecast[date].minTemp,
          temp
        );
        dailyForecast[date].maxTemp = Math.max(
          dailyForecast[date].maxTemp,
          temp
        );
      }
    });

    // Convert the object to an array and exclude today’s date
    const dailyArray = Object.entries(dailyForecast).map(([date, temps]) => ({
      date,
      ...temps,
    }));

    // Exclude today's date and get the next 3 days
    const tomorrowIndex = dailyArray.findIndex((day) =>
      moment(day.date).isAfter(moment(), "day")
    );
    return dailyArray.slice(tomorrowIndex, tomorrowIndex + 3);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {getDailyForecast().map((day, index) => (
        <ForecastCard
          key={index}
          date={day.date}
          minTemp={day.minTemp}
          maxTemp={day.maxTemp}
          icon={day.icon}
          description={day.description}
          units={units}
        />
      ))}
    </div>
  );
};
