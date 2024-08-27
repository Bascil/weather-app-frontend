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
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="hidden"
              checked={units === "metric"}
              onChange={onToggleUnits}
            />
            <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                units === "metric" ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700">
            <span className="text-xs">°C </span> /{" "}
            <span className="text-xs">°F</span>
          </div>
        </label>
      </div>
    </div>
  );
};
