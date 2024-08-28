import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onToggleUnits: () => void;
  units: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onToggleUnits,
  units,
}) => {
  const [searchCity, setSearchCity] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchCity);
  };

  return (
    <div className="flex items-center mb-6">
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder="Search city..."
        className="border p-2 rounded-md w-full max-w-sm mr-2"
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md mr-2"
        onClick={handleSearch}
      >
        Go
      </button>
      <div className="flex-grow"></div>
      <div className="ml-4 flex items-center">
        <label className="flex items-center cursor-pointer space-x-2">
          <span className="text-gray-700 text-xs">°F</span>
          <input
            type="checkbox"
            className="switch switch-bordered-primary"
            checked={units === "metric"}
            onChange={onToggleUnits}
          />
          <span className="text-gray-700 text-xs">°C</span>
        </label>
      </div>
    </div>
  );
};
