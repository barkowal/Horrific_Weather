import { ForecastWeather } from '../hooks/Types';
import { getHourFromStringDate } from '../hooks/StringFormatter.ts'

type PrivateProps = {
  forecastWeather: ForecastWeather[],
  currentTime: string
  currentDayIndex: number;
}

function HourlyWeatherBar({ forecastWeather, currentTime, currentDayIndex }: PrivateProps) {
  let weatherHours = [];
  let weatherIcons = [];
  let currentHour = 0;

  if (currentDayIndex == 0) {
    weatherHours = forecastWeather[currentDayIndex].hourlyTemperature.concat(forecastWeather[currentDayIndex + 1].hourlyTemperature);
    weatherIcons = forecastWeather[currentDayIndex].hourlyWeatherIcon.concat(forecastWeather[currentDayIndex + 1].hourlyWeatherIcon);
    currentHour = getHourFromStringDate(currentTime);
    currentHour = currentHour % 2 == 0 ? currentHour : currentHour - 1;
  } else {
    weatherHours = forecastWeather[currentDayIndex].hourlyTemperature;
    weatherIcons = forecastWeather[currentDayIndex].hourlyWeatherIcon;
  }

  let currentWeatherHours = weatherHours.slice(currentHour, currentHour + 12);
  let currentWeatherIcons = weatherIcons.slice(currentHour, currentHour + 12);
  let weatherData = [];
  for (let i = 0; i < 6; i++) {
    weatherData[i] = {
      hour: currentWeatherHours[i * 2].Hour, temperature: currentWeatherHours[i * 2].Temp, Icon: currentWeatherIcons[i * 2].Image
    };
  }

  return (
    <>
      <div className="flex space-x-0 overflow-x-auto p-4">
        {
          weatherData.map((data, index) => {
            let colorClass = getTemperatureColor(data.temperature);

            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`${colorClass} w-full h-8 ${index == 0 ? "rounded-l-lg" : index == 5 ? "rounded-r-lg" : null} items-center justify-center flex`}>
                  <img src={`${data.Icon}`} className='w-1/2' />
                </div>
                <div className="grid grid-cols-3 w-full gap-0 m-0 p-0 text-fs-xtraSmall text-xtraSmall-font-c">
                  <p className="text-left">|</p>
                  <p className="text-center">|</p>
                  {index == 5 ? <p className="text-right">|</p> : null}
                </div >
                <div className="text-fs-small font-semibold text-small-font-c">
                  {data.hour}
                </div>
                <div className="text-fs-small text-small-font-c">{data.temperature}°C</div>
              </div>
            );
          })
        }
      </div >
    </>);
}

export default HourlyWeatherBar;

function getTemperatureColor(temperature: number) {
  if (temperature < -5) return "bg-[#000084]";
  if (temperature < 5) return "bg-[#103667]";
  if (temperature < 20) return "bg-[#9bcf00]";
  if (temperature < 25) return "bg-[#ffd427]";
  if (temperature < 30) return "bg-[#ee8000]";
  if (temperature <= 35) return "bg-[#df3300]";
  if (temperature > 35) return "bg-[#9c0000]";
}

