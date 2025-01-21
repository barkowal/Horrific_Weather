import { CurrentWeather, WeatherUnits, ForecastWeather } from '../hooks/Types'
import HourlyWeatherBar from './HourlyWeatherBar'

type PrivateProps = {
  currentWeather: CurrentWeather,
  forecastWeather: ForecastWeather[],
  weatherUnits: WeatherUnits,
  currentDayIndex: number
}

function CurrentWeatherTile({ weather, forecastWeather, weatherUnits, currentDayIndex }: PrivateProps) {

  if (currentDayIndex != 0) {
    weather = forecastWeather[currentDayIndex];
    weather.temperature = forecastWeather[currentDayIndex].minTemperature;
    weather.weatherName = forecastWeather[currentDayIndex].weatherDescription;
  }

  return (
    <>
      <div className="w-full mx-auto p-6 ">

        <h1 className="w-full text-center font-bold text-fs-large text-large-font-c">
          {weather?.city}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-10">

          <div className="flex flex-col items-start h-72 lg:h-72">
            <div className="w-full flex justify-center">
              <img src={weather?.weatherIcon} className="w-icon-large" />
            </div>


            <div className="w-full flex flex-col items-start">
              <h1 className="font-bold text-fs-large text-large-font-c ">{weather?.weatherName}</h1>
              <p className="text-medium-font-c text-left text-fs-medium">
                Temperatura: {weather?.temperature}{weatherUnits.temperature}
              </p>
              <p className="text-medium-font-c text-left text-fs-medium">
                {weather?.apparentTemperature ? "Odczuwalna Temperatura" + weather.apparentTemperature + weatherUnits.temperature : ""}
              </p>
            </div>

          </div>

          <div className="flex flex-col items-start justify-center text-justify h-72 lg:h-72">

            <HourlyWeatherBar forecastWeather={forecastWeather} currentTime={weather ? weather.time : "0"} currentDayIndex={currentDayIndex} />

            <p className="text-small-font-c text-fs-small">
              Prędkość Wiatru: {weather?.windSpeed} {weatherUnits.windSpeed}
            </p>
            <p className="text-small-font-c text-fs-small">
              Kierunek Wiatru: {weather?.windDirection}
            </p>

            <p className="text-small-font-c text-fs-small h-4">
              {weather?.humidity ? `Wilgotność ${weather.humidity}${weatherUnits.humidity}` : ""}
            </p>

          </div>

        </div>
      </div>
    </>
  );
}

export default CurrentWeatherTile;
