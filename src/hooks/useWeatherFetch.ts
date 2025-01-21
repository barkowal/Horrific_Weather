import { useState, useEffect, useCallback } from "react";
import { formatString } from "./StringFormatter";

const CITY_URL = `https://nominatim.openstreetmap.org/search?q={0}&format=json`;
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude={0}&longitude={1}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin`;

function useWeatherFetch() {
  const [weatherData, setWeatherData] = useState();
  const [cityData, setCityData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getWeather = useCallback(async (cityName: string) => {
    setIsLoading(true);

    try {
      const cityResponse = await fetch(`${formatString(CITY_URL, cityName)}`);
      const cityJSON = await cityResponse.json();
      setCityData(cityJSON);

      const cityLat = String(cityJSON[0].lat);
      const cityLon = String(cityJSON[0].lon);

      const weatherResponse = await fetch(`${formatString(WEATHER_URL, cityLat, cityLon)}`);
      const weatherJSON = await weatherResponse.json();

      setWeatherData(weatherJSON);

    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }

  }, []);

  useEffect(() => {
    getWeather("Warszawa");
  }, [getWeather]);


  return { weatherData, cityData, isLoading, error, getWeather };
}

export default useWeatherFetch;

