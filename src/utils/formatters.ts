export const formatTemp = (temp: number, units: string): string =>
  `${Math.round(temp)}°${units === "metric" ? "C" : "F"}`;
