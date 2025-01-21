export type WeatherTime = {
  Day: string,
  Hour: string
};

export type WeatherHourTemps = {
  Hour: string,
  Temp: number
}

export type WeatherHourIcon = {
  Hour: string,
  Image: string
}

export type WeatherHourRainProb = {
  Hour: string,
  Probability: number | null
}

export type SkyColorCode = {
  currentTime: string;
  temperature: number;
  skyCode: number;
}

export type WeatherUnits = {
  temperature: string;
  rainProbability: string;
  humidity: string;
  windSpeed: string;
  windDirection: string;
}

export type CurrentWeather = {
  city: string;
  day: string;
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  isDay: boolean;
  weatherName: string;
  weatherDescription: string;
  weatherSkyCode: number;
  weatherIcon: string;
  windSpeed: number;
  windDirection: string;
}

export type ForecastWeather = {
  city: string;
  day: string;
  minTemperature: number;
  maxTemperature: number;
  hourlyTemperature: WeatherHourTemps[];
  hourlyApparentTemperature: WeatherHourTemps[];
  hourlyRainProbability: WeatherHourRainProb[];
  hourlyWeatherIcon: WeatherHourIcon[];
  weatherIcon: string;
  weatherDescription: string;
  weatherSkyCode: number;
  windSpeed: number;
  windDirection: string;
}
