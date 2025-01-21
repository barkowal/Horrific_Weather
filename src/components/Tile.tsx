import { useEffect, useState } from "react"
import { CurrentWeather, ForecastWeather, SkyColorCode } from "../hooks/Types";
import CurrentWeatherTile from "./CurrentWeatherTile";
import ForecastTile from "./ForecastTile";
import WeatherFormatter from "../hooks/WeatherFormatter"
import useWeatherFetch from "../hooks/useWeatherFetch"

type TileProp = {
  city: string | undefined,
  onWeatherChange: CallableFunction,
}

function Tile({ city, onWeatherChange }: TileProp) {

  const { weatherData, cityData, isLoading, error, getWeather } = useWeatherFetch();
  let cityFullName = "";
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [refreshBg, setRefreshBg] = useState<boolean>(false);

  useEffect(() => {
    if (city != undefined) {
      getWeather(city);
    }
  }, [city]);

  if (cityData != undefined) {
    cityFullName = cityData[0]?.display_name;
  }

  const { currentWeather, forecastWeather, weatherUnits } = WeatherFormatter(weatherData, cityFullName);

  useEffect(() => {
    if (currentDayIndex >= 0) {
      changeBgWeather();
    }
  }, [currentDayIndex, refreshBg]);

  const changeBgWeather = () => {
    if (forecastWeather != undefined && currentWeather != undefined) {
      const skyCodeWeather: SkyColorCode = currentDayIndex == 0 ? {
        currentTime: currentWeather.day,
        temperature: currentWeather.temperature,
        skyCode: currentWeather.weatherSkyCode,
      } : {
        currentTime: currentWeather.day,
        temperature: forecastWeather[currentDayIndex].minTemperature,
        skyCode: forecastWeather[currentDayIndex].weatherSkyCode,
      }

      onWeatherChange(skyCodeWeather);
    }
  }

  if (currentWeather == undefined ||
    forecastWeather == undefined ||
    weatherUnits == undefined ||
    isLoading)
    return (
      <>
        <div className="w-full h-full m-5 rounded-2xl shadow-xl shadow-shadow-bg
        bg-white bg-gradient-to-b from-tile-gradient-first via-tile-gradient-second to-tile-gradient-third">
          <h1 className="flex justify-center items-center text-large-font-c">
            LOADING...
          </h1 >
        </div >
      </>
    )

  return (
    <>
      <div className="w-full h-full m-5 rounded-2xl overflow-y-auto shadow-xl shadow-shadow-bg
        bg-white bg-gradient-to-b from-tile-gradient-first via-tile-gradient-second to-tile-gradient-third">

        <CurrentWeatherTile weather={currentWeather} forecastWeather={forecastWeather} weatherUnits={weatherUnits} currentDayIndex={currentDayIndex} />
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-0 h-full w-full m-0 p-0 border-t border-gray-600">
          {forecastWeather.map((forecast: ForecastWeather, index: number) => (
            <div key={index} className={`h-full cursor-pointer ${currentDayIndex == index ? "bg-gradient-to-b from-card-top-bg*2 to-card-bottom-bg/50" : "bg-gradient-to-b from-card-top-bg to-card-bottom-bg"}`} onClick={() => {
              setCurrentDayIndex(index);
            }} onLoad={() => { setRefreshBg(true); setTimeout(setRefreshBg, 100, false); }}>
              < ForecastTile weather={forecast} weatherUnits={weatherUnits} />
            </div>
          ))}
        </div>
      </div >
    </>
  )
}

export default Tile
