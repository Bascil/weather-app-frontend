import moment from "moment";
import { formatTemp } from "@/utils/formatters";

interface ForecastCardProps {
  date: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
  units: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  minTemp,
  maxTemp,
  icon,
  description,
  units,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="text-center text-lg font-semibold">
        {moment(date).format("D MMM")}
      </div>

      <div className="flex justify-center">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-16 h-16"
        />
      </div>

      <div className="text-center text-lg font-bold my-2">
        {`${formatTemp(minTemp, units)} - ${formatTemp(maxTemp, units)}`}
      </div>
    </div>
  );
};
