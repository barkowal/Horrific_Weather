import { CurrentWeather, ForecastWeather, WeatherUnits, WeatherTime, WeatherHourTemps, WeatherHourRainProb, WeatherHourIcon } from "./Types";
import weather_descriptions from "../assets/weather_descriptions.json"

function GetWeatherObject(weatherData: any | undefined, cityName: string) {
  let currentWeather: CurrentWeather;
  let forecastWeather: ForecastWeather[] = [];
  let weatherUnits: WeatherUnits;

  if (weatherData == undefined)
    return {};

  currentWeather = {
    city: cityName,
    day: weatherData.current.time,
    time: weatherData.current.time,
    temperature: weatherData.current.temperature_2m,
    apparentTemperature: weatherData.current.apparent_temperature,
    humidity: weatherData.current.relative_humidity_2m,
    isDay: weatherData.current.is_day == 1,
    weatherName: getWeatherName(weatherData.current.weather_code, weatherData.current.is_day == 1),
    weatherDescription: "",
    weatherSkyCode: getWeatherSkyCode(weatherData.current.weather_code, weatherData.current.is_day == 1),
    weatherIcon: getWeatherIcon(weatherData.current.weather_code, weatherData.current.is_day == 1),
    windSpeed: weatherData.current.wind_speed_10m,
    windDirection: getWindDirection(weatherData.current.wind_direction_10m)
  }

  forecastWeather = getWeeklyForecast(weatherData, cityName);

  weatherUnits = {
    temperature: weatherData.daily_units.temperature_2m_max,
    rainProbability: weatherData.daily_units.precipitation_probability_max,
    humidity: weatherData.current_units.relative_humidity_2m,
    windSpeed: weatherData.daily_units.wind_speed_10m_max,
    windDirection: weatherData.daily_units.wind_direction_10m_dominant
  }

  return { currentWeather, forecastWeather, weatherUnits };
}

export default GetWeatherObject;


function getWeatherName(weatherCode: number, isDay: boolean) {
  return isDay ? weather_descriptions[weatherCode].day.description : weather_descriptions[weatherCode].night.description;
}

function getWeatherIcon(weatherCode: number, isDay: boolean) {
  const imgPath = isDay ? weather_descriptions[weatherCode].day.image : weather_descriptions[weatherCode].night.image;
  return `./src/${imgPath}`;
}

function getWeatherSkyCode(weatherCode: number, isDay: boolean) {
  return isDay ? weather_descriptions[weatherCode].day.skyCode : weather_descriptions[weatherCode].night.skyCode;
}

function getWeatherDays(weatherTime: string[]) {
  let weatherDays: WeatherTime[] = [];
  for (let i = 0; i < weatherTime.length; i++) {
    weatherDays[i] = {
      Day: (formatDate(weatherTime[i].slice(0, weatherTime[i].indexOf('T')).replace(' ', ''))),
      Hour: (weatherTime[i].slice(weatherTime[i].indexOf('T') + 1).replace(' ', ''))
    }
  }
  return weatherDays;
}

function formatDate(date: string) {
  const dateArray = date.split('-');
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}

function getWindDirection(degrees: number) {
  if (degrees < 23) return "Północny";
  if (degrees < 68) return "Północno-Wschodni";
  if (degrees < 90) return "Wschodnio-Północno-Wschodni";
  if (degrees < 113) return "Wschodni";
  if (degrees < 135) return "Wschodnio-Południowo-Wschodni";
  if (degrees < 158) return "Południowo-Wschodni";
  if (degrees < 180) return "Południowo-Wschodni";
  if (degrees < 203) return "Południowy";
  if (degrees < 225) return "Południowo-Zachodni";
  if (degrees < 248) return "Południowo-Zachodni";
  if (degrees < 270) return "Zachodnio-Południowo-Zachodni";
  if (degrees < 293) return "Zachodni";
  if (degrees < 315) return "Zachodnio-Północno-Zachodni";
  if (degrees < 338) return "Północno-Zachodni";
  return "Północno-Zachodni";
}

function getWeeklyForecast(weatherData: any, cityName: string) {
  let wDays = getWeatherDays(weatherData.hourly.time);

  let weekWeather: ForecastWeather[] = [];
  for (let i = 0; i < 7; i++) {
    let dayIndex = 24 * i;
    let dailyTempArray = [];
    let dailyApparentTempArray = [];
    let dailyRainProb = [];
    let dailyWeatherIcon = [];

    for (let j = 0; j < 24; j++) {
      const currentHour = wDays[dayIndex + j].Hour;
      const temp: WeatherHourTemps = { Hour: currentHour, Temp: weatherData.hourly.temperature_2m[dayIndex + j] };
      dailyTempArray[j] = temp;

      const aparrentTemp: WeatherHourTemps = { Hour: currentHour, Temp: weatherData.hourly.apparent_temperature[dayIndex] };
      dailyApparentTempArray[j] = aparrentTemp;

      let probability = 0;;
      if (weatherData.hourly.precipitation_probability[dayIndex] != null) {
        probability = weatherData.hourly.precipitation_probability[dayIndex];
      }

      const hourNumber = parseInt(currentHour.split(":")[0]);
      const isDay: boolean = hourNumber > 6 && hourNumber < 17 ? true : false;
      const weatherIcon: WeatherHourIcon = { Hour: currentHour, Image: getWeatherIcon(weatherData.hourly.weather_code[dayIndex], isDay) };
      dailyWeatherIcon[j] = weatherIcon;

      const rainProb: WeatherHourRainProb = {
        Hour: wDays[dayIndex + j].Hour,
        Probability: probability
      };
      dailyRainProb[j] = rainProb;
    }

    weekWeather[i] = {
      city: cityName,
      day: wDays[dayIndex].Day,
      minTemperature: weatherData.daily.temperature_2m_min[i],
      maxTemperature: weatherData.daily.temperature_2m_max[i],
      hourlyTemperature: dailyTempArray,
      hourlyApparentTemperature: dailyApparentTempArray,
      hourlyRainProbability: dailyRainProb,
      hourlyWeatherIcon: dailyWeatherIcon,
      weatherIcon: getWeatherIcon(weatherData.daily.weather_code[i], true),
      weatherDescription: getWeatherName(weatherData.daily.weather_code[i], true),
      weatherSkyCode: getWeatherSkyCode(weatherData.daily.weather_code[i], true),
      windSpeed: weatherData.daily.wind_speed_10m_max[i],
      windDirection: getWindDirection(weatherData.daily.wind_direction_10m_dominant[i])
    }
  }
  return weekWeather;
}

