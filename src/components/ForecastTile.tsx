import { ForecastWeather, WeatherUnits } from '../hooks/Types'
import wind from '../assets/wind.png'
import wind_direciton from '../assets/wind_direction.png'

type PrivateProps = {
  weather: ForecastWeather,
  weatherUnits: WeatherUnits
}

function ForecastTile({ weather, weatherUnits }: PrivateProps) {
  return (
    <>
      <div className="w-full h-full mx-auto overflow-hidden hover:scale-90 duration-200">
        <div className="p-2">
          <h2 className="text-fs-medium text-medium-font-c font-bold text-center mb-2">{weather.day}</h2>

          <div className="w-full flex justify-center">
            <img src={weather.weatherIcon} className="w-1/3" alt="sun" />
          </div>

          <h2 className="text-2xl font-bold text-fs-medium text-medium-font-c">{weather.weatherDescription}</h2>
          <p className="text-2xl font-bold text-fs-medium text-medium-font-c">{weather.minTemperature}°C | {weather.maxTemperature}°C</p>
        </div>

        <div className="p-2 h-full">
          <p className="text-small-font-c text-fs-small">
            <img src={`${wind}`} className='w-6 inline' /> {weather?.windSpeed}{weatherUnits.windSpeed}
          </p>

          <p className="text-small-font-c text-fs-small">
            <img src={`${wind_direciton}`} className='w-6 inline' /> {weather?.windDirection}
          </p>
        </div>

      </div>
    </>
  );
}

export default ForecastTile;
